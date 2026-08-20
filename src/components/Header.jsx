import useGoBack from '../hooks/useGoBack'
import { IconChevronLeft } from './Icons'

/**
 * 상단 헤더 (393 x 56)
 * 좌측 " < " 는 실제 뒤로가기. 뒤로 갈 기록이 없으면 fallback 경로로 이동한다.
 *
 * 주의: 가운데/우측 정렬 제목은 폭이 393px 이라 뒤로가기 버튼 위를 덮는다.
 *      제목을 먼저 그리고 pointer-events 를 꺼서 클릭이 항상 버튼에 닿게 한다.
 *
 * align: 'left' | 'center' | 'right'
 */
export default function Header({
  title,
  align = 'left',
  back = true,
  onBack,
  fallback = '/home',
  right = null,
  weight = 800,
  size = 18,
}) {
  const goBack = useGoBack(fallback)
  const handleBack = onBack || goBack

  return (
    <div style={{ position: 'absolute', top: 44, left: 0, width: 393, height: 56 }}>
      <span
        style={{
          position: 'absolute',
          top: 17,
          fontSize: size,
          fontWeight: weight,
          color: 'var(--ink)',
          pointerEvents: 'none', // 뒤로가기 버튼 클릭을 가로채지 않도록
          ...(align === 'center'
            ? { left: 0, width: 393, textAlign: 'center' }
            : align === 'right'
              ? { left: 0, width: 377, textAlign: 'right' }
              : { left: back ? 60 : 24 }),
        }}
      >
        {title}
      </span>

      {back && (
        <button
          className="pressable"
          onClick={handleBack}
          aria-label="뒤로 가기"
          style={{ position: 'absolute', top: 12, left: 20, width: 32, height: 32, display: 'grid', placeItems: 'center' }}
        >
          <IconChevronLeft size={24} color="#2D241E" />
        </button>
      )}

      {right && <div style={{ position: 'absolute', top: 16, left: 345, width: 24, height: 24 }}>{right}</div>}
    </div>
  )
}
