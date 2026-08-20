import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const AppCtx = createContext(null)

const INITIAL_LEDGER = [
  { id: 1, date: '08.20', tag: '식사', title: '영양 잡힌 아침 식사', delta: '+1.2h', sign: 1 },
  { id: 2, date: '08.20', tag: '운동', title: '고강도 러닝 30분', delta: '+2.0h', sign: 1 },
  { id: 3, date: '08.20', tag: '수면', title: '새벽 2시 늦은 취침', delta: '-1.5h', sign: -1 },
  { id: 4, date: '08.20', tag: '야식', title: '야식 섭취 (맵고 짠 배달)', delta: '-0.8h', sign: -1 },
  { id: 5, date: '08.20', tag: '수면', title: '7.2시간 숙면 달성', delta: '+1.5h', sign: 1 },
]

/** 홈 화면 종 아이콘에서 볼 수 있는 알림 */
const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    kind: 'receipt',
    title: '아침 명세서가 도착했어요',
    body: '어제 순이익 +0.4시간이 정산되었습니다. 명세서를 확인해보세요.',
    time: '오늘 08:00',
    to: '/receipt',
    read: false,
  },
  {
    id: 'n2',
    kind: 'plan',
    title: '오늘의 흑자 전환 미션',
    body: '7시간 수면 미션을 완료하면 +1.5시간을 적립할 수 있어요.',
    time: '오늘 07:30',
    to: '/plan',
    read: false,
  },
  {
    id: 'n3',
    kind: 'meal',
    title: '식단 환산이 끝났어요',
    body: '점심 식탁 분석 결과가 준비되었습니다. 지금 확인해보세요.',
    time: '어제 13:12',
    to: '/meal/records',
    read: false,
  },
]

export function AppProvider({ children }) {
  const [userName] = useState('정연수')

  /* 보호 모드 (설정에서 직접 켜고 끈다) */
  const [protectionMode, setProtectionMode] = useState(false)

  /* 온보딩 / 데이터 연동 */
  const [links, setLinks] = useState({ sleep: true, steps: true, screen: false })
  const [integrations, setIntegrations] = useState({ apple: true, screenTime: true, googleFit: false })

  /* 알림 설정 */
  const [notify, setNotify] = useState({
    morning: true,
    morningTime: '08:00',
    mission: true,
    weekly: false,
  })

  /* 플랜 */
  const [planAccepted, setPlanAccepted] = useState(false)
  const [missions, setMissions] = useState({ sleep: true, steps: false, caffeine: true })
  const [homeMissions, setHomeMissions] = useState({ sleep: true, screen: false })

  /* 식사 */
  const [hasMealRecords, setHasMealRecords] = useState(true)
  const [mealItems, setMealItems] = useState([
    { id: 'rice', name: '현미밥', amount: '1공기 (210g)', confidence: '현미밥 98%', included: true },
    { id: 'pork', name: '삼겹살 구이', amount: '1인분 (150g)', confidence: '삼겹살 90%', included: true },
    { id: 'kimchi', name: '배추김치', amount: '적당량 (40g)', confidence: '김치 95%', included: true },
  ])

  /* 업로드한 사진 (식사 / 얼굴) — 업로드하면 그 사진이 화면에 그대로 보인다 */
  const [mealPhoto, setMealPhoto] = useState(null)
  const [facePhoto, setFacePhoto] = useState(null)

  /* 홈 데이터 유무 */
  const [hasData, setHasData] = useState(true)

  /* 명세서 날짜 */
  const [selectedDate, setSelectedDate] = useState('2026.08.20')

  /* 약관/개인정보 동의 */
  const [consents, setConsents] = useState({ collect: false, purpose: false, sensitive: false })

  /* 데이터 관리 체크 */
  const [dataChecks, setDataChecks] = useState({ meal: false, sleep: false, steps: false, sim: false })

  /* 화면 이동 기록 — 좌측 상단 " < " 뒤로가기가 항상 동작하도록 앱이 직접 관리한다 */
  const navStack = useRef([])
  const trackNav = useCallback((pathname, type) => {
    const st = navStack.current
    if (type === 'REPLACE') {
      // 리다이렉트(예: /plan -> /plan/edit)는 이전 항목을 대체한다
      if (st.length) st[st.length - 1] = pathname
      else st.push(pathname)
      return
    }
    if (type === 'POP') {
      if (st.length > 1 && st[st.length - 2] === pathname) st.pop()
      else if (st[st.length - 1] !== pathname) st.push(pathname)
      return
    }
    if (st[st.length - 1] !== pathname) st.push(pathname)
    if (st.length > 60) st.shift()
  }, [])
  /** 직전 화면 경로를 꺼낸다. 없으면 null */
  const popNav = useCallback(() => {
    const st = navStack.current
    st.pop()
    const prev = st.pop()
    return prev || null
  }, [])

  /* 알림함 */
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const unreadCount = notifications.filter((n) => !n.read).length
  const markAllRead = useCallback(() => setNotifications((ns) => ns.map((n) => ({ ...n, read: true }))), [])
  const markRead = useCallback((id) => setNotifications((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n))), [])
  const clearNotifications = useCallback(() => setNotifications([]), [])

  /* 미래 얼굴 시뮬레이션 */
  const [faceSimDone, setFaceSimDone] = useState(false)

  const ledger = INITIAL_LEDGER

  /** 보호 모드에서는 음수를 감추고 회복 가능 표현으로 바꾼다 (표시 계층 분기) */
  const displayDelta = useCallback(
    (value) => {
      if (!protectionMode) return value
      const m = String(value).match(/^-(.+)$/)
      return m ? `회복 가능 +${m[1]}` : value
    },
    [protectionMode],
  )

  const value = useMemo(
    () => ({
      userName,
      protectionMode,
      setProtectionMode,
      displayDelta,
      links,
      setLinks,
      integrations,
      setIntegrations,
      notify,
      setNotify,
      planAccepted,
      setPlanAccepted,
      missions,
      setMissions,
      homeMissions,
      setHomeMissions,
      hasMealRecords,
      setHasMealRecords,
      mealItems,
      setMealItems,
      mealPhoto,
      setMealPhoto,
      facePhoto,
      setFacePhoto,
      hasData,
      setHasData,
      selectedDate,
      setSelectedDate,
      consents,
      setConsents,
      dataChecks,
      setDataChecks,
      faceSimDone,
      setFaceSimDone,
      ledger,
      trackNav,
      popNav,
      notifications,
      unreadCount,
      markAllRead,
      markRead,
      clearNotifications,
    }),
    [
      userName, protectionMode, displayDelta,
      links, integrations, notify, planAccepted, missions, homeMissions, hasMealRecords, mealItems,
      hasData, selectedDate, consents, dataChecks, faceSimDone, ledger, mealPhoto, facePhoto,
      notifications, unreadCount, markAllRead, markRead, clearNotifications,
      trackNav, popNav,
    ],
  )

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
