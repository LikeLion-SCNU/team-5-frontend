import { useNavigate } from 'react-router-dom'
import useGoBack from '../hooks/useGoBack'
import BottomNav from '../components/BottomNav'
import { IconChevronLeft } from '../components/Icons'
import { useApp } from '../state/AppContext'

/** 미래 얼굴 예측 결과 */
export default function FutureFaceResultScreen() {
  const navigate = useNavigate()
  const goBack = useGoBack('/future')
  const { setPlanAccepted, faceResult } = useApp()

  const cards = [
    { key: 'current', left: 24, img: faceResult?.currentUrl || '/images/face_result_current.png', label: '현재 습관 유지 시', bg: 'var(--red-bg-2)', color: 'var(--red)' },
    { key: 'plan', left: 202, img: faceResult?.improvedUrl || '/images/face_result_plan.png', label: '투자 플랜 성공 시', bg: 'var(--green-bg)', color: 'var(--green)' },
  ]

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
        <span style={{ position: 'absolute', top: 17, left: 60, width: 200, fontSize: 18, fontWeight: 800, color: 'var(--ink)', pointerEvents: 'none' }}>
          미래 얼굴 예측 결과
        </span>
        <button
          className="pressable"
          aria-label="시뮬레이션 결과 관리"
          onClick={() => navigate('/settings/data/manage')}
          style={{ position: 'absolute', top: 16, left: 345, width: 24, height: 24 }}
        >
          <span style={{ position: 'absolute', top: 11, left: 4, width: 15, height: 2, borderRadius: 2, background: 'var(--ink)' }} />
        </button>
      </div>

      {cards.map(({ key, left, img, label, bg, color }) => (
        <div
          key={key}
          style={{
            position: 'absolute',
            top: 124,
            left,
            width: 166,
            height: 260,
            borderRadius: 12,
            background: 'var(--white)',
            overflow: 'hidden',
          }}
        >
          <img src={img} alt={label} style={{ position: 'absolute', top: 0, left: 0, width: 166, height: 200, objectFit: 'cover' }} />
          <div
            style={{
              position: 'absolute',
              top: 200,
              left: 0,
              width: 166,
              height: 35,
              background: bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              color,
            }}
          >
            {label}
          </div>
        </div>
      ))}

      <span
        style={{
          position: 'absolute',
          top: 404,
          left: 24,
          width: 345,
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 800,
          color: 'var(--ink)',
        }}
      >
        5년 후 예상 모습입니다
      </span>
      <span
        style={{
          position: 'absolute',
          top: 434,
          left: 24,
          width: 345,
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '21px',
          color: 'var(--muted)',
        }}
      >
        현재 식습관과 수면 패턴을 유지할 경우보다, 하루 2시간 건강 흑자 습관을 실천했을 때 세포 재생률 향상으로 더욱 맑고 탄력 있는
        얼굴을 유지할 수 있습니다.
      </span>

      <div
        style={{
          position: 'absolute',
          top: 517,
          left: 24,
          width: 345,
          height: 58,
          borderRadius: 10,
          background: 'var(--yellow-bg)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            width: 317,
            fontSize: 12,
            fontWeight: 600,
            lineHeight: '16px',
            color: 'var(--ink)',
          }}
        >
          ⚠️ 본 화면은 건강 지표 기반 통계 모델에 따른 가상의 예측 시각화 자료이며, 실제 의학적 소견 또는 진단 결과를 대신하지
          않습니다.
        </span>
      </div>

      <button
        className="pressable"
        onClick={() => {
          setPlanAccepted(true)
          navigate('/plan')
        }}
        style={{
          position: 'absolute',
          top: 713,
          left: 24,
          width: 345,
          height: 51,
          borderRadius: 12,
          background: 'var(--brown)',
          color: 'var(--white)',
          fontSize: 16,
          fontWeight: 800,
        }}
      >
        플랜 시작하기
      </button>

      <BottomNav active="future" />
    </div>
  )
}
