import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import AlertModal from '../components/AlertModal'
import useGoBack from '../hooks/useGoBack'

const label = { position: 'absolute', left: 24, fontSize: 14, fontWeight: 600, color: 'var(--ink)' }
const box = {
  position: 'absolute',
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

/** 비밀번호 찾기 ① — 이메일 인증 */
export default function FindPasswordScreen() {
  const navigate = useNavigate()
  const goBack = useGoBack('/login')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [sent, setSent] = useState(false)
  const [alert, setAlert] = useState({ msg: '', tone: 'error' })

  const sendCode = () => {
    if (!email.trim()) {
      setAlert({ msg: '이메일 주소를 입력해주세요.', tone: 'error' })
      return
    }
    if (!email.includes('@')) {
      setAlert({ msg: '이메일 주소 형식을\n확인해주세요.', tone: 'error' })
      return
    }
    setSent(true)
    setAlert({ msg: '인증 코드를 보냈습니다.\n메일함을 확인해주세요.', tone: 'success' })
  }

  const verify = () => {
    if (!sent) {
      setAlert({ msg: '먼저 인증 코드를 받아주세요.', tone: 'error' })
      return
    }
    if (!/^\d{6}$/.test(code.trim())) {
      setAlert({ msg: '인증 코드 6자리를\n정확히 입력해주세요.', tone: 'error' })
      return
    }
    navigate('/login/reset')
  }

  return (
    <div className="screen">
      <span style={{ position: 'absolute', top: 124, left: 24, width: 345, fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>
        비밀번호를 잊으셨나요?
      </span>
      <span
        style={{ position: 'absolute', top: 160, left: 24, width: 345, fontSize: 14, fontWeight: 500, lineHeight: '21px', color: 'var(--muted)' }}
      >
        가입하신 이메일 주소로 인증 코드를 보내드립니다.
      </span>

      {/* 이메일 */}
      <span style={{ ...label, top: 212 }}>이메일 주소</span>
      <input
        style={{ ...box, top: 238, left: 24, width: 227 }}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@email.com"
      />
      <button
        className="pressable"
        onClick={sendCode}
        style={{
          position: 'absolute',
          top: 238,
          left: 259,
          width: 110,
          height: 52,
          borderRadius: 12,
          background: 'var(--brown)',
          color: 'var(--white)',
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        {sent ? '다시 받기' : '코드 받기'}
      </button>

      {/* 인증 코드 */}
      <span style={{ ...label, top: 310, color: sent ? 'var(--ink)' : 'var(--muted-3)' }}>인증 코드</span>
      <input
        style={{ ...box, top: 336, left: 24, width: 345, opacity: sent ? 1 : 0.5, letterSpacing: '4px' }}
        inputMode="numeric"
        maxLength={6}
        disabled={!sent}
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
        placeholder="6자리 숫자"
      />
      <span style={{ position: 'absolute', top: 396, left: 24, width: 345, fontSize: 12, fontWeight: 500, color: 'var(--muted)' }}>
        {sent ? '이메일로 받은 6자리 코드를 입력해주세요.' : '코드 받기를 누르면 입력할 수 있습니다.'}
      </span>

      <button
        className="pressable"
        onClick={verify}
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
        인증 확인
      </button>

      <AlertModal open={!!alert.msg} message={alert.msg} tone={alert.tone} onClose={() => setAlert({ msg: '', tone: 'error' })} />

      <Header
        title="비밀번호 찾기"
        align="center"
        weight={700}
        fallback="/login"
        onBack={() => {
          setAlert({ msg: '', tone: 'error' })
          goBack()
        }}
      />
    </div>
  )
}
