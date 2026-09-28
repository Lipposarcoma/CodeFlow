/* ══════════════════════════════════════════════════════════
   ORDENA LA LÓGICA — JS específico de este minijuego
   Requiere que index.js ya esté cargado antes que este archivo
   (usa S, showView()/showToast(), y opcionalmente hideBanner()
   si lacaceria.js también está presente en la página).
   ══════════════════════════════════════════════════════════ */

/* — Estado de la partida actual. Se agrega al objeto S de index.js. — */
S.seq=null;

/* — Los 5 algoritmos cotidianos a ordenar. — */
const SEQUENCE_QS=[
  {title:'Algoritmo: preparar un café',steps:['Hervir el agua','Poner café molido en el filtro','Verter el agua caliente sobre el café','Servir en la taza']},
  {title:'Algoritmo: sumar dos números',steps:['Leer el primer número','Leer el segundo número','Sumar ambos números','Mostrar el resultado']},
  {title:'Algoritmo: saber si un número es par',steps:['Leer el número','Dividirlo por 2','Si el resto es 0, decir "par"','Si no, decir "impar"']},
  {title:'Algoritmo: encender un semáforo',steps:['Iniciar en rojo','Esperar y cambiar a verde','Esperar y cambiar a amarillo','Volver a rojo']},
  {title:'Algoritmo: ordenar tu mochila',steps:['Revisar el horario del día siguiente','Sacar los cuadernos que no necesitas','Guardar los cuadernos que sí necesitas','Cerrar la mochila']},
];

let SEQ_ORDER=[];

// Inicializa (o reinicia) una partida, con los algoritmos en orden aleatorio.
function startSequenceGame(){
  showView('view-game-sequence');
  if(typeof hideBanner==='function')hideBanner();

  SEQ_ORDER=SEQUENCE_QS.map((_,i)=>i);
  for(let i=SEQ_ORDER.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [SEQ_ORDER[i],SEQ_ORDER[j]]=[SEQ_ORDER[j],SEQ_ORDER[i]];
  }
  S.seq={idx:0,score:0,current:null};
  renderSeqRound();
}

// Prepara una nueva ronda (algoritmo a ordenar), o el resumen final
// si ya se jugaron todas.
function renderSeqRound(){
  const fb=document.getElementById('seq-feedback');
  fb.innerHTML='';

  if(S.seq.idx>=SEQ_ORDER.length){
    document.getElementById('seq-title').innerHTML='<span class="material-icons" style="font-size: 1em; vertical-align: middle;">flag</span> ¡Completaste todos los algoritmos! Puntaje: '+S.seq.score+'/'+SEQUENCE_QS.length;
    document.getElementById('seq-target').innerHTML='';
    document.getElementById('seq-pool').innerHTML='';
    fb.innerHTML='<button type="button" class="hub-btn" onclick="startSequenceGame()"><span class="material-icons" style="font-size: 1em; vertical-align: middle;">sync</span> Jugar otra vez</button>';
    return;
  }

  const q=SEQUENCE_QS[SEQ_ORDER[S.seq.idx]];
  document.getElementById('seq-title').innerHTML=q.title;
  const shuffled=q.steps.map((s,i)=>({t:s,i})).sort(()=>Math.random()-.5);
  S.seq.current={steps:q.steps,placed:[],round:shuffled};
  renderSeqUI();
}

// Dibuja los espacios objetivo (con lo ya colocado) y las fichas
// disponibles para seguir eligiendo.
function renderSeqUI(){
  const cur=S.seq.current;

  const target=document.getElementById('seq-target');
  target.innerHTML='';
  cur.steps.forEach((_,i)=>{
    const filled=cur.placed[i]!==undefined;
    const d=document.createElement('div');
    d.className='seq-slot'+(filled?' filled':'');
    d.innerHTML=`<span class="seq-slot-num">${i+1}</span>${filled?cur.steps[cur.placed[i]]:''}`;
    target.appendChild(d);
  });

  const pool=document.getElementById('seq-pool');
  pool.innerHTML='';
  cur.round.forEach(item=>{
    const used=cur.placed.includes(item.i);
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='seq-chip'+(used?' used':'');
    btn.innerHTML=item.t;
    btn.disabled=used;
    btn.onclick=()=>placeSeqChip(item.i);
    pool.appendChild(btn);
  });
}

// Coloca la ficha elegida en el siguiente espacio disponible.
function placeSeqChip(i){
  const cur=S.seq.current;
  if(cur.placed.includes(i))return;
  cur.placed.push(i);
  renderSeqUI();
  if(cur.placed.length===cur.steps.length)checkSeqOrder();
}

// Verifica si el orden armado por el jugador es el correcto.
function checkSeqOrder(){
  const cur=S.seq.current;
  const correct=cur.placed.every((v,i)=>v===i);
  const fb=document.getElementById('seq-feedback');
  if(correct){
    S.seq.score++;
    fb.style.color='#4CAF7D';
    fb.innerHTML='<span class="material-icons" style="font-size: 1em; vertical-align: middle;">check_circle</span> ¡Orden correcto! Así piensa un algoritmo, paso a paso.';
  }else{
    fb.style.color='#E4685D';
    fb.innerHTML='<span class="material-icons" style="font-size: 1em; vertical-align: middle;">cancel</span> Ese orden no es el ideal — revisa la lógica de la secuencia.';
  }
  setTimeout(()=>{
    S.seq.idx++;
    renderSeqRound();
  },1400);
}