import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { IconChevronLeft, IconChevronRight, IconX } from '../components/Icons'
import { useApp } from '../state/AppContext'

const WEEK = ['일', '월', '화', '수', '목', '금', '토']
const DAYS = [16, 17, 18, 19, 20, 21, 22]
const CELL_LEFT = [0, 52, 104, 156, 208, 260, 313]
const MONTHS = ['2026년 6월', '2026년 7월', '2026년 8월', '2026년 9월']

/** 일별 수명 명세서 - 날짜 선택 */
export default function ReceiptDatePickerScreen() {
  const navigate = useNavigate()
  const { setSelectedDate } = useApp()
  const [monthIdx, setMonthIdx] = useState(2)
  const [day, setDay] = useState(20)

  const confirm = () => {
    setSelectedDate(`2026.08.${String(day).padStart(2, '0')}`)
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

        {/* 월 이동 */}
        <div style={{ position: 'absolute', top: 93, left: 24, width: 345, height: 20 }}>
          <button
            className="pressable"
            aria-label="이전 달"
            onClick={() => setMonthIdx((i) => Math.max(0, i - 1))}
            style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20 }}
          >
            <IconChevronLeft size={20} color="#2D241E" />
          </button>
          <span style={{ position: 'absolute', top: 0, left: 133, width: 78, fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
            {MONTHS[monthIdx]}
          </span>
          <button
            className="pressable"
            aria-label="다음 달"
            onClick={() => setMonthIdx((i) => Math.min(MONTHS.length - 1, i + 1))}
            style={{ position: 'absolute', top: 0, left: 325, width: 20, height: 20 }}
          >
            <IconChevronRight size={20} color="#2D241E" />
          </button>
        </div>

        {/* 요일 */}
        <div style={{ position: 'absolute', top: 129, left: 24, width: 345, height: 16 }}>
          {WEEK.map((w, i) => (
            <span
              key={w}
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
              {w}
            </span>
          ))}
        </div>

        {/* 날짜 */}
        <div style={{ position: 'absolute', top: 157, left: 24, width: 345, height: 32 }}>
          {DAYS.map((d, i) => {
            const on = d === day
            return (
              <button
                key={d}
                className="pressable"
                onClick={() => setDay(d)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: CELL_LEFT[i],
                  width: 32,
                  height: 32,
                  borderRadius: 100,
                  background: on ? 'var(--brown)' : 'transparent',
                  color: on ? 'var(--white)' : 'var(--muted)',
                  fontSize: 14,
                  fontWeight: on ? 800 : 500,
                }}
              >
                {d}
              </button>
            )
          })}
        </div>

        <button
          className="pressable"
          onClick={confirm}
          style={{
            position: 'absolute',
            top: 209,
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
