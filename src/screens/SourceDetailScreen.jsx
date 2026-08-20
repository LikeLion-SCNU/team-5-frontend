import { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import { IconChevronLeft, IconChevronRight } from '../components/Icons'
import { SOURCES } from '../content/sources'

const PAGE_W = 393
const PAGE_H = 752

/**
 * 연구 출처 상세 — 수면 / 활동 & 식사 / 스크린타임 3장을
 * 옆으로 넘겨서(스와이프·화살표) 볼 수 있는 화면.
 */
export default function SourceDetailScreen() {
  const pagerRef = useRef(null)
  const [, setPage] = useState(0)

  const goto = (i) => {
    const next = Math.max(0, Math.min(SOURCES.length - 1, i))
    setPage(next)
    const el = pagerRef.current
    if (!el) return
    el.scrollTo({ left: next * PAGE_W, behavior: 'smooth' })
    // 부드러운 스크롤이 동작하지 않는 환경 대비
    setTimeout(() => {
      if (Math.abs(el.scrollLeft - next * PAGE_W) > 2) el.scrollLeft = next * PAGE_W
    }, 400)
  }

  // 손으로 넘겼을 때 현재 페이지 번호를 맞춘다
  useEffect(() => {
    const el = pagerRef.current
    if (!el) return
    const onScroll = () => setPage(Math.round(el.scrollLeft / PAGE_W))
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="screen">
      <Header title="연구 출처 상세" align="center" fallback="/receipt" />

      <div
        ref={pagerRef}
        className="pager"
        style={{
          position: 'absolute',
          top: 100,
          left: 0,
          width: PAGE_W,
          height: PAGE_H,
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
        }}
      >
        {SOURCES.map((s, i) => (
          <div key={s.id} style={{ position: 'relative', flex: 'none', width: PAGE_W, height: PAGE_H, scrollSnapAlign: 'start' }}>
            {/* 본문 */}
            <div
              className="scroll-y"
              style={{ position: 'absolute', top: 24, left: 0, width: PAGE_W, height: 616, padding: '0 24px' }}
            >
              {/* 논문 카드 */}
              <div
                style={{
                  width: 345,
                  borderRadius: 16,
                  background: 'var(--white)',
                  boxShadow: 'var(--shadow-card)',
                  padding: 24,
                  marginBottom: 24,
                }}
              >
                <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span
                    style={{
                      padding: '4px 8px',
                      borderRadius: 6,
                      background: 'var(--green-bg)',
                      fontSize: 12,
                      fontWeight: 700,
                      color: 'var(--green)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    연구 기반 모델
                  </span>
                  <span
                    style={{
                      padding: '4px 8px',
                      borderRadius: 6,
                      background: 'var(--beige)',
                      fontSize: 12,
                      fontWeight: 700,
                      color: 'var(--brown)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {s.category}
                  </span>
                </div>

                <div style={{ fontSize: 18, fontWeight: 800, lineHeight: '26px', color: 'var(--ink)', marginBottom: 14 }}>
                  {s.title}
                </div>

                <div style={{ fontSize: 13, fontWeight: 600, lineHeight: '18px', color: 'var(--muted)' }}>{s.journal}</div>
                <div style={{ fontSize: 13, fontWeight: 400, lineHeight: '18px', wordBreak: 'break-all', color: 'var(--brown)' }}>
                  {s.doi}
                </div>
              </div>

              {/* 연구 요약 */}
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>연구 요약</div>
              {s.paragraphs.map((t, k) => (
                <p
                  key={k}
                  style={{
                    margin: 0,
                    marginBottom: 14,
                    width: 345,
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '21px',
                    color: 'var(--muted)',
                  }}
                >
                  {t}
                </p>
              ))}
            </div>

            {/* 원문 보기 — 페이지 표시 바로 위 */}
            <a
              className="pressable"
              href={s.link}
              target="_blank"
              rel="noreferrer"
              style={{
                position: 'absolute',
                top: 652,
                left: 24,
                width: 345,
                height: 42,
                borderRadius: 30,
                background: 'var(--brown)',
                color: 'var(--white)',
                fontSize: 14,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
              }}
            >
              {s.linkLabel}
            </a>

            {/* 페이지 표시 */}
            <div
              style={{
                position: 'absolute',
                top: 706,
                left: 0,
                width: PAGE_W,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
              }}
            >
              <button
                className="pressable"
                aria-label="이전 연구"
                disabled={i === 0}
                onClick={() => goto(i - 1)}
                style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', opacity: i === 0 ? 0.3 : 1 }}
              >
                <IconChevronLeft size={20} color="#A67C52" />
              </button>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--muted)', minWidth: 46, textAlign: 'center' }}>
                {i + 1} / {SOURCES.length}
              </span>
              <button
                className="pressable"
                aria-label="다음 연구"
                disabled={i === SOURCES.length - 1}
                onClick={() => goto(i + 1)}
                style={{
                  width: 32,
                  height: 32,
                  display: 'grid',
                  placeItems: 'center',
                  opacity: i === SOURCES.length - 1 ? 0.3 : 1,
                }}
              >
                <IconChevronRight size={20} color="#A67C52" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
