import { IconAlertCircle, IconCheck } from './Icons'

/**
 * 확인란(알림창) — 와이어프레임 "개인정보 처리방침 알림창"과 동일한 규격.
 * 325 x 225 / radius 16 / 아이콘 원 52px(#FCEEEB) / 확인 버튼 277 x 50 (#B0A89E)
 */
export default function AlertModal({ open, message, onClose, confirmLabel = '확인', tone = 'error' }) {
  if (!open) return null

  const success = tone === 'success'

  return (
    <>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} onClick={onClose} />

      <div
        role="alertdialog"
        aria-label={message}
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
            background: success ? 'var(--green-bg)' : 'var(--red-bg)',
          }}
        >
          <span style={{ position: 'absolute', top: 12, left: 12 }}>
            {success ? <IconCheck size={28} color="#4A7C59" /> : <IconAlertCircle size={28} color="#C84B31" />}
          </span>
        </div>

        <span
          style={{
            position: 'absolute',
            top: 100,
            left: 24,
            width: 277,
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 700,
            lineHeight: '22px',
            whiteSpace: 'pre-line',
            color: 'var(--ink-2)',
          }}
        >
          {message}
        </span>

        <button
          className="pressable"
          onClick={onClose}
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
          {confirmLabel}
        </button>
      </div>
    </>
  )
}
