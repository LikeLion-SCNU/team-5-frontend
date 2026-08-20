import { useNavigate } from 'react-router-dom'
import useGoBack from '../hooks/useGoBack'
import BottomNav from '../components/BottomNav'
import { IconChevronLeft, IconSun, IconMeal, IconCoffee, IconMoon } from '../components/Icons'
import { useApp } from '../state/AppContext'

const SLOT_ICON = { '아침 식사': IconSun, '점심 식사': IconMeal, 간식: IconCoffee, '저녁 식사': IconMoon }

/** 오늘의 식탁 - 기록 (데이터 있음) */
export default function MealRecordsScreen() {
  const navigate = useNavigate()
  const goBack = useGoBack('/meal')
  const { displayDelta, protectionMode, mealRecords } = useApp()

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
          style={{ position: 'absolute', top: 17, left: 60, width: 180, fontSize: 18, fontWeight: 800, color: 'var(--ink)', pointerEvents: 'none' }}
        >
          기록된 오늘의 식탁
        </span>
        <button
          className="pressable"
          aria-label="식사 기록 관리"
          onClick={() => navigate('/settings/data/manage')}
          style={{ position: 'absolute', top: 16, left: 345, width: 24, height: 24 }}
        >
          <span style={{ position: 'absolute', top: 11, left: 4, width: 15, height: 2, borderRadius: 2, background: 'var(--ink)' }} />
        </button>
      </div>

      <span style={{ position: 'absolute', top: 124, left: 24, width: 120, fontSize: 14, fontWeight: 700, color: 'var(--muted)' }}>
        오늘 등록한 식단
      </span>

      {/* 식단 카드 — 글이 길어지면 카드도 같이 늘어나고 내용은 세로 가운데 정렬 */}
      <div
        className="scroll-y"
        style={{
          position: 'absolute',
          top: 153,
          left: 24,
          width: 345,
          maxHeight: 556,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {mealRecords.length === 0 && (
          <div style={{ padding: '48px 0', textAlign: 'center', fontSize: 14, color: 'var(--muted)' }}>
            아직 확정한 식단이 없어요.
            <br />
            사진을 올려 오늘의 식탁을 기록해보세요.
          </div>
        )}
        {mealRecords.map(({ key, slot, menu, detail, delta, sign }) => {
          const Icon = SLOT_ICON[slot] ?? IconMeal
          const plus = sign > 0 || protectionMode
          return (
            <div
              key={key}
              style={{
                flex: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: 345,
                minHeight: 87,
                padding: 16,
                borderRadius: 12,
                background: 'var(--white)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <span
                style={{
                  flex: 'none',
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  background: 'var(--beige)',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Icon size={20} color="#A67C52" />
              </span>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, lineHeight: '17px', color: 'var(--muted)' }}>{slot}</div>
                <div style={{ fontSize: 14, fontWeight: 800, lineHeight: '20px', color: 'var(--ink)' }}>{menu}</div>
                <div style={{ fontSize: 12, fontWeight: 500, lineHeight: '17px', color: 'var(--muted)' }}>{detail}</div>
              </div>

              <span
                style={{
                  flex: 'none',
                  maxWidth: 92,
                  minHeight: 28,
                  borderRadius: 14,
                  background: plus ? 'var(--green-bg)' : 'var(--red-bg-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '5px 10px',
                  fontSize: 13,
                  fontWeight: 800,
                  lineHeight: '17px',
                  color: plus ? 'var(--green)' : 'var(--red)',
                }}
              >
                {displayDelta(delta)}
              </span>
            </div>
          )
        })}
      </div>

      {/* 총 환산 수명 */}
      <div style={{ position: 'absolute', top: 726, left: 0, width: 393, height: 54, background: 'var(--brown)' }}>
        <span style={{ position: 'absolute', top: 18, left: 24, fontSize: 14, fontWeight: 700, color: 'var(--white)' }}>
          오늘의 총 환산 수명
        </span>
        <span style={{ position: 'absolute', top: 16, right: 24, fontSize: 18, fontWeight: 900, color: 'var(--white)' }}>+0.2h</span>
      </div>

      <BottomNav active="meal" />
    </div>
  )
}
