import { useEffect, useState } from 'react'
import TimeFlowBase from './TimeFlowBase'
import { loadDailyFlow } from './timeFlowData'

const EMPTY = {
  summary: '집계 중...',
  points: [
    { x: 44, y: 69 },
    { x: 284, y: 69 },
  ],
  axis: [{ label: '오늘', left: 283 }],
  rows: [],
}

/** 나의 시간 흐름 - 7일 (실제 원장 추이) */
export default function TimeFlow7Screen() {
  const [data, setData] = useState(EMPTY)

  useEffect(() => {
    let alive = true
    loadDailyFlow()
      .then((d) => alive && setData(d))
      .catch(() => alive && setData({ ...EMPTY, summary: '데이터를 불러오지 못했어요' }))
    return () => {
      alive = false
    }
  }, [])

  return (
    <TimeFlowBase
      tab="7d"
      summary={data.summary}
      points={data.points}
      axis={data.axis}
      listTitle="변동 내역"
      rows={data.rows}
    />
  )
}
