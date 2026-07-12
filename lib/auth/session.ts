const SESSION_COOKIE = 'sessionToken'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7

export function setSessionCookie(token: string) {
  if (typeof document === 'undefined') return
  const secure = window.location.protocol === 'https:' ? '; secure' : ''
  document.cookie = `${SESSION_COOKIE}=${token}; path=/; max-age=${SESSION_MAX_AGE}; samesite=lax${secure}`
}

export function clearSessionCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`
}

export function createSessionToken() {
  return `token_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
}
