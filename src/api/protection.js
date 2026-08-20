import { api } from './client'

/** 보호 모드 상태 → { protectionMode, activeProposal: { id, status, createdAt } | null } */
export function getProtectionStatus() {
  return api('/protection')
}

/** 보호 모드 켜기/끄기 (멱등 키 필수) */
export function setProtectionMode(enabled) {
  return api('/protection/mode', {
    method: 'PUT',
    body: { enabled },
    headers: { 'Idempotency-Key': `protection-${enabled}-${crypto.randomUUID()}` },
  })
}

/** 서버가 띄운 보호 모드 제안 수락/거절 */
export function acceptProtectionProposal(proposalId) {
  return api(`/protection/proposals/${proposalId}/accept`, { method: 'POST', body: {} })
}
export function rejectProtectionProposal(proposalId) {
  return api(`/protection/proposals/${proposalId}/reject`, { method: 'POST', body: {} })
}
