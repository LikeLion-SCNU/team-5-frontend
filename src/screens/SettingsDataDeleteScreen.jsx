import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { IconAlertTriangle, IconCheck } from '../components/Icons'
import { useApp } from '../state/AppContext'

/** 설정 - 데이터 관리 - 데이터 삭제 확인 화면 */
export default function SettingsDataDeleteScreen() {
  const navigate = useNavigate()
  const [agreed, setAgreed] = useState(false)
  const { setHasData, setHasMealRecords, setPlanAccepted, setFaceSimDone } = useApp()

  const confirmDelete = () => {
    if (!agreed) return
    // 하드 삭제: 기록·시뮬레이션 결과 제거 후 초기 상태로
    setHasData(false)
    setHasMealRecords(false)
    setPlanAccepted(false)
    setFaceSimDone(false)
    navigate('/home-empty')
  }

  return (
    <div className="screen">
      {/* 뒤에 깔린 데이터 관리 화면 */}
      <Header title="데이터 관리" align="center" weight={700} fallback="/settings/data/manage" />
      <div style={{ position: 'absolute', top: 124, left: 24, width: 345, height: 160, borderRadius: 16, background: 'var(--white)' }} />

      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />

      <div
        style={{
          position: 'absolute',
          top: 265,
          left: 24,
          width: 345,
          height: 321,
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
            background: 'var(--red-bg)',
          }}
        >
          <span style={{ position: 'absolute', top: 12, left: 12 }}>
            <IconAlertTriangle size={28} color="#C84B31" />
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
          정말 삭제하시겠습니까?
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
          삭제된 데이터는 복구할 수 없으며, 누적된 수명 잔고 12,540시간이 영구 소멸됩니다.
        </span>

        <button
          className="pressable"
          onClick={() => setAgreed(!agreed)}
          aria-pressed={agreed}
          style={{ position: 'absolute', top: 201, left: 24, width: 297, height: 22, textAlign: 'left' }}
        >
          <span
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 22,
              height: 22,
              borderRadius: 6,
              background: 'var(--cream)',
              border: '1px solid var(--beige-2)',
            }}
          >
            {agreed && (
              <span style={{ position: 'absolute', top: 3, left: 3 }}>
                <IconCheck size={14} color="#C84B31" />
              </span>
            )}
          </span>
          <span style={{ position: 'absolute', top: 2, left: 32, fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
            위 내용을 확인했습니다
          </span>
        </button>

        <button
          className="pressable"
          onClick={() => navigate('/settings/data/manage')}
          style={{
            position: 'absolute',
            top: 247,
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
          취소
        </button>
        <button
          className="pressable"
          onClick={confirmDelete}
          disabled={!agreed}
          style={{
            position: 'absolute',
            top: 247,
            left: 179,
            width: 141,
            height: 50,
            borderRadius: 12,
            background: agreed ? 'var(--red)' : 'var(--muted-3)',
            color: agreed ? 'var(--white)' : 'var(--black)',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          최종 삭제
        </button>
      </div>

    </div>
  )
}
