import { useNavigate } from 'react-router-dom'

/** 시작 화면 (로그인하면 안 나옴) */
export default function StartScreen() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      {/* 앱 로고 (이미지 파일: public/images/logo.png) */}
      <div style={{ position: 'absolute', top: 44, left: 0, width: 393, height: 220 }}>
        <div
          style={{
            position: 'absolute',
            top: 50,
            left: 116,
            width: 160,
            height: 160,
            borderRadius: 80,
            background: 'var(--white)',
            boxShadow: 'var(--shadow-card)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <img src="/images/logo.png" alt="내일은행 로고" style={{ width: 60, height: 60 }} />
        </div>
      </div>

      {/* 카피 */}
      <span
        className="pre"
        style={{
          position: 'absolute',
          top: 304,
          left: 24,
          width: 345,
          textAlign: 'center',
          fontSize: 28,
          fontWeight: 800,
          lineHeight: '40px',
          color: 'var(--ink)',
        }}
      >
        {'잃어버린 나의 시간,\n오늘부터 적립하세요.'}
      </span>
      <span
        style={{
          position: 'absolute',
          top: 398,
          left: 24,
          width: 345,
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 500,
          color: 'var(--muted)',
        }}
      >
        당신의 매일이 수명 잔고로 쌓이는 마법.
      </span>

      {/* CTA */}
      <button
        className="pressable"
        onClick={() => navigate('/signup')}
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
        내 수명 잔고 확인하기
      </button>
    </div>
  )
}
