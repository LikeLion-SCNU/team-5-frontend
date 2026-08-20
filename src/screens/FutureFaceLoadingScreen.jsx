import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useApp } from '../state/AppContext'

/** 미래 얼굴 예측 ing — 생성 중 */
export default function FutureFaceLoadingScreen() {
  const navigate = useNavigate()
  const { setFaceSimDone, facePhoto } = useApp()

  useEffect(() => {
    const t = setTimeout(() => {
      setFaceSimDone(true)
      navigate('/future/result', { replace: true })
    }, 2600)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="screen">
      <style>{`
        @keyframes nb-scan { 0% { transform: translateY(-110px); } 100% { transform: translateY(110px); } }
        @keyframes nb-spin { to { transform: rotate(360deg); } }
      `}</style>

      <Header title="습관 시뮬레이터" align="center" fallback="/future" />

      {/* 스캔 애니메이션 */}
      <div style={{ position: 'absolute', top: 180, left: 96, width: 200, height: 260, overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            width: 180,
            height: 240,
            borderRadius: '50%',
            border: '2px solid var(--line)',
            overflow: 'hidden',
          }}
        >
          {facePhoto && (
            <img
              src={facePhoto}
              alt="분석 중인 얼굴 사진"
              style={{ width: 176, height: 236, objectFit: 'cover' }}
            />
          )}
        </div>
        <div
          style={{
            position: 'absolute',
            top: 120,
            left: -5,
            width: 210,
            height: 4,
            background: 'linear-gradient(rgba(166,124,82,0), rgba(166,124,82,1))',
            animation: 'nb-scan 1.6s ease-in-out infinite alternate',
          }}
        />
      </div>

      <span
        style={{
          position: 'absolute',
          top: 480,
          left: 24,
          width: 345,
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 800,
          color: 'var(--ink)',
        }}
      >
        5년 후 모습을 계산 중입니다...
      </span>
      <span
        style={{
          position: 'absolute',
          top: 515,
          left: 24,
          width: 345,
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '21px',
          color: 'var(--muted)',
        }}
      >
        현재 식생활과 라이프스타일 패턴에 기인한 노화 지표를 분석 중입니다. 잠시만 기다려주세요.
      </span>

      {/* 스피너 */}
      <div
        style={{
          position: 'absolute',
          top: 595,
          left: 178,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '3px solid var(--beige-2)',
          borderTopColor: 'var(--brown)',
          animation: 'nb-spin 0.9s linear infinite',
        }}
      />

    </div>
  )
}
