import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Toggle from '../components/Toggle'
import { IconMoon, IconFootsteps, IconSmartphone } from '../components/Icons'
import { useApp } from '../state/AppContext'

const ROWS = [
  {
    key: 'sleep',
    title: '수면 시간',
    desc: '수면 패턴을 분석하여 생체 시간을 계산합니다.',
    Icon: IconMoon,
    top: 190,
  },
  {
    key: 'steps',
    title: '걸음 수',
    desc: '일일 걸음량으로 건강 증진 수명을 환산합니다.',
    Icon: IconFootsteps,
    top: 300,
  },
  {
    key: 'screen',
    title: '스크린타임',
    desc: '디지털 기기 사용량에 따른 집중 수명을 차감합니다.',
    Icon: IconSmartphone,
    top: 410,
  },
]

/** 로그인 이후 나오는 화면 — 나의 일상 연결하기 */
export default function OnboardingLinkScreen() {
  const navigate = useNavigate()
  const { links, setLinks } = useApp()

  return (
    <div className="screen">
      <Header title="나의 일상 연결하기" align="center" weight={700} fallback="/login" />

      <span
        style={{
          position: 'absolute',
          top: 120,
          left: 24,
          width: 345,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '22px',
          color: 'var(--muted)',
        }}
      >
        일상 활동을 연동하면 실시간으로 수명 잔고가 계산되고 더 스마트한 관리 리포트를 받을 수 있습니다.
      </span>

      {ROWS.map(({ key, title, desc, Icon, top }) => {
        const on = links[key]
        return (
          <div
            key={key}
            style={{
              position: 'absolute',
              top,
              left: 24,
              width: 345,
              height: 98,
              borderRadius: 16,
              background: 'var(--white)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 25,
                left: 20,
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'var(--cream)',
              }}
            >
              <span style={{ position: 'absolute', top: 12, left: 12 }}>
                <Icon size={24} color={on ? '#A67C52' : '#8C7A6B'} />
              </span>
            </div>

            <span style={{ position: 'absolute', top: 20, left: 84, width: 174, fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>
              {title}
            </span>
            <span style={{ position: 'absolute', top: 44, left: 84, width: 174, fontSize: 12, fontWeight: 500, lineHeight: '17px', color: 'var(--muted)' }}>
              {desc}
            </span>

            <div style={{ position: 'absolute', top: 33, left: 274 }}>
              <Toggle on={on} onChange={(v) => setLinks({ ...links, [key]: v })} />
            </div>
          </div>
        )
      })}

      <button
        className="pressable"
        onClick={() => navigate('/home')}
        style={{
          position: 'absolute',
          top: 723,
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
        연동 완료하고 시작하기
      </button>

    </div>
  )
}
