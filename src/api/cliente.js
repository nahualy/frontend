export async function apiFetch(endpoint, opciones = {}) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, opciones)
  const datos = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(datos?.mensaje || `Error HTTP ${response.status}`)
  }

  return datos
}