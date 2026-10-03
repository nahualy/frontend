import { apiFetch } from './cliente'

export async function obtenerCategorias() {
  const respuesta = await apiFetch('/api/categorias')
  if (respuesta?.error) {
    throw new Error(respuesta?.mensaje || 'Error al obtener las categorías')
  }
  return respuesta?.categorias || []
}
