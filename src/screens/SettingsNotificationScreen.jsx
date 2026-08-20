import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Toggle from '../components/Toggle'
import TimeWheel from '../components/TimeWheel'
import { useApp } from '../state/AppContext'

/** 설정 - 알림 */
export default function SettingsNotificationScreen() {
  const navigate = useNavigate()
  const { notify, setNotify } = useApp()

  return (
    <div className="screen">
      <Header title="알림 설정" align="center" weight={700} fallback="/settings" />

      {/* 아침 명세서 알림 */}
      <div
        style={{
          position: 'absolute',
          top: 124,
          left: 24,
          width: 345,
          height: 159,
          borderRadius: 16,
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <span style={{ position: 'absolute', top: 20, left: 20, width: 160, fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>
          아침 명세서 알림
        </span>
        <span style={{ position: 'absolute', top: 44, left: 20, width: 236, fontSize: 13, fontWeight: 500, color: 'var(--muted)' }}>
          전날의 수명 변동 사항을 매일 배달합니다.
        </span>
        <div style={{ position: 'absolute', top: 24, left: 274 }}>
          <Toggle on={notify.morning} onChange={(v) => setNotify({ ...notify, morning: v })} />
        </div>

        {/* 발송 시각 */}
        <div
          style={{
            position: 'absolute',
            top: 76,
            left: 20,
            width: 305,
            height: 63,
            borderRadius: 12,
            background: 'var(--cream)',
          }}
        >
          <TimeWheel
            value={notify.morningTime}
            onChange={(t) => setNotify({ ...notify, morningTime: t })}
            disabled={!notify.morning}
          />
        </div>
      </div>

      {/* 나머지 알림 */}
      <div
        style={{
          position: 'absolute',
          top: 299,
          left: 24,
          width: 345,
          height: 160,
          borderRadius: 16,
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
          overflow: 'hidden',
        }}
      >
        {[
          { key: 'mission', title: '흑자 전환 미션 알림', desc: '수명 획득 기회를 알려줍니다.', top: 0 },
          { key: 'weekly', title: '주간 리포트 알림', desc: '한 주간 쌓인 나의 건강 요약을 받아보세요.', top: 80 },
        ].map(({ key, title, desc, top }, i) => (
          <div key={key} style={{ position: 'absolute', top, left: 0, width: 345, height: 80 }}>
            <span style={{ position: 'absolute', top: 20, left: 20, width: 180, fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>
              {title}
            </span>
            <span style={{ position: 'absolute', top: 44, left: 20, width: 245, fontSize: 13, fontWeight: 500, color: 'var(--muted)' }}>
              {desc}
            </span>
            <div style={{ position: 'absolute', top: 24, left: 274 }}>
              <Toggle on={notify[key]} onChange={(v) => setNotify({ ...notify, [key]: v })} />
            </div>
            {i === 0 && <div style={{ position: 'absolute', top: 79, left: 20, width: 305, height: 1, background: 'var(--beige-2)' }} />}
          </div>
        ))}
      </div>
    </div>
  )
}
