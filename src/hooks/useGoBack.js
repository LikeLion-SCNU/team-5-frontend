import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../state/AppContext'

/**
 * 좌측 상단 " < " 뒤로가기.
 * 앱이 직접 기록한 화면 이동 기록(NavTracker)에서 직전 화면으로 돌아간다.
 * 기록이 없으면(주소로 바로 진입, 새로고침 등) fallback 경로로 이동한다.
 */
export default function useGoBack(fallback = '/home') {
  const navigate = useNavigate()
  const { popNav } = useApp()

  return useCallback(() => {
    const prev = popNav()
    navigate(prev || fallback)
  }, [navigate, popNav, fallback])
}
