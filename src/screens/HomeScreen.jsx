import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import { IconBell, IconMoon, IconFootsteps, IconSmartphone, IconTrendUp, IconCheck } from '../components/Icons'
import { useApp } from '../state/AppContext'
import { getBalance } from '../api/ledger'
import { me } from '../api/auth'
import { isLoggedIn } from '../api/client'

/** 분 단위 잔고를 "+ 12,540 시간" 형태로 */
function fmtBalance(minutes) {
  const hours = Math.abs(minutes) / 60
  const text = hours.toLocaleString('ko-KR', { maximumFractionDigits: 1 })
  return `${minutes < 0 ? '- ' : '+ '}${text} 시간`
}

const STATS = [
  { key: 'sleep', name: '수면', value: '7.2h', Icon: IconMoon, left: 24, fill: 68, color: 'var(--brown)' },
  { key: 'steps', name: '걸음', value: '8,432', Icon: IconFootsteps, left: 142, fill: 56, color: 'var(--green)' },
  { key: 'screen', name: '스크린타임', value: '3.1h', Icon: IconSmartphone, left: 260, fill: 36, color: 'var(--red)' },
]

/** 홈화면 (로그인 후, 들어가면 먼저 나오는 화면) */
export default function HomeScreen() {
  const navigate = useNavigate()
  const { userName, homeMissions, setHomeMissions, hasData, unreadCount } = useApp()

  /* 실서비스 데이터 — 로그인돼 있으면 잔고·사용자명을 불러오고, 실패하면 예시 값 유지 */
  const [balance, setBalance] = useState(null)
  const [displayName, setDisplayName] = useState(null)
  useEffect(() => {
    if (!isLoggedIn()) return
    getBalance().then(setBalance).catch(() => {})
    me().then((u) => setDisplayName(u?.name ?? u?.email?.split('@')[0] ?? null)).catch(() => {})
  }, [])

  // 데이터가 초기화된 상태면 빈 홈화면
  if (!hasData) return <Navigate to="/home-empty" replace />

  return (
    <div className="screen">

      {/* 헤더 */}
      <div style={{ position: 'absolute', top: 44, left: 0, width: 393, height: 56 }}>
        <span style={{ position: 'absolute', top: 16, left: 109, width: 175, fontSize: 18, fontWeight: 800, color: 'var(--ink)' }}>
          {displayName ?? userName}님, 안녕하세요
        </span>
        <button
          className="pressable"
          onClick={() => navigate('/notifications')}
          aria-label={unreadCount > 0 ? `알림 ${unreadCount}건` : '알림'}
          style={{ position: 'absolute', top: 16, left: 321, width: 72, height: 24 }}
        >
          <span style={{ position: 'absolute', top: 0, left: 24 }}>
            <IconBell size={24} color="#2D241E" />
          </span>
          {unreadCount > 0 && (
            <span
              style={{ position: 'absolute', top: 2, left: 39, width: 6, height: 6, borderRadius: '50%', background: 'var(--red)' }}
            />
          )}
        </button>
      </div>

      {/* 누적 수명 잔고 */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 24,
          width: 345,
          height: 164,
          borderRadius: 20,
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <span style={{ position: 'absolute', top: 24, left: 24, width: 90, fontSize: 14, fontWeight: 600, color: 'var(--muted)' }}>
          누적 수명 잔고
        </span>
        <span style={{ position: 'absolute', top: 46, left: 24, width: 249, fontSize: 38, fontWeight: 900, color: 'var(--ink)' }}>
          {balance ? fmtBalance(balance.balanceMinutes) : '+ 12,540 시간'}
        </span>

        <div
          style={{
            position: 'absolute',
            top: 114,
            right: 24,
            height: 26,
            borderRadius: 100,
            background: 'var(--green-bg)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '0 10px',
            whiteSpace: 'nowrap',
          }}
        >
          <IconTrendUp size={14} color="#4A7C59" />
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)' }}>
            {balance
              ? (balance.previousDayDeltaMinutes === 0
                  ? '어제와 같은 잔고예요'
                  : `어제보다 ${Math.abs(balance.previousDayDeltaMinutes / 60).toLocaleString('ko-KR', { maximumFractionDigits: 1 })}시간 ${balance.previousDayDeltaMinutes > 0 ? '증가' : '감소'}`)
              : '2.1% 어제보다 2시간 증가'}
          </span>
        </div>
      </div>

      {/* 자동 수집 지표 — 이름과 값을 두 줄로 나눠 글씨가 겹치지 않게 한다 */}
      {STATS.map(({ key, name, value, Icon, left, fill, color }) => (
        <div
          key={key}
          style={{
            position: 'absolute',
            top: 284,
            left,
            width: 108,
            height: 64,
            borderRadius: 16,
            background: 'var(--white)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <span style={{ position: 'absolute', top: 10, left: 12 }}>
            <Icon size={16} color="#8C7A6B" />
          </span>
          <span
            style={{ position: 'absolute', top: 9, left: 34, width: 62, fontSize: 12, fontWeight: 500, lineHeight: '18px', color: 'var(--muted)' }}
          >
            {name}
          </span>
          <span
            style={{ position: 'absolute', top: 27, left: 12, width: 84, fontSize: 14, fontWeight: 700, lineHeight: '18px', color: 'var(--ink)' }}
          >
            {value}
          </span>
          <div style={{ position: 'absolute', top: 50, left: 12, width: 84, height: 6, borderRadius: 10, background: 'var(--cream)' }}>
            <div style={{ width: fill, height: 6, borderRadius: 10, background: color }} />
          </div>
        </div>
      ))}

      {/* 오늘의 흑자 전환 미션 */}
      <span style={{ position: 'absolute', top: 364, left: 24, width: 200, fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>
        오늘의 흑자 전환 미션
      </span>

      {[
        { key: 'sleep', top: 396, text: '7시간 수면 성공하기 (+1.5h 적립)' },
        { key: 'screen', top: 460, text: '스마트폰 사용 시간 40분 이내 감축 (+0.8h 적립)' },
      ].map(({ key, top, text }) => {
        const done = homeMissions[key]
        return (
          <button
            key={key}
            className="pressable"
            onClick={() => setHomeMissions({ ...homeMissions, [key]: !done })}
            style={{
              position: 'absolute',
              top,
              left: 24,
              width: 345,
              height: 54,
              borderRadius: 16,
              background: 'var(--white)',
              boxShadow: 'var(--shadow-card)',
              textAlign: 'left',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 16,
                left: 16,
                width: 22,
                height: 22,
                borderRadius: 6,
                background: done ? 'var(--brown)' : 'var(--cream)',
              }}
            >
              {done && (
                <span style={{ position: 'absolute', top: 4, left: 4 }}>
                  <IconCheck size={14} color="#FFFFFF" />
                </span>
              )}
            </span>
            <span
              style={{
                position: 'absolute',
                top: 19,
                left: 50,
                width: 279,
                fontSize: 13,
                fontWeight: 500,
                color: done ? 'var(--muted)' : 'var(--ink)',
              }}
            >
              {text}
            </span>
          </button>
        )
      })}

      {/* 이동 버튼 */}
      <button
        className="pressable"
        onClick={() => navigate('/receipt')}
        style={{
          position: 'absolute',
          top: 559,
          left: 24,
          width: 345,
          height: 50,
          borderRadius: 16,
          background: 'var(--brown)',
          boxShadow: 'var(--shadow-card)',
          color: 'var(--white)',
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        일별 수명 명세서 보기
      </button>
      <button
        className="pressable"
        onClick={() => navigate('/flow')}
        style={{
          position: 'absolute',
          top: 624,
          left: 24,
          width: 345,
          height: 50,
          borderRadius: 16,
          background: 'var(--brown)',
          boxShadow: 'var(--shadow-card)',
          color: 'var(--white)',
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        나의 시간 흐름 보기
      </button>

      <BottomNav active="home" />
    </div>
  )
}
