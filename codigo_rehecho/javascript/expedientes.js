/* ══════════════════════════════════════════════════════════
   EXPEDIENTES — JS específico de esta sección
   Requiere que index.js ya esté cargado antes que este archivo.
   Es intencionalmente independiente de lacaceria-datos.js: tiene
   su propio roster de personajes (no reutiliza MODS), para que
   esta sección no se rompa si el modelo de datos de La Cacería
   cambia más adelante. Sí reutiliza funciones ya existentes
   (navTo, openLore, openStory, startBoss) para la navegación.
   ══════════════════════════════════════════════════════════ */

/* — Roster completo del elenco: 1 mentor + 5 candidatos + 6 Centinelas. — */
const CHARACTERS=[
  {id:'ren',name:'Ren Kaster',alias:null,role:'Cazatalentos Senior · Tu mentor',color:'#4F8EF7',emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">person_search</span>',
    tags:['Mentor','Sarcástico','Ex-Estática (rumor)'],
    quote:'"No busco a los que ya lo saben todo. Busco a los que preguntan por qué."',
    bio:'Chaqueta larga cubierta de parches de cada Nodo que ha visitado. Le falta el ojo izquierdo — lo reemplazó por un "Lente de Cursor", un implante que parpadea como un cursor de texto cuando está pensando o mintiendo (algo confía en que aprendas a notar la diferencia). Voz calma, humor negro, jamás corre. Fue compañero del Arquitecto antes de que este se pasara a La Estática, y todavía no lo ha superado del todo.',
    villain:false},

  {id:'tick',name:'Tick',alias:null,role:'Candidato · Nodo del Reloj',color:'#4F8EF7',emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">extension</span>',nodo:'Nodo del Reloj',modId:1,
    quote:'"Si el orden se rompe una vez, ¿cómo confías en que no se rompa siempre?"',
    bio:'Creció en un taller de relojería subterráneo, entre engranajes que nunca fallan un segundo. Cuenta todo en voz baja — pasos, respiraciones, escalones — y entra en pánico ante el desorden. Viste con capas de correas y hebillas, como si su propio cuerpo necesitara instrucciones de montaje. Su don: puede sentir cuándo una secuencia de eventos "no encaja", aunque no siempre sepa explicar por qué.',
    villain:false},
  {id:'desfase',name:'El Desfase',alias:null,role:'Centinela · Nodo del Reloj',color:'#4F8EF7',emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">sync</span>',nodo:'Nodo del Reloj',modId:1,
    quote:'"a-a-antes... des-después... ¿cuál fue primero?"',
    bio:'Una silueta de estática con forma casi humana, atrapada tartamudeando eventos fuera de orden — repite acciones en el orden equivocado una y otra vez. No es cruel, está roto: es lo que le pasa a un Lógico brillante cuando nadie le enseña a ordenar sus ideas a tiempo.',
    villain:true},

  {id:'duala',name:'Duala',alias:'La del Espejo',role:'Candidata · Nodo del Espejo',color:'#A855F7',emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">balance</span>',nodo:'Nodo del Espejo',modId:2,
    quote:'"Dame una condición y te muestro sus dos caras — o las cuatro, si me dejas pensar dos segundos más."',
    bio:'Habla consigo misma en voz alta, literalmente: tiene el hábito de defender ambos lados de cualquier decisión antes de elegir uno. Estética simétrica pero nunca idéntica — un lado de su ropa siempre contradice al otro (un guante, una manga, un color). Su don: ve instantáneamente todas las ramas posibles de una decisión, lo que la vuelve brillante para condicionales y agotadora para hacer planes de almuerzo.',
    villain:false},
  {id:'indeciso',name:'El Indeciso',alias:'Paradoja',role:'Centinela · Nodo del Espejo',color:'#A855F7',emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">monetization_on</span>',nodo:'Nodo del Espejo',modId:2,
    quote:'"Verdadero... falso... verdadero... falso..."',
    bio:'Una figura envuelta en cintas que giran como una moneda al aire eterna, incapaz de resolver ninguna condición. Cada vez que "decide" algo, se contradice a los tres segundos. Producto de un Lógico condicional que nunca aprendió que a veces sí hay que elegir.',
    villain:true},

  {id:'eco',name:'Eco',alias:'La del Bucle',role:'Candidata · Nodo del Laberinto',color:'#F97316',emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">sync</span>',nodo:'Nodo del Laberinto',modId:3,
    quote:'"Llevo bailando esta misma rutina no sé cuántas veces. Hoy la vamos a romper, ¿o de nuevo no?"',
    bio:'Bailarina callejera atrapada repitiendo el mismo día — lo recuerda cada vez que el ciclo reinicia, así que su energía es una mezcla exacta de alegría genuina y cansancio de siglo. Ropa con capas que dejan estelas al moverse (rastro visual de "movimiento repetido"). Su don: identifica patrones que se repiten en cualquier sistema, y sabe exactamente cuándo un ciclo necesita una condición de salida.',
    villain:false},
  {id:'buclesinfin',name:'El Bucle Sin Fin',alias:null,role:'Centinela · Nodo del Laberinto',color:'#F97316',emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">pest_control</span>',nodo:'Nodo del Laberinto',modId:3,
    quote:'"...y vuelvo a empezar, y vuelvo a empezar, y vuelvo a empe—"',
    bio:'Una serpiente de estática que se muerde la propia cola sin parar, tejiendo un laberinto que se repite infinitamente. No tiene condición de salida — ese es exactamente el problema que hay que resolverle.',
    villain:true},

  {id:'forja',name:'Forja',alias:'La Inventora',role:'Candidata · Nodo del Taller',color:'#10B981',emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">build</span>',nodo:'Nodo del Taller',modId:4,
    quote:'"Dame una variable y un plano. Te construyo lo que quieras — pero primero dime exactamente qué necesitas."',
    bio:'Overol lleno de piezas sueltas, lentes de soldadora sobre la frente, manos siempre manchadas de aceite. Construye autómatas de chatarra siguiendo "planos" que en realidad son pseudocódigo disfrazado de dibujos técnicos. Su don: traduce ideas vagas en instrucciones exactas — la clásica mente de programadora antes de saber que lo es.',
    villain:false},
  {id:'chatarrero',name:'El Chatarrero',alias:null,role:'Centinela · Nodo del Taller',color:'#10B981',emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">delete</span>',nodo:'Nodo del Taller',modId:4,
    quote:'"Bonito código... lástima que nunca lo optimizaste."',
    bio:'Una figura encorvada que arrastra un carro lleno de funciones rotas y variables sin usar, coleccionando código ineficiente como trofeos. Cada parche en su abrigo es un bug que nunca se corrigió.',
    villain:true},

  {id:'aria',name:'Aria',alias:'La Estratega',role:'Candidata · Nodo de la Biblioteca',color:'#6366F1',emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">psychology</span>',nodo:'Nodo de la Biblioteca',modId:5,
    quote:'"No busco LA solución. Busco la solución que menos me cueste encontrar."',
    bio:'Calma casi inquietante, siempre con una libreta de tapas duras donde traza árboles de decisiones a mano. Viste en tonos fríos, ordenada hasta el extremo. Su don: encuentra el camino más eficiente entre miles de posibles — la típica mente que sería una genia del ajedrez o de los algoritmos, según a quién le preguntes.',
    villain:false},
  {id:'entropia',name:'La Entropía',alias:null,role:'Centinela · Nodo de la Biblioteca',color:'#6366F1',emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">foggy</span>',nodo:'Nodo de la Biblioteca',modId:5,
    quote:'"¿Para qué optimizar, si al final todo se desordena igual?"',
    bio:'Una niebla cambiante que reorganiza constantemente su propia forma sin ningún propósito, maximizando el desorden por costumbre. Representa la trampa opuesta a Aria: la genialidad que se rinde ante la ineficiencia.',
    villain:true},

  {id:'arquitecto',name:'El Arquitecto',alias:'Ex-Cazatalentos N°1',role:'Líder de La Estática · Jefe Final',color:'#EC4899',emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">emoji_events</span>',nodo:'La Ciudadela',modId:6,
    quote:'"Ren cree que cada mente merece crecer libre. Yo creo que cada mente merece un molde perfecto. Solo uno de los dos tiene razón."',
    bio:'Antiguo compañero de Ren Kaster y el mejor Cazatalentos que ha tenido el Gremio — hasta que decidió que "certificar" no bastaba: quería perfeccionar. Máscara de placas geométricas entrelazadas (clases, herencia, polimorfismo hechos armadura), cada placa grabada con el nombre de un Lógico que "encapsuló" para siempre. Habla con la calma de alguien que ya ganó el argumento en su cabeza. No es malvado por gusto: está convencido de que tiene razón, lo cual lo hace mucho más peligroso.',
    villain:true},
];

// Genera las 12 fichas del elenco dentro de #dossier-grid.
function buildDossier(){
  const grid=document.getElementById('dossier-grid');
  if(!grid)return;
  grid.innerHTML='';

  CHARACTERS.forEach(c=>{
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='dossier-card'+(c.villain?' dossier-villain':'');
    btn.style.setProperty('--dc-color',c.color);

    const tags=(c.tags||[c.nodo]).filter(Boolean).map(t=>`<span class="dossier-tag">${t}</span>`).join('');
    btn.innerHTML=`
      <div class="dossier-portrait" aria-hidden="true">${c.emoji}</div>
      <div class="dossier-name">${c.name}${c.alias?` <span class="dossier-alias">· ${c.alias}</span>`:''}</div>
      <div class="dossier-role">${c.role}</div>
      <div class="dossier-desc">${c.bio}</div>
      <div>${tags}</div>
      <div class="dossier-artnote"><span class="material-icons" style="font-size: 1em; vertical-align: middle;">edit</span> Nota para arte: color base ${c.color} · ${c.villain?'diseño inestable / glitch':'diseño humano, expresivo'}</div>`;

    btn.onclick=()=>openDossierEntry(c);
    grid.appendChild(btn);
  });
}

// Muestra la tarjeta de presentación del personaje en el modal
// compartido, y prepara su botón para navegar a La Cacería SOLO
// cuando el usuario lo confirme — tocar una ficha nunca navega de
// inmediato, y nunca salta directo a una historia o Boss Fight.
function showDossierModal(c){
  const el=document.getElementById('story-modal');
  document.getElementById('story-card').style.setProperty('--sc-color',c.color);
  document.getElementById('story-card-hero').style.setProperty('--sc-color',c.color);
  document.getElementById('story-card-portrait').innerHTML=c.emoji;
  document.getElementById('story-card-nodo').innerHTML=(c.nodo||'Gremio del Nodo').toUpperCase();
  document.getElementById('story-card-name').innerHTML=c.name;
  document.getElementById('story-card-role').innerHTML=c.role;
  document.getElementById('story-card-tag').innerHTML=c.id==='ren'?'Mentor':(c.villain?'Centinela':'Candidato/a');
  document.getElementById('story-card-quote').innerHTML=c.quote||'';
  document.getElementById('story-card-txt').innerHTML=c.bio;

  const btn=document.getElementById('story-card-btn');
  btn.innerHTML=c.id==='ren'?'Empezar la cacería →':c.villain?'Ver su Nodo →':'Conocer a '+c.name+' →';
  btn.onclick=()=>{
    closeStory();
    const navBtn=document.querySelector('.nav-item[data-view="view-map"]');
    if(navBtn&&typeof navTo==='function')navTo(navBtn);
    // Además de navegar al mapa, abre la tarjeta del Nodo (módulo)
    // específico del personaje, para no dejar al usuario buscándola.
    if(c.modId&&typeof toggleMod==='function'){
      const blk=document.getElementById('blk-'+c.modId);
      if(blk){
        if(!blk.classList.contains('open'))toggleMod(c.modId);
        blk.scrollIntoView({behavior:'smooth',block:'start'});
      }
    }
  };

  el.classList.add('show');
}

// Al tocar una ficha, solo se muestra su presentación — la navegación
// ocurre exclusivamente al tocar el botón dentro del modal.
function openDossierEntry(c){
  showDossierModal(c);
}