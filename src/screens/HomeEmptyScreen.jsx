import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import { IconBell, IconWallet } from '../components/Icons'
import { useApp } from '../state/AppContext'

/** 홈화면2 (데이터 초기화 시) */
export default function HomeEmptyScreen() {
  const navigate = useNavigate()
  const { userName, unreadCount } = useApp()

  return (
    <div className="screen">

      <div style={{ position: 'absolute', top: 44, left: 0, width: 393, height: 56 }}>
        <span style={{ position: 'absolute', top: 17, left: 109, width: 175, fontSize: 18, fontWeight: 800, color: 'var(--ink)' }}>
          {userName}님, 안녕하세요
        </span>
        <button
          className="pressable"
          onClick={() => navigate('/notifications')}
          aria-label={unreadCount > 0 ? `알림 ${unreadCount}건` : '알림'}
          style={{ position: 'absolute', top: 16, left: 321, width: 72, height: 24 }}
        >
          <span style={{ position: 'absolute', top: 0, left: 24 }}>
            <IconBell size={24} color="#2D241E" />
          </span>
          {unreadCount > 0 && (
            <span
              style={{ position: 'absolute', top: 2, left: 39, width: 6, height: 6, borderRadius: '50%', background: 'var(--red)' }}
            />
          )}
        </button>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 200,
          left: 148,
          width: 96,
          height: 96,
          borderRadius: 100,
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <span style={{ position: 'absolute', top: 24, left: 24 }}>
          <IconWallet size={48} color="#8C7A6B" />
        </span>
      </div>

      <span
        style={{
          position: 'absolute',
          top: 316,
          left: 74,
          width: 244,
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 700,
          color: 'var(--muted)',
        }}
      >
        첫 기록을 남겨 잔고를 적립하세요!
      </span>
      <span
        style={{
          position: 'absolute',
          top: 344,
          left: 72,
          width: 249,
          textAlign: 'center',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--muted-2)',
        }}
      >
        기록된 일상 시간이 미래의 가치를 만듭니다.
      </span>

      <button
        className="pressable"
        onClick={() => navigate('/meal')}
        style={{
          position: 'absolute',
          top: 380,
          left: 128,
          width: 136,
          height: 42,
          borderRadius: 100,
          background: 'var(--white)',
          color: 'var(--brown)',
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        기록 시작하기
      </button>

      <BottomNav active="home" />
    </div>
  )
}
