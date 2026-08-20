import { useNavigate } from 'react-router-dom'
import useGoBack from '../hooks/useGoBack'
import { IconChevronLeft, IconBell, IconFileText, IconPlan, IconMeal } from '../components/Icons'
import { useApp } from '../state/AppContext'

const KIND_ICON = {
  receipt: IconFileText,
  plan: IconPlan,
  meal: IconMeal,
}

/** 알림 — 홈 화면의 종 아이콘에서 진입 */
export default function NotificationsScreen() {
  const navigate = useNavigate()
  const goBack = useGoBack('/home')
  const { notifications, unreadCount, markAllRead, markRead } = useApp()

  const fresh = notifications.filter((n) => !n.read)
  const hasNew = fresh.length > 0

  const open = (n) => {
    markRead(n.id)
    navigate(n.to)
  }

  return (
    <div className="screen">
      {/* 헤더 */}
      <div style={{ position: 'absolute', top: 44, left: 0, width: 393, height: 56 }}>
        <button
          className="pressable"
          aria-label="뒤로 가기"
          onClick={goBack}
          style={{ position: 'absolute', top: 12, left: 20, width: 32, height: 32, display: 'grid', placeItems: 'center' }}
        >
          <IconChevronLeft size={24} color="#2D241E" />
        </button>
        <span
          style={{ position: 'absolute', top: 17, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: 18, fontWeight: 800, color: 'var(--ink)', pointerEvents: 'none' }}
        >
          알림
        </span>
        {hasNew && (
          <button
            className="pressable"
            onClick={markAllRead}
            style={{ position: 'absolute', top: 20, left: 289, width: 80, textAlign: 'right', fontSize: 13, fontWeight: 700, color: 'var(--brown)' }}
          >
            모두 읽음
          </button>
        )}
      </div>

      {hasNew ? (
        <>
          <span style={{ position: 'absolute', top: 116, left: 24, width: 200, fontSize: 14, fontWeight: 700, color: 'var(--muted)' }}>
            새로운 알림 {unreadCount}건
          </span>

          {fresh.map((n, i) => {
            const Icon = KIND_ICON[n.kind] || IconBell
            return (
              <button
                key={n.id}
                className="pressable"
                onClick={() => open(n)}
                style={{
                  position: 'absolute',
                  top: 146 + i * 96,
                  left: 24,
                  width: 345,
                  height: 84,
                  borderRadius: 16,
                  background: 'var(--white)',
                  boxShadow: 'var(--shadow-card)',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 22,
                    left: 16,
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    background: 'var(--beige)',
                  }}
                >
                  <span style={{ position: 'absolute', top: 10, left: 10 }}>
                    <Icon size={20} color="#A67C52" />
                  </span>
                </span>

                <span style={{ position: 'absolute', top: 16, left: 68, width: 172, fontSize: 14, fontWeight: 800, color: 'var(--ink)' }}>
                  {n.title}
                </span>
                <span
                  style={{ position: 'absolute', top: 18, left: 240, width: 79, textAlign: 'right', fontSize: 12, fontWeight: 400, color: 'var(--muted)' }}
                >
                  {n.time}
                </span>
                <span
                  style={{ position: 'absolute', top: 20, left: 325, width: 8, height: 8, borderRadius: '50%', background: 'var(--red)' }}
                />

                <span
                  style={{
                    position: 'absolute',
                    top: 40,
                    left: 68,
                    width: 261,
                    fontSize: 13,
                    fontWeight: 500,
                    lineHeight: '18px',
                    color: 'var(--muted)',
                  }}
                >
                  {n.body}
                </span>
              </button>
            )
          })}
        </>
      ) : (
        <>
          <div
            style={{
              position: 'absolute',
              top: 300,
              left: 144,
              width: 104,
              height: 104,
              borderRadius: 100,
              background: 'var(--white)',
            }}
          >
            <span style={{ position: 'absolute', top: 28, left: 28 }}>
              <IconBell size={48} color="#8C7A6B" />
            </span>
          </div>
          <span
            style={{
              position: 'absolute',
              top: 428,
              left: 24,
              width: 345,
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 800,
              color: 'var(--ink)',
            }}
          >
            새로운 알림이 없습니다.
          </span>
        </>
      )}
    </div>
  )
}
