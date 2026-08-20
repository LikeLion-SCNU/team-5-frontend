import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { IconAlertCircle } from '../components/Icons'

/** 로그인 오류 */
export default function LoginErrorScreen() {
  const navigate = useNavigate()

  return (
    <div className="screen">
      {/* 뒤에 깔린 로그인 화면 */}
      <Header title="로그인" align="right" weight={700} fallback="/login" />
      <div
        style={{
          position: 'absolute',
          top: 124,
          left: 24,
          width: 345,
          height: 160,
          borderRadius: 16,
          background: 'var(--white)',
        }}
      />

      {/* 딤 오버레이 */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />

      {/* 오류 모달 */}
      <div
        style={{
          position: 'absolute',
          top: 298,
          left: 24,
          width: 345,
          height: 256,
          borderRadius: 20,
          background: 'var(--white)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 122,
            width: 52,
            height: 52,
            borderRadius: 100,
            background: 'var(--red-bg)',
          }}
        >
          <span style={{ position: 'absolute', top: 12, left: 12 }}>
            <IconAlertCircle size={28} color="#C84B31" />
          </span>
        </div>

        <span
          style={{
            position: 'absolute',
            top: 88,
            left: 24,
            width: 297,
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 800,
            color: 'var(--ink)',
          }}
        >
          아이디/비밀번호를 확인해주세요.
        </span>

        <button
          className="pressable"
          onClick={() => navigate('/login')}
          style={{
            position: 'absolute',
            top: 135,
            left: 24,
            width: 297,
            height: 50,
            borderRadius: 12,
            background: 'var(--muted-3)',
            color: 'var(--black)',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          확인
        </button>

        <span
          style={{
            position: 'absolute',
            top: 209,
            left: 24,
            width: 297,
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--muted)',
          }}
        >
          아이디 또는 비밀번호를 잊으셨나요?
        </span>
      </div>

    </div>
  )
}
