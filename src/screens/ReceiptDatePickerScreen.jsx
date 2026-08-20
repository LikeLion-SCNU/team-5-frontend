import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { IconX } from '../components/Icons'
import { useApp } from '../state/AppContext'

const WEEK = ['일', '월', '화', '수', '목', '금', '토']
const CELL_LEFT = [0, 52, 104, 156, 208, 260, 313]

/** 오늘 포함 과거 14일 (월 경계 처리, 오래된 날부터) */
function recentDays() {
  const now = new Date()
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (13 - i))
    return { y: d.getFullYear(), m: d.getMonth() + 1, d: d.getDate(), dow: d.getDay() }
  })
}

/** 일별 수명 명세서 - 날짜 선택 */
export default function ReceiptDatePickerScreen() {
  const navigate = useNavigate()
  const { setSelectedDate } = useApp()
  const [days] = useState(recentDays)
  const [selIdx, setSelIdx] = useState(days.length - 1)

  const first = days[0]
  const last = days[days.length - 1]
  const monthLabel =
    first.y === last.y && first.m === last.m
      ? `${last.y}년 ${last.m}월`
      : first.y === last.y
        ? `${first.y}년 ${first.m}월 - ${last.m}월`
        : `${first.y}년 ${first.m}월 - ${last.y}년 ${last.m}월`

  const confirm = () => {
    const { y, m, d } = days[selIdx]
    setSelectedDate(`${y}.${String(m).padStart(2, '0')}.${String(d).padStart(2, '0')}`)
    navigate('/receipt')
  }

  return (
    <div className="screen">
      {/* 뒤에 깔린 화면 */}
      <Header title="나의 시간 흐름" align="right" weight={700} />
      <div style={{ position: 'absolute', top: 124, left: 24, width: 345, height: 200, borderRadius: 16, background: 'var(--white)' }} />

      {/* 딤 */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />

      {/* 바텀시트 */}
      <div
        style={{
          position: 'absolute',
          top: 520,
          left: 0,
          width: 393,
          height: 332,
          background: 'var(--white)',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 40,
            height: 5,
            borderRadius: 10,
            background: 'var(--line)',
          }}
        />

        <span style={{ position: 'absolute', top: 49, left: 24, fontSize: 18, fontWeight: 800, color: 'var(--ink)' }}>날짜 선택</span>
        <button
          className="pressable"
          aria-label="닫기"
          onClick={() => navigate(-1)}
          style={{ position: 'absolute', top: 49, left: 345, width: 24, height: 24 }}
        >
          <IconX size={24} color="#2D241E" />
        </button>

        {/* 조회 기간 (오늘 포함 최근 14일) */}
        <div style={{ position: 'absolute', top: 93, left: 24, width: 345, height: 20 }}>
          <span
            style={{ position: 'absolute', top: 0, left: 0, width: 345, textAlign: 'center', fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}
          >
            {monthLabel}
          </span>
        </div>

        {/* 요일 — 첫 줄과 둘째 줄이 7일 간격이라 같은 요일 열을 쓴다 */}
        <div style={{ position: 'absolute', top: 129, left: 24, width: 345, height: 16 }}>
          {days.slice(0, 7).map((it, i) => (
            <span
              key={WEEK[it.dow]}
              style={{
                position: 'absolute',
                top: 0,
                left: CELL_LEFT[i],
                width: 32,
                textAlign: 'center',
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--muted)',
              }}
            >
              {WEEK[it.dow]}
            </span>
          ))}
        </div>

        {/* 날짜 — 두 줄 (지난 7일 / 최근 7일) */}
        <div style={{ position: 'absolute', top: 157, left: 24, width: 345, height: 76 }}>
          {days.map((it, i) => {
            const on = i === selIdx
            return (
              <button
                key={`${it.y}-${it.m}-${it.d}`}
                className="pressable"
                onClick={() => setSelIdx(i)}
                style={{
                  position: 'absolute',
                  top: Math.floor(i / 7) * 44,
                  left: CELL_LEFT[i % 7],
                  width: 32,
                  height: 32,
                  borderRadius: 100,
                  background: on ? 'var(--brown)' : 'transparent',
                  color: on ? 'var(--white)' : 'var(--muted)',
                  fontSize: 14,
                  fontWeight: on ? 800 : 500,
                }}
              >
                {it.d}
              </button>
            )
          })}
        </div>

        <button
          className="pressable"
          onClick={confirm}
          style={{
            position: 'absolute',
            top: 253,
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

      </div>
    </div>
  )
}
