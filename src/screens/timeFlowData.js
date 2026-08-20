import { getDailyTrend, getWeeklyTrend, getStatements } from '../api/ledger'

const HABIT_TAG = {
  sleep: '수면',
  activity: '운동',
  screen_time: '스크린',
  food: '식사',
  alcohol: '음주',
}

const mmdd = (iso) => (iso ? `${iso.slice(5, 7)}.${iso.slice(8, 10)}` : '')
const hours = (minutes) => {
  const h = (Math.abs(minutes) / 60).toFixed(1)
  return `${minutes >= 0 ? '+' : '-'}${h}h`
}

/** 추이 포인트 배열 → TimeFlowBase 차트 좌표 (x 44~284, y 29~109) */
function toChartPoints(values) {
  if (!values.length) return [{ x: 44, y: 69 }, { x: 284, y: 69 }]
  if (values.length === 1) return [{ x: 44, y: 69 }, { x: 284, y: 69 }]
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  return values.map((v, i) => ({
    x: Math.round(44 + (i * 240) / (values.length - 1)),
    y: Math.round(109 - ((v - min) / span) * 80),
  }))
}

/** 명세서 원장 라인 → 변동 내역 행 (최신순 상위 n개) */
function toRows(statement, limit) {
  const rows = []
  const days = [...(statement?.days ?? [])].sort((a, b) => (a.entryDate < b.entryDate ? 1 : -1))
  for (const day of days) {
    const lines = [...(day.lines ?? [])].reverse()
    for (const line of lines) {
      rows.push({
        date: mmdd(day.entryDate),
        tag: HABIT_TAG[line.habitType] ?? line.habitType,
        title: line.displayText,
        delta: hours(line.minutesDelta),
        sign: line.minutesDelta >= 0 ? 1 : -1,
      })
      if (rows.length >= limit) return rows
    }
  }
  return rows
}

const isoDaysAgo = (n) => {
  const d = new Date(Date.now() - n * 86400000)
  return d.toISOString().slice(0, 10)
}

/** 7일 화면 데이터 — 실제 일별 추이 + 최근 원장 내역 */
export async function loadDailyFlow() {
  const [trend, statement] = await Promise.all([
    getDailyTrend(),
    getStatements(isoDaysAgo(6), isoDaysAgo(0), 0, 20),
  ])
  const pts = trend?.points ?? []
  const weekNet = pts.reduce((sum, p) => sum + (p.netMinutes ?? 0), 0)
  const axisIdx = pts.length > 1 ? [0, Math.floor(pts.length / 3), Math.floor((2 * pts.length) / 3)] : [0]
  return {
    summary: `${hours(weekNet)} 이번 주`,
    points: toChartPoints(pts.map((p) => p.cumulativeBalanceMinutes ?? 0)),
    axis: [
      ...axisIdx.map((i, k) => ({ label: mmdd(pts[i]?.date), left: [0, 94, 188][k] })),
      { label: '오늘', left: 283 },
    ],
    rows: toRows(statement, 6),
  }
}

/** 4주 화면 데이터 — 실제 주별 추이 + 최근 원장 내역 */
export async function loadWeeklyFlow() {
  const [trend, statement] = await Promise.all([
    getWeeklyTrend(),
    getStatements(isoDaysAgo(27), isoDaysAgo(0), 0, 20),
  ])
  const pts = trend?.points ?? []
  const monthNet = pts.reduce((sum, p) => sum + (p.netMinutes ?? 0), 0)
  return {
    summary: `${hours(monthNet)} 이번 달`,
    points: toChartPoints(pts.map((p) => p.cumulativeBalanceMinutes ?? 0)),
    axis: pts.slice(0, 4).map((p, i) => ({ label: `${i + 1}주차`, left: [0, 92, 184, 277][i] })),
    rows: toRows(statement, 6),
  }
}
