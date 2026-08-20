import { api } from './client'

/** 동의 문안 (해시 대상) — 실제 약관 문구와 함께 버전 관리한다 */
const CONSENT_TEXT = {
  MEAL_AI: '시간은행 식사 사진 AI 분석을 위한 이미지 처리에 동의합니다. (v1)',
  FACE_AI: '시간은행 미래 얼굴 시뮬레이션을 위한 얼굴 이미지 처리에 동의합니다. (v1)',
  HEALTH_COLLECTION: '시간은행 건강 데이터(수면·걸음·스크린타임) 수집에 동의합니다. (v1)',
}
const CONSENT_VERSION = 1

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/** 내 동의 현황 목록 */
export function listConsents() {
  return api('/consents')
}

/**
 * 목적별 동의 등록 (이미 동의돼 있으면 그대로 반환)
 * @param {'MEAL_AI'|'FACE_AI'|'HEALTH_COLLECTION'} purpose
 */
export async function grantConsent(purpose) {
  const list = await listConsents()
  const current = list?.consents?.find?.((c) => c.purpose === purpose) ?? null
  if (current?.granted) return current

  return api(`/consents/${purpose}`, {
    method: 'PUT',
    body: {
      granted: true,
      consentVersion: CONSENT_VERSION,
      textHash: await sha256Hex(CONSENT_TEXT[purpose] ?? purpose),
      expectedVersion: current?.resourceVersion ?? 0,
      idempotencyKey: `${purpose}-v${CONSENT_VERSION}-${crypto.randomUUID()}`,
    },
  })
}
