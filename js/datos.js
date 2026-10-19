/*
 * datos.js — Rutas del club (KIT DE PARTIDA: no hace falta modificarlo)
 *
 * Es un array de objetos. Cada objeto es una ruta con estas propiedades:
 *   nombre   texto
 *   zona     texto
 *   km       número de kilómetros
 *   desnivel metros de desnivel positivo
 *   plazas   plazas libres que quedan
 */
const RUTAS = [
  { nombre: 'Cahorros de Monachil',       zona: 'Valle de Lecrín',  km: 9 ,  desnivel: 350,  plazas: 15 },
  { nombre: 'Veleta por la Hoya de la Mora', zona: 'Sierra Nevada', km: 14 , desnivel: 1100, plazas: 12 },
  { nombre: 'Pueblos blancos de la Alpujarra', zona: 'La Alpujarra', km: 13, desnivel: 650,  plazas: 16 },
  { nombre: 'Mulhacén desde Trevélez',    zona: 'Sierra Nevada',    km: 22, desnivel: 1700, plazas: 3 },
  { nombre: 'Acequias de Pitres',         zona: 'La Alpujarra',     km: 10, desnivel: 380,  plazas: 0 },
  { nombre: 'Valle de Lecrín y sus naranjos', zona: 'Valle de Lecrín', km: 15, desnivel: 540, plazas: 25 }
];

/* Posición (índice) de la «ruta del mes» dentro del array RUTAS */
const RUTA_DEL_MES = 1;
