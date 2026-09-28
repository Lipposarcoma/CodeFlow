/* ══════════════════════════════════════════════════════════
   CARRERA DE CÓDIGO — JS específico de este minijuego
   Requiere que index.js ya esté cargado antes que este archivo
   (usa S, showView()/showToast(), y opcionalmente hideBanner()
   si lacaceria.js también está presente en la página).
   ══════════════════════════════════════════════════════════ */

/* — Estado de la partida actual. Se agrega al objeto S de index.js. — */
S.racer=null;

/* — Las 6 preguntas rápidas (correcta vs. incorrecta) de la carrera. — */
const RACER_QS=[
  {text:'¿Cuál es una variable válida en la mayoría de lenguajes?',correct:'edad = 18',wrong:'18 = edad'},
  {text:'¿Qué estructura repite un bloque de código?',correct:'Bucle (for / while)',wrong:'Condicional (if)'},
  {text:'¿Qué símbolo compara igualdad en muchos lenguajes?',correct:'==',wrong:'='},
  {text:'¿Qué es una función?',correct:'Bloque de código reutilizable',wrong:'Un tipo de variable'},
  {text:'En POO, ¿qué es una clase?',correct:'Un molde para crear objetos',wrong:'Una variable global'},
  {text:'¿Qué hace un condicional "si / si-no"?',correct:'Decide entre caminos según una condición',wrong:'Repite código indefinidamente'},
];

let RACER_ORDER=[];

// Inicializa (o reinicia) una partida, con las preguntas en orden aleatorio.
function startRacerGame(){
  showView('view-game-racer');
  if(typeof hideBanner==='function')hideBanner();

  RACER_ORDER=RACER_QS.map((_,i)=>i);
  for(let i=RACER_ORDER.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [RACER_ORDER[i],RACER_ORDER[j]]=[RACER_ORDER[j],RACER_ORDER[i]];
  }
  S.racer={idx:0,score:0};
  document.getElementById('racer-score-final').classList.remove('show');
  renderRacer();
}

// Renderiza la pregunta y las 2 puertas (correcta/incorrecta) de la
// ronda actual, o el resumen final si ya se jugaron todas.
function renderRacer(){
  if(S.racer.idx>=RACER_ORDER.length){
    document.getElementById('racer-question').innerHTML='<span class="material-icons" style="font-size: 1em; vertical-align: middle;">flag</span> ¡Meta alcanzada! Buen manejo de la lógica.';
    document.getElementById('racer-doors').innerHTML='';
    document.getElementById('racer-feedback').innerHTML='';
    document.getElementById('racer-car').style.left='calc(50% - 23px)';
    document.getElementById('racer-score-final').classList.add('show');
    document.getElementById('racer-score-val').innerHTML=S.racer.score+' / '+RACER_QS.length;
    return;
  }

  const q=RACER_QS[RACER_ORDER[S.racer.idx]];
  document.getElementById('racer-question').innerHTML=q.text;
  document.getElementById('racer-feedback').innerHTML='';

  const doorsWrap=document.getElementById('racer-doors');
  doorsWrap.innerHTML='';
  const opts=[{t:q.correct,ok:true},{t:q.wrong,ok:false}];
  if(Math.random()<0.5)opts.reverse();
  opts.forEach((o,i)=>{
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='racer-door '+(i===0?'left':'right');
    btn.innerHTML=`<span class="racer-door-label">${o.t}</span>`;
    btn.onclick=()=>chooseDoor(o.ok,i);
    doorsWrap.appendChild(btn);
  });

  document.getElementById('racer-car').style.left='calc(50% - 23px)';
}

// Evalúa la puerta elegida por el jugador y mueve el auto hacia ella.
function chooseDoor(ok,side){
  document.getElementById('racer-car').style.left=side===0?'20%':'70%';
  document.querySelectorAll('.racer-door').forEach(d=>d.disabled=true);

  const fb=document.getElementById('racer-feedback');
  if(ok){
    S.racer.score++;
    fb.innerHTML='<span class="material-icons" style="font-size: 1em; vertical-align: middle;">check_circle</span> ¡Correcto! Turbo activado.';
    fb.style.color='#4CAF7D';
  }else{
    fb.innerHTML='<span class="material-icons" style="font-size: 1em; vertical-align: middle;">cancel</span> Chocaste con la puerta equivocada.';
    fb.style.color='#E4685D';
  }

  setTimeout(()=>{
    S.racer.idx++;
    renderRacer();
  },1100);
}