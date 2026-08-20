import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { IconCheck } from '../components/Icons'
import { useApp } from '../state/AppContext'

const ROWS = [
  { key: 'meal', label: '식사 기록', size: '1.4MB' },
  { key: 'sleep', label: '수면 데이터', size: '3.2MB' },
  { key: 'steps', label: '걸음 데이터', size: '0.8MB' },
  { key: 'sim', label: '시뮬레이션 결과', size: '12.5MB' },
]

/** 설정 - 데이터 관리 */
export default function SettingsDataManageScreen() {
  const navigate = useNavigate()
  const { dataChecks, setDataChecks } = useApp()

  return (
    <div className="screen">
      <Header title="데이터 관리" align="center" weight={700} fallback="/settings/data" />

      <span
        style={{ position: 'absolute', top: 124, left: 24, width: 345, fontSize: 14, fontWeight: 500, lineHeight: '21px', color: 'var(--muted)' }}
      >
        영구 삭제를 원하는 요소를 체크하세요. 연동 해제 시 서버에서 해당 원본은 삭제되며 가상 수명 잔고도 갱신됩니다.
      </span>

      <div
        style={{
          position: 'absolute',
          top: 211,
          left: 24,
          width: 345,
          height: 248,
          borderRadius: 16,
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
          overflow: 'hidden',
        }}
      >
        {ROWS.map(({ key, label, size }, i) => {
          const on = dataChecks[key]
          return (
            <div key={key} style={{ position: 'absolute', top: i * 62, left: 0, width: 345, height: 62 }}>
              <button
                className="pressable"
                onClick={() => setDataChecks({ ...dataChecks, [key]: !on })}
                aria-pressed={on}
                style={{ position: 'absolute', inset: 0, width: 345, height: 62, textAlign: 'left' }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    background: 'var(--cream)',
                    border: '1px solid var(--beige-2)',
                  }}
                >
                  {on && (
                    <span style={{ position: 'absolute', top: 3, left: 3 }}>
                      <IconCheck size={14} color="#A67C52" />
                    </span>
                  )}
                </span>
                <span style={{ position: 'absolute', top: 21, left: 54, fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{label}</span>
                <span
                  style={{
                    position: 'absolute',
                    top: 22,
                    left: 265,
                    width: 60,
                    textAlign: 'right',
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--muted)',
                  }}
                >
                  {size}
                </span>
              </button>
              {i < ROWS.length - 1 && (
                <div style={{ position: 'absolute', top: 61, left: 20, width: 305, height: 1, background: 'var(--beige-2)' }} />
              )}
            </div>
          )
        })}
      </div>

      <button
        className="pressable"
        onClick={() => navigate('/settings/data/manage/delete')}
        style={{
          position: 'absolute',
          top: 723,
          left: 24,
          width: 345,
          height: 56,
          borderRadius: 16,
          background: 'var(--red)',
          color: 'var(--white)',
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        계정 및 전체 데이터 삭제
      </button>

    </div>
  )
}
