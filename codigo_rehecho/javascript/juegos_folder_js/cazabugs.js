/* ══════════════════════════════════════════════════════════
   CAZA-BUGS — JS específico de este minijuego
   Requiere que index.js ya esté cargado antes que este archivo
   (usa S, showView()/showToast(), y opcionalmente hideBanner()
   si lacaceria.js también está presente en la página).
   ══════════════════════════════════════════════════════════ */

/* — Estado de la partida actual. Se agrega al objeto S de index.js. — */
S.bug=null;

/* — Banco de 5 fragmentos de código, cada uno con exactamente 1 error. — */
const BUG_QS=[
  {code:['edad = 18','SI edad = 18 ENTONCES','  Mostrar "Tiene 18"','FIN SI'],bugLine:1,explain:'Se usó "=" para comparar en vez de "==". Eso es una asignación, no una comparación.'},
  {code:['contador = 0','MIENTRAS contador < 5','  Mostrar contador','FIN MIENTRAS'],bugLine:1,explain:'Nunca se incrementa "contador" dentro del bucle — se repetiría para siempre.'},
  {code:['FUNCIÓN sumar(a, b)','  RETORNAR a - b','FIN FUNCIÓN'],bugLine:1,explain:'La función se llama "sumar" pero resta. Debería ser "RETORNAR a + b".'},
  {code:['notas = [6.5, 5.0, 4.2]','promedio = notas[0] + notas[1] + notas[2]','Mostrar promedio'],bugLine:1,explain:'Suma las notas pero nunca las divide por 3 — eso no es un promedio.'},
  {code:['SI (usuario == "admin") Y (clave == "1234")','  Mostrar "Acceso concedido"','SI NO','  Mostrar "Acceso concedido"','FIN SI'],bugLine:3,explain:'El mensaje de acceso se muestra también cuando la clave es incorrecta.'},
];

let BUG_ORDER=[];

// Inicializa (o reinicia) una partida de Caza-Bugs, con las rondas
// en orden aleatorio.
function startBugHunt(){
  showView('view-game-bughunt');
  if(typeof hideBanner==='function')hideBanner();

  BUG_ORDER=BUG_QS.map((_,i)=>i);
  for(let i=BUG_ORDER.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [BUG_ORDER[i],BUG_ORDER[j]]=[BUG_ORDER[j],BUG_ORDER[i]];
  }
  S.bug={idx:0,score:0};
  renderBugRound();
}

// Renderiza el fragmento de código de la ronda actual, o la pantalla
// final de resumen si ya se jugaron todas las rondas.
function renderBugRound(){
  document.getElementById('bug-feedback').innerHTML='';

  if(S.bug.idx>=BUG_ORDER.length){
    document.getElementById('bug-round-badge').innerHTML='<span class="material-icons" style="font-size: 1em; vertical-align: middle;">flag</span> ¡Terminaste la cacería!';
    document.getElementById('bug-code').innerHTML=`
      <div class="bug-final">
        <div class="bug-final-score"><span class="material-icons" style="font-size: 1em; vertical-align: middle;">bug_report</span> Bugs encontrados: ${S.bug.score}/${BUG_QS.length}</div>
        <button type="button" class="hub-btn" onclick="startBugHunt()"><span class="material-icons" style="font-size: 1em; vertical-align: middle;">sync</span> Jugar otra vez</button>
      </div>`;
    return;
  }

  document.getElementById('bug-round-badge').innerHTML='Ronda '+(S.bug.idx+1)+' de '+BUG_QS.length;
  const q=BUG_QS[BUG_ORDER[S.bug.idx]];
  const wrap=document.getElementById('bug-code');
  wrap.innerHTML='';
  q.code.forEach((line,i)=>{
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='bug-line';
    btn.innerHTML=`<span class="bug-line-num">${i+1}</span><span>${line.replace(/</g,'&lt;')}</span>`;
    btn.onclick=()=>chooseBugLine(i,q);
    wrap.appendChild(btn);
  });
}

// Evalúa la línea de código elegida como la que contiene el error.
function chooseBugLine(i,q){
  const lines=document.querySelectorAll('#bug-code .bug-line');
  lines.forEach(l=>l.disabled=true);

  const fb=document.getElementById('bug-feedback');
  if(i===q.bugLine){
    lines[i].classList.add('correct-line');
    S.bug.score++;
    fb.style.color='#4CAF7D';
    fb.innerHTML='<span class="material-icons" style="font-size: 1em; vertical-align: middle;">check_circle</span> ¡Encontrado! '+q.explain;
  }else{
    lines[i].classList.add('wrong-line');
    lines[q.bugLine].classList.add('correct-line');
    fb.style.color='#E4685D';
    fb.innerHTML='<span class="material-icons" style="font-size: 1em; vertical-align: middle;">cancel</span> No era esa línea. '+q.explain;
  }

  setTimeout(()=>{
    S.bug.idx++;
    renderBugRound();
  },2000);
}