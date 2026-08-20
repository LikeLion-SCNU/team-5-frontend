import Header from '../components/Header'
import { IconCheck } from '../components/Icons'
import { EFFECTIVE_DATE, PRIVACY_SECTIONS } from '../content/policy'
import { useApp } from '../state/AppContext'

const CARDS = [
  { key: 'collect', top: 136, height: 104, textTop: 15, textLeft: 15, textWidth: 318, checkTop: 250, labelTop: 253 },
  { key: 'purpose', top: 285, height: 128, textTop: 16, textLeft: 14, textWidth: 317, checkTop: 426, labelTop: 429 },
  { key: 'sensitive', top: 458, height: 191, textTop: 11, textLeft: 13, textWidth: 312, checkTop: 657, labelTop: 660 },
]

/**
 * 개인정보 처리방침 (공통 본문)
 * — 3개 항목 카드 + 항목별 '동의합니다' 체크 + 확인 버튼
 */
export default function PrivacyPolicyBase({ onConfirm }) {
  const { consents, setConsents } = useApp()

  return (
    <>

      <Header title="개인정보 처리방침" align="center" weight={700} fallback="/signup" />

      <span style={{ position: 'absolute', top: 100, left: 197, width: 172, fontSize: 14, fontWeight: 700, color: 'var(--black)' }}>
        {EFFECTIVE_DATE}
      </span>

      {CARDS.map((c, i) => (
        <div key={c.key}>
          <div
            className="scroll-y"
            style={{
              position: 'absolute',
              top: c.top,
              left: 24,
              width: 345,
              height: c.height,
              borderRadius: 16,
              background: 'var(--white)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <span
              className="pre"
              style={{
                position: 'absolute',
                top: c.textTop,
                left: c.textLeft,
                width: c.textWidth,
                fontSize: 14,
                fontWeight: 700,
                lineHeight: '20px',
                color: 'var(--black)',
              }}
            >
              {PRIVACY_SECTIONS[i]}
            </span>
          </div>

          <button
            className="pressable"
            onClick={() => setConsents({ ...consents, [c.key]: !consents[c.key] })}
            aria-pressed={consents[c.key]}
            style={{ position: 'absolute', top: c.checkTop, left: 36, width: 305, height: 24, textAlign: 'left' }}
          >
            <span
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 22,
                height: 22,
                borderRadius: 6,
                background: consents[c.key] ? 'var(--brown)' : 'var(--cream)',
                border: consents[c.key] ? 'none' : '1px solid var(--beige-2)',
              }}
            >
              {consents[c.key] && (
                <span style={{ position: 'absolute', top: 4, left: 4 }}>
                  <IconCheck size={14} color="#FFFFFF" />
                </span>
              )}
            </span>
            <span style={{ position: 'absolute', top: 3, left: 26, fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>동의합니다</span>
          </button>
        </div>
      ))}

      <button
        className="pressable"
        onClick={onConfirm}
        style={{
          position: 'absolute',
          top: 750,
          left: 24,
          width: 345,
          height: 56,
          borderRadius: 16,
          background: 'var(--brown)',
          color: 'var(--white)',
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        확인
      </button>
    </>
  )
}
