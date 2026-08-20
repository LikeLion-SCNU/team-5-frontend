import TimeFlowBase from './TimeFlowBase'

/** 나의 시간 흐름 - 4주 */
export default function TimeFlow4WScreen() {


  return (
    <TimeFlowBase
      tab="4w"
      summary="+12.8h 이번 달"
      points={[
        { x: 8, y: 99 },
        { x: 98, y: 81 },
        { x: 196, y: 57 },
        { x: 295, y: 33 },
      ]}
      axis={[
        { label: '1주차', left: 0 },
        { label: '2주차', left: 92 },
        { label: '3주차', left: 184 },
        { label: '4주차', left: 277 },
      ]}
      listTitle="주간 변동 내역"
      rows={[
        { date: '08.20', tag: '수면', title: '7.2시간 숙면 달성', delta: '+1.5h', sign: 1 },
        { date: '3주차', tag: '야식', title: '맵고 짠 야식 섭취', delta: '-0.8h', sign: -1 },
        { date: '08.18', tag: '운동', title: '고강도 러닝 30분', delta: '+2.0h', sign: 1 },
        { date: '2주차', tag: '식사', title: '균형 잡힌 아침 식사', delta: '+1.2h', sign: 1 },
      ]}
    />
  )
}
