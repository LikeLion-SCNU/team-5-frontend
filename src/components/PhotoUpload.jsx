import { useRef } from 'react'
import { IconCamera } from './Icons'

/**
 * 사진 넣는 영역 (345 x 345)
 * 누르면 사진을 고르고, 고른 사진이 그대로 이 자리에 보인다.
 * "오늘의 식탁 기록"과 "미래 얼굴 예측"이 같은 화면 구성을 쓴다.
 */
export default function PhotoUpload({ top = 168, photo, onPick, placeholder = '사진을 업로드하세요' }) {
  const fileRef = useRef(null)

  const onFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onPick(String(reader.result), file)
    reader.readAsDataURL(file)
    e.target.value = '' // 같은 파일을 다시 골라도 동작하도록
  }

  return (
    <>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFile} />

      <button
        className="pressable"
        onClick={() => fileRef.current?.click()}
        aria-label={photo ? '사진 다시 선택하기' : placeholder}
        style={{
          position: 'absolute',
          top,
          left: 24,
          width: 345,
          height: 345,
          borderRadius: 16,
          background: 'var(--white)',
          overflow: 'hidden',
        }}
      >
        {photo ? (
          <>
            <img
              src={photo}
              alt="선택한 사진"
              style={{ position: 'absolute', top: 0, left: 0, width: 345, height: 345, objectFit: 'cover' }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: 12,
                left: 102,
                width: 141,
                height: 34,
                borderRadius: 100,
                background: 'rgba(45,36,30,0.8)',
                color: 'var(--white)',
                fontSize: 13,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              사진 다시 선택하기
            </span>
          </>
        ) : (
          <>
            <span
              style={{
                position: 'absolute',
                top: 123,
                left: 140,
                width: 64,
                height: 64,
                borderRadius: 100,
                background: 'var(--cream)',
              }}
            >
              <span style={{ position: 'absolute', top: 16, left: 16 }}>
                <IconCamera size={32} color="#A67C52" />
              </span>
            </span>
            <span
              style={{
                position: 'absolute',
                top: 203,
                left: 0,
                width: 345,
                textAlign: 'center',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--muted)',
              }}
            >
              {placeholder}
            </span>
          </>
        )}
      </button>
    </>
  )
}
