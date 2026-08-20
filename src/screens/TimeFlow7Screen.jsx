import TimeFlowBase from './TimeFlowBase'

/** 나의 시간 흐름 - 7일 */
export default function TimeFlow7Screen() {


  return (
    <TimeFlowBase
      tab="7d"
      summary="+4.4h 이번 주"
      points={[
        { x: 44, y: 69 },
        { x: 124, y: 49 },
        { x: 204, y: 84 },
        { x: 284, y: 29 },
      ]}
      axis={[
        { label: '08.15', left: 0 },
        { label: '08.17', left: 94 },
        { label: '08.19', left: 188 },
        { label: '오늘', left: 283 },
      ]}
      listTitle="변동 내역"
      rows={[
        { date: '08.20', tag: '수면', title: '7.2시간 숙면 달성', delta: '+1.5h', sign: 1 },
        { date: '08.19', tag: '야식', title: '맵고 짠 야식 섭취', delta: '-0.8h', sign: -1 },
        { date: '08.18', tag: '운동', title: '고강도 러닝 30분', delta: '+2.0h', sign: 1 },
        { date: '08.17', tag: '식사', title: '균형 잡힌 아침 식사', delta: '+1.2h', sign: 1 },
        { date: '08.16', tag: '수면', title: '새벽 2시 늦은 취침', delta: '-1.5h', sign: -1 },
      ]}
    />
  )
}
