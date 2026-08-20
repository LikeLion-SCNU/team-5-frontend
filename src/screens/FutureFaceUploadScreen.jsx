import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import PhotoUpload from '../components/PhotoUpload'
import AlertModal from '../components/AlertModal'
import { useApp } from '../state/AppContext'

/** 미래 얼굴 예측 — 사진 넣는 화면 ("오늘의 식탁 기록"과 같은 구성) */
export default function FutureFaceUploadScreen() {
  const navigate = useNavigate()
  const { facePhoto, setFacePhoto } = useApp()
  const [alert, setAlert] = useState('')

  const start = () => {
    if (!facePhoto) {
      setAlert('얼굴 사진을 먼저 올려주세요.')
      return
    }
    navigate('/future/loading')
  }

  return (
    <div className="screen">
      <Header title="미래 얼굴 예측" align="center" fallback="/future" />

      <span style={{ position: 'absolute', top: 124, left: 24, width: 345, fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>
        예측할 얼굴 사진을 촬영하거나 올려주세요
      </span>

      <PhotoUpload top={168} photo={facePhoto} onPick={setFacePhoto} />

      <div
        style={{
          position: 'absolute',
          top: 525,
          left: 24,
          width: 345,
          height: 58,
          borderRadius: 10,
          background: 'var(--yellow-bg)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            width: 317,
            fontSize: 12,
            fontWeight: 600,
            lineHeight: '16px',
            color: 'var(--ink)',
          }}
        >
          ⚠️ 업로드한 얼굴 사진 원본은 결과 이미지가 생성된 직후 서버에서 즉시 파기되며, 어떠한 용도로도 보관되지 않습니다.
        </span>
      </div>

      <span
        style={{
          position: 'absolute',
          top: 594,
          left: 24,
          width: 345,
          textAlign: 'center',
          fontSize: 12,
          fontWeight: 500,
          color: 'var(--muted-3)',
        }}
      >
        정면으로 얼굴이 잘 보여야 하는 사진이여야 합니다.
      </span>

      <button
        className="pressable"
        onClick={start}
        style={{
          position: 'absolute',
          top: 620,
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
        미래 얼굴 예측하기
      </button>

      <BottomNav active="future" />

      <AlertModal open={!!alert} message={alert} onClose={() => setAlert('')} />
    </div>
  )
}
