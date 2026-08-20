import Header from '../components/Header'
import { EFFECTIVE_DATE, TERMS_SECTIONS } from '../content/policy'

const textStyle = {
  position: 'absolute',
  left: 24,
  fontSize: 14,
  fontWeight: 700,
  lineHeight: '23px',
  color: 'var(--black)',
}

/** 이용약관 */
export default function TermsScreen() {
  return (
    <div className="screen">
      <Header title="이용약관" align="center" weight={700} fallback="/settings" />

      <div
        className="scroll-y"
        style={{
          position: 'absolute',
          top: 143,
          left: 24,
          width: 345,
          height: 569,
          borderRadius: 20,
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div style={{ position: 'relative', width: 345, height: 569 }}>
          <span style={{ ...textStyle, top: 24, width: 297 }}>{EFFECTIVE_DATE}</span>
          <span className="pre" style={{ ...textStyle, top: 63, width: 297 }}>
            {TERMS_SECTIONS[0]}
          </span>
          <span className="pre" style={{ ...textStyle, top: 179, width: 295 }}>
            {TERMS_SECTIONS[1]}
          </span>
          <span className="pre" style={{ ...textStyle, top: 441, width: 305 }}>
            {TERMS_SECTIONS[2]}
          </span>
        </div>
      </div>


    </div>
  )
}
