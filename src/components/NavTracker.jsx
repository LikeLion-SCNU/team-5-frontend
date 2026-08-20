import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { useApp } from '../state/AppContext'

/**
 * 화면 이동을 앱이 직접 기록한다.
 * 브라우저 히스토리(history.state.idx)는 새로고침·HMR 로 초기화되기 때문에,
 * 좌측 상단 " < " 뒤로가기는 이 기록을 기준으로 동작한다.
 */
export default function NavTracker() {
  const { pathname } = useLocation()
  const type = useNavigationType() // 'PUSH' | 'REPLACE' | 'POP'
  const { trackNav } = useApp()

  useEffect(() => {
    trackNav(pathname, type)
  }, [pathname, type, trackNav])

  return null
}
