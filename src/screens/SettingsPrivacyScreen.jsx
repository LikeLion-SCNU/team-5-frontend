import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { EFFECTIVE_DATE, PRIVACY_FULL_TEXT } from '../content/policy'

/** 설정 - 개인정보 처리방침 */
export default function SettingsPrivacyScreen() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      <Header title="개인정보 처리방침" align="center" weight={700} fallback="/settings" />

      <span
        style={{ position: 'absolute', top: 160, left: 197, width: 172, fontSize: 14, fontWeight: 700, color: 'var(--black)' }}
      >
        {EFFECTIVE_DATE}
      </span>

      <div
        className="scroll-y"
        style={{
          position: 'absolute',
          top: 187,
          left: 24,
          width: 345,
          height: 528,
          borderRadius: 16,
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
          padding: 16,
        }}
      >
        <span
          className="pre"
          style={{
            display: 'block',
            marginTop: 18,
            width: 313,
            fontSize: 14,
            fontWeight: 700,
            lineHeight: '24px',
            color: 'var(--black)',
          }}
        >
          {PRIVACY_FULL_TEXT}
        </span>
      </div>
    </div>
  )
}
