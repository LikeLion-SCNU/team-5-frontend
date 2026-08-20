import { useEffect, useState } from 'react'
import { getProtectionStatus, setProtectionMode as apiSetProtectionMode, acceptProtectionProposal, rejectProtectionProposal } from '../api/protection'
import { isLoggedIn } from '../api/client'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { IconShield } from '../components/Icons'
import { useApp } from '../state/AppContext'

/**
 * 보호 모드 권장
 * (일별 수명 명세서 & 나의 시간 흐름을 1시간 동안 5회 이상 조회 시 뜸)
 */
export default function ProtectionSuggestScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setProtectionMode } = useApp()

  /* 서버가 띄운 보호 모드 제안 id — 홈에서 전달받고, 없으면 상태 API로 조회한다 */
  const [proposalId, setProposalId] = useState(location.state?.proposalId ?? null)
  useEffect(() => {
    if (!isLoggedIn()) return
    getProtectionStatus()
      .then((st) => setProposalId((cur) => cur ?? st.activeProposal?.id ?? null))
      .catch(() => {})
  }, [])

  const decline = () => {
    if (proposalId) rejectProtectionProposal(proposalId).catch(() => {})
    navigate('/home')
  }
  const accept = () => {
    if (proposalId) acceptProtectionProposal(proposalId).catch(() => {})
    else if (isLoggedIn()) apiSetProtectionMode(true).catch(() => {})
    setProtectionMode(true)
    navigate('/settings/protection')
  }

  return (
    <div className="screen">
      <Header title="설정" align="right" weight={700} onBack={decline} />
      <div style={{ position: 'absolute', top: 124, left: 24, width: 345, height: 220, borderRadius: 16, background: 'var(--white)' }} />

      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />

      <div
        style={{
          position: 'absolute',
          top: 288,
          left: 24,
          width: 345,
          height: 275,
          borderRadius: 20,
          background: 'var(--white)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 146,
            width: 52,
            height: 52,
            borderRadius: 100,
            background: 'var(--green-bg)',
          }}
        >
          <span style={{ position: 'absolute', top: 12, left: 12 }}>
            <IconShield size={28} color="#4A7C59" />
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
          조금 지치셨나요?
        </span>
        <span
          style={{
            position: 'absolute',
            top: 135,
            left: 24,
            width: 297,
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '21px',
            color: 'var(--muted)',
          }}
        >
          잔고 5회 이상 조회가 감지되었어요. 긍정적 회복만 보여주는 보호 모드를 켤까요?
        </span>

        <button
          className="pressable"
          onClick={decline}
          style={{
            position: 'absolute',
            top: 201,
            left: 24,
            width: 143,
            height: 50,
            borderRadius: 12,
            background: 'var(--cream)',
            color: 'var(--muted)',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          아니요
        </button>
        <button
          className="pressable"
          onClick={accept}
          style={{
            position: 'absolute',
            top: 201,
            left: 179,
            width: 141,
            height: 50,
            borderRadius: 12,
            background: 'var(--brown)',
            color: 'var(--black)',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          네, 켤게요
        </button>
      </div>

    </div>
  )
}
