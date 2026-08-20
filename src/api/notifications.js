import { api, ApiError } from './client'
import { grantConsent } from './consents'

/** 서버가 'HH:mm:ss'로 돌려줘도 요청은 'HH:mm'만 받으므로 잘라서 쓴다 */
export function toHHmm(time) {
  return String(time ?? '').slice(0, 5)
}

/** 아침 명세서 알림 설정 조회 → { enabled, timezone, morningTime("HH:mm") } */
export function getNotificationPreference() {
  return api('/notifications/preference')
}

/** 아침 명세서 알림 설정 변경 — NOTIFICATION 동의가 없으면(403) 등록 후 재시도 */
export async function updateNotificationPreference(enabled, morningTime) {
  const put = () =>
    api('/notifications/preference', {
      method: 'PUT',
      body: { enabled, timezone: 'Asia/Seoul', morningTime: toHHmm(morningTime) },
    })
  try {
    return await put()
  } catch (e) {
    if (e instanceof ApiError && e.status === 403) {
      await grantConsent('NOTIFICATION')
      return put()
    }
    throw e
  }
}

/** VAPID 공개키 */
export function getVapidPublicKey() {
  return api('/notifications/vapid-public-key')
}

function urlBase64ToUint8Array(base64) {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const raw = atob((base64 + padding).replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)))
}

/**
 * 웹 푸시 구독 — 서비스워커·알림 권한이 있을 때만 시도한다.
 * 실패해도 조용히 넘어간다 (알림 설정 자체는 preference로 동작).
 */
export async function subscribePush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return null
  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return null

  const registration = await navigator.serviceWorker.ready
  const { publicKey } = await getVapidPublicKey()
  const sub = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  })
  const json = sub.toJSON()
  return api('/notifications/subscriptions', {
    method: 'POST',
    body: { endpoint: json.endpoint, keys: { p256dh: json.keys.p256dh, auth: json.keys.auth } },
  })
}
