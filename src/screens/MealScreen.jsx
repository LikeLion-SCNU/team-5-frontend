import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import PhotoUpload from '../components/PhotoUpload'
import { useApp } from '../state/AppContext'

/** 오늘의 식탁 기록 — 사진 업로드 */
export default function MealScreen() {
  const navigate = useNavigate()
  const { hasMealRecords, mealPhoto, setMealPhoto } = useApp()

  const pick = (dataUrl) => {
    setMealPhoto(dataUrl)
    navigate('/meal/analysis')
  }

  return (
    <div className="screen">
      <Header title="오늘의 식탁 기록" align="center" fallback="/home" back={false} />

      <span style={{ position: 'absolute', top: 124, left: 24, width: 345, fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>
        식탁 위의 음식을 촬영하거나 올려주세요
      </span>

      <PhotoUpload top={168} photo={mealPhoto} onPick={pick} />

      <span
        style={{
          position: 'absolute',
          top: 537,
          left: 24,
          width: 345,
          textAlign: 'center',
          fontSize: 13,
          fontWeight: 400,
          lineHeight: '19px',
          color: 'var(--muted)',
        }}
      >
        AI가 식단을 분석하여 오늘의 환산 수명 잔고를 실시간으로 계산해 드립니다.
      </span>

      <button
        className="pressable"
        onClick={() => navigate(hasMealRecords ? '/meal/records' : '/meal/records-empty')}
        style={{
          position: 'absolute',
          top: 640,
          left: 24,
          width: 345,
          height: 50,
          borderRadius: 16,
          background: 'var(--brown)',
          color: 'var(--white)',
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        기록된 오늘의 식탁 보기
      </button>

      <BottomNav active="meal" />
    </div>
  )
}
