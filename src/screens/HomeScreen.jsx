import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import { IconBell, IconTrendUp, IconTrendDown, IconCheck } from '../components/Icons'
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

/** 홈화면 (로그인 후, 들어가면 먼저 나오는 화면) */
export default function HomeScreen() {
  const navigate = useNavigate()
  const { userName, homeMissions, setHomeMissions, hasData, unreadCount } = useApp()

  /* 실서비스 데이터 — 로그인돼 있으면 잔고·사용자명을 불러온다 */
  const [balance, setBalance] = useState(null)
  const [displayName, setDisplayName] = useState(null)
  useEffect(() => {
    if (!isLoggedIn()) return
    getBalance()
      .then((b) => {
        setBalance(b)
        // 서버가 보호 모드를 제안하면 제안 화면으로 이동한다
        if (b?.protectionSuggested) {
          navigate('/protection-suggest', { state: { proposalId: b.protectionProposalId ?? null } })
        }
      })
      .catch(() => {})
    me().then((u) => setDisplayName(u?.name ?? u?.email?.split('@')[0] ?? null)).catch(() => {})
  }, [])

  // 데이터가 초기화된 상태면 빈 홈화면
  if (!hasData) return <Navigate to="/home-empty" replace />

  return (
    <div className="screen">

      {/* 헤더 */}
      <div style={{ position: 'absolute', top: 44, left: 0, width: 393, height: 56 }}>
        <span style={{ position: 'absolute', top: 16, left: 24, width: 280, fontSize: 18, fontWeight: 800, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
        <span
          style={{
            position: 'absolute',
            top: 46,
            left: 24,
            width: 297,
            fontSize: balance?.protectionMode && balance?.displayText ? 24 : 38,
            fontWeight: 900,
            lineHeight: '46px',
            color: 'var(--ink)',
          }}
        >
          {balance
            ? (balance.protectionMode && balance.displayText ? balance.displayText : fmtBalance(balance.balanceMinutes))
            : '— 시간'}
        </span>

        {balance && !balance.protectionMode && Number.isFinite(balance.previousDayDeltaMinutes) && (
          <div
            style={{
              position: 'absolute',
              top: 114,
              right: 24,
              height: 26,
              borderRadius: 100,
              background: balance.previousDayDeltaMinutes < 0 ? 'var(--red-bg-3)' : 'var(--green-bg)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '0 10px',
              whiteSpace: 'nowrap',
            }}
          >
            {balance.previousDayDeltaMinutes < 0
              ? <IconTrendDown size={14} color="#C84B31" />
              : <IconTrendUp size={14} color="#4A7C59" />}
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: balance.previousDayDeltaMinutes < 0 ? 'var(--red)' : 'var(--green)',
              }}
            >
              {balance.previousDayDeltaMinutes === 0
                ? '어제와 동일'
                : balance.previousDayDeltaMinutes > 0
                  ? `+${Math.round(balance.previousDayDeltaMinutes).toLocaleString('ko-KR')}분 어제보다 증가`
                  : `-${Math.abs(Math.round(balance.previousDayDeltaMinutes)).toLocaleString('ko-KR')}분 어제보다 감소`}
            </span>
          </div>
        )}
      </div>

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
