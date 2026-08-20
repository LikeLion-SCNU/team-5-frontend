/**
 * 백엔드 API 공통 클라이언트
 * - 기본 경로는 /api/v1 (배포 시 nginx가 /api를 백엔드로 프록시)
 * - JWT 액세스/리프레시 토큰을 localStorage에 보관하고,
 *   401이 나면 리프레시로 한 번 재발급 후 재시도한다
 */
const BASE = import.meta.env.VITE_API_BASE || '/api/v1'

const ACCESS_KEY = 'tb.access'
const REFRESH_KEY = 'tb.refresh'

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY)
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY)
}
export function saveTokens({ accessToken, refreshToken }) {
  if (accessToken) localStorage.setItem(ACCESS_KEY, accessToken)
  if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken)
  window.dispatchEvent(new Event('auth-changed'))
}
export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
  window.dispatchEvent(new Event('auth-changed'))
}
export function isLoggedIn() {
  return !!getAccessToken()
}

/** 서버 오류 응답({code, message})을 담는 에러 */
export class ApiError extends Error {
  constructor(status, code, message) {
    super(message || code || `HTTP ${status}`)
    this.status = status
    this.code = code
  }
}

async function parseBody(res) {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

let refreshing = null

/** 리프레시 토큰으로 액세스 토큰 재발급 (동시 401은 한 번만 갱신) */
async function refreshTokens() {
  if (!refreshing) {
    refreshing = (async () => {
      const refreshToken = getRefreshToken()
      if (!refreshToken) throw new ApiError(401, 'AUTHENTICATION_REQUIRED', '로그인이 필요합니다.')
      const res = await fetch(`${BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      })
      const body = await parseBody(res)
      if (!res.ok) {
        clearTokens()
        throw new ApiError(res.status, body?.code, body?.message)
      }
      saveTokens(body)
      return body
    })().finally(() => {
      refreshing = null
    })
  }
  return refreshing
}

/**
 * API 호출 공통 함수
 * @param {string} path  /auth/login 처럼 /api/v1 뒤 경로
 * @param {object} opts  { method, body(JSON 객체), form(FormData), auth(기본 true) }
 */
export async function api(path, { method = 'GET', body, form, auth = true, headers: extraHeaders } = {}) {
  const doFetch = async () => {
    const headers = { ...extraHeaders }
    if (auth && getAccessToken()) headers.Authorization = `Bearer ${getAccessToken()}`
    if (body !== undefined) headers['Content-Type'] = 'application/json'
    return fetch(`${BASE}${path}`, {
      method,
      headers,
      body: form ?? (body !== undefined ? JSON.stringify(body) : undefined),
    })
  }

  let res = await doFetch()
  if (res.status === 401 && auth && getRefreshToken()) {
    await refreshTokens()
    res = await doFetch()
  }
  const parsed = await parseBody(res)
  if (!res.ok) throw new ApiError(res.status, parsed?.code, parsed?.message)
  return parsed
}
