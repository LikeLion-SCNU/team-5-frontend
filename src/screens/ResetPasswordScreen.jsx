import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import AlertModal from '../components/AlertModal'
import useGoBack from '../hooks/useGoBack'

const label = { position: 'absolute', left: 24, fontSize: 14, fontWeight: 600, color: 'var(--ink)' }
const box = {
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

/** 비밀번호 찾기 ② — 새 비밀번호 재설정 */
export default function ResetPasswordScreen() {
  const navigate = useNavigate()
  const goBack = useGoBack('/login/find')
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [alert, setAlert] = useState({ msg: '', tone: 'error', done: false })

  const close = () => {
    const done = alert.done
    setAlert({ msg: '', tone: 'error', done: false })
    if (done) navigate('/login')
  }

  const submit = () => {
    if (!pw.trim() || !pw2.trim()) {
      setAlert({ msg: '새 비밀번호를\n모두 입력해주세요.', tone: 'error', done: false })
      return
    }
    if (pw.length < 8) {
      setAlert({ msg: '비밀번호는 8자리 이상\n영문·숫자 조합으로 입력해주세요.', tone: 'error', done: false })
      return
    }
    if (pw !== pw2) {
      setAlert({ msg: '비밀번호가 일치하지 않습니다.', tone: 'error', done: false })
      return
    }
    setAlert({ msg: '비밀번호가 변경되었습니다.\n새 비밀번호로 로그인해주세요.', tone: 'success', done: true })
  }

  return (
    <div className="screen">
      <span style={{ position: 'absolute', top: 124, left: 24, width: 345, fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>
        새 비밀번호 설정
      </span>
      <span
        style={{ position: 'absolute', top: 160, left: 24, width: 345, fontSize: 14, fontWeight: 500, lineHeight: '21px', color: 'var(--muted)' }}
      >
        앞으로 사용할 비밀번호를 입력해주세요.
      </span>

      <span style={{ ...label, top: 212 }}>새 비밀번호</span>
      <input
        style={{ ...box, top: 238 }}
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        placeholder="8자리 이상 영문, 숫자 조합"
      />

      <span style={{ ...label, top: 310 }}>새 비밀번호 확인</span>
      <input
        style={{ ...box, top: 336 }}
        type="password"
        value={pw2}
        onChange={(e) => setPw2(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        placeholder="비밀번호를 한번 더 입력해 주세요"
      />

      <button
        className="pressable"
        onClick={submit}
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
        비밀번호 변경하기
      </button>

      <AlertModal open={!!alert.msg} message={alert.msg} tone={alert.tone} onClose={close} />

      <Header
        title="비밀번호 재설정"
        align="center"
        weight={700}
        fallback="/login/find"
        onBack={() => {
          setAlert({ msg: '', tone: 'error', done: false })
          goBack()
        }}
      />
    </div>
  )
}
