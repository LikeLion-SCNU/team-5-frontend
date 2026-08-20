import { api, ApiError, getAccessToken } from './client'
import { grantConsent } from './consents'

const BASE = import.meta.env.VITE_API_BASE || '/api/v1'

/**
 * 얼굴 사진 업로드 → 시뮬레이션 생성까지 한 번에.
 * FACE_AI 동의가 없으면(403) 동의를 등록하고 한 번 재시도한다.
 * @param {File} file 얼굴 사진 파일
 * @param {string} trendDescription 현재 추세 설명 (프롬프트 힌트)
 * @returns {Promise<{id: string, status: string}>}
 */
export async function uploadAndCreateSimulation(file, trendDescription) {
  const upload = async () => {
    const form = new FormData()
    form.append('file', file)
    return api('/media/FACE_INPUT', { method: 'POST', form })
  }

  let stored
  try {
    stored = await upload()
  } catch (e) {
    if (e instanceof ApiError && e.status === 403) {
      await grantConsent('FACE_AI')
      stored = await upload()
    } else {
      throw e
    }
  }

  const sim = await api('/face-simulations', {
    method: 'POST',
    body: {
      sourceMediaId: stored.media.id,
      idempotencyKey: crypto.randomUUID(),
      trendDescription,
      selfPhotoConfirmed: true,
      adultConfirmed: true,
      disclaimerAccepted: true,
    },
  })
  return { id: sim.id, status: sim.status }
}

/** 시뮬레이션 조회 → { id, status, outputs: [{ label, mediaId }], disclaimer } */
export function getSimulation(id) {
  return api(`/face-simulations/${id}`)
}

/** 생성이 끝날 때까지 폴링 (queued/processing이 아닐 때까지, 최대 2분) */
export async function waitForSimulation(id, { intervalMs = 3000, maxTries = 40 } = {}) {
  for (let i = 0; i < maxTries; i += 1) {
    const sim = await getSimulation(id)
    if (sim.status !== 'queued' && sim.status !== 'processing') return sim
    await new Promise((r) => setTimeout(r, intervalMs))
  }
  throw new ApiError(408, 'SIMULATION_TIMEOUT', '이미지 생성이 지연되고 있어요. 잠시 후 다시 확인해주세요.')
}

/** 인증이 필요한 결과 이미지를 blob으로 받아 화면에서 쓸 URL로 변환 */
export async function fetchMediaObjectUrl(mediaId) {
  const res = await fetch(`${BASE}/media/${mediaId}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  })
  if (!res.ok) throw new ApiError(res.status, 'MEDIA_FETCH_FAILED', '결과 이미지를 불러오지 못했어요.')
  return URL.createObjectURL(await res.blob())
}
