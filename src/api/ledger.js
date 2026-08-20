import { api } from './client'

/** 홈 카드 잔고 → { balanceMinutes, previousDayDeltaMinutes, asOfDate, timezone } */
export function getBalance() {
  return api('/ledger/balance')
}

/**
 * 일별 명세서 → { from, to, days: [{ entryDate, dailyNetMinutes, lines: [...] }] }
 * @param {string} from YYYY-MM-DD
 * @param {string} to   YYYY-MM-DD
 */
export function getStatements(from, to, page = 0, size = 20) {
  const q = new URLSearchParams()
  if (from) q.set('from', from)
  if (to) q.set('to', to)
  q.set('page', page)
  q.set('size', size)
  return api(`/ledger/statements?${q}`)
}

/** 7일 일별 추세 */
export function getDailyTrend(to) {
  return api(`/ledger/trends/daily${to ? `?to=${to}` : ''}`)
}

/** 4주 주별 추세 */
export function getWeeklyTrend(to) {
  return api(`/ledger/trends/weekly${to ? `?to=${to}` : ''}`)
}

/** 원장 항목의 근거(규칙→논문) 조회 */
export function getEvidence(entryId) {
  return api(`/ledger/${entryId}/evidence`)
}
