import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import useGoBack from '../hooks/useGoBack'
import AlertModal from '../components/AlertModal'
import { join, login } from '../api/auth'
import { ApiError } from '../api/client'

const fieldLabel = {
  position: 'absolute',
  left: 24,
  fontSize: 14,
  fontWeight: 600,
  color: 'var(--ink)',
}

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

/** 회원가입 */
export default function SignUpScreen() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [alert, setAlert] = useState('')
  const goBack = useGoBack('/start')

  const [busy, setBusy] = useState(false)

  /** 아이디(이메일)·비밀번호는 필수 입력 */
  const submit = async () => {
    if (!name.trim()) {
      setAlert('이름을 입력해주세요.')
      return
    }
    if (!email.trim() || !pw.trim() || !pw2.trim()) {
      setAlert('이메일과 비밀번호는\n필수 입력 항목입니다.')
      return
    }
    if (!email.includes('@')) {
      setAlert('이메일 주소 형식을\n확인해주세요.')
      return
    }
    if (pw.length < 8) {
      setAlert('비밀번호는 8자리 이상\n영문·숫자 조합으로 입력해주세요.')
      return
    }
    if (pw !== pw2) {
      setAlert('비밀번호가 일치하지 않습니다.')
      return
    }
    if (busy) return
    setBusy(true)
    try {
      const joined = await join(email.trim(), pw, name.trim())
      if (joined?.verificationRequired) {
        navigate('/verify-email', { state: { email: email.trim(), password: pw } })
        return
      }
      await login(email.trim(), pw)
      navigate('/privacy')
    } catch (e) {
      if (e instanceof ApiError && e.status === 409) {
        setAlert('이미 가입된 이메일입니다.\n로그인해주세요.')
      } else {
        setAlert(e.message || '가입에 실패했어요.\n잠시 후 다시 시도해주세요.')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="screen">
      <span style={{ position: 'absolute', top: 112, left: 24, width: 345, fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>
        새로운 시간의 시작
      </span>
      <span style={{ position: 'absolute', top: 150, left: 24, width: 345, fontSize: 14, fontWeight: 500, color: 'var(--muted)' }}>
        수명 적립 서비스 회원가입을 시작합니다.
      </span>

      {/* 이름 */}
      <span style={{ ...fieldLabel, top: 200 }}>이름</span>
      <input
        style={{ ...inputBox, top: 226 }}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="실명을 입력해주세요"
      />

      {/* 이메일 */}
      <span style={{ ...fieldLabel, top: 276 }}>이메일 주소</span>
      <input
        style={{ ...inputBox, top: 302 }}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@email.com"
      />

      {/* 비밀번호 */}
      <span style={{ ...fieldLabel, top: 352 }}>비밀번호</span>
      <input
        style={{ ...inputBox, top: 378 }}
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        placeholder="8자리 이상 영문, 숫자 조합"
      />

      {/* 비밀번호 확인 */}
      <span style={{ ...fieldLabel, top: 428 }}>비밀번호 확인</span>
      <input
        style={{ ...inputBox, top: 454 }}
        type="password"
        value={pw2}
        onChange={(e) => setPw2(e.target.value)}
        placeholder="비밀번호를 한번 더 입력해 주세요"
      />

      <button
        className="pressable"
        onClick={() => navigate('/login')}
        style={{
          position: 'absolute',
          top: 596,
          left: 0,
          width: 393,
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--muted)',
        }}
      >
        이미 계정이 있어요 → 로그인
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
        가입 완료
      </button>

      <AlertModal open={!!alert} message={alert} onClose={() => setAlert('')} />

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
