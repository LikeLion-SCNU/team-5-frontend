import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import useGoBack from '../hooks/useGoBack'
import AlertModal from '../components/AlertModal'

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
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [alert, setAlert] = useState('')
  const goBack = useGoBack('/start')

  /** 아이디(이메일)·비밀번호는 필수 입력 */
  const submit = () => {
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
    navigate('/privacy')
  }

  return (
    <div className="screen">
      <span style={{ position: 'absolute', top: 112, left: 24, width: 345, fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>
        새로운 시간의 시작
      </span>
      <span style={{ position: 'absolute', top: 150, left: 24, width: 345, fontSize: 14, fontWeight: 500, color: 'var(--muted)' }}>
        수명 적립 서비스 회원가입을 시작합니다.
      </span>

      {/* 이메일 */}
      <span style={{ ...fieldLabel, top: 200 }}>이메일 주소</span>
      <input
        style={{ ...inputBox, top: 226 }}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@email.com"
      />

      {/* 비밀번호 */}
      <span style={{ ...fieldLabel, top: 298 }}>비밀번호</span>
      <input
        style={{ ...inputBox, top: 324 }}
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        placeholder="8자리 이상 영문, 숫자 조합"
      />

      {/* 비밀번호 확인 */}
      <span style={{ ...fieldLabel, top: 396 }}>비밀번호 확인</span>
      <input
        style={{ ...inputBox, top: 422 }}
        type="password"
        value={pw2}
        onChange={(e) => setPw2(e.target.value)}
        placeholder="비밀번호를 한번 더 입력해 주세요"
      />

      {/* 소셜/이메일 연결 */}
      <button
        className="pressable"
        onClick={() => navigate('/privacy')}
        style={{
          position: 'absolute',
          top: 498,
          left: 24,
          width: 345,
          height: 52,
          borderRadius: 12,
          background: 'var(--kakao)',
        }}
      >
        <img
          src="/images/kakao.png"
          alt="카카오톡"
          style={{ position: 'absolute', top: 4, left: 12, width: 44, height: 44 }}
        />
        <span
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            width: 313,
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--ink)',
          }}
        >
          카카오톡으로 시작하기
        </span>
      </button>

      <button
        className="pressable"
        onClick={() => navigate('/login')}
        style={{
          position: 'absolute',
          top: 580,
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
