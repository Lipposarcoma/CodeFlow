/* ══════════════════════════════════════════════════════════
   MEMORAMA LÓGICO — JS específico de este minijuego
   Requiere que index.js ya esté cargado antes que este archivo
   (usa S, showView()/showToast(), y opcionalmente hideBanner()
   si lacaceria.js también está presente en la página).
   ══════════════════════════════════════════════════════════ */

/* — Estado de la partida actual. Se agrega al objeto S de index.js. — */
S.memo=null;

/* — Los 6 pares de conceptos del tablero. — */
const MEMO_PAIRS=['<span class="material-icons" style="font-size: 1em; vertical-align: middle;">sync</span> Bucle','<span class="material-icons" style="font-size: 1em; vertical-align: middle;">shuffle</span> Condicional','<span class="material-icons" style="font-size: 1em; vertical-align: middle;">inventory_2</span> Variable','<span class="material-icons" style="font-size: 1em; vertical-align: middle;">grid_view</span> Clase','<span class="material-icons" style="font-size: 1em; vertical-align: middle;">build</span> Función','<span class="material-icons" style="font-size: 1em; vertical-align: middle;">extension</span> Objeto'];

// Inicializa (o reinicia) una partida del Memorama, con las 12
// cartas (6 pares) barajadas al azar.
function startMemoryGame(){
  showView('view-game-memory');
  if(typeof hideBanner==='function')hideBanner();

  let deck=[...MEMO_PAIRS,...MEMO_PAIRS].map((c,i)=>({id:i,c,flip:false,matched:false}));
  for(let i=deck.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [deck[i],deck[j]]=[deck[j],deck[i]];
  }
  S.memo={deck,flipped:[],moves:0,lock:false,matches:0};
  renderMemo();
}

// Renderiza el tablero completo según el estado actual de cada carta.
function renderMemo(){
  const g=document.getElementById('memo-grid');
  g.innerHTML='';
  S.memo.deck.forEach(card=>{
    const btn=document.createElement('button');
    btn.type='button';
    const revealed=card.flip||card.matched;
    btn.className='memo-card'+(revealed?' flipped':'')+(card.matched?' matched':'');
    btn.innerHTML=revealed?card.c:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">help_outline</span>';
    btn.disabled=revealed;
    btn.onclick=()=>flipMemo(card.id);
    g.appendChild(btn);
  });

  document.getElementById('memo-moves').innerHTML=S.memo.moves;
  document.getElementById('memo-matches').innerHTML=S.memo.matches+'/'+MEMO_PAIRS.length;

  if(S.memo.matches===MEMO_PAIRS.length){
    setTimeout(()=>showToast('<span class="material-icons" style="font-size: 1em; vertical-align: middle;">celebration</span> ¡Memorama completado! Reconociste todos los patrones.',3200),300);
  }
}

// Voltea una carta y evalúa si forma pareja con la otra ya volteada.
function flipMemo(id){
  if(S.memo.lock)return;
  const card=S.memo.deck.find(c=>c.id===id);
  if(card.flip||card.matched)return;

  card.flip=true;
  S.memo.flipped.push(card);
  renderMemo();

  if(S.memo.flipped.length===2){
    S.memo.moves++;
    S.memo.lock=true;
    const[a,b]=S.memo.flipped;
    if(a.c===b.c){
      a.matched=true;
      b.matched=true;
      S.memo.matches++;
      S.memo.flipped=[];
      S.memo.lock=false;
      renderMemo();
    }else{
      setTimeout(()=>{
        a.flip=false;
        b.flip=false;
        S.memo.flipped=[];
        S.memo.lock=false;
        renderMemo();
      },800);
    }
  }
}