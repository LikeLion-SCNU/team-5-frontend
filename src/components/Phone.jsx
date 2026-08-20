import { useEffect, useState } from 'react'

/**
 * 393 x 808 프레임 (와이어프레임 393x852에서 상단 상태바 베젤 44px 제외).
 * 화면이 작으면 비율을 유지한 채 축소해서 좌표가 그대로 유지되도록 한다.
 */
export default function Phone({ children }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const fit = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      setScale(Math.min(w / 393, h / 808, 1))
    }
    fit()
    window.addEventListener('resize', fit)
    window.addEventListener('orientationchange', fit)
    return () => {
      window.removeEventListener('resize', fit)
      window.removeEventListener('orientationchange', fit)
    }
  }, [])

  return (
    <div className="stage">
      <div className="phone" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  )
}
