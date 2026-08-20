import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { IconChevronRight } from '../components/Icons'

const ROWS = [
  { key: 'link', label: '데이터 연동  관리', to: '/settings/data/link' },
  { key: 'manage', label: '데이터 관리', to: '/settings/data/manage' },
]

/** 설정 - 데이터 설정 */
export default function SettingsDataScreen() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <Header title="데이터 설정" align="center" weight={700} fallback="/settings" />

      <div
        style={{
          position: 'absolute',
          top: 124,
          left: 24,
          width: 345,
          height: 120,
          borderRadius: 16,
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
          overflow: 'hidden',
        }}
      >
        {ROWS.map(({ key, label, to }, i) => (
          <div key={key} style={{ position: 'absolute', top: i * 60, left: 0, width: 345, height: 60 }}>
            <button
              className="pressable"
              onClick={() => navigate(to)}
              style={{ position: 'absolute', inset: 0, width: 345, height: 60, textAlign: 'left' }}
            >
              <span style={{ position: 'absolute', top: 20, left: 20, fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>{label}</span>
              <span style={{ position: 'absolute', top: 21, left: 307 }}>
                <IconChevronRight size={18} color="#8C7A6B" />
              </span>
            </button>
            {i === 0 && <div style={{ position: 'absolute', top: 59, left: 20, width: 305, height: 1, background: 'var(--beige-2)' }} />}
          </div>
        ))}
      </div>
    </div>
  )
}
