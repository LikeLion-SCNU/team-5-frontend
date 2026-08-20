import { api, saveTokens, clearTokens, getRefreshToken } from './client'

/** 이메일 가입 → { userId, message } */
export function join(email, password) {
  return api('/auth/join', { method: 'POST', body: { email, password }, auth: false })
}

/** 이메일 로그인 → 토큰 저장 */
export async function login(email, password) {
  const tokens = await api('/auth/login', { method: 'POST', body: { email, password }, auth: false })
  saveTokens(tokens)
  return tokens
}

/** 카카오 인가코드 로그인 (신규면 자동 가입) → 토큰 저장 */
export async function kakaoLogin(code) {
  const tokens = await api('/auth/kakao', { method: 'POST', body: { code }, auth: false })
  saveTokens(tokens)
  return tokens
}

/** 내 정보 → { id, email, role } */
export function me() {
  return api('/auth/me')
}

/** 로그아웃 — 리프레시 토큰 폐기 후 로컬 토큰 삭제 */
export async function logout() {
  const refreshToken = getRefreshToken()
  try {
    if (refreshToken) await api('/auth/logout', { method: 'POST', body: { refreshToken } })
  } finally {
    clearTokens()
  }
}
