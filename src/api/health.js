import { api } from './client'

/**
 * 하루 건강 데이터 업서트 → 지원 항목은 즉시 수명 환산되어 원장에 기입
 * @param {{record_date: string, sleep_minutes?: number, steps?: number,
 *          moderate_activity_minutes?: number, screen_minutes?: number,
 *          screen_metric?: 'sedentary_tv_equivalent'}} payload
 */
export function upsertHealthDaily(payload) {
  return api('/health/daily', { method: 'PUT', body: payload })
}
