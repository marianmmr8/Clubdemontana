/**
 * almacen.js — Componente ya desarrollado (KIT DE PARTIDA: NO lo modifiques)
 *
 * Es el componente del ejercicio F5 de la UF1842: un «diccionario» que guarda
 * pares clave → valor en el navegador (localStorage) y los recupera aunque se
 * cierre la página. Si el navegador no permite guardar, usa la memoria.
 *
 * USO
 *   const almacen = crearAlmacen('club');           // crea el almacén
 *   almacen.guardar('nombre', 'Ana');                // guarda cualquier valor
 *   almacen.guardar('lista', [1, 2, 3]);             // también arrays y objetos
 *   almacen.leer('lista', []);                       // → [1, 2, 3]
 *   almacen.leer('no-existe', []);                   // → [] (valor por defecto)
 *   almacen.borrar('lista');                         // elimina la clave
 *   almacen.claves();                                // → ['nombre']
 *
 * @param {string} prefijo Nombre que se antepone a todas las claves, para no
 *   mezclar los datos de esta página con los de otras.
 * @returns {{guardar: Function, leer: Function, borrar: Function, claves: Function}}
 */
function crearAlmacen(prefijo) {
  const memoria = new Map();
  let disco = null;
  try {
    disco = window.localStorage;
    disco.setItem('__prueba__', '1');
    disco.removeItem('__prueba__');
  } catch {
    disco = null; // localStorage no disponible: se usará la memoria
  }
  const clave = (k) => `${prefijo}:${k}`;

  return {
    /**
     * Guarda un valor (se convierte a JSON).
     * @param {string} k Clave.
     * @param {*} valor Cualquier valor: texto, número, array, objeto…
     */
    guardar(k, valor) {
      const texto = JSON.stringify(valor);
      if (disco) disco.setItem(clave(k), texto);
      else memoria.set(clave(k), texto);
    },
    /**
     * Lee un valor guardado.
     * @param {string} k Clave.
     * @param {*} [porDefecto=null] Lo que se devuelve si la clave no existe.
     * @returns {*}
     */
    leer(k, porDefecto = null) {
      const texto = disco ? disco.getItem(clave(k)) : (memoria.get(clave(k)) ?? null);
      return texto === null ? porDefecto : JSON.parse(texto);
    },
    /** @param {string} k Clave que se elimina. */
    borrar(k) {
      if (disco) disco.removeItem(clave(k));
      else memoria.delete(clave(k));
    },
    /** @returns {string[]} Claves guardadas con este prefijo. */
    claves() {
      const todas = disco ? Object.keys(disco) : [...memoria.keys()];
      return todas.filter(c => c.startsWith(prefijo + ':')).map(c => c.slice(prefijo.length + 1));
    }
  };
}
