import { apiFetch } from './cliente'

/**
 * Obtiene la lista de productos paginada y filtrada.
 * @param {Object} filtros - Filtros disponibles: categoria_id, nombre, pagina, limite.
 * @returns {Promise<{ productos: Array, total: number, totalPaginas: number }>}
 */
export async function obtenerProductos(filtros = {}) {
  const params = new URLSearchParams()

  if (filtros.categoria_id !== undefined && filtros.categoria_id !== null && filtros.categoria_id !== '') {
    params.append('categoria_id', filtros.categoria_id)
  }
  if (filtros.nombre) {
    params.append('nombre', filtros.nombre)
  }
  if (filtros.pagina) {
    params.append('pagina', filtros.pagina)
  }
  if (filtros.limite) {
    params.append('limite', filtros.limite)
  }

  const query = params.toString()
  const endpoint = query ? `/api/productos?${query}` : '/api/productos'

  const respuesta = await apiFetch(endpoint)

  if (respuesta?.error) {
    throw new Error(respuesta?.mensaje || 'Error al obtener los productos')
  }

  return {
    productos: respuesta?.productos || [],
    total: respuesta?.total || 0,
    totalPaginas: respuesta?.totalPaginas || 0,
  }
}
