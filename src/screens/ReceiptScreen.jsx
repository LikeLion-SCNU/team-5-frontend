import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { IconAward, IconCalendar } from '../components/Icons'
import { useApp } from '../state/AppContext'
import { getStatements } from '../api/ledger'
import { isLoggedIn } from '../api/client'

const HABIT_TAG = { sleep: '수면', activity: '운동', screen_time: '스크린', food: '식사', alcohol: '음주' }

/** 분 → '+1.2h' 형태 */
function fmtDelta(minutes) {
  const h = Math.abs(minutes) / 60
  const text = h >= 10 ? Math.round(h).toString() : h.toFixed(1)
  return `${minutes < 0 ? '-' : '+'}${text}h`
}

/** '2026.08.20' → '2026-08-20' */
function toIso(dotDate) {
  return String(dotDate).replaceAll('.', '-')
}

/** 영수증 상하단 톱니(18칸) */
function Zigzag({ dir }) {
  return (
    <div style={{ width: 345, height: 8, display: 'flex', flex: 'none' }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 345 / 18,
            height: 8,
            background: 'var(--cream)',
            clipPath: dir === 'down' ? 'polygon(0 0, 100% 0, 50% 100%)' : 'polygon(50% 0, 100% 100%, 0 100%)',
          }}
        />
      ))}
    </div>
  )
}

/** 바코드 원본 규격 (51 x 24) — 아래 배율로 키워서 그린다 */
const BAR_SCALE = 2.3
const BARS = [
  { w: 3, l: 0 }, { w: 1, l: 5 }, { w: 4, l: 8 }, { w: 2, l: 14 }, { w: 1, l: 18 }, { w: 3, l: 21 },
  { w: 4, l: 26 }, { w: 1, l: 32 }, { w: 2, l: 35 }, { w: 3, l: 39 }, { w: 1, l: 44 }, { w: 4, l: 47 },
]

/** 일별 수명 명세서 */
export default function ReceiptScreen() {
  const navigate = useNavigate()
  const { ledger, userName, selectedDate, displayDelta, protectionMode } = useApp()

  /* 실서비스 명세서 — 선택한 날짜의 원장 라인을 불러오고, 없거나 실패하면 예시 값 유지 */
  const [day, setDay] = useState(null)
  useEffect(() => {
    if (!isLoggedIn()) return
    const iso = toIso(selectedDate)
    getStatements(iso, iso)
      .then((res) => setDay(res?.days?.[0] ?? null))
      .catch(() => setDay(null))
  }, [selectedDate])

  const rows = day
    ? day.lines.map((ln) => ({
        id: ln.entryId,
        tag: HABIT_TAG[ln.habitType] ?? ln.habitType,
        title: ln.displayText,
        delta: fmtDelta(ln.minutesDelta),
        sign: ln.minutesDelta < 0 ? -1 : 1,
      }))
    : ledger
  const totalText = day ? fmtDelta(day.dailyNetMinutes) : '+0.4h'
  const totalPlus = day ? day.dailyNetMinutes >= 0 : true

  return (
    <div className="screen">
      <Header
        title="일별 수명 명세서"
        align="center"
        weight={700}
        fallback="/home"
        right={
          <button className="pressable" aria-label="날짜 선택" onClick={() => navigate('/receipt/date')}>
            <IconCalendar size={24} color="#2D241E" />
          </button>
        }
      />

      {/* 영수증 카드 — 내용(줄바꿈)에 따라 높이가 함께 늘어난다 */}
      <div
        style={{
          position: 'absolute',
          top: 112,
          left: 24,
          width: 345,
          borderRadius: 16,
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
          overflow: 'hidden',
        }}
      >
        <Zigzag dir="down" />

        <div style={{ padding: 24 }}>
          <div
            style={{ fontSize: 22, fontWeight: 800, lineHeight: '30px', color: 'var(--ink)', textAlign: 'center', marginBottom: 10 }}
          >
            LIFESPAN RECEIPT
          </div>

          {/* 바코드 */}
          <div style={{ position: 'relative', width: 297, height: 92, borderRadius: 4, background: 'var(--cream)', marginBottom: 12 }}>
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: (297 - 51 * BAR_SCALE) / 2,
                width: 51 * BAR_SCALE,
                height: 24 * BAR_SCALE,
              }}
            >
              {BARS.map((b, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: b.l * BAR_SCALE,
                    width: b.w * BAR_SCALE,
                    height: 24 * BAR_SCALE,
                    background: 'var(--ink)',
                  }}
                />
              ))}
            </div>
            <span
              style={{
                position: 'absolute',
                top: 72,
                left: 0,
                width: 297,
                textAlign: 'center',
                fontSize: 12,
                fontWeight: 400,
                letterSpacing: '1px',
                color: 'var(--muted)',
              }}
            >
              20260820941
            </span>
          </div>

          {/* 발급 정보 */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', height: 20 }}>
              <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--muted)' }}>발급일</span>
              <button
                className="pressable"
                onClick={() => navigate('/receipt/date')}
                style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}
              >
                {selectedDate}
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', height: 20 }}>
              <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--muted)' }}>고객명</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{userName}</span>
            </div>
          </div>

          {/* 원장 항목 — 금액 칸이 두 줄이 되면 행 전체가 같이 늘어나고 내용은 세로 가운데 정렬 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
            {rows.map((row) => {
              const plus = row.sign > 0 || protectionMode
              return (
                <button
                  key={row.id}
                  className="pressable"
                  onClick={() => navigate('/source')}
                  style={{ display: 'flex', alignItems: 'stretch', gap: 10, width: '100%', minHeight: 24, textAlign: 'left' }}
                >
                  <span
                    style={{
                      flex: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px 8px',
                      borderRadius: 6,
                      background: 'var(--cream)',
                      fontSize: 12,
                      fontWeight: 700,
                      color: 'var(--muted)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    [{row.tag}]
                  </span>
                  <span
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: 13,
                      fontWeight: 600,
                      lineHeight: '18px',
                      color: 'var(--ink)',
                    }}
                  >
                    {row.title}
                  </span>
                  <span
                    style={{
                      flex: 'none',
                      maxWidth: 92,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      padding: '4px 8px',
                      borderRadius: 6,
                      background: plus ? 'var(--green-bg)' : 'var(--red-bg-3)',
                      fontSize: 13,
                      fontWeight: 700,
                      lineHeight: '17px',
                      color: plus ? 'var(--green)' : 'var(--red)',
                    }}
                  >
                    {displayDelta(row.delta)}
                  </span>
                </button>
              )
            })}
          </div>

          {/* 합계 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>일일 순수익 합계</span>
            <span style={{ fontSize: 18, fontWeight: 900, color: totalPlus || protectionMode ? 'var(--green)' : 'var(--red)' }}>
              {displayDelta(totalText)}
            </span>
          </div>

          {/* 인증 뱃지 — 누르면 근거 논문 출처 화면 */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              className="pressable"
              onClick={() => navigate('/source')}
              aria-label="BMJ 연구 기반 인증 — 논문 출처 보기"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                height: 26,
                padding: '0 12px',
                borderRadius: 4,
                background: 'var(--cream)',
              }}
            >
              <IconAward size={14} color="#A67C52" />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--brown)', whiteSpace: 'nowrap' }}>BMJ 연구 기반 인증</span>
            </button>
          </div>
        </div>

        <Zigzag dir="up" />
      </div>
    </div>
  )
}
