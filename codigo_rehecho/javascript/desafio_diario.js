/* ══════════════════════════════════════════════════════════
   DESAFÍO DEL DÍA — JS específico de esta sección
   Requiere que index.js ya esté cargado antes que este archivo
   (usa S, y las utilidades compartidas showXp/updateXpBar/
   animateStat/checkLevelUp/launchConfetti).
   ══════════════════════════════════════════════════════════ */

/* — Estado del desafío. Se agrega al objeto S de index.js. — */
S.challengeSel=null;
S.challengeDone=false;
S.challengeIdx=null; // índice del desafío actualmente mostrado

/* — Los 3 desafíos (uno por día, rotando según el día de la semana). — */
const DAILY_CHALLENGES=[
  {title:'El Robot Desorientado',desc:'Un robot sigue instrucciones al pie de la letra. Analiza si su secuencia produce el resultado esperado.',xp:50,diff:'Intermedio',mod:'Secuencias',time:'5 min',
    q:{text:'El robot ejecuta:\n1. Girar derecha\n2. Avanzar 3 pasos\n3. Girar izquierda\n4. Avanzar 2 pasos\n\nEmpieza mirando al Norte. ¿Hacia dónde mira al final?',opts:['Norte (los giros se cancelan)','Este (giró derecha una vez)','Oeste (giró izquierda una vez)'],ok:0,fb:'Gira derecha (Norte→Este), luego izquierda (Este→Norte). Los giros se cancelan.',err:'Norte+90°-90° = Norte.'}},
  {title:'La Condición Trampa',desc:'El sistema de acceso tiene un bug sutil. Encuéntralo antes de que el guardia nocturno se quede afuera.',xp:50,diff:'Básico',mod:'Condicionales',time:'4 min',
    q:{text:'Sistema:\nSI (credencial == true) Y (horario == "laboral")\n  Permitir acceso\n¿Qué ocurre con el guardia nocturno que SÍ tiene credencial?',opts:['Entra sin problemas, tiene credencial','Se le deniega: su horario no es "laboral"','El sistema lanza un error'],ok:1,fb:'AND requiere ambas. Tiene credencial (<span class="material-icons" style="font-size: 1em; vertical-align: middle;">check</span>) pero horario "nocturno" ≠ "laboral" (<span class="material-icons" style="font-size: 1em; vertical-align: middle;">close</span>).',err:'¿Qué pasa cuando una condición del AND es falsa?'}},
  {title:'Herencia o Composición',desc:'Una decisión de diseño clásica en POO. ¿Cuándo heredar y cuándo usar composición?',xp:50,diff:'Avanzado',mod:'POO',time:'6 min',
    q:{text:'Tienes clase Motor y clase Coche.\n¿Cuál relación modela mejor la realidad?\n\nA) Coche HEREDA de Motor\nB) Coche TIENE un Motor (composición)',opts:['A) Herencia: Coche extiende Motor','B) Composición: Coche contiene Motor','Son equivalentes, cualquiera sirve'],ok:1,fb:'Un coche no ES un motor — lo TIENE. Preferir composición sobre herencia cuando no hay relación "es-un".',err:'¿Un Coche es un tipo de Motor, o lo contiene?'}},
];

// Devuelve el desafío que se está mostrando ahora mismo. La primera
// vez del día se elige según la fecha; después, se recuerda cuál está
// activo (para que "Comprobar" y "Reintentar" siempre validen contra
// la misma pregunta que el usuario está viendo).
function getCurrentChallenge(){
  if(S.challengeIdx===null){
    S.challengeIdx=new Date().getDay()%DAILY_CHALLENGES.length;
  }
  return DAILY_CHALLENGES[S.challengeIdx];
}

// Elige un desafío al azar, distinto al actual, para "Reintentar".
function retryChallenge(){
  let idx;
  do{
    idx=Math.floor(Math.random()*DAILY_CHALLENGES.length);
  }while(DAILY_CHALLENGES.length>1&&idx===S.challengeIdx);
  S.challengeIdx=idx;
  S.challengeSel=null;
  buildChallenge();
}

// Construye la vista: la pantalla de "ya completado hoy", o el
// desafío del día con su pregunta y alternativas.
function buildChallenge(){
  const cont=document.getElementById('challenge-content');
  if(!cont)return;
  const ch=getCurrentChallenge();

  if(S.challengeDone){
    cont.innerHTML=`
      <div class="challenge-done">
        <div class="challenge-done-icon"><span class="material-icons" style="font-size: 1em; vertical-align: middle;">emoji_events</span></div>
        <h3>¡Desafío completado hoy!</h3>
        <p>Has ganado +50 XP bonus. Vuelve mañana para un nuevo reto.</p>
      </div>`;
    return;
  }

  cont.innerHTML=`
    <div class="challenge-hero">
      <div class="challenge-badge"><span class="material-icons" style="font-size: 1em; vertical-align: middle;">track_changes</span> Desafío del Día</div>
      <div class="challenge-title">${ch.title}</div>
      <div class="challenge-desc">${ch.desc}</div>
      <div class="challenge-meta">
        <div class="challenge-tag"><span class="material-icons" style="font-size: 1em; vertical-align: middle;">menu_book</span> ${ch.mod}</div>
        <div class="challenge-tag"><span class="material-icons" style="font-size: 1em; vertical-align: middle;">bolt</span> ${ch.diff}</div>
        <div class="challenge-tag">⏱ ${ch.time}</div>
        <div class="challenge-tag"><span class="material-icons" style="font-size: 1em; vertical-align: middle;">star</span> +${ch.xp} XP</div>
      </div>
    </div>
    <div class="challenge-q-wrap">
      <div class="challenge-q">${ch.q.text}</div>
      <div class="challenge-opts" id="ch-opts">
        ${ch.q.opts.map((o,i)=>`
          <button type="button" class="challenge-opt" onclick="selChallengeOpt(this,${i})">
            <span class="challenge-opt-radio"></span><span>${o}</span>
          </button>`).join('')}
      </div>
    </div>
    <button type="button" class="btn-challenge" id="btn-challenge" onclick="checkChallenge()" disabled>Comprobar →</button>
    <div class="challenge-result" id="ch-result">
      <div class="challenge-result-title" id="ch-res-title"></div>
      <div class="challenge-result-text" id="ch-res-text"></div>
    </div>`;
}

// Marca la alternativa seleccionada.
function selChallengeOpt(el,i){
  document.querySelectorAll('.challenge-opt').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');
  S.challengeSel=i;
  document.getElementById('btn-challenge').disabled=false;
}

// Valida la respuesta del desafío. Solo hay un intento por día: acierta
// o falla, el desafío queda cerrado hasta el día siguiente.
function checkChallenge(){
  if(S.challengeSel===null)return;
  const ch=getCurrentChallenge();
  const ok=S.challengeSel===ch.q.ok;

  document.querySelectorAll('.challenge-opt').forEach((o,i)=>{
    o.disabled=true;
    if(i===S.challengeSel)o.classList.add(ok?'correct-anim':'wrong-anim');
  });

  const res=document.getElementById('ch-result');
  res.className='challenge-result show '+(ok?'ok':'err');
  document.getElementById('ch-res-title').innerHTML=ok?'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">auto_awesome</span> ¡Correcto!':'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">close</span> No exactamente…';
  document.getElementById('ch-res-text').innerHTML=ok?ch.q.fb:'Pista: '+ch.q.err;
  document.getElementById('btn-challenge').disabled=true;

  if(ok){
    const oldXp=S.xp;
    S.xp+=50;
    S.challengeDone=true;
    showXp('+50 XP Bonus!');
    updateXpBar();
    animateStat('total-xp',S.xp);
    checkLevelUp(oldXp,S.xp);
    launchConfetti();
    setTimeout(buildChallenge,2600);
  }else{
    res.insertAdjacentHTML('beforeend','<button type="button" class="btn-challenge challenge-retry-btn" onclick="retryChallenge()"><span class="material-icons" style="font-size: 1em; vertical-align: middle;">sync</span> Otra pregunta →</button>');
  }
}