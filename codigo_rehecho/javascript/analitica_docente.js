/* ══════════════════════════════════════════════════════════
   ANALÍTICA DOCENTE — JS específico de esta sección
   Requiere que index.js y lacaceria.js ya estén cargados: a
   diferencia de otras secciones, esta SÍ depende de los datos que
   registra el motor de La Cacería (S.attempts, S.errors, S.done,
   S.maxStreak, S.log, S.qAttempts, S.qErrors) — es justamente lo
   que existe para analizar. Se irá completando en varias rondas.
   ══════════════════════════════════════════════════════════ */

// Recalcula y pinta las estadísticas de esta vista. Por ahora solo
// las 6 tarjetas clave — las próximas rondas van agregando más
// llamadas aquí mismo (gráficos, tabla, log).
function refreshAnalytics(){
  const corr=S.attempts-S.errors;
  document.getElementById('a-acc').innerHTML=S.attempts>0?Math.round(corr/S.attempts*100)+'%':'—';
  document.getElementById('a-sessions').innerHTML=Math.max(1,Math.ceil(S.attempts/4));
  // "Niveles completados" incluye los Boss Fights vencidos: cada módulo
  // tiene 6 niveles en total (5 regulares + 1 boss), no 5.
  document.getElementById('a-lvls').innerHTML=Object.keys(S.done).length+Object.values(S.bossDone).filter(Boolean).length;
  document.getElementById('a-att').innerHTML=S.attempts;
  document.getElementById('a-err').innerHTML=S.errors;
  document.getElementById('a-str').innerHTML=S.maxStreak;

  buildErrorBarChart();
  buildDonut();
  buildPrecisionTimeline();
  buildModuleProgChart();
  buildErrorHeatmap();
  buildRadarChart();
  buildBossAnalytics();
  buildModTable();
  buildLog();
}

// Construye la lista de Boss Fights ya superados.
function buildBossAnalytics(){
  const cont=document.getElementById('boss-analytics');
  if(!cont||typeof MODS==='undefined')return;

  const bossDoneList=Object.entries(S.bossDone).filter(([,v])=>v);
  if(!bossDoneList.length){
    cont.innerHTML='<p class="chart-empty">Sin Boss Fights completados aún</p>';
    return;
  }

  cont.innerHTML=bossDoneList.map(([id])=>{
    const m=MODS[id];
    return `
      <div class="mini-bar-row">
        <div class="mini-bar-label">${m.icon} ${m.name}</div>
        <div class="mini-bar-track"><div class="mini-bar-fill" style="width:100%;background:linear-gradient(90deg,#DC2626,#F97316)"></div></div>
        <div class="mini-bar-val" style="color:#f87171;width:40px"><span class="material-icons" style="font-size: 1em; vertical-align: middle;">check</span> Boss</div>
      </div>`;
  }).join('');
}

// Construye la tabla de detalle por módulo. Cada módulo tiene 6
// "niveles" en total (5 regulares + el Boss Fight), igual que en el
// resto de esta vista — "Completado" requiere haber vencido al boss.
function buildModTable(){
  const tbody=document.getElementById('mod-tbody');
  if(!tbody||typeof MODS==='undefined')return;
  tbody.innerHTML='';

  Object.entries(MODS).forEach(([id,m])=>{
    const total=m.levels.length+(m.boss?1:0);
    const doneLevels=m.levels.filter((_,i)=>S.done[`${id}-${i}`]).length;
    const done=doneLevels+(S.bossDone[id]?1:0);
    const pct=Math.round(done/total*100);
    const cls=done===total?'pill-ok':done>0?'pill-go':'pill-no';
    const lbl=done===total?'Completado':done>0?'En curso':'Sin iniciar';
    // m.candidateName solo falta en el Módulo 6 (POO — Jefe Final):
    // es el mismo indicador que usamos en showBossResult() para
    // detectar que ese módulo no tiene candidato propio.
    const isFinal=!m.candidateName;

    tbody.innerHTML+=`
      <tr>
        <td>${m.icon} ${m.name}${isFinal?'<span class="boss-badge">JEFE</span>':''}</td>
        <td>${done}/${total}</td>
        <td><div class="tbar-w"><div class="tbar" style="width:${pct}%;background:${m.color}"></div></div></td>
        <td><span class="pill ${cls}">${lbl}</span>${S.bossDone[id]?'<span class="boss-badge">Boss <span class="material-icons" style="font-size: 1em; vertical-align: middle;">check</span></span>':''}</td>
      </tr>`;
  });
}

// Construye el mapa de calor: un bloque por pregunta, con la
// intensidad de color según cuántos errores acumuló esa pregunta.
function buildErrorHeatmap(){
  const cont=document.getElementById('error-heatmap');
  if(!cont||typeof MODS==='undefined')return;

  const data=Object.entries(MODS).map(([mId,m])=>({
    icon:m.icon,name:m.name,color:m.color,
    blocks:m.levels.map((lvl,lIdx)=>({errors:S.qErrors[`${mId}-${lIdx}-0`]||0,name:lvl.name})),
  }));
  const hasData=data.some(r=>r.blocks.some(b=>b.errors>0));

  if(!hasData){
    cont.innerHTML='<p class="chart-empty">Completa ejercicios para generar el mapa</p>';
    return;
  }

  cont.innerHTML=data.map(row=>`
    <div class="heatmap-row">
      <div class="heatmap-label">${row.icon} ${row.name}</div>
      <div class="heatmap-blocks">
        ${row.blocks.map(b=>{
          const bg=b.errors===0?'rgba(255,255,255,.04)':b.errors===1?row.color+'55':b.errors===2?row.color+'99':row.color+'ee';
          const border=b.errors>0?row.color+'33':'rgba(255,255,255,.04)';
          return `<div class="heatmap-block" title="${b.name}: ${b.errors} error(es)" style="background:${bg};border:1px solid ${border}"></div>`;
        }).join('')}
      </div>
      <div class="heatmap-val">${row.blocks.reduce((a,b)=>a+b.errors,0)}</div>
    </div>`).join('');
}

// Construye el radar de competencias: un polígono SVG con el % de
// precisión de cada módulo, dibujado a mano (sin librería de gráficos).
function buildRadarChart(){
  const wrap=document.getElementById('radar-wrap');
  if(!wrap||typeof MODS==='undefined')return;

  const modEntries=Object.entries(MODS);
  const scores=modEntries.map(([id,m])=>{
    const att=m.levels.reduce((sum,lvl,lIdx)=>sum+(S.qAttempts[`${id}-${lIdx}-0`]||0),0);
    const err=m.levels.reduce((sum,lvl,lIdx)=>sum+(S.qErrors[`${id}-${lIdx}-0`]||0),0);
    return att>0?Math.round((att-err)/att*100):0;
  });

  if(scores.every(s=>s===0)){
    wrap.innerHTML='<p class="chart-empty">Sin datos aún</p>';
    return;
  }

  const cx=90,cy=90,maxR=72,n=modEntries.length;
  const points=scores.map((s,i)=>{
    const angle=(Math.PI*2/n)*i-Math.PI/2,r=(s/100)*maxR;
    return{x:cx+r*Math.cos(angle),y:cy+r*Math.sin(angle)};
  });

  const gridRings=[25,50,75,100].map(pct=>{
    const r=(pct/100)*maxR;
    const pts=Array.from({length:n},(_,i)=>{
      const a=(Math.PI*2/n)*i-Math.PI/2;
      return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`;
    }).join(' ');
    return `<polygon points="${pts}" fill="none" stroke="var(--border)" stroke-width="1"></polygon>`;
  }).join('');

  const axes=modEntries.map(([id,m],i)=>{
    const a=(Math.PI*2/n)*i-Math.PI/2,lx=cx+(maxR+14)*Math.cos(a),ly=cy+(maxR+14)*Math.sin(a);
    return `<line x1="${cx}" y1="${cy}" x2="${cx+maxR*Math.cos(a)}" y2="${cy+maxR*Math.sin(a)}" stroke="var(--border)" stroke-width="1"></line><text class="radar-axis-label" x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" font-size="11" fill="var(--muted)">${m.icon}</text>`;
  }).join('');

  const poly=points.map(p=>`${p.x},${p.y}`).join(' ');

  wrap.innerHTML=`
    <svg width="180" height="180" viewBox="0 0 180 180">
      ${gridRings}
      ${axes}
      <polygon points="${poly}" fill="rgba(79,142,247,.15)" stroke="var(--mod1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polygon>
      ${points.map(p=>`<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="var(--mod1)"></circle>`).join('')}
    </svg>
    <div class="radar-legend">
      ${modEntries.map(([id,m],i)=>`<div class="radar-legend-item">${m.icon} ${m.name}<strong>${scores[i]}%</strong></div>`).join('')}
    </div>`;
}

// Construye el gráfico de barras: las preguntas con mayor tasa de
// error, para identificar qué conceptos necesitan refuerzo.
function buildErrorBarChart(){
  const cont=document.getElementById('error-bar-chart');
  if(!cont||typeof MODS==='undefined')return;

  const rows=[];
  Object.entries(MODS).forEach(([mId,m])=>{
    m.levels.forEach((lvl,lIdx)=>{
      lvl.q.forEach((q,qIdx)=>{
        const key=`${mId}-${lIdx}-${qIdx}`;
        const att=S.qAttempts[key]||0,err=S.qErrors[key]||0;
        if(att>0)rows.push({label:`${m.icon} ${lvl.name}`,errors:err,attempts:att,rate:Math.round(err/att*100),color:m.color});
      });
    });
  });

  if(!rows.length){
    cont.innerHTML='<p class="chart-empty">Completa ejercicios para ver el análisis</p>';
    return;
  }

  rows.sort((a,b)=>b.rate-a.rate);
  cont.innerHTML=rows.slice(0,7).map(r=>`
    <div class="bar-row">
      <div class="bar-label">${r.label}</div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${r.rate}%;background:linear-gradient(90deg,${r.color},${r.color}99)">${r.rate>15?r.rate+'%':''}</div>
      </div>
      <div class="bar-pct">${r.rate}%</div>
    </div>`).join('');
}

// Construye la dona de distribución: respuestas correctas vs
// incorrectas, con el % de precisión global al centro.
function buildDonut(){
  const wrap=document.getElementById('donut-wrap');
  if(!wrap)return;

  if(!S.attempts){
    wrap.innerHTML='<p class="chart-empty">Sin datos aún</p>';
    return;
  }

  const ok=S.attempts-S.errors,err=S.errors,r=54,circ=2*Math.PI*r;
  const okD=circ*(ok/S.attempts),errD=circ*(err/S.attempts);

  wrap.innerHTML=`
    <div class="donut-svg-wrap">
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r="${r}" fill="none" stroke="var(--surface2)" stroke-width="13"></circle>
        <circle cx="65" cy="65" r="${r}" fill="none" stroke="var(--green)" stroke-width="13" stroke-dasharray="${okD} ${circ-okD}" transform="rotate(-90 65 65)" stroke-linecap="round"></circle>
        <circle cx="65" cy="65" r="${r}" fill="none" stroke="var(--red)" stroke-width="13" stroke-dasharray="${errD} ${circ-errD}" stroke-dashoffset="${-okD}" transform="rotate(-90 65 65)" stroke-linecap="round"></circle>
      </svg>
      <div class="donut-center">
        <div class="donut-center-val">${Math.round(ok/S.attempts*100)}%</div>
        <div class="donut-center-lbl">precisión</div>
      </div>
    </div>
    <div class="donut-legend">
      <div class="donut-legend-item"><div class="donut-legend-dot" style="background:var(--green)"></div>Correctas<strong>${ok}</strong></div>
      <div class="donut-legend-item"><div class="donut-legend-dot" style="background:var(--red)"></div>Incorrectas<strong>${err}</strong></div>
      <div class="donut-legend-item"><div class="donut-legend-dot" style="background:var(--muted2)"></div>Total<strong>${S.attempts}</strong></div>
    </div>`;
}

// Construye la línea de tiempo de precisión: las últimas 10
// respuestas, más recientes primero.
function buildPrecisionTimeline(){
  const cont=document.getElementById('precision-timeline');
  if(!cont)return;

  if(!S.precisionHistory.length){
    cont.innerHTML='<p class="chart-empty">Sin datos aún</p>';
    return;
  }

  const last=S.precisionHistory.slice(-10);
  cont.innerHTML=`
    <div class="precision-row">
      ${last.map(ok=>`<div class="precision-cell ${ok?'ok':'err'}" title="${ok?'Correcta':'Incorrecta'}">${ok?'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">check</span>':'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">close</span>'}</div>`).join('')}
    </div>
    <div class="precision-footer">
      <span>↑ más reciente</span>
      <span>${last.filter(x=>x).length}/${last.length} correctas</span>
    </div>`;
}

// Construye las mini-barras de progreso por cada uno de los 6 módulos.
// Cada módulo tiene 6 "niveles" en total: los 5 niveles regulares +
// el Boss Fight final, que también cuenta como nivel completado.
function buildModuleProgChart(){
  const cont=document.getElementById('module-prog-chart');
  if(!cont||typeof MODS==='undefined')return;

  const rows=Object.entries(MODS).map(([id,m])=>{
    const doneLevels=m.levels.filter((_,i)=>S.done[`${id}-${i}`]).length;
    const done=doneLevels+(S.bossDone[id]?1:0);
    const total=m.levels.length+(m.boss?1:0);
    return{icon:m.icon,name:m.name,done,total,pct:Math.round(done/total*100),color:m.color};
  });

  if(!rows.some(r=>r.done>0)){
    cont.innerHTML='<p class="chart-empty">Sin datos aún</p>';
    return;
  }

  cont.innerHTML=rows.map(r=>`
    <div class="mini-bar-row">
      <div class="mini-bar-label">${r.icon} ${r.name}</div>
      <div class="mini-bar-track"><div class="mini-bar-fill" style="width:${r.pct}%;background:linear-gradient(90deg,${r.color},${r.color}88)"></div></div>
      <div class="mini-bar-val">${r.done}/${r.total}</div>
    </div>`).join('');
}

// Muestra u oculta el panel de información de exportación.
function showExportInfo(){
  document.getElementById('export-panel').classList.toggle('show');
}

// Genera y descarga un archivo CSV con el historial de respuestas
// registrado en S.log (dataset anónimo, de esta sesión únicamente).
function downloadCSV(){
  const headers='session_id,module_id,module_name,level_idx,question_concept,is_correct,attempt_num,timestamp_iso,xp_earned,error_count';
  const rows=[headers];

  S.log.forEach((entry,i)=>{
    const modName=(S.mod&&typeof MODS!=='undefined'&&MODS[S.mod])?MODS[S.mod].name:'N/A';
    rows.push(`ND-2026X,${S.mod||'N/A'},${modName},${S.lvl||0},"${entry.text}",${entry.ok?'TRUE':'FALSE'},${i+1},${new Date().toISOString()},${entry.ok?20:0},${S.errors}`);
  });
  if(rows.length===1){
    rows.push('ND-2026X,N/A,N/A,0,"Sin actividad aún",FALSE,0,'+new Date().toISOString()+',0,0');
  }

  const blob=new Blob([rows.join('\n')],{type:'text/csv'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='nodo_dataset_ND-2026X.csv';
  a.click();
  showToast('<span class="material-icons" style="font-size: 1em; vertical-align: middle;">check_circle</span> Dataset descargado: nodo_dataset_ND-2026X.csv',2800);
}

// Construye el historial cronológico de respuestas recientes.
function buildLog(){
  const el=document.getElementById('attempt-log');
  if(!el)return;

  if(!S.log.length){
    el.innerHTML='<p class="chart-empty">Sin actividad · Completa un ejercicio</p>';
    return;
  }

  el.innerHTML=S.log.map(a=>`
    <div class="log-row">
      <div class="log-dot ${a.ok?'ok':'err'}"></div>
      <div class="log-info">${a.text}</div>
      <div class="log-time">${a.time}</div>
    </div>`).join('');
}