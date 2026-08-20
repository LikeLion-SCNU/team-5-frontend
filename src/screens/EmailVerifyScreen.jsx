import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import AlertModal from '../components/AlertModal'
import { login, resendVerification, verifyEmail } from '../api/auth'
import { ApiError } from '../api/client'

/** 이메일 인증 — 가입 시 발송된 6자리 코드를 입력한다 */
export default function EmailVerifyScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email ?? ''
  const password = location.state?.password ?? ''

  const [code, setCode] = useState('')
  const [alert, setAlert] = useState('')
  const [busy, setBusy] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (!email) navigate('/signup', { replace: true })
  }, [email, navigate])

  useEffect(() => {
    if (cooldown <= 0) return undefined
    const t = setInterval(() => setCooldown((v) => v - 1), 1000)
    return () => clearInterval(t)
  }, [cooldown])

  const submit = async () => {
    if (code.trim().length !== 6) {
      setAlert('메일로 받은 6자리 인증 코드를\n입력해주세요.')
      return
    }
    if (busy) return
    setBusy(true)
    try {
      await verifyEmail(email, code.trim())
      if (password) {
        await login(email, password)
        navigate('/privacy')
      } else {
        navigate('/login')
      }
    } catch (e) {
      if (e instanceof ApiError && e.code === 'VERIFICATION_CODE_EXPIRED') {
        setAlert('인증 코드가 만료되었습니다.\n재전송 후 다시 시도해주세요.')
      } else if (e instanceof ApiError && e.code === 'INVALID_VERIFICATION_CODE') {
        setAlert('인증 코드가 올바르지 않습니다.\n다시 확인해주세요.')
      } else {
        setAlert(e.message || '인증에 실패했어요.\n잠시 후 다시 시도해주세요.')
      }
    } finally {
      setBusy(false)
    }
  }

  const resend = async () => {
    if (cooldown > 0 || busy) return
    try {
      await resendVerification(email)
      setCooldown(60)
      setAlert('인증 코드를 다시 보냈습니다.\n받은 편지함을 확인해주세요.')
    } catch (e) {
      setAlert(e.message || '재전송에 실패했어요.')
    }
  }

  return (
    <div className="screen">
      <span style={{ position: 'absolute', top: 112, left: 24, width: 345, fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>
        이메일 인증
      </span>
      <span style={{ position: 'absolute', top: 150, left: 24, width: 345, fontSize: 14, fontWeight: 500, color: 'var(--muted)', lineHeight: 1.5 }}>
        {email} 주소로 보낸{'\n'}6자리 인증 코드를 입력해주세요.
      </span>

      <span style={{ position: 'absolute', top: 224, left: 24, fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>인증 코드</span>
      <input
        style={{
          position: 'absolute',
          top: 250,
          left: 24,
          width: 345,
          height: 56,
          borderRadius: 12,
          background: 'var(--white)',
          border: 'none',
          outline: 'none',
          padding: '0 16px',
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: '0.4em',
          textAlign: 'center',
          color: 'var(--ink)',
        }}
        type="text"
        inputMode="numeric"
        maxLength={6}
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
        placeholder="000000"
      />

      <button
        className="pressable"
        onClick={resend}
        style={{
          position: 'absolute',
          top: 322,
          left: 0,
          width: 393,
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 500,
          color: cooldown > 0 ? 'var(--muted)' : 'var(--brown)',
        }}
      >
        {cooldown > 0 ? `코드 재전송 (${cooldown}초 후 가능)` : '코드를 못 받으셨나요? → 재전송'}
      </button>

      <button
        className="pressable"
        onClick={submit}
        style={{
          position: 'absolute',
          top: 761,
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
        인증 완료
      </button>

      <AlertModal open={!!alert} message={alert} onClose={() => setAlert('')} />
      <Header title="" fallback="/signup" />
    </div>
  )
}
