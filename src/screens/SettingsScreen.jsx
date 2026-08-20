import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import { IconBell, IconShield, IconDatabase, IconFileText, IconLock, IconInfo, IconChevronRight } from '../components/Icons'

const ROWS = [
  { key: 'notify', label: '알림 설정', Icon: IconBell, to: '/settings/notification' },
  { key: 'protect', label: '보호 모드', Icon: IconShield, to: '/settings/protection' },
  { key: 'data', label: '데이터 설정', Icon: IconDatabase, to: '/settings/data' },
  { key: 'terms', label: '이용약관', Icon: IconFileText, to: '/terms' },
  { key: 'privacy', label: '개인정보 처리방침', Icon: IconLock, to: '/settings/privacy' },
  { key: 'version', label: '앱 버전 1.0.0', Icon: IconInfo, to: null },
]

/** 설정 */
export default function SettingsScreen() {
  const navigate = useNavigate()

  return (
    <div className="screen">

      <div style={{ position: 'absolute', top: 44, left: 0, width: 393, height: 56 }}>
        <span
          style={{ position: 'absolute', top: 17, left: 0, width: 393, textAlign: 'center', fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}
        >
          설정
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 124,
          left: 24,
          width: 345,
          height: 372,
          borderRadius: 16,
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
          overflow: 'hidden',
        }}
      >
        {ROWS.map(({ key, label, Icon, to }, i) => (
          <div key={key} style={{ position: 'absolute', top: i * 62, left: 0, width: 345, height: 62 }}>
            <button
              className="pressable"
              onClick={() => to && navigate(to)}
              disabled={!to}
              style={{ position: 'absolute', inset: 0, width: 345, height: 62, textAlign: 'left', cursor: to ? 'pointer' : 'default' }}
            >
              <span style={{ position: 'absolute', top: 20, left: 20 }}>
                <Icon size={22} color="#A67C52" />
              </span>
              <span style={{ position: 'absolute', top: 21, left: 58, fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>{label}</span>
              {to && (
                <span style={{ position: 'absolute', top: 22, left: 307 }}>
                  <IconChevronRight size={18} color="#8C7A6B" />
                </span>
              )}
            </button>
            {i < ROWS.length - 1 && (
              <div style={{ position: 'absolute', top: 61, left: 20, width: 305, height: 1, background: 'var(--beige-2)' }} />
            )}
          </div>
        ))}
      </div>

      <BottomNav active="settings" />
    </div>
  )
}
