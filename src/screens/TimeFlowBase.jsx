import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useApp } from '../state/AppContext'

/**
 * 나의 시간 흐름 (7일 / 4주 공통 레이아웃)
 * 차트 영역: 305 x 150, 카드 안쪽 top 59 / left 20
 */
export default function TimeFlowBase({ tab, summary, points, axis, listTitle, rows }) {
  const navigate = useNavigate()
  const { displayDelta, protectionMode } = useApp()

  return (
    <div className="screen">
      <Header title="나의 시간 흐름" align="center" fallback="/home" />

      {/* 타이틀 + 기간 세그먼트 */}
      <span style={{ position: 'absolute', top: 113, left: 24, width: 104, fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>
        수명 변동 분석
      </span>
      <div
        style={{
          position: 'absolute',
          top: 108,
          left: 279,
          width: 90,
          height: 31,
          borderRadius: 8,
          background: 'var(--beige-2)',
        }}
      >
        {[
          { key: '7d', label: '7일', to: '/flow', left: 2 },
          { key: '4w', label: '4주', to: '/flow/4w', left: 45 },
        ].map((s) => {
          const on = tab === s.key
          return (
            <button
              key={s.key}
              className="pressable"
              onClick={() => navigate(s.to)}
              style={{
                position: 'absolute',
                top: 2,
                left: s.left,
                width: 43,
                height: 27,
                borderRadius: 6,
                background: on ? 'var(--white)' : 'transparent',
                color: on ? 'var(--brown)' : 'var(--muted)',
                fontSize: 12,
                fontWeight: on ? 700 : 500,
              }}
            >
              {s.label}
            </button>
          )
        })}
      </div>

      {/* 차트 카드 */}
      <div
        style={{
          position: 'absolute',
          top: 151,
          left: 24,
          width: 345,
          height: 259,
          borderRadius: 16,
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <span style={{ position: 'absolute', top: 24, left: 20, width: 128, fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>
          누적 수명 잔고 변동
        </span>
        <span
          style={{
            position: 'absolute',
            top: 20,
            left: 156,
            width: 169,
            textAlign: 'right',
            fontSize: 18,
            fontWeight: 800,
            whiteSpace: 'nowrap',
            color: 'var(--green)',
          }}
        >
          {summary}
        </span>

        {/* 차트 */}
        <svg width="305" height="150" viewBox="0 0 305 150" style={{ position: 'absolute', top: 59, left: 20 }}>
          <polygon
            points={`${points.map((p) => `${p.x},${p.y}`).join(' ')} ${points[points.length - 1].x},135 ${points[0].x},135`}
            fill="#E8F2EC"
          />
          <polyline
            points={points.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="#4A7C59"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="4" fill="#4A7C59" />
          ))}
        </svg>

        {/* X축 라벨 */}
        <div style={{ position: 'absolute', top: 225, left: 20, width: 305, height: 14 }}>
          {axis.map((a) => (
            <span
              key={a.label}
              style={{ position: 'absolute', top: 0, left: a.left, fontSize: 12, fontWeight: 400, color: 'var(--muted)' }}
            >
              {a.label}
            </span>
          ))}
        </div>
      </div>

      {/* 변동 내역 */}
      <span style={{ position: 'absolute', top: 426, left: 24, width: 120, fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
        {listTitle}
      </span>

      {/* 변동 내역 — 금액 칸이 두 줄이 되면 행이 같이 늘어나고 내용은 세로 가운데 정렬 */}
      <div style={{ position: 'absolute', top: 457, left: 24, width: 345, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {rows.map((r, i) => {
          const plus = r.sign > 0 || protectionMode
          return (
            <button
              key={i}
              className="pressable"
              onClick={() => navigate('/source')}
              style={{ display: 'flex', alignItems: 'stretch', gap: 8, width: '100%', minHeight: 18, textAlign: 'left' }}
            >
              <span
                style={{ flex: 'none', width: 34, display: 'flex', alignItems: 'center', fontSize: 13, fontWeight: 400, color: 'var(--muted)' }}
              >
                {r.date}
              </span>
              <span
                style={{
                  flex: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '2px 6px',
                  borderRadius: 4,
                  background: 'var(--cream)',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                [{r.tag}]
              </span>
              <span
                style={{ flex: 1, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600, lineHeight: '19px', color: 'var(--ink)' }}
              >
                {r.title}
              </span>
              <span
                style={{
                  flex: 'none',
                  maxWidth: 92,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  textAlign: 'right',
                  fontSize: 14,
                  fontWeight: 800,
                  lineHeight: '18px',
                  color: plus ? 'var(--green)' : 'var(--red)',
                }}
              >
                {displayDelta(r.delta)}
              </span>
            </button>
          )
        })}
      </div>

    </div>
  )
}
