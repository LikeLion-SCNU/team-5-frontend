import { useEffect, useRef, useState } from 'react'

const WINDOW_W = 281 // 보이는 영역 폭
const ITEM_W = 56 // 한 칸 폭 (5칸 = 280px)
const SIDE = 3 // 중앙 기준 좌우로 미리 그려두는 칸 수
const DRAG_MIN = 8 // 이 값보다 적게 움직이면 '탭'으로 본다

const label = (idx) => `${String(((idx % 24) + 24) % 24).padStart(2, '0')}:00`

/**
 * 알림 시각 선택 휠.
 * 가운데 칸이 선택된 시각이고, 좌우 칸을 누르거나 좌우로 드래그하면 굴러온다.
 * (예: 10:00 선택 → 08:00 09:00 [10:00] 11:00 12:00)
 * 00~23시가 끊김 없이 이어진다.
 */
export default function TimeWheel({ value, onChange, disabled = false }) {
  const [pos, setPos] = useState(() => parseInt(value, 10) || 0)
  const drag = useRef(null)

  // 바깥에서 값이 바뀌면 휠 위치를 가장 가까운 같은 시각으로 맞춘다
  useEffect(() => {
    const hour = parseInt(value, 10) || 0
    setPos((prev) => {
      if (((prev % 24) + 24) % 24 === hour) return prev
      return prev + ((((hour - prev + 12) % 24) + 24) % 24) - 12
    })
  }, [value])

  const select = (idx) => {
    if (disabled) return
    setPos(idx)
    onChange(label(idx))
  }

  /* ---- 드래그(스와이프) ----
     setPointerCapture 를 쓰면 캡처한 요소가 click 을 가로채서
     칸을 눌러도 선택이 안 되므로 캡처하지 않는다. */
  const onPointerDown = (e) => {
    if (disabled) return
    drag.current = { x: e.clientX, pos, moved: false }
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d) return
    const dx = d.x - e.clientX
    if (Math.abs(dx) < DRAG_MIN) return
    d.moved = true
    const steps = Math.round(dx / ITEM_W)
    if (d.pos + steps !== pos) select(d.pos + steps)
  }
  const endDrag = () => {
    const d = drag.current
    drag.current = null
    return d?.moved
  }

  const indices = []
  for (let i = pos - SIDE; i <= pos + SIDE; i++) indices.push(i)

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      style={{
        position: 'absolute',
        top: 12,
        left: 12,
        width: WINDOW_W,
        height: 39,
        overflow: 'hidden',
        touchAction: 'pan-y',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {/* 가운데 선택 표시 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: (WINDOW_W - 61) / 2,
          width: 61,
          height: 39,
          borderRadius: 8,
          background: 'var(--brown)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 39,
          transform: `translateX(${WINDOW_W / 2 - ITEM_W / 2 - pos * ITEM_W}px)`,
          transition: 'transform .28s cubic-bezier(.22,.61,.36,1)',
        }}
      >
        {indices.map((idx) => {
          const dist = Math.abs(idx - pos)
          const on = dist === 0
          return (
            <button
              key={idx}
              type="button"
              className="pressable"
              disabled={disabled}
              onClick={() => {
                // 드래그로 끝난 동작이면 선택하지 않는다
                if (drag.current?.moved) return
                select(idx)
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: idx * ITEM_W,
                width: ITEM_W,
                height: 39,
                color: on ? 'var(--white)' : 'var(--muted)',
                fontSize: on ? 16 : 14,
                fontWeight: on ? 800 : 500,
                opacity: dist >= 2 ? 0.55 : 1,
                transition: 'color .2s ease, font-size .2s ease, opacity .2s ease',
              }}
            >
              {label(idx)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
