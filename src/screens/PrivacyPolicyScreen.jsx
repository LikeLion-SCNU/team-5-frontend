import { useNavigate } from 'react-router-dom'
import PrivacyPolicyBase from './PrivacyPolicyBase'
import { useApp } from '../state/AppContext'

/** 개인정보 처리방침 */
export default function PrivacyPolicyScreen() {
  const navigate = useNavigate()
  const { consents } = useApp()

  const confirm = () => {
    const all = consents.collect && consents.purpose && consents.sensitive
    // 모두 동의하지 않으면 알림창 화면
    navigate(all ? '/onboarding' : '/privacy/alert')
  }

  return (
    <div className="screen">
      <PrivacyPolicyBase onConfirm={confirm} />
    </div>
  )
}
