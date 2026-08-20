/**
 * 토글 스위치 (51 x 31)
 * ON: 배경 #A67C52 / OFF: 배경 #D1C9C0, 손잡이 흰색 27px
 */
export default function Toggle({ on, onChange, disabled = false }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={() => !disabled && onChange(!on)}
      style={{
        width: 51,
        height: 31,
        borderRadius: 100,
        background: on ? 'var(--brown)' : 'var(--line)',
        position: 'relative',
        transition: 'background .18s ease',
        opacity: disabled ? 0.6 : 1,
        display: 'block',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 2,
          left: on ? 22 : 2,
          width: 27,
          height: 27,
          borderRadius: '50%',
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
          transition: 'left .18s ease',
        }}
      />
    </button>
  )
}
