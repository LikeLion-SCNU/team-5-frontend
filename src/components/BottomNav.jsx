import { useNavigate } from 'react-router-dom'
import { IconHome, IconMeal, IconPlan, IconFuture, IconSettings } from './Icons'

const BROWN = '#A67C52'
const MUTED = '#8C7A6B'

/**
 * 하단 탭바 (393 x 72, 흰색)
 * 아이템: 홈 / 식사 / 플랜 / 미래 / 설정
 * 좌표는 와이어프레임 그대로: 56x40, left 16 / 92 / 168 / 244 / 321
 */
const ITEMS = [
  { key: 'home', label: '홈', Icon: IconHome, to: '/home', left: 16 },
  { key: 'meal', label: '식사', Icon: IconMeal, to: '/meal', left: 92 },
  { key: 'plan', label: '플랜', Icon: IconPlan, to: '/plan', left: 168 },
  { key: 'future', label: '미래', Icon: IconFuture, to: '/future', left: 244 },
  { key: 'settings', label: '설정', Icon: IconSettings, to: '/settings', left: 321 },
]

export default function BottomNav({ active = 'home', top = 780 }) {
  // top 780 + height 72 = 852 → 프레임 맨 아래에 딱 맞는다
  const navigate = useNavigate()
  return (
    <div style={{ position: 'absolute', top, left: 0, width: 393, height: 72, background: 'var(--white)' }}>
      {ITEMS.map(({ key, label, Icon, to, left }) => {
        const on = active === key
        const color = on ? BROWN : MUTED
        return (
          <button
            key={key}
            className="pressable"
            onClick={() => navigate(to)}
            style={{ position: 'absolute', top: 16, left, width: 56, height: 40 }}
            aria-label={label}
            aria-current={on ? 'page' : undefined}
          >
            <span style={{ position: 'absolute', top: 0, left: 17 }}>
              <Icon size={22} color={color} />
            </span>
            <span
              style={{
                position: 'absolute',
                top: 24,
                left: 0,
                width: 56,
                textAlign: 'center',
                fontSize: 12,
                fontWeight: on ? 800 : 500,
                color,
              }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
