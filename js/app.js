/*
 * app.js — Rutas del Club de Montaña
 * Supuesto práctico · UF1842 · IFCD0210
 *
 * Alumno/a: María de los Ángeles Martín Rojas  Fecha: 14/10/2026
 *
 * Este archivo es TU trabajo. Ya tiene:
 *   - el esqueleto de todas las funciones, con su comentario de documentación;
 *   - una función de ejemplo completa (rellenarSelectorRutas) para que veas el estilo;
 *   - la sección final de «Arranque», que llama a las funciones al cargar la página.
 *
 * Completa cada función donde pone «TODO». Ve guardando y recargando la página
 * con la consola abierta (F12): no debe aparecer ningún error en rojo.
 */

/* ===================================================================
   0. REFERENCIAS A LA PÁGINA (ya hechas)
   =================================================================== */
const lista = document.querySelector('#lista-rutas');
const contador = document.querySelector('#contador');
const filtro = document.querySelector('#filtro-dificultad');
const formulario = document.querySelector('#form-inscripcion');
const mensaje = document.querySelector('#mensaje');
const listaInscripciones = document.querySelector('#mis-inscripciones');
const almacen = crearAlmacen('club-basico');      // componente ya desarrollado (almacen.js)
const audioBienvenida =document.querySelector(`#audioBienvenida`);
const botonAudio = document.querySelector('#boton-audio');
const rejilla = document.querySelector("#rejilla");
/* ===================================================================
   1. CÁLCULOS (requisito 2)
   =================================================================== */

/**
 * Devuelve la dificultad de una ruta según su desnivel.
 * Menos de 500 m → "baja"; de 500 a 1199 m → "media"; 1200 m o más → "alta".
 * @param {number} desnivel Metros de desnivel positivo.
 * @returns {string} "baja", "media" o "alta".
 */
function calcularDificultad(desnivel) {
if (desnivel < 500){return "baja"}
else if (desnivel < 1200){return "media"}
else {return "alta"}
  
}

/**
 * Calcula las horas aproximadas de una ruta: km / kmPorHora + desnivel / 400.
 * @param {number} km Kilómetros de la ruta.
 * @param {number} desnivel Metros de desnivel.
 * @param {number} [kmPorHora=4] Velocidad media en llano.
 * @returns {number} Horas, redondeadas a un decimal.
 */
function calcularDuracion(km, desnivel, kmPorHora = 4) {
  let horas = (km / kmPorHora) + (desnivel /400)
  horas = Math.round(horas + 10) / 10
  console.log(horas)
  return horas
}


/* ===================================================================
   2. MOSTRAR LAS RUTAS (requisito 3)
   =================================================================== */

/**
 * Crea la tarjeta (<li>) de una ruta. NO uses innerHTML: crea cada elemento
 * con document.createElement y escribe los textos con textContent.
 * @param {Object} ruta Un objeto del array RUTAS.
 * @returns {HTMLLIElement} La tarjeta, todavía sin añadir a la página.
 */
function crearTarjeta(ruta) {
  const nombre = document.createElement("h3")
  nombre.textContent = ruta.nombre
  const zona = document.createElement("p")
  zona.textContent = ruta.zona + " Zona"
  const km =document.createElement("p")
  km.textContent = ruta.km + " km"
const desnivel = document.createElement("p")
  desnivel.textContent = ruta.desnivel +" Desnivel"
  const plazas = document.createElement("p")
  plazas.textContent = ruta.plazas + " Plazas"
 
const nivel = document.createElement("p")
nivel.textContent = calcularDificultad(ruta.desnivel)
const horas = document.createElement("p")
  horas.textContent = "Duración aproximada : " + calcularDuracion(ruta.km, ruta.desnivel) + "h"

  const contenedor = document.createElement("div")
  contenedor.classList.add("tarjeta")

  contenedor.appendChild(nombre)
  contenedor.appendChild(zona)
  contenedor.appendChild(km)
  contenedor.appendChild(desnivel)
  contenedor.appendChild(plazas)
  contenedor.appendChild(horas)
   contenedor.appendChild(nivel)


  return contenedor
}

/**
 * Vacía la lista de la página y pinta una tarjeta por cada ruta recibida.
 * Actualiza también el contador («6 rutas»).
 * @param {Object[]} rutas Array de rutas que hay que mostrar.
 */
function pintarRutas(rutas) {
  rejilla.textContent = ""
  rutas.forEach(ruta =>{
rejilla.appendChild(crearTarjeta(ruta))

  })
}


/* ===================================================================
   3. FILTRO POR DIFICULTAD (requisito 4)
   =================================================================== */

/**
 * Devuelve solo las rutas de la dificultad indicada (o todas).
 * @param {Object[]} rutas
 * @param {string} nivel "baja", "media", "alta" o "todas".
 * @returns {Object[]} Un array nuevo; RUTAS no se modifica.
 */
function filtrarPorDificultad(rutas, nivel) {
  if(nivel === "todas"){
    return rutas
  }
  //Filter devuelve todos los elementos de la arraty que cumplan con la condicion en este caso la condicion es que el desnivel de la ruta nos devuelve la dificulats
  return rutas.filter(ruta => calcularDificultad(ruta.desnivel) === nivel)
}


/* ===================================================================
   4. INSCRIPCIÓN (requisito 5)
   =================================================================== */

/**
 * EJEMPLO YA RESUELTO: rellena el <select id="ruta"> con una opción por ruta.
 * El valor de cada opción es la posición de la ruta en el array RUTAS.
 */
function rellenarSelectorRutas() {
  const selector = document.querySelector('#ruta');
  for (let i = 0; i < RUTAS.length; i++) {
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.textContent = RUTAS[i].nombre;
    selector.append(opcion);
  }
}

/**
 * Comprueba los datos de una inscripción.
 * @param {string} nombre
 * @param {number} plazas Plazas que se piden.
 * @param {Object} ruta La ruta elegida.
 * @returns {string[]} Lista de mensajes de error. Vacía si todo es correcto.
 */
function validarInscripcion(nombre, plazas, ruta) {
  const errores = [];
  // TODO
  return errores;
}

/**
 * Se ejecuta al enviar el formulario: lee los campos, valida y, si todo es
 * correcto, guarda la inscripción con el almacén y la muestra.
 * @param {SubmitEvent} evento
 */
function inscribir(evento) {
  evento.preventDefault();          // evita que la página se recargue
  let nombre = document.getElementById("nombre").value
  let email = document.getElementById("email").value
  let ruta = document.getElementById("ruta").value
  let plazas = document.getElementById("plazas").value
  validacion = validarInscripcion(nombre,plazas,ruta)
  // si tenemos errores los mostraremos y salimo de la funcion
  if(validacion.length > 0) {
    mensaje.textContent = ""
    validacion.forEach(men => {
      mensaje.innerHTML += men +"</br>"
    })
    mensaje.className = "mensaje mensaje-error"
    return
  }
//no hay errores , guardamos los datos en la isncripcion
const inscripciones = almacen.leer("inscripciones", [])
inscripciones.push({
  nombre: nombre.trim(),
  ruta: RUTAS[ruta].nombre,
  plazas: plazas
})
almacen.guardar("inscripciones" , inscripciones)
//mostrar un mensaje de exito
mensaje.textContent = `Inscripción guardada: ${plazas} plazas en ${RUTAS [ruta].nombre}`
mensaje.className ="mensaje mensaje -ok"
pintarInscripciones()


}

/** Pinta la lista «Mis inscripciones» con lo que hay guardado en el almacén. */
function pintarInscripciones() {
  
  listaInscripciones.textContent=""
  const inscripciones = almacen.leer("inscripciones",[])
  inscripciones.forEach(ins => {
    const li = document.createElement("li")
    li.textContent = ` ${ins.nombre} - ${ins.ruta} - ${ins.plazas} plazas `
    listaInscripciones.append(li)
  })

  // mostrar un mensaje si no hay inscripciones
  if(inscripciones.length === 0){
    const li = document.createElement("li")
    li.textContent = "Todavía no tienes inscripciones"
    listaInscripciones.append(li)
  }
}


/* ===================================================================
   5. MULTIMEDIA Y EFECTOS (requisitos 6 y 7)
   =================================================================== */

/** Reproduce o pausa el audio de bienvenida y cambia el texto del botón. */
function alternarAudio() {
  if(audioBienvenida.paused){
audioBienvenida.play()
botonAudio.textContent = "Parar audio"}else{
  audioBienvenida.pause()
  botonAudio.textContent ="Escuchar la bienvenida"
}
}
audioBienvenida.addEventListener(`ended`, () =>{
  botonAudio.textContent ="Escuchar la bienvenida"
  ;
})

/** Resalta durante 3 segundos la tarjeta de la ruta del mes (RUTA_DEL_MES). */
function destacarRutaDelMes() {
  const tarjeta = rejilla.children[RUTA_DEL_MES]
  tarjeta.classList.add("destacada")
  setTimeout(()=> {
    tarjeta.classList.remove("destacada")
  }, 3000)
}


/* ===================================================================
   6. ARRANQUE (ya hecho: se ejecuta al cargar la página)
   =================================================================== */
rellenarSelectorRutas();
pintarRutas(RUTAS);
pintarInscripciones();

filtro.addEventListener('change', () => pintarRutas(filtrarPorDificultad(RUTAS, filtro.value)));
formulario.addEventListener('submit', inscribir);
document.querySelector('#boton-audio').addEventListener('click', alternarAudio);
document.querySelector('#boton-destacar').addEventListener('click', destacarRutaDelMes);
document.querySelector('#boton-borrar').addEventListener('click', () => {
  almacen.borrar('inscripciones');
  pintarInscripciones();
});
