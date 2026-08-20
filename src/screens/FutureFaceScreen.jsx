import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

/** 미래 얼굴 예측 — 좌우 비교 슬라이더 */
export default function FutureFaceScreen() {
  const navigate = useNavigate()
  const [split, setSplit] = useState(171) // 0 ~ 345
  const boxRef = useRef(null)

  const move = (clientX) => {
    const rect = boxRef.current?.getBoundingClientRect()
    if (!rect) return
    const ratio = (clientX - rect.left) / rect.width
    setSplit(Math.max(20, Math.min(325, ratio * 345)))
  }

  return (
    <div className="screen">
      <Header title="미래 얼굴 예측" align="center" fallback="/home" back={false} />

      {/* 비교 이미지 */}
      <div
        ref={boxRef}
        onMouseDown={(e) => move(e.clientX)}
        onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
        onTouchMove={(e) => move(e.touches[0].clientX)}
        style={{
          position: 'absolute',
          top: 124,
          left: 24,
          width: 345,
          height: 380,
          borderRadius: 20,
          overflow: 'hidden',
          background: 'var(--white)',
          touchAction: 'none',
        }}
      >
        <img
          src="/images/face_plan.png"
          alt="흑자 플랜 성공 시의 5년 후 얼굴"
          style={{ position: 'absolute', top: 0, left: 0, width: 345, height: 380, objectFit: 'cover' }}
        />
        <img
          src="/images/face_current.png"
          alt="현재 습관 유지 시의 5년 후 얼굴"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 345,
            height: 380,
            objectFit: 'cover',
            clipPath: `inset(0 ${345 - split}px 0 0)`,
          }}
        />
        <span style={{ position: 'absolute', top: 8, right: 8, padding: '3px 8px', borderRadius: 6, background: 'rgba(45,36,30,0.65)', color: 'var(--white)', fontSize: 11, fontWeight: 600 }}>
          예시 이미지
        </span>

        {/* 라벨 */}
        <span
          style={{
            position: 'absolute',
            top: 336,
            left: 12,
            width: 105,
            height: 26,
            borderRadius: 100,
            background: 'rgba(45,36,30,0.8)',
            color: 'var(--white)',
            fontSize: 12,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          현재 습관 유지 시
        </span>
        <span
          style={{
            position: 'absolute',
            top: 336,
            left: 215,
            width: 105,
            height: 26,
            borderRadius: 100,
            background: 'rgba(45,36,30,0.8)',
            color: 'var(--white)',
            fontSize: 12,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          흑자 플랜 성공 시
        </span>

        {/* 구분선 + 핸들 */}
        <div style={{ position: 'absolute', top: 0, left: split, width: 2, height: 380, background: 'var(--brown)' }} />
        <div
          style={{
            position: 'absolute',
            top: 172,
            left: split - 17,
            width: 36,
            height: 36,
            borderRadius: 100,
            background: 'var(--brown)',
            boxShadow: 'var(--shadow-soft)',
            color: 'var(--white)',
            fontSize: 12,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'ew-resize',
          }}
        >
          ◀ ▶
        </div>
      </div>

      {/* 고지 */}
      <div
        style={{
          position: 'absolute',
          top: 520,
          left: 24,
          width: 345,
          height: 82,
          borderRadius: 12,
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
            lineHeight: '18px',
            color: 'var(--ink)',
          }}
        >
          ⚠️ 본 화면은 건강 지표 기반 통계 모델에 따른 가상의 예측 시각화 자료이며, 실제 의학적 소견 또는 진단 결과를 대신하지
          않습니다.
        </span>
      </div>

      <span
        style={{
          position: 'absolute',
          top: 620,
          left: 24,
          width: 345,
          textAlign: 'center',
          fontSize: 12,
          fontWeight: 500,
          color: 'var(--muted-3)',
        }}
      >
        정면으로 얼굴이 잘 보여야 하는 사진이여야 합니다.
      </span>

      <button
        className="pressable"
        onClick={() => navigate('/future/upload')}
        style={{
          position: 'absolute',
          top: 666,
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
        미래 얼굴 예측하기
      </button>

      <BottomNav active="future" />
    </div>
  )
}
