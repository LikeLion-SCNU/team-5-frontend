import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import { IconCheck } from '../components/Icons'
import { useApp } from '../state/AppContext'

const WEEK = [
  { day: '월', date: 17, left: 24 },
  { day: '화', date: 18, left: 74 },
  { day: '수', date: 19, left: 125 },
  { day: '목', date: 20, left: 176 },
  { day: '금', date: 21, left: 227 },
  { day: '토', date: 22, left: 278 },
  { day: '일', date: 23, left: 329 },
]

const MISSIONS = [
  { key: 'sleep', text: '7시간 수면 성공하기', gain: '+1.5h', top: 355 },
  { key: 'steps', text: '오늘 만보 걷기 채우기', gain: '+1.5h', top: 419 },
  { key: 'caffeine', text: '카페인 섭취 낮추기 (오후 2시 이후)', gain: '+0.8h', top: 483 },
]

/** 플랜 (플랜 수락한 후, 화면) */
export default function PlanScreen() {
  const navigate = useNavigate()
  const { planAccepted, missions, setMissions } = useApp()
  const [selectedDay, setSelectedDay] = useState(20) // 주간 기록에서 선택한 날짜

  // 플랜을 아직 수락하지 않았다면 제안 화면
  if (!planAccepted) return <Navigate to="/plan/edit" replace />

  return (
    <div className="screen">

      <div style={{ position: 'absolute', top: 44, left: 0, width: 393, height: 56 }}>
        <span
          style={{ position: 'absolute', top: 17, left: 0, width: 393, textAlign: 'center', fontSize: 18, fontWeight: 800, color: 'var(--ink)' }}
        >
          나의 플랜
        </span>
      </div>

      {/* 오늘의 흑자 목표 */}
      <div
        style={{
          position: 'absolute',
          top: 124,
          left: 24,
          width: 345,
          height: 76,
          borderRadius: 16,
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <span style={{ position: 'absolute', top: 18, left: 18, width: 104, fontSize: 14, fontWeight: 600, color: 'var(--muted)' }}>
          오늘의 흑자 목표
        </span>
        <span
          style={{ position: 'absolute', top: 18, left: 263, width: 64, textAlign: 'right', fontSize: 14, fontWeight: 800, color: 'var(--brown)' }}
        >
          40% 달성
        </span>
        <div style={{ position: 'absolute', top: 48, left: 18, width: 309, height: 10, borderRadius: 10, background: 'var(--beige-2)' }}>
          <div style={{ width: 135, height: 10, borderRadius: 10, background: 'var(--brown)' }} />
        </div>
      </div>

      {/* 주간 기록 */}
      <span style={{ position: 'absolute', top: 220, left: 24, width: 80, fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
        주간 기록
      </span>
      {WEEK.map(({ day, date, left }) => {
        const on = selectedDay === date
        return (
          <button
            key={day}
            className="pressable"
            onClick={() => setSelectedDay(date)}
            aria-pressed={on}
            style={{ position: 'absolute', top: 251, left, width: 40, height: 53 }}
          >
            <span
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 40,
                textAlign: 'center',
                fontSize: 12,
                fontWeight: on ? 700 : 400,
                color: on ? 'var(--brown)' : 'var(--muted)',
              }}
            >
              {day}
            </span>
            <span
              style={{
                position: 'absolute',
                top: 21,
                left: 4,
                width: 32,
                height: 32,
                borderRadius: 100,
                background: on ? 'var(--brown)' : 'var(--white)',
                color: on ? 'var(--white)' : 'var(--ink)',
                fontSize: 13,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background .15s ease, color .15s ease',
              }}
            >
              {date}
            </span>
          </button>
        )
      })}

      {/* 오늘의 미션 */}
      <span style={{ position: 'absolute', top: 324, left: 24, width: 90, fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
        오늘의 미션
      </span>
      {MISSIONS.map(({ key, text, gain, top }) => {
        const done = missions[key]
        return (
          <button
            key={key}
            className="pressable"
            onClick={() => setMissions({ ...missions, [key]: !done })}
            style={{
              position: 'absolute',
              top,
              left: 24,
              width: 345,
              height: 54,
              borderRadius: 16,
              background: 'var(--white)',
              boxShadow: 'var(--shadow-card)',
              textAlign: 'left',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 16,
                left: 16,
                width: 22,
                height: 22,
                borderRadius: 6,
                background: done ? 'var(--brown)' : 'var(--cream)',
              }}
            >
              {done && (
                <span style={{ position: 'absolute', top: 4, left: 4 }}>
                  <IconCheck size={14} color="#FFFFFF" />
                </span>
              )}
            </span>
            <span
              style={{
                position: 'absolute',
                top: 19,
                left: 50,
                width: 234,
                fontSize: 13,
                fontWeight: 500,
                color: done ? 'var(--muted)' : 'var(--ink)',
              }}
            >
              {text}
            </span>
            <span style={{ position: 'absolute', top: 19, left: 296, width: 33, fontSize: 12, fontWeight: 700, color: 'var(--green)' }}>
              {gain}
            </span>
          </button>
        )
      })}

      <button
        className="pressable"
        onClick={() => navigate('/plan/edit')}
        style={{
          position: 'absolute',
          top: 637,
          left: 0,
          width: 393,
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--muted)',
        }}
      >
        플랜 수정하기
      </button>

      <BottomNav active="plan" />
    </div>
  )
}
