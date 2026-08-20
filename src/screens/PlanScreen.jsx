import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import { IconCheck } from '../components/Icons'
import { useApp } from '../state/AppContext'
import { getCurrentPlan } from '../api/plans'
import { isLoggedIn } from '../api/client'

const DAY_LABEL = ['일', '월', '화', '수', '목', '금', '토']

/** 서버 액션 타입 → 오늘의 미션 문구 */
const MISSION_TEXT = {
  sleep: '7시간 이상 자기',
  activity: '중강도 활동 20분 채우기',
  screen_time: '좌식 시청 시간 줄이기',
  food: '채소·과일 한 접시 더 먹기',
  alcohol: '음주 줄이기',
}

/** 플랜 기간(startDate~endDate)을 주간 스트립으로 */
function weekStrip(startDate) {
  if (!startDate) return []
  const start = new Date(`${startDate}T00:00:00`)
  return Array.from({ length: 7 }, (unused, i) => {
    const d = new Date(start.getTime() + i * 86400000)
    return { day: DAY_LABEL[d.getDay()], date: d.getDate(), left: 24 + i * 50.5 }
  })
}

/** 플랜 (플랜 수락한 후, 화면) */
export default function PlanScreen() {
  const navigate = useNavigate()
  const { planAccepted, missions, setMissions } = useApp()
  const [plan, setPlan] = useState(null)
  const [selectedDay, setSelectedDay] = useState(new Date().getDate())

  useEffect(() => {
    if (!isLoggedIn()) return
    getCurrentPlan().then((pl) => setPlan(pl?.id ? pl : null)).catch(() => {})
  }, [])

  const week = weekStrip(plan?.startDate)
  const expected = plan?.expectedWeeklyMinutes ?? 0
  const completed = plan?.completedMinutes ?? 0
  const percent = expected > 0 ? Math.min(Math.round((completed / expected) * 100), 100) : 0
  const MISSIONS = (plan?.actions ?? []).slice(0, 3).map((action, i) => ({
    key: `${action.actionType}-${i}`,
    text: MISSION_TEXT[action.actionType] ?? action.actionType,
    gain: `+${(Math.abs(action.ruleMinutes * action.repetitions) / 60).toFixed(1)}h`,
    top: 355 + i * 64,
  }))

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
          {percent}% 달성
        </span>
        <div style={{ position: 'absolute', top: 48, left: 18, width: 309, height: 10, borderRadius: 10, background: 'var(--beige-2)' }}>
          <div style={{ width: Math.round((309 * percent) / 100), height: 10, borderRadius: 10, background: 'var(--brown)' }} />
        </div>
      </div>

      {/* 주간 기록 */}
      <span style={{ position: 'absolute', top: 220, left: 24, width: 80, fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
        주간 기록
      </span>
      {week.map(({ day, date, left }) => {
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
      {MISSIONS.length === 0 && (
        <div
          style={{
            position: 'absolute',
            top: 355,
            left: 24,
            width: 345,
            borderRadius: 16,
            background: 'var(--white)',
            boxShadow: 'var(--shadow-card)',
            padding: '24px',
            textAlign: 'center',
            fontSize: 14,
            color: 'var(--muted)',
          }}
        >
          진행 중인 플랜의 미션을 불러오는 중입니다.
        </div>
      )}
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
