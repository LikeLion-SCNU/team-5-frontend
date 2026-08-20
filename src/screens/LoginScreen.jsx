import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import useGoBack from '../hooks/useGoBack'
import AlertModal from '../components/AlertModal'
import { login } from '../api/auth'
import { ApiError } from '../api/client'

const fieldLabel = { position: 'absolute', left: 24, fontSize: 14, fontWeight: 600, color: 'var(--ink)' }
const inputBox = {
  position: 'absolute',
  left: 24,
  width: 345,
  height: 52,
  borderRadius: 12,
  background: 'var(--white)',
  border: 'none',
  outline: 'none',
  padding: '0 16px',
  fontSize: 14,
  fontWeight: 400,
  color: 'var(--ink)',
}

/** 로그인 */
export default function LoginScreen() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

  const [alert, setAlert] = useState('')
  const [busy, setBusy] = useState(false)
  const goBack = useGoBack('/start')

  const submit = async () => {
    // 아이디(이메일)·비밀번호는 필수 입력
    if (!email.trim() || !pw.trim()) {
      setAlert('이메일과 비밀번호는\n필수 입력 항목입니다.')
      return
    }
    // 형식이 맞지 않으면 로그인 오류 화면
    if (!email.includes('@') || pw.length < 8) {
      navigate('/login/error')
      return
    }
    if (busy) return
    setBusy(true)
    try {
      await login(email.trim(), pw)
      navigate('/onboarding')
    } catch (e) {
      // 미인증 계정은 인증 화면으로 안내
      if (e instanceof ApiError && e.code === 'EMAIL_NOT_VERIFIED') {
        navigate('/verify-email', { state: { email: email.trim(), password: pw } })
        return
      }
      // 자격 증명 오류는 로그인 오류 화면으로, 그 외(네트워크 등)는 알림으로
      if (e instanceof ApiError && (e.status === 401 || e.status === 400)) {
        navigate('/login/error')
      } else {
        setAlert(e.message || '로그인에 실패했어요.\n잠시 후 다시 시도해주세요.')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="screen">
      <span style={{ position: 'absolute', top: 124, left: 24, width: 345, fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>
        다시 오셨군요!
      </span>
      <span style={{ position: 'absolute', top: 162, left: 24, width: 345, fontSize: 14, fontWeight: 500, color: 'var(--muted)' }}>
        로그인하여 오늘 하루의 가치를 쌓아보세요.
      </span>

      <span style={{ ...fieldLabel, top: 212 }}>이메일 주소</span>
      <input
        style={{ ...inputBox, top: 238 }}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일 주소"
      />

      <span style={{ ...fieldLabel, top: 310 }}>비밀번호</span>
      <input
        style={{ ...inputBox, top: 336 }}
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        placeholder="비밀번호"
      />

      <button
        className="pressable"
        onClick={submit}
        style={{
          position: 'absolute',
          top: 427,
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
        로그인
      </button>

      <AlertModal open={!!alert} message={alert} onClose={() => setAlert('')} />

      {/* 헤더는 알림창보다 위에 그려서 " < " 한 번에 뒤로 갈 수 있게 한다 */}
      <Header
        title=""
        fallback="/start"
        onBack={() => {
          setAlert('')
          goBack()
        }}
      />
    </div>
  )
}
