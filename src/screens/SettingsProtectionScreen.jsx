import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Toggle from '../components/Toggle'
import { useApp } from '../state/AppContext'

/** 설정 - 보호 모드 */
export default function SettingsProtectionScreen() {
  const navigate = useNavigate()
  const { protectionMode, setProtectionMode } = useApp()

  return (
    <div className="screen">
      <Header title=" 보호 모드" align="center" weight={700} fallback="/settings" />

      {/* 활성화 */}
      <div
        style={{
          position: 'absolute',
          top: 124,
          left: 24,
          width: 345,
          height: 118,
          borderRadius: 20,
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <span
          style={{ position: 'absolute', top: 24, left: 0, width: 345, textAlign: 'center', fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}
        >
          보호 모드 활성화
        </span>
        <div style={{ position: 'absolute', top: 63, left: 147 }}>
          <Toggle on={protectionMode} onChange={setProtectionMode} />
        </div>
      </div>

      {/* 시각적 변화 */}
      <span
        style={{ position: 'absolute', top: 270, left: 0, width: 393, textAlign: 'center', fontSize: 14, fontWeight: 700, color: 'var(--muted)' }}
      >
        모드 적용 시각적 변화
      </span>

      <div style={{ position: 'absolute', top: 300, left: 24, width: 164, height: 150, borderRadius: 16, background: 'var(--white)' }}>
        <span
          style={{ position: 'absolute', top: 43, left: 0, width: 164, textAlign: 'center', fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}
        >
          일반 모드
        </span>
        <span
          style={{
            position: 'absolute',
            top: 70,
            left: 15,
            width: 133,
            height: 36,
            borderRadius: 8,
            background: 'var(--red-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 800,
            color: 'var(--red)',
          }}
        >
          -2h 수명 차감
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 300,
          left: 204,
          width: 165,
          height: 150,
          borderRadius: 16,
          background: 'var(--white)',
          boxShadow: 'var(--shadow-green)',
        }}
      >
        <span
          style={{ position: 'absolute', top: 43, left: 0, width: 165, textAlign: 'center', fontSize: 12, fontWeight: 700, color: 'var(--green)' }}
        >
          보호 모드
        </span>
        <span
          style={{
            position: 'absolute',
            top: 70,
            left: 16,
            width: 133,
            height: 36,
            borderRadius: 8,
            background: 'var(--green-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 800,
            color: 'var(--green)',
          }}
        >
          회복 가능 +2h
        </span>
      </div>

      {/* 설명 */}
      <div
        style={{
          position: 'absolute',
          top: 478,
          left: 24,
          width: 345,
          height: 131,
          borderRadius: 16,
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <span style={{ position: 'absolute', top: 20, left: 20, width: 305, fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
          지나친 죄책감 대신, 회복 원동력으로
        </span>
        <span
          style={{ position: 'absolute', top: 51, left: 20, width: 305, fontSize: 13, fontWeight: 500, lineHeight: '20px', color: 'var(--muted)' }}
        >
          차감되는 마이너스 점수를 시각적으로 상쇄하고 리프레시할 수 있는 가능성으로 전환하여 프레젠테이션합니다. 멘탈 케어가 우선인
          날 권장합니다.
        </span>
      </div>
    </div>
  )
}
