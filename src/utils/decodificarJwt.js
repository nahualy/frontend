/**
 * Decodifica la parte del payload de un JWT sin validar la firma.
 * Utilizado exclusivamente para autocompletado en el cliente.
 * 
 * @param {string} token - Token JWT (header.payload.signature)
 * @returns {Object} Objeto parseado del payload
 */
export function decodificarJwt(token) {
  if (!token || typeof token !== 'string') {
    throw new Error('Token JWT no proporcionado o inválido')
  }

  const partes = token.split('.')
  if (partes.length < 2) {
    throw new Error('Formato de token JWT inválido')
  }

  let base64 = partes[1].replace(/-/g, '+').replace(/_/g, '/')
  const padding = base64.length % 4
  if (padding) {
    base64 += '='.repeat(4 - padding)
  }

  // Decodificación segura considerando caracteres UTF-8 (tildes, caracteres especiales)
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  )

  return JSON.parse(jsonPayload)
}
