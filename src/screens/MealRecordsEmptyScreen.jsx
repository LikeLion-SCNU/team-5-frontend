import { useNavigate } from 'react-router-dom'
import useGoBack from '../hooks/useGoBack'
import BottomNav from '../components/BottomNav'
import { IconChevronLeft, IconImage, IconCamera } from '../components/Icons'

/** 오늘의 식탁 - 기록 (데이터 없음) */
export default function MealRecordsEmptyScreen() {
  const navigate = useNavigate()
  const goBack = useGoBack('/meal')

  return (
    <div className="screen">

      <div style={{ position: 'absolute', top: 44, left: 0, width: 393, height: 56 }}>
        <button
          className="pressable"
          aria-label="뒤로 가기"
          onClick={goBack}
          style={{ position: 'absolute', top: 12, left: 20, width: 32, height: 32, display: 'grid', placeItems: 'center' }}
        >
          <IconChevronLeft size={24} color="#2D241E" />
        </button>
        <span style={{ position: 'absolute', top: 17, left: 60, width: 180, fontSize: 18, fontWeight: 800, color: 'var(--ink)', pointerEvents: 'none' }}>
          기록된 오늘의 식탁
        </span>
        <button
          className="pressable"
          aria-label="식사 기록 관리"
          onClick={() => navigate('/settings/data/manage')}
          style={{ position: 'absolute', top: 16, left: 345, width: 24, height: 24 }}
        >
          <span style={{ position: 'absolute', top: 11, left: 4, width: 15, height: 2, borderRadius: 2, background: 'var(--ink)' }} />
        </button>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 220,
          left: 144,
          width: 104,
          height: 104,
          borderRadius: 100,
          background: 'var(--white)',
        }}
      >
        <span style={{ position: 'absolute', top: 28, left: 28 }}>
          <IconImage size={48} color="#8C7A6B" />
        </span>
      </div>

      <span
        style={{
          position: 'absolute',
          top: 348,
          left: 24,
          width: 345,
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 800,
          color: 'var(--ink)',
        }}
      >
        기록된 식탁이 없습니다
      </span>
      <span
        style={{
          position: 'absolute',
          top: 375,
          left: 24,
          width: 345,
          textAlign: 'center',
          fontSize: 13,
          fontWeight: 500,
          lineHeight: '19px',
          color: 'var(--muted)',
        }}
      >
        AI 카메라로 매끼 식사를 촬영하여 건강 수명 분석을 실시간으로 확인해보세요!
      </span>

      <button
        className="pressable"
        onClick={() => navigate('/meal')}
        style={{
          position: 'absolute',
          top: 431,
          left: 120,
          width: 153,
          height: 41,
          borderRadius: 12,
          background: 'var(--brown)',
        }}
      >
        <span style={{ position: 'absolute', top: 12, left: 24 }}>
          <IconCamera size={16} color="#FFFFFF" />
        </span>
        <span style={{ position: 'absolute', top: 12, left: 48, fontSize: 14, fontWeight: 700, color: 'var(--white)' }}>
          식단 기록하기
        </span>
      </button>

      <BottomNav active="meal" />
    </div>
  )
}
