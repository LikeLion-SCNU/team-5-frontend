import { useEffect, useState } from 'react'
import TimeFlowBase from './TimeFlowBase'
import { loadWeeklyFlow } from './timeFlowData'

const EMPTY = {
  summary: '집계 중...',
  points: [
    { x: 44, y: 69 },
    { x: 284, y: 69 },
  ],
  axis: [{ label: '이번 주', left: 277 }],
  rows: [],
}

/** 나의 시간 흐름 - 4주 (실제 원장 추이) */
export default function TimeFlow4WScreen() {
  const [data, setData] = useState(EMPTY)

  useEffect(() => {
    let alive = true
    loadWeeklyFlow()
      .then((d) => alive && setData(d))
      .catch(() => alive && setData({ ...EMPTY, summary: '데이터를 불러오지 못했어요' }))
    return () => {
      alive = false
    }
  }, [])

  return (
    <TimeFlowBase
      tab="4w"
      summary={data.summary}
      points={data.points}
      axis={data.axis}
      listTitle="주간 변동 내역"
      rows={data.rows}
    />
  )
}
