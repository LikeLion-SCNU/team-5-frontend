import { api, ApiError } from './client'
import { grantConsent } from './consents'

/**
 * 식사 사진 업로드 → 식사 기록 생성까지 한 번에.
 * MEAL_AI 동의가 없으면(403) 동의를 등록하고 한 번 재시도한다.
 * @param {File} file 이미지 파일
 * @param {string} recordDate YYYY-MM-DD
 * @returns {Promise<{mealId: string}>}
 */
export async function uploadAndCreateMeal(file, recordDate) {
  const upload = async () => {
    const form = new FormData()
    form.append('file', file)
    return api('/media/MEAL_INPUT', { method: 'POST', form })
  }

  let stored
  try {
    stored = await upload()
  } catch (e) {
    if (e instanceof ApiError && e.status === 403) {
      await grantConsent('MEAL_AI')
      stored = await upload()
    } else {
      throw e
    }
  }

  const meal = await api('/meals', {
    method: 'POST',
    body: { media_blob_id: stored.media.id, record_date: recordDate },
  })
  return { mealId: meal.id, status: meal.status }
}

/** 분석 결과 조회 → { id, status, items: [{ id, food_name, portion, ... }] } */
export function getMeal(mealId) {
  return api(`/meals/${mealId}`)
}

/**
 * 분석이 끝날 때까지 폴링 (status가 analyzing이 아닐 때까지)
 * @returns 최종 MealView
 */
export async function waitForAnalysis(mealId, { intervalMs = 1500, maxTries = 20 } = {}) {
  for (let i = 0; i < maxTries; i += 1) {
    const meal = await getMeal(mealId)
    if (meal.status !== 'analyzing') return meal
    await new Promise((r) => setTimeout(r, intervalMs))
  }
  throw new ApiError(408, 'ANALYSIS_TIMEOUT', '분석이 지연되고 있어요. 잠시 후 다시 확인해주세요.')
}

/**
 * 확정 — 제외한 항목·직접 추가한 항목과 함께 원장에 기입
 * @param {string[]} excludeItemIds 제외할 항목 id 목록
 * @param {{food_name: string, portion?: string}[]} userItems 직접 추가한 항목
 */
export function confirmMeal(mealId, excludeItemIds = [], userItems = []) {
  return api(`/meals/${mealId}/confirm`, {
    method: 'POST',
    body: { exclude_item_ids: excludeItemIds, user_items: userItems },
  })
}

/** 전체 제외 — 기록만 남기고 원장 미기입 */
export function excludeMeal(mealId) {
  return api(`/meals/${mealId}/exclude`, { method: 'POST', body: {} })
}
