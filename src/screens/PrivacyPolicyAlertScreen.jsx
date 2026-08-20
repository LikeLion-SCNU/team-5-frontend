import { useNavigate } from 'react-router-dom'
import PrivacyPolicyBase from './PrivacyPolicyBase'
import { IconAlertCircle } from '../components/Icons'

/** 개인정보 처리방침 알림창 — "모두 동의해주세요." */
export default function PrivacyPolicyAlertScreen() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <PrivacyPolicyBase onConfirm={() => {}} />

      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />

      <div
        style={{
          position: 'absolute',
          top: 314,
          left: 34,
          width: 325,
          height: 225,
          borderRadius: 16,
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 32,
            left: 136,
            width: 52,
            height: 52,
            borderRadius: 100,
            background: 'var(--red-bg)',
          }}
        >
          <span style={{ position: 'absolute', top: 12, left: 12 }}>
            <IconAlertCircle size={28} color="#C84B31" />
          </span>
        </div>

        <span
          style={{
            position: 'absolute',
            top: 108,
            left: 24,
            width: 277,
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--ink-2)',
          }}
        >
          모두 동의해주세요.
        </span>

        <button
          className="pressable"
          onClick={() => navigate('/privacy')}
          style={{
            position: 'absolute',
            top: 151,
            left: 24,
            width: 277,
            height: 50,
            borderRadius: 12,
            background: 'var(--muted-3)',
            color: 'var(--black)',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          확인
        </button>
      </div>
    </div>
  )
}
