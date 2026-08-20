import { api } from './client'

/** 데이터 관리 요약 → { categories: [{key,label,items,bytes}], balanceMinutes, ledgerEntries } */
export function getDataSummary() {
  return api('/account/data')
}

/** 선택 항목 삭제 → { deletedScopes, deletedRows, message } */
export function deleteDataScopes(scopes) {
  return api('/account/data/delete', { method: 'POST', body: { scopes } })
}

/** 계정 및 전체 데이터 삭제 (탈퇴) */
export function deleteAccount() {
  return api('/account', { method: 'DELETE' })
}
