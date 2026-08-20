import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import { IconMoon, IconFootsteps, IconMeal } from '../components/Icons'
import { useApp } from '../state/AppContext'
import { getCurrentPlan, generatePlan, decidePlan, regeneratePlan } from '../api/plans'
import { isLoggedIn } from '../api/client'

/** 서버 액션 타입 → 화면 문구·아이콘 */
const ACTION_META = {
  sleep: { title: '수면 리듬 되찾기', desc: '7시간 수면으로 뇌 피로 회복', Icon: IconMoon },
  activity: { title: '중강도 활동 채우기', desc: '심혈관 기능 개선 및 기초 대사 증진', Icon: IconFootsteps },
  screen_time: { title: '스크린 타임 줄이기', desc: '좌식 시청 시간을 활동으로 전환', Icon: IconMeal },
  food: { title: '채소·과일 챙겨 먹기', desc: '하루 한 접시로 잔고 적립', Icon: IconMeal },
  alcohol: { title: '음주 줄이기', desc: '두 잔째부터의 출금을 막는다', Icon: IconMeal },
}

/** 서버 액션 → 화면 카드 (기대 적립: 규칙 분 × 반복) */
function toCard(action, index) {
  const meta = ACTION_META[action.actionType] ?? { title: action.actionType, desc: '', Icon: IconMeal }
  const gainH = Math.abs((action.ruleMinutes * action.repetitions) / 60)
  return {
    key: `${action.actionType}-${index}`,
    title: meta.title,
    desc: meta.desc,
    gain: `+${gainH >= 10 ? Math.round(gainH) : gainH.toFixed(1)}h`,
    Icon: meta.Icon,
    top: 211 + index * 96,
    chipLeft: 272,
    chipWidth: 53,
  }
}

const CARDS = [
  { key: 'sleep', title: '수면 30분 늘리기', desc: '생체 리듬 최적화 및 뇌 피로 회복', gain: '+2h', Icon: IconMoon, top: 211, chipLeft: 283, chipWidth: 42 },
  { key: 'walk', title: '하루 만보 걷기', desc: '심혈관 기능 개선 및 기초 대사 증진', gain: '+1.5h', Icon: IconFootsteps, top: 307, chipLeft: 272, chipWidth: 53 },
  { key: 'night', title: '일주일에 야식 한 번 줄이기', desc: '수면 중 위장 건강 수호', gain: '+0.5h', Icon: IconMeal, top: 403, chipLeft: 272, chipWidth: 53 },
]

/** 플랜 — 플랜 수락 전(= 플랜 수정하기를 눌렀을 때 뜨는 화면) */
export default function PlanEditScreen() {
  const navigate = useNavigate()
  const { setPlanAccepted } = useApp()

  /* 서버 플랜 제안 — 없으면 생성해보고, 실패하면 예시 카드 유지 */
  const [plan, setPlan] = useState(null)
  useEffect(() => {
    if (!isLoggedIn()) return
    getCurrentPlan()
      .then((pl) => {
        if (pl?.status === 'proposed' || pl?.status === 'accepted') return pl
        if (pl?.availability === 'NOT_GENERATED' || pl?.availability === 'AVAILABLE') return generatePlan()
        return pl
      })
      .then((pl) => setPlan(pl?.id ? pl : null))
      .catch(() =>
        // 아직 제안이 없으면 새로 생성 시도
        generatePlan().then((pl) => setPlan(pl?.id ? pl : null)).catch(() => {}),
      )
  }, [])

  const cards = plan?.actions?.length ? plan.actions.slice(0, 3).map(toCard) : CARDS

  const accept = async () => {
    if (plan?.id && plan.status === 'proposed') {
      try {
        await decidePlan(plan.id, true, plan.version ?? 0)
      } catch {
        // 결정 실패해도 화면 흐름은 이어간다
      }
    }
    setPlanAccepted(true)
    navigate('/plan')
  }

  const requestNew = async () => {
    if (plan?.id) {
      try {
        const next = await regeneratePlan(plan.id, plan.version ?? 0)
        if (next?.id) {
          setPlan(next)
          return
        }
      } catch {
        // 재생성 실패 시 화면 새로고침으로 폴백
      }
    }
    navigate(0)
  }

  return (
    <div className="screen">
      <Header title="잃어버린 시간 되찾기 프로젝트" align="left" fallback="/home" back={false} />

      <span style={{ position: 'absolute', top: 124, left: 24, width: 300, fontSize: 18, fontWeight: 800, color: 'var(--ink)' }}>
        수명 마이너스 극복을 위한 처방
      </span>
      <span style={{ position: 'absolute', top: 155, left: 24, width: 345, fontSize: 14, fontWeight: 500, lineHeight: '21px', color: 'var(--muted)' }}>
        가장 해로운 습관 3가지만 보완해도 매주 기대 수명이 쌓여갑니다.
      </span>

      {cards.map(({ key, title, desc, gain, Icon, top, chipLeft, chipWidth }) => (
        <div
          key={key}
          style={{
            position: 'absolute',
            top,
            left: 24,
            width: 345,
            height: 84,
            borderRadius: 16,
            background: 'var(--white)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <span
            style={{ position: 'absolute', top: 20, left: 20, width: 44, height: 44, borderRadius: 12, background: 'var(--cream)' }}
          >
            <span style={{ position: 'absolute', top: 12, left: 12 }}>
              <Icon size={20} color="#A67C52" />
            </span>
          </span>
          <span
            style={{ position: 'absolute', top: 21, left: 80, width: 182, fontSize: 14, fontWeight: 800, lineHeight: '19px', color: 'var(--ink)' }}
          >
            {title}
          </span>
          <span
            style={{ position: 'absolute', top: 44, left: 80, width: 182, fontSize: 12, fontWeight: 400, lineHeight: '17px', color: 'var(--muted)' }}
          >
            {desc}
          </span>
          <span
            style={{
              position: 'absolute',
              top: 28,
              left: chipLeft,
              width: chipWidth,
              height: 27,
              borderRadius: 100,
              background: 'var(--green-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--green)',
            }}
          >
            {gain}
          </span>
        </div>
      ))}

      <button
        className="pressable"
        onClick={accept}
        style={{
          position: 'absolute',
          top: 535,
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
        플랜 수락하기
      </button>

      <button
        className="pressable"
        onClick={requestNew}
        style={{
          position: 'absolute',
          top: 642,
          left: 0,
          width: 393,
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--muted)',
        }}
      >
        새로운 플랜 요청하기
      </button>

      <BottomNav active="plan" />
    </div>
  )
}
