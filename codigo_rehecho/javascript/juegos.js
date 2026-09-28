/* ══════════════════════════════════════════════════════════
   EXPLORAR JUEGOS — JS específico de esta sección
   Requiere que index.js ya esté cargado antes que este archivo
   (usa S, showView(), navTo() y showToast()). También lee
   S.hubResultType y HUB_TYPES (definidos en hub_aprendizaje.js)
   para resaltar el juego recomendado según el perfil obtenido.
   ══════════════════════════════════════════════════════════ */

// Resalta, dentro de la grilla, la tarjeta del juego recomendado
// según el perfil de aprendizaje obtenido en el Hub (si existe).
// Se ejecuta automáticamente cada vez que se visita esta vista
// (ver data-onshow="renderHubGames" en el HTML).
function renderHubGames(){
  document.querySelectorAll('.hub-game-card').forEach(c=>c.classList.remove('recommended'));
  if(typeof S!=='undefined'&&S.hubResultType&&typeof HUB_TYPES!=='undefined'){
    const t=HUB_TYPES[S.hubResultType];
    const rec=document.querySelector(`.hub-game-card[data-target="${t.game}"]`);
    if(rec)rec.classList.add('recommended');
  }
}

// Abre la ruta de un juego. Si la vista destino todavía no existe
// (ej: los minijuegos que aún no se han construido), avisa en vez
// de dejar la pantalla en blanco. Si la vista tiene su propio botón
// en el sidebar (como "La Cacería"), lo resalta; si no (como los
// minijuegos, que se alcanzan desde esta grilla), resalta "Explorar
// Juegos" en su lugar.
function launchGame(view){
  if(!document.getElementById(view)){
    showToast('<span class="material-icons" style="font-size: 1em; vertical-align: middle;">construction</span> Próximamente: este minijuego aún no está construido');
    return;
  }
  const hasOwnNav=!!document.querySelector(`.nav-item[data-view="${view}"]`);
  setActiveNavByView(hasOwnNav?view:'view-hub-games');
  enterView(view);
}