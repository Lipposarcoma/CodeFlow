/* ══════════════════════════════════════════════════════════
   GLOSARIO TÉCNICO — JS específico de esta sección
   Requiere que index.js ya esté cargado antes que este archivo.
   ══════════════════════════════════════════════════════════ */

/* — Los 20 términos del glosario. — */
const GLOSSARY_DATA=[
  {term:'Algoritmo',tag:'Concepto',tc:'#4F8EF7',def:'Secuencia finita de pasos bien definidos que resuelven un problema. Todo programa es, en esencia, un algoritmo.',ex:'// Algoritmo: sumar dos números\nLeer A, B\nSUMA = A + B\nMostrar SUMA'},
  {term:'Variable',tag:'Programación',tc:'#A855F7',def:'Espacio en memoria que almacena un valor que puede cambiar durante la ejecución del programa.',ex:'edad = 20\nnombre = "Ana"\nprecio = 9.99'},
  {term:'Condicional (If)',tag:'Control',tc:'#F97316',def:'Estructura que ejecuta un bloque de código solo si se cumple una condición determinada.',ex:'SI temperatura > 30\n  Mostrar "Hace calor"\nSI NO\n  Mostrar "Temperatura normal"'},
  {term:'Bucle (Loop)',tag:'Control',tc:'#F97316',def:'Estructura que repite un bloque de instrucciones mientras se cumpla una condición o un número fijo de veces.',ex:'PARA i DESDE 1 HASTA 5:\n  Mostrar i\n// Imprime 1, 2, 3, 4, 5'},
  {term:'Función',tag:'Programación',tc:'#6366F1',def:'Bloque de código reutilizable que realiza una tarea específica. Recibe entradas (parámetros) y puede retornar un resultado.',ex:'FUNCIÓN sumar(a, b):\n  RETORNAR a + b\nresultado = sumar(3, 4) // = 7'},
  {term:'Clase',tag:'POO',tc:'#EC4899',def:'Plantilla o molde que define atributos (datos) y métodos (comportamientos) comunes a un grupo de objetos.',ex:'CLASE Persona:\n  nombre: texto\n  edad: entero\n  MÉTODO saludar():\n    Mostrar "Hola, " + nombre'},
  {term:'Objeto',tag:'POO',tc:'#EC4899',def:'Instancia concreta de una clase. Mientras la clase es el molde, el objeto es el resultado tangible creado desde ese molde.',ex:'ana = Persona()\nana.nombre = "Ana"\nana.edad = 25\nana.saludar() // "Hola, Ana"'},
  {term:'Herencia',tag:'POO',tc:'#EC4899',def:'Mecanismo que permite que una clase hija adquiera los atributos y métodos de una clase padre, extendiendo o modificando su comportamiento.',ex:'CLASE Animal:\n  MÉTODO comer(): ...\n\nCLASE Perro HEREDA Animal:\n  MÉTODO ladrar(): ...'},
  {term:'Encapsulamiento',tag:'POO',tc:'#EC4899',def:'Principio de ocultar el estado interno de un objeto y controlar su acceso mediante métodos públicos (getters/setters).',ex:'CLASE Cuenta:\n  PRIVADO saldo = 0\n  PÚBLICO depositar(monto):\n    SI monto > 0: saldo += monto'},
  {term:'Polimorfismo',tag:'POO',tc:'#EC4899',def:'Capacidad de un método para comportarse de manera diferente según el tipo de objeto que lo implementa. Permite tratar distintos objetos de manera uniforme.',ex:'perro.hablar()  // "Guau"\ngato.hablar()   // "Miau"\nvaca.hablar()   // "Muuu"'},
  {term:'Abstracción',tag:'POO',tc:'#EC4899',def:'Proceso de identificar los elementos esenciales de un concepto ignorando los detalles irrelevantes. En POO se implementa con clases abstractas e interfaces.',ex:'// Clase abstracta\nCLASE ABSTRACTA Vehículo:\n  ABSTRACTO mover()\n  // Cada subclase implementa mover()'},
  {term:'Interfaz',tag:'POO',tc:'#EC4899',def:'Contrato que define qué métodos debe implementar una clase, sin especificar el cómo. Permite el polimorfismo sin herencia directa.',ex:'INTERFAZ Volador:\n  ABSTRACTO volar()\n\nCLASE Avión IMPLEMENTA Volador:\n  volar(): Mostrar "Despegando..."'},
  {term:'Constructor',tag:'POO',tc:'#EC4899',def:'Método especial que se ejecuta automáticamente al crear un objeto. Inicializa los atributos de la instancia con valores por defecto o proporcionados.',ex:'CLASE Persona:\n  CONSTRUCTOR(nombre, edad):\n    self.nombre = nombre\n    self.edad = edad\n\np = Persona("Ana", 25)'},
  {term:'Principio SRP',tag:'SOLID',tc:'#6366F1',def:'Single Responsibility Principle: cada clase debe tener una única razón para cambiar. Una clase = una responsabilidad.',ex:'// <span class="material-icons" style="font-size: 1em; vertical-align: middle;">close</span> Mal: EmailServicio hace todo\n// <span class="material-icons" style="font-size: 1em; vertical-align: middle;">check</span> Bien:\n// EmailServicio → solo envía\n// EmailValidador → solo valida\n// EmailFormato → solo formatea'},
  {term:'Principio OCP',tag:'SOLID',tc:'#6366F1',def:'Open/Closed Principle: el código debe estar abierto para extensión (agregar comportamientos) pero cerrado para modificación (no tocar lo que funciona).',ex:'// En vez de if/else por tipo de empleado,\n// crear subclases Gerente, Vendedor...\n// cada una implementa calcularSalario()'},
  {term:'Boolean',tag:'Tipo de dato',tc:'#10B981',def:'Tipo de dato con solo dos valores: verdadero (true) o falso (false). Es la base de la lógica computacional.',ex:'esMayor = (edad >= 18)\n// esMayor es true o false'},
  {term:'Pseudocódigo',tag:'Concepto',tc:'#4F8EF7',def:'Representación informal de un algoritmo usando lenguaje natural mezclado con estructuras de programación. No es código ejecutable.',ex:'INICIO\n  Leer numero\n  SI numero > 0\n    Mostrar "Positivo"\nFIN'},
  {term:'Array',tag:'Estructura',tc:'#10B981',def:'Colección ordenada de elementos del mismo tipo. Se accede por índice numérico (generalmente desde 0).',ex:'frutas = ["manzana","pera","uva"]\nMostrar frutas[0] // "manzana"'},
  {term:'Recursión',tag:'Avanzado',tc:'#EF4444',def:'Técnica donde una función se llama a sí misma para resolver subproblemas más pequeños. Requiere un caso base para detenerse.',ex:'FUNCIÓN factorial(n):\n  SI n == 0: RETORNAR 1\n  RETORNAR n * factorial(n-1)'},
  {term:'Depuración (Debug)',tag:'Proceso',tc:'#6366F1',def:'Proceso de identificar y corregir errores (bugs) en el código. Es una habilidad fundamental del programador.',ex:'// Error común: = en vez de ==\nSI (x = 5)   // Asignación <span class="material-icons" style="font-size: 1em; vertical-align: middle;">close</span>\nSI (x == 5)  // Comparación <span class="material-icons" style="font-size: 1em; vertical-align: middle;">check</span>'},
];

// Genera las tarjetas del glosario dentro de #glossary-grid.
function buildGlossary(){
  const grid=document.getElementById('glossary-grid');
  if(!grid)return;
  grid.innerHTML=GLOSSARY_DATA.map(g=>`
    <div class="glossary-card" data-search="${g.term.toLowerCase()} ${g.def.toLowerCase()} ${g.tag.toLowerCase()}">
      <div class="glossary-term">${g.term}<span class="glossary-term-tag" style="background:${g.tc}16;color:${g.tc};border:1px solid ${g.tc}28">${g.tag}</span></div>
      <div class="glossary-def">${g.def}</div>
      ${g.ex?`<div class="glossary-example">${g.ex}</div>`:''}
    </div>`).join('');
}

// Filtra las tarjetas visibles según lo que se escriba en el buscador.
function filterGlossary(q){
  const t=q.toLowerCase().trim();
  document.querySelectorAll('.glossary-card').forEach(c=>{
    c.style.display=(!t||c.dataset.search.includes(t))?'':'none';
  });
}