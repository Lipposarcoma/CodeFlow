/* ══════════════════════════════════════════════════════════
   LA CACERÍA — DATOS DE LOS MÓDULOS
   Solo contenido (nombres, preguntas, boss): sin lógica.
   El motor que usa estos datos vive en lacaceria.js.

   Para agregar un módulo nuevo: solo se agrega una entrada más
   a este objeto (ej: "2:{...}"), con el mismo formato que el
   Módulo 1. No hace falta tocar lacaceria.js para eso.

   IMPORTANTE: este archivo debe cargarse ANTES que lacaceria.js
   en el HTML, porque el motor lo necesita disponible desde que
   arranca (construye el camino de niveles del primer módulo
   apenas carga la página).
   ══════════════════════════════════════════════════════════ */

/* — Prólogo general de la narrativa (usado por el banner de Ren Kaster). — */
const LORE_PROLOGUE=`Existe una capa oculta bajo el mundo de siempre: la Red. Ahí opera el Gremio del Nodo, una organización clandestina de Cazatalentos que recorre ciudades buscando algo muy específico — personas con un don crudo para el pensamiento lógico. Les llaman Lógicos.

Si un Lógico crece sin entrenar su don, dos cosas pueden pasar: se apaga, convertido en un Bucle Roto que repite el mismo error para siempre... o algo peor lo encuentra primero.

Esa "cosa peor" es La Estática: una corriente que corrompe mentes brillantes y las convierte en Centinelas, guardianes obedientes de un caos perfectamente ordenado.

Tú acabas de firmar como aprendiz de Cazatalentos. Tu mentor es Ren Kaster, y tu primera misión son seis Nodos, seis candidatos, seis Centinelas — y una pregunta que solo tú puedes responder al final: ¿de qué lado vas a certificarte?`;

/* — Datos de Ren Kaster, el mentor (usado por el modal de historia). — */
const REN={
  emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">person_search</span>',
  name:'Ren Kaster',
  role:'Cazatalentos Senior · Tu mentor',
  quote:'"No busco a los que ya lo saben todo. Busco a los que preguntan por qué."',
};

const MODS={
  1:{
    name:'Secuencias',
    icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">extension</span>',
    color:'#4F8EF7',
    nodo:'Nodo del Reloj',
    candidateName:'Tick',
    candidateEmoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">extension</span>',
    candidateRole:'Candidato · Nodo del Reloj',
    candidateQuote:'"Si el orden se rompe una vez, ¿cómo confías en que no se rompa siempre?"',
    story:'Ren te guía a un taller de relojería que huele a aceite y metal frío. Ahí vive Tick, un chico que cuenta cada paso que da en voz baja. "El Nodo del Reloj no perdona el desorden", dice Ren. "Certifícalo, o el Desfase lo va a hacer tartamudear ideas para siempre."',
    levels:[
      {name:'Introducción',q:[{concept:'M1 · Orden Lógico',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">extension</span>',text:'Eres un robot cocinero. ¿Cuál es el orden lógico para preparar un café?',opts:['Echar café → Agua fría → Hervir','Hervir agua → Echar café → Verter caliente','Verter agua → Hervir taza → Echar café'],ok:1,fb:'Todo proceso tiene un orden secuencial inalterable.',err:'No puedes verter agua caliente si no la has hervido.'}]},
      {name:'Acciones digitales',q:[{concept:'M1 · Paso a Paso',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">extension</span>',text:'Al enviar un correo, ¿qué paso es IMPOSIBLE hacer como primera acción?',opts:['Escribir el asunto.','Hacer clic en Enviar.','Escribir la dirección del destinatario.'],ok:1,fb:'No puedes ejecutar Enviar sin contenido ni destinatario.',err:'¿Puedes enviar una carta antes de escribirla?'}]},
      {name:'Algoritmos cotidianos',q:[{concept:'M1 · Secuencia',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">extension</span>',text:'Para encender una computadora e iniciar sesión, ¿cuál es el orden correcto?',opts:['Contraseña → Encender → Esperar pantalla','Encender → Esperar pantalla de inicio → Contraseña','Iniciar sesión → Encender → Ver escritorio'],ok:1,fb:'La secuencia respeta las dependencias de cada estado del sistema.',err:'No puedes escribir la contraseña si la pantalla no apareció.'}]},
      {name:'Error en la cadena',q:[{concept:'M1 · Detección',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">extension</span>',text:'Una receta indica:\n1) Cortar verduras  2) Servir en plato  3) Cocinar en sartén\n¿Dónde está el error?',opts:['El paso 1 debería ser cocinar primero.','Los pasos 2 y 3 están invertidos; se sirve tras cocinar.','No hay error.'],ok:1,fb:'Servir antes de cocinar es un error de secuencia.',err:'¿Tiene sentido servir algo que aún no se ha cocinado?'}]},
      {name:'Secuencia avanzada',q:[{concept:'M1 · Consolidación',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">extension</span>',text:'Un robot compra leche. Pasos:\nA) Pagar  B) Tomar producto  C) Entrar  D) Salir\n¿Orden correcto?',opts:['A → B → C → D','C → B → A → D','B → C → A → D'],ok:1,fb:'C→B→A→D: entrar, tomar, pagar, salir.',err:'¿Puedes tomar un producto sin haber entrado a la tienda?'}]},
    ],
    boss:{
      name:'El Desfase',
      time:60,
      centinela:{emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">sync</span>',quote:'"a-a-antes... des-después... ¿cuál fue primero?"'},
      questions:[
        {concept:'BOSS · Secuencias',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">dangerous</span>',text:'DESAFÍO INTEGRADOR:\nEl sistema de una fábrica ejecuta estos pasos:\n1) Empaquetar producto\n2) Fabricar pieza\n3) Inspeccionar calidad\n4) Enviar al cliente\n¿Cuántos errores de secuencia hay?',opts:['1 error (solo el empaquetado)','2 errores (empaquetar antes de fabricar + enviar sin inspección correcta)','3 errores (todo está mal)'],ok:1,fb:'El orden correcto sería: Fabricar → Inspeccionar → Empaquetar → Enviar. Hay 2 errores lógicos críticos.',err:'Analiza cada paso y su dependencia con el anterior. ¿Puede empaquetarse algo antes de fabricarse?'},
        {concept:'BOSS · Secuencias',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">dangerous</span>',text:'Un algoritmo de registro web tiene estos pasos desordenados:\nA) Mostrar "Registro exitoso"\nB) Verificar email único\nC) Guardar en base de datos\nD) Recibir formulario\n\n¿Cuál es el orden lógico correcto?',opts:['D → B → C → A','A → D → B → C','D → A → B → C'],ok:0,fb:'D→B→C→A: recibir datos, verificar unicidad, guardar, confirmar. La lógica garantiza integridad.',err:'¿Puedes guardar datos antes de validarlos? ¿Puedes confirmar antes de guardar?'},
      ],
    },
  },
  2:{
    name:'Condicionales',
    icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">balance</span>',
    color:'#A855F7',
    nodo:'Nodo del Espejo',
    candidateName:'Duala',
    candidateEmoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">balance</span>',
    candidateRole:'Candidata · Nodo del Espejo',
    candidateQuote:'"Dame una condición y te muestro sus dos caras — o las cuatro, si me dejas pensar dos segundos más."',
    story:'El Nodo del Espejo está lleno de superficies que reflejan dos versiones de todo. Duala te recibe discutiendo consigo misma sobre si vale la pena recibirte. "Es su don", murmura Ren. "Ve ambos lados de cada condición. El problema es que a veces se queda ahí, atrapada, como el Indeciso."',
    levels:[
      {name:'Si / Entonces',q:[{concept:'M2 · If/Else',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">balance</span>',text:'Si llueve → paraguas; si sol → gafas. Hoy 100% precipitaciones. ¿Qué evalúa tu lógica?',opts:['Si lluvia → Gafas.','Si lluvia → Paraguas.','Si sol → Paraguas.'],ok:1,fb:'Un condicional reacciona a la variable activa.',err:'Si el estado es lluvia, ¿cuál es la acción asociada?'}]},
      {name:'Condición AND',q:[{concept:'M2 · AND',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">balance</span>',text:'Un parque abre SI buen tiempo Y no es festivo. Hoy buen tiempo pero es festivo. ¿Abre?',opts:['Sí, hace buen tiempo.','No, falla la segunda condición (AND requiere ambas).','Sí, una condición basta.'],ok:1,fb:'Con AND, ambas condiciones deben ser verdaderas.',err:'AND exige que TODAS las condiciones sean verdaderas.'}]},
      {name:'Valor de verdad',q:[{concept:'M2 · Booleano',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">balance</span>',text:'¿Cuál expresión es VERDADERA si X = 10?',opts:['X > 20','X == 10','X < 5'],ok:1,fb:'X == 10 es verdadero porque el valor de X es exactamente 10.',err:'Sustituye X por 10 en cada expresión.'}]},
      {name:'Condicional anidado',q:[{concept:'M2 · Else If',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">balance</span>',text:'Si nota ≥ 90 → Excelente\nSi nota ≥ 70 → Aprobado\nSi no → Reprobado\nAlumno saca 75. ¿Qué recibe?',opts:['Excelente','Aprobado','Reprobado'],ok:1,fb:'75 < 90, pasa a la segunda: 75 ≥ 70 → Aprobado.',err:'El condicional evalúa de la más restrictiva hacia abajo.'}]},
      {name:'Lógica OR',q:[{concept:'M2 · Consolidación',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">balance</span>',text:'Acceso si (cuenta Y contraseña) O si es administrador.\nUsuario sin cuenta pero administrador. ¿Entra?',opts:['No, no tiene cuenta.','Sí, la condición OR lo permite.','No, la contraseña no fue verificada.'],ok:1,fb:'Con OR, basta que UNA condición sea verdadera.',err:'Revisa: (cuenta Y contraseña) OR (administrador).'}]},
    ],
    boss:{
      name:'El Indeciso',
      time:60,
      centinela:{emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">monetization_on</span>',quote:'"Verdadero... falso... verdadero... falso..."'},
      questions:[
        {concept:'BOSS · Condicionales',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">dangerous</span>',text:'SISTEMA DE ALARMA:\nSI (movimiento Y noche) O (puerta_forzada) → Activar alarma\nSI (movimiento Y día Y propietario_presente) → Solo registrar\n\nEscenario: Hay movimiento, es de noche, pero el propietario está presente. ¿Qué ocurre?',opts:['Solo registra, porque el propietario está presente.','Activa la alarma, porque (movimiento Y noche) es verdadero.','No hace nada, la condición es ambigua.'],ok:1,fb:'La primera condición (movimiento Y noche) es verdadera independientemente del propietario. La alarma se activa. Este es un bug real de sistemas de seguridad.',err:'Evalúa la primera condición por separado: ¿(movimiento Y noche) es verdadero?'},
        {concept:'BOSS · Condicionales',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">dangerous</span>',text:'Clasifica la siguiente lógica:\nSI edad ≥ 18 Y país == "CL"\n  SI tiene_licencia\n    Permitir conducir\n  SI NO\n    Denegar\nSI NO\n  Denegar siempre\n\nUsuario: 20 años, Chile, sin licencia. ¿Resultado?',opts:['Permitir conducir (es mayor de edad)','Denegar (mayor pero sin licencia)','Error de sistema (condición ambigua)'],ok:1,fb:'Cumple edad Y país (<span class="material-icons" style="font-size: 1em; vertical-align: middle;">check</span>), pero falla tiene_licencia (<span class="material-icons" style="font-size: 1em; vertical-align: middle;">close</span>). El condicional anidado deniega correctamente.',err:'Sigue el flujo paso a paso. ¿Qué condición falla primero?'},
      ],
    },
  },
  3:{
    name:'Bucles',
    icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">sync</span>',
    color:'#F97316',
    nodo:'Nodo del Laberinto',
    candidateName:'Eco',
    candidateEmoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">sync</span>',
    candidateRole:'Candidata · Nodo del Laberinto',
    candidateQuote:'"Llevo bailando esta misma rutina no sé cuántas veces. Hoy la vamos a romper, ¿o de nuevo no?"',
    story:'Llegas a una plaza donde la misma canción suena en bucle. Eco baila la misma coreografía por enésima vez, sonriendo como si fuera la primera. "Lleva atrapada aquí más tiempo del que admite", te dice Ren. "Ayúdala a encontrar la condición de salida antes de que el Bucle Sin Fin la alcance."',
    levels:[
      {name:'Primer ciclo',q:[{concept:'M3 · Iteraciones',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">sync</span>',text:'Pintando una cerca de 10 tablas. ¿Cómo le indicas a una máquina que pinte las 10 sin repetir código?',opts:['Escribir "Pintar tabla" 10 veces.','Repetir (Pintar→Avanzar) MIENTRAS tablas < 10.','Un condicional Si/Entonces.'],ok:1,fb:'Has identificado un Bucle.',err:'Escribir 10 veces funciona, pero buscamos ciclos automáticos.'}]},
      {name:'Contadores',q:[{concept:'M3 · Variable contador',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">sync</span>',text:'contador = 0\nMIENTRAS contador < 3:\n  contador = contador + 1\n\n¿Cuántas veces corre el ciclo?',opts:['2 veces','3 veces','4 veces'],ok:1,fb:'El ciclo corre para 0, 1 y 2 (tres veces).',err:'Traza paso a paso antes de llegar a 3.'}]},
      {name:'Bucle infinito',q:[{concept:'M3 · Condición de parada',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">sync</span>',text:'¿Qué problema tiene este bucle?\nMIENTRAS verdadero:\n  Mostrar "Hola"',opts:['No muestra nada.','Nunca se detiene: bucle infinito.','Se detiene a las 100 iteraciones.'],ok:1,fb:'Todo bucle necesita una condición que pueda volverse falsa.',err:'La condición verdadero jamás cambia a falso.'}]},
      {name:'For vs While',q:[{concept:'M3 · Tipos de bucle',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">sync</span>',text:'Necesitas saludar exactamente 5 usuarios de una lista. ¿Qué estructura usar?',opts:['MIENTRAS (condición) — para cantidades indefinidas.','PARA CADA usuario en lista[1..5] — cantidad conocida.','Un Si/Entonces para cada usuario.'],ok:1,fb:'El bucle FOR es ideal cuando conocemos el número de iteraciones.',err:'Cuando conoces cuántas veces repetir, ¿cuál estructura se diseñó para eso?'}]},
      {name:'Bucles anidados',q:[{concept:'M3 · Consolidación',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">sync</span>',text:'Un bucle externo corre 3 veces.\nDentro hay un bucle que corre 4 veces.\n¿Cuántas veces ejecuta el código interior?',opts:['7 veces (3 + 4)','12 veces (3 × 4)','3 veces'],ok:1,fb:'En bucles anidados las iteraciones se multiplican: 3 × 4 = 12.',err:'No se suman, se multiplican.'}]},
    ],
    boss:{
      name:'El Bucle Sin Fin',
      time:55,
      centinela:{emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">pest_control</span>',quote:'"...y vuelvo a empezar, y vuelvo a empezar, y vuelvo a empe—"'},
      questions:[
        {concept:'BOSS · Bucles',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">dangerous</span>',text:'ANÁLISIS DE CÓDIGO:\nx = 10\nMIENTRAS x > 0:\n  x = x - 3\nMostrar x\n\n¿Cuántas iteraciones ejecuta y cuál es el valor final de x?',opts:['3 iteraciones, x = 1','4 iteraciones, x = -2','3 iteraciones, x = 0'],ok:1,fb:'Iteración 1: x=7, Iteración 2: x=4, Iteración 3: x=1, Iteración 4: x=-2 → -2 ≤ 0, sale. Valor final: -2.',err:'Traza cada paso: 10→7→4→1→-2. ¿Cuándo falla la condición x > 0?'},
        {concept:'BOSS · Bucles',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">dangerous</span>',text:'Este código tiene un bug. ¿Cuál es?\ni = 1\nMIENTRAS i < 10:\n  Mostrar i\n  i = i + 2',opts:['Nunca termina porque i siempre es impar','No hay bug, imprime 1,3,5,7,9','El paso debe ser i = i + 1 para imprimir todos los números'],ok:1,fb:'El código imprime 1,3,5,7,9 y termina correctamente cuando i=11 > 10. No hay bug si el objetivo es imprimir impares.',err:'Traza: i=1(muestra),3(muestra),5,7,9,11→sale. ¿El comportamiento es incorrecto para su propósito?'},
      ],
    },
  },
  4:{
    name:'Programación',
    icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">computer</span>',
    color:'#10B981',
    nodo:'Nodo del Taller',
    candidateName:'Forja',
    candidateEmoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">build</span>',
    candidateRole:'Candidata · Nodo del Taller',
    candidateQuote:'"Dame una variable y un plano. Te construyo lo que quieras — pero primero dime exactamente qué necesitas."',
    story:'El Taller retumba con martillazos. Forja suelda un autómata mientras discute planos que parecen mitad dibujo, mitad instrucciones. "Tiene el don crudo de traducir ideas en pasos exactos", dice Ren. "Pero el Chatarrero colecciona código a medio terminar. No dejes que el de ella termine en su carro."',
    levels:[
      {name:'Variables y tipos',q:[{concept:'M4 · Variables',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">computer</span>',text:'Ejecuta mentalmente:\n1. X = 5\n2. X = X + 3\n3. Mostrar X\n\n¿Qué valor aparece?',opts:['5','3','8'],ok:2,fb:'El símbolo = asigna un nuevo valor. X pasa de 5 a 8.',err:'Las variables mutan. En paso 2, X toma su valor anterior y le suma 3.'}]},
      {name:'Funciones',q:[{concept:'M4 · Funciones',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">computer</span>',text:'FUNCIÓN calcular(a, b):\n  RETORNAR a * b + 10\n\nresultado = calcular(3, 4)\n¿Cuánto vale resultado?',opts:['22','12','34'],ok:0,fb:'calcular(3,4): 3 × 4 = 12, luego 12 + 10 = 22.',err:'La función multiplica a y b, luego suma 10.'}]},
      {name:'Parámetros',q:[{concept:'M4 · Parámetros',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">computer</span>',text:'¿Cuál es la diferencia entre parámetro y argumento?',opts:['Son exactamente lo mismo.','Parámetro: variable en la definición. Argumento: valor al llamar.','Argumento es interno, parámetro es externo.'],ok:1,fb:'Parámetro = variable en la firma. Argumento = valor concreto al invocarla.',err:'La función como receta: parámetro = ingrediente genérico, argumento = ingrediente real.'}]},
      {name:'Traza de código',q:[{concept:'M4 · Traza',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">computer</span>',text:'A = 4\nB = 2\nC = A * B + 1\nMostrar C',opts:['6','9','10'],ok:1,fb:'C = 4 × 2 + 1 = 8 + 1 = 9. Multiplicación antes que suma.',err:'Primero multiplicación (*), luego suma (+).'}]},
      {name:'Algoritmo completo',q:[{concept:'M4 · Consolidación',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">computer</span>',text:'SUMA = 0\nPARA i DESDE 1 HASTA 3:\n  SUMA = SUMA + i\nMostrar SUMA',opts:['3','6','9'],ok:1,fb:'SUMA acumula 0+1+2+3 = 6.',err:'Traza: i=1→SUMA=1, i=2→SUMA=3, i=3→SUMA=6.'}]},
    ],
    boss:{
      name:'El Chatarrero',
      time:65,
      centinela:{emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">delete</span>',quote:'"Bonito código... lástima que nunca lo optimizaste."'},
      questions:[
        {concept:'BOSS · Programación',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">dangerous</span>',text:'TRAZA COMPLEJA:\nFUNCIÓN misterio(n):\n  resultado = 1\n  PARA i DESDE 1 HASTA n:\n    resultado = resultado * i\n  RETORNAR resultado\n\nmisterio(4) = ?',opts:['10','24','16'],ok:1,fb:'Esta función calcula el factorial. 4! = 1×2×3×4 = 24. Reconocerla es clave en algoritmia.',err:'Traza: resultado=1, i=1→1, i=2→2, i=3→6, i=4→24.'},
        {concept:'BOSS · Programación',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">dangerous</span>',text:'¿Qué retorna esta función?\nFUNCIÓN clasificar(nota):\n  SI nota >= 90: RETORNAR "Sobresaliente"\n  SI nota >= 70: RETORNAR "Aprobado"\n  SI nota >= 50: RETORNAR "Suficiente"\n  RETORNAR "Reprobado"\n\nclasificar(68)',opts:['"Aprobado"','"Suficiente"','"Reprobado"'],ok:1,fb:'68 < 70 (falla primera) pero 68 ≥ 50 (cumple tercera). Retorna "Suficiente".',err:'68 no cumple la condición ≥ 70. Verifica la siguiente condición.'},
      ],
    },
  },
  5:{
    name:'Algoritmos',
    icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">psychology</span>',
    color:'#6366F1',
    nodo:'Nodo de la Biblioteca',
    candidateName:'Aria',
    candidateEmoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">psychology</span>',
    candidateRole:'Candidata · Nodo de la Biblioteca',
    candidateQuote:'"No busco LA solución. Busco la solución que menos me cueste encontrar."',
    story:'Entre estanterías infinitas, Aria traza árboles de decisión en silencio absoluto. "Puede calcular el camino más eficiente entre miles de posibilidades", susurra Ren. "El riesgo es la Entropía: la voz que le dice que da lo mismo optimizar o no."',
    levels:[
      {name:'Algoritmo voraz',q:[{concept:'M5 · Greedy',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">psychology</span>',text:'Un cajero debe entregarte $80 con la MENOR cantidad de billetes ($50, $20, $10). ¿Cuál es el algoritmo?',opts:['8 billetes de $10.','1 de $50 + 1 de $20 + 1 de $10.','4 billetes de $20.'],ok:1,fb:'Greedy: siempre toma el billete de mayor denominación.',err:'Recuerda: MENOR cantidad de billetes.'}]},
      {name:'Búsqueda lineal',q:[{concept:'M5 · Búsqueda',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">psychology</span>',text:'Tienes 10 números sin ordenar y buscas el 7. ¿Cuál es la estrategia más simple?',opts:['Dividir la lista a la mitad.','Revisar cada número uno a uno.','Ordenar la lista y buscar desde el centro.'],ok:1,fb:'Búsqueda lineal: revisa elemento a elemento.',err:'La búsqueda binaria requiere lista ordenada.'}]},
      {name:'Divide y vencerás',q:[{concept:'M5 · Descomposición',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">psychology</span>',text:'Organizas 100 libros. ¿Cuál estrategia es más eficiente?',opts:['Revisarlos uno a uno y colocarlos donde haya espacio.','Dividir por categorías → subcategorías → alfabético.','Colocarlos en el orden en que llegaron.'],ok:1,fb:'Divide y vencerás: subproblemas manejables.',err:'¿Cuál seguiría siendo eficiente con 10.000 libros?'}]},
      {name:'Optimización',q:[{concept:'M5 · Eficiencia',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">psychology</span>',text:'Ruta A: 30 min. Ruta B: 45 min pero menos combustible.\n¿Cuál decide el algoritmo "óptimo"?',opts:['Siempre la más rápida.','Depende del objetivo: tiempo vs combustible.','Siempre la que gasta menos.'],ok:1,fb:'Óptimo depende del criterio de optimización.',err:'No existe respuesta única sin conocer el objetivo.'}]},
      {name:'Vecino más cercano',q:[{concept:'M5 · Consolidación',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">psychology</span>',text:'Un robot reparte paquetes en 4 casas. ¿Cuál estrategia minimiza la distancia total?',opts:['Ir a la más lejana primero y volver.','Visitar en orden de proximidad desde la posición actual.','Ir en orden numérico.'],ok:1,fb:'Vecino más cercano: en cada paso elige el destino más próximo.',err:'El orden numérico ignora la ubicación física.'}]},
    ],
    boss:{
      name:'La Entropía',
      time:70,
      centinela:{emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">foggy</span>',quote:'"¿Para qué optimizar, si al final todo se desordena igual?"'},
      questions:[
        {concept:'BOSS · Algoritmos',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">dangerous</span>',text:'Lista: [64, 34, 25, 12, 22, 11, 90]\nUsas Bubble Sort. Después de la PRIMERA pasada completa, ¿cuál es el estado de la lista?',opts:['[11, 12, 22, 25, 34, 64, 90]','[34, 25, 12, 22, 11, 64, 90]','[34, 25, 12, 22, 11, 64, 90] con 90 al final'],ok:2,fb:'En Bubble Sort, la primera pasada burbujea el elemento más grande (90) al final. El resto queda parcialmente ordenado: [34,25,12,22,11,64,90].',err:'Bubble Sort solo garantiza que el mayor elemento llega al final en la primera pasada. El resto no está ordenado.'},
        {concept:'BOSS · Algoritmos',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">dangerous</span>',text:'Comparas dos algoritmos:\nA) O(n²) — Burbuja\nB) O(n log n) — QuickSort\n\nCon 1.000 elementos, ¿cuántas operaciones aproximadas hace cada uno?',opts:['A: 1.000.000 · B: ~10.000','A: 10.000 · B: 1.000.000','Son equivalentes para n=1000'],ok:0,fb:'O(n²): 1000² = 1.000.000 operaciones. O(n log n): 1000 × log₂(1000) ≈ 1000 × 10 = ~10.000. La diferencia es crítica en producción.',err:'Aplica la notación: n=1000. O(n²) = 1000 × 1000. O(n log n) = 1000 × log₂(1000) ≈ 10.'},
      ],
    },
  },
  6:{
    name:'POO — El Jefe Final',
    icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">emoji_events</span>',
    color:'#EC4899',
    nodo:'La Ciudadela',
    // Sin candidateName a propósito: este módulo no tiene un candidato
    // que certificar — es la confrontación final contra El Arquitecto.
    story:'Ren se detiene frente a las puertas de la Ciudadela y por primera vez no bromea. "Ahí adentro está el Arquitecto. Fue mi compañero antes de que decidiera que las personas son mejores encapsuladas en un molde perfecto que libres para crecer." Respira hondo. "Los cinco candidatos que certificaste confían en que tú pienses distinto. Vamos a demostrárselo."',
    levels:[
      {name:'Clases y objetos',q:[{concept:'M6 · POO · Clases',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">construction</span>',text:'En POO, una clase es como un molde y un objeto es la instancia concreta.\n¿Cuál es la relación correcta?',opts:['La clase "Perro" y el objeto "Firulais" (mi perro específico)','El objeto "Animal" y la clase "Fido"','La clase define la instancia y el objeto define el molde'],ok:0,fb:'"Perro" es la clase (molde). "Firulais" es un objeto concreto creado desde ese molde.',err:'La clase define la estructura. El objeto es una instancia específica.'}]},
      {name:'Encapsulamiento',q:[{concept:'M6 · POO · Encapsulamiento',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">construction</span>',text:'Una clase CuentaBancaria tiene el saldo como atributo privado.\n¿Por qué es una buena práctica ocultarlo?',opts:['Para que nadie pueda ver el saldo nunca.','Para controlar el acceso y validar operaciones (no permitir saldo negativo).','Porque los atributos siempre deben ser privados sin excepción.'],ok:1,fb:'Encapsulamiento protege el estado interno. Solo los métodos de la clase controlan cómo cambia el saldo.',err:'No es ocultar por ocultar: es proteger la integridad del dato.'}]},
      {name:'Herencia',q:[{concept:'M6 · POO · Herencia',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">construction</span>',text:'Clase Animal tiene métodos: comer(), dormir().\nClase Perro hereda de Animal y agrega: ladrar().\n¿Qué métodos tiene un objeto Perro?',opts:['Solo ladrar().','comer(), dormir() y ladrar() (hereda + extiende).','Solo comer() y dormir().'],ok:1,fb:'La herencia reutiliza código. Perro hereda comer() y dormir(), y añade ladrar().',err:'La herencia no elimina los métodos del padre, los incorpora al hijo.'}]},
      {name:'Polimorfismo',q:[{concept:'M6 · POO · Polimorfismo',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">construction</span>',text:'Animal tiene método hablar().\nPerro: "Guau". Gato: "Miau".\n\n¿Qué concepto describe este comportamiento?',opts:['Herencia múltiple','Polimorfismo: mismo método, diferentes comportamientos según el objeto.','Encapsulamiento de métodos'],ok:1,fb:'Polimorfismo: el mismo método "hablar()" se comporta diferente según la clase.',err:'¿Cómo se llama cuando un mismo método produce resultados distintos según el objeto?'}]},
      {name:'Abstracción',q:[{concept:'M6 · POO · Abstracción',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">construction</span>',text:'Diseñas una app de transporte. Tienes Taxi, Bus y Bicicleta.\n¿Qué clase abstracta tiene más sentido crear?',opts:['Clase abstracta "Vehículo" con método mover()','Clase abstracta "Ruedas" con método girar()','No se necesita abstracción, cada clase es independiente'],ok:0,fb:'Vehículo define el contrato (mover()) sin implementarlo. Cada subclase lo implementa a su manera.',err:'La abstracción captura lo esencial compartido. ¿Qué tienen en común Taxi, Bus y Bicicleta?'}]},
    ],
    boss:{
      name:'El Arquitecto',
      time:90,
      centinela:{emoji:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">emoji_events</span>',role:'Líder de La Estática · Jefe Final',quote:'"Ren cree que cada mente merece crecer libre. Yo creo que cada mente merece un molde perfecto. Solo uno de los dos tiene razón."'},
      questions:[
        {concept:'BOSS FINAL · POO',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">emoji_events</span>',text:'DESAFÍO MAESTRO:\nTienes un sistema bancario. Diseña la herencia correcta:\nCuentaAhorro y CuentaCorriente tienen comportamientos distintos para cobrar_comision(), pero ambas pueden depositar() y retirar().\n¿Cuál es la arquitectura correcta?',opts:['Clase base Cuenta con depositar()/retirar() y cobrar_comision() abstracto. CuentaAhorro y CuentaCorriente implementan su propia cobrar_comision().','Dos clases completamente independientes sin relación.','CuentaAhorro hereda de CuentaCorriente y sobreescribe todo.'],ok:0,fb:'Abstracción + Polimorfismo: Cuenta define el contrato, cada subclase implementa cobrar_comision() a su manera. Esto es Clean Architecture.',err:'¿Qué comportamientos son compartidos (depositar/retirar)? ¿Cuál varía por tipo de cuenta (comisión)?'},
        {concept:'BOSS FINAL · POO',icon:'<span class="material-icons" style="font-size: 1em; vertical-align: middle;">emoji_events</span>',text:'ESCENARIO REAL:\nTienes clase Empleado con calcularSalario().\nGerente y Vendedor calculan el salario diferente.\n\n¿Qué principio SOLID se viola si pones toda la lógica dentro de UN solo if/else en Empleado?',opts:['Principio de Responsabilidad Única (SRP): Empleado hace demasiado','Principio Abierto/Cerrado (OCP): debes modificar Empleado cada vez que agregas un tipo','Principio de Sustitución de Liskov (LSP): las subclases no son intercambiables'],ok:1,fb:'OCP: el código debe estar abierto para extensión (agregar Vendedor) pero cerrado para modificación (no tocar Empleado). La solución es polimorfismo.',err:'¿Qué pasa cuando agregas un nuevo tipo de empleado? ¿Tienes que modificar la clase base?'},
      ],
    },
  },
};