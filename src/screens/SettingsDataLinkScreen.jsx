import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Toggle from '../components/Toggle'
import { IconApple, IconSmartphone, IconGoogleFit } from '../components/Icons'
import { useApp } from '../state/AppContext'

const CARDS = [
  { key: 'apple', title: 'Apple 건강', sub: '마지막 동의: 2분 전', Icon: IconApple, top: 178 },
  { key: 'screenTime', title: '스크린타임', sub: '마지막 동의: 오늘 오전 9:12', Icon: IconSmartphone, top: 308 },
  { key: 'googleFit', title: 'Google Fit', sub: '동의 상태: 미연동', Icon: IconGoogleFit, top: 438 },
]

/** 설정 - 데이터 연동 관리 */
export default function SettingsDataLinkScreen() {
  const navigate = useNavigate()
  const { integrations, setIntegrations } = useApp()

  return (
    <div className="screen">
      <Header title="데이터 연동 관리" align="center" weight={700} fallback="/settings/data" />

      <span
        style={{ position: 'absolute', top: 112, left: 24, width: 345, fontSize: 14, fontWeight: 500, lineHeight: '21px', color: 'var(--muted)' }}
      >
        타사 및 디바이스 데이터를 안전하게 가져와 실시간 수명 잔고 산출에 활용합니다.
      </span>

      {CARDS.map(({ key, title, sub, Icon, top }) => {
        const on = integrations[key]
        return (
          <div
            key={key}
            style={{
              position: 'absolute',
              top,
              left: 24,
              width: 345,
              height: 118,
              borderRadius: 16,
              background: 'var(--white)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <span style={{ position: 'absolute', top: 20, left: 20, width: 38, height: 38, borderRadius: 10, background: 'var(--cream)' }}>
              <span style={{ position: 'absolute', top: 8, left: 8 }}>
                <Icon size={22} color="#A67C52" />
              </span>
            </span>

            <span style={{ position: 'absolute', top: 20, left: 70, width: 180, fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>
              {title}
            </span>
            <span style={{ position: 'absolute', top: 44, left: 70, width: 190, fontSize: 12, fontWeight: 500, color: 'var(--muted)' }}>
              {sub}
            </span>

            <div style={{ position: 'absolute', top: 24, left: 274 }}>
              <Toggle on={on} onChange={(v) => setIntegrations({ ...integrations, [key]: v })} />
            </div>

            <span
              style={{
                position: 'absolute',
                top: 75,
                left: 20,
                width: 56,
                height: 23,
                borderRadius: 100,
                background: on ? 'var(--green-bg)' : 'var(--beige-3)',
                color: on ? 'var(--green)' : 'var(--brown)',
                fontSize: 12,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {on ? '연동됨' : '미연동'}
            </span>
          </div>
        )
      })}
    </div>
  )
}
