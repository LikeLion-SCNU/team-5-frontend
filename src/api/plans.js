import { api } from './client'

/**
 * 진행 중/제안 플랜 조회
 * PlanResponse: { id, version, title, status(proposed|accepted|rejected|completed),
 *   availability(AVAILABLE|NOT_NEEDED|NOT_GENERATED|...), advisoryCopy,
 *   currentBalanceMinutes, deficitMinutes, expectedWeeklyMinutes,
 *   startDate, endDate, progressDays, completedMinutes, remainingMinutes,
 *   actions: [{ position, actionType, targetMinutes, ruleUnit, ruleMinutes, repetitions }] }
 */
export function getCurrentPlan() {
  return api('/plans/current')
}

/** 적자 기반 플랜 제안 생성 */
export function generatePlan() {
  return api('/plans/generate', { method: 'POST', body: {} })
}

/** 제안 수락/거절 */
export function decidePlan(planId, accepted, expectedVersion) {
  return api(`/plans/${planId}/decision`, {
    method: 'POST',
    body: { accepted, expectedVersion },
  })
}

/** 제안 다시 생성 */
export function regeneratePlan(planId, expectedVersion) {
  return api(`/plans/${planId}/regenerate`, { method: 'POST', body: { expectedVersion } })
}

/** 일일 진행 기록 */
export function recordPlanProgress(planId, progressDate, completedMinutes, expectedVersion) {
  return api(`/plans/${planId}/progress`, {
    method: 'POST',
    body: { progressDate, completedMinutes, expectedVersion },
  })
}
