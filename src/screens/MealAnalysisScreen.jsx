import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGoBack from '../hooks/useGoBack'
import { IconChevronLeft, IconEdit, IconTrash } from '../components/Icons'
import { useApp } from '../state/AppContext'
import { waitForAnalysis, confirmMeal } from '../api/meals'

const DOT_COLORS = ['var(--green)', 'var(--red)', 'var(--brown)']

/** 오늘의 식탁 - AI 환산 */
export default function MealAnalysisScreen() {
  const navigate = useNavigate()
  const goBack = useGoBack('/meal')
  const { mealItems, setMealItems, setHasMealRecords, mealRecords, setMealRecords, mealPhoto, mealServerId } = useApp()
  const [editing, setEditing] = useState(null)
  const [draft, setDraft] = useState('')
  const [newName, setNewName] = useState('')
  const scrollRef = useRef(null)
  const addedRef = useRef(false)
  const serverIdsRef = useRef([])
  const [confirming, setConfirming] = useState(false)

  const [analyzing, setAnalyzing] = useState(!!mealServerId)

  /* 새 업로드마다 이전 결과를 비우고, 서버 분석 결과를 기다려 실제 값으로 채운다 */
  useEffect(() => {
    if (!mealServerId) return
    let alive = true
    setAnalyzing(true)
    setMealItems([])
    serverIdsRef.current = []
    waitForAnalysis(mealServerId)
      .then((meal) => {
        if (!alive) return
        serverIdsRef.current = (meal?.items ?? []).map((it) => it.id)
        setMealItems(
          (meal?.items ?? [])
            .filter((it) => !it.is_deleted && !it.deleted)
            .map((it) => ({
              id: it.id,
              name: it.food_name,
              amount: it.portion || '',
              category: it.category,
              eligibility: it.eligibility,
              value: Number(it.value) || 1,
              included: true,
            })),
        )
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setAnalyzing(false)
      })
    return () => {
      alive = false
    }
  }, [mealServerId, setMealItems])

  /* 실제 항목 기반 수명 환산 예상치 — V8 표준 계수와 동일 (과채류 +18분/회분·일 5회분 상한, 음주 첫 잔 제외 -15분) */
  const qualifyingServings = Math.min(
    mealItems
      .filter((it) => it.category === 'FOOD' && it.eligibility === 'FRUIT_OR_VEGETABLE')
      .reduce((sum, it) => sum + Math.min(it.value ?? 1, 5), 0),
    5,
  )
  const alcoholDrinks = mealItems
    .filter((it) => it.category === 'ALCOHOL')
    .reduce((sum, it) => sum + Math.min(it.value ?? 1, 12), 0)
  const estimateMinutes = Math.round(qualifyingServings * 18 - Math.max(alcoholDrinks - 1, 0) * 15)
  const estimateHours = (estimateMinutes / 60).toFixed(1)
  const estimateText = analyzing
    ? '분석 중...'
    : `예상 ${estimateMinutes >= 0 ? '+' : ''}${estimateHours}h`
  const estimateColor = analyzing || estimateMinutes === 0 ? 'var(--muted)' : estimateMinutes > 0 ? 'var(--green)' : 'var(--red)'
  const badge = analyzing
    ? null
    : alcoholDrinks > 1
      ? { text: '음주 감점 포함', bg: 'var(--red-bg-3)', color: 'var(--red)' }
      : qualifyingServings > 0
        ? { text: '과채류 적립', bg: 'var(--green-bg)', color: 'var(--green)' }
        : { text: '중립 식단 · 감점 없음', bg: 'var(--cream)', color: 'var(--muted)' }

  const remove = (id) => setMealItems(mealItems.filter((it) => it.id !== id))

  const startEdit = (item) => {
    setEditing(item.id)
    setDraft(item.name)
  }
  const commitEdit = (id) => {
    setMealItems(mealItems.map((it) => (it.id === id ? { ...it, name: draft || it.name } : it)))
    setEditing(null)
  }

  const addItem = () => {
    const name = newName.trim()
    if (!name) return
    setMealItems([...mealItems, { id: `m${Date.now()}`, name, amount: '직접 입력', confidence: '', included: true }])
    setNewName('')
    addedRef.current = true
  }

  // 메뉴를 추가하면 추가된 항목이 보이도록 아래로 스크롤한다
  useEffect(() => {
    if (!addedRef.current) return
    addedRef.current = false
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [mealItems.length])

  const confirm = async () => {
    // 서버 기록이 있으면 확정 API로 원장에 기입한다 (제외·직접 추가 반영)
    if (mealServerId && !confirming) {
      setConfirming(true)
      try {
        const currentIds = new Set(mealItems.map((it) => it.id))
        const excludeIds = serverIdsRef.current.filter((id) => !currentIds.has(id))
        const userItems = mealItems
          .filter((it) => !serverIdsRef.current.includes(it.id))
          .map((it) => ({ food_name: it.name, portion: it.amount || undefined }))
        await confirmMeal(mealServerId, excludeIds, userItems)
      } catch {
        // 확정 실패해도 화면 흐름은 이어간다 (데모 안정성)
      } finally {
        setConfirming(false)
      }
    }
    const hour = new Date().getHours()
    const slot = hour < 11 ? '아침 식사' : hour < 15 ? '점심 식사' : hour < 18 ? '간식' : '저녁 식사'
    setMealRecords([
      ...mealRecords,
      {
        key: `r${Date.now()}`,
        slot,
        menu: mealItems.map((it) => it.name).join(', ') || '기록된 식단',
        detail: `${mealItems.length}개 항목`,
        delta: `${estimateMinutes >= 0 ? '+' : ''}${(estimateMinutes / 60).toFixed(1)}h`,
        sign: estimateMinutes >= 0 ? 1 : -1,
      },
    ])
    setHasMealRecords(true)
    navigate('/meal/records')
  }

  return (
    <div ref={scrollRef} className="screen screen--full scroll-y">
      {/* 식사 사진 */}
      <div style={{ position: 'relative', width: 393, height: 410 }}>
        <img
          src={mealPhoto || '/images/meal.png'}
          alt="업로드한 식사 사진"
          style={{ position: 'absolute', top: 0, left: 0, width: 393, height: 410, objectFit: 'cover' }}
        />

        {/* AI 인식 태그 — 실제 분석 항목 */}
        {(analyzing
          ? [{ text: 'AI 분석 중...', top: 150, left: 60 }]
          : mealItems.slice(0, 4).map((it, i) => ({
              text: it.name,
              top: 120 + (i % 2) * 60 + Math.floor(i / 2) * 110,
              left: 60 + (i % 2) * 140,
            }))
        ).map((t) => (
          <span
            key={t.text}
            style={{
              position: 'absolute',
              top: t.top,
              left: t.left,
              height: 27,
              padding: '0 12px',
              borderRadius: 20,
              background: 'rgba(45,36,30,0.8)',
              color: 'var(--white)',
              fontSize: 12,
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {t.text}
          </span>
        ))}

        {/* 뒤로 */}
        <button
          className="pressable"
          aria-label="뒤로 가기"
          onClick={goBack}
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            width: 40,
            height: 40,
            borderRadius: 100,
            background: 'var(--ivory)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <IconChevronLeft size={20} color="#2D241E" />
        </button>
      </div>

      {/* 분석 시트 — 항목이 늘어나면 시트도 함께 길어진다 */}
      <div
        style={{
          position: 'relative',
          width: 393,
          marginTop: -24,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
          padding: '30px 24px 40px',
          minHeight: 422,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--muted)' }}>식단 수명 환산</div>
            <div style={{ fontSize: 22, fontWeight: 800, lineHeight: '30px', color: estimateColor, whiteSpace: 'nowrap' }}>
              환산 수명: {estimateText}
            </div>
          </div>
          {badge && (
            <span
              style={{
                flex: 'none',
                marginTop: 4,
                padding: '6px 10px',
                borderRadius: 8,
                background: badge.bg,
                fontSize: 12,
                fontWeight: 700,
                color: badge.color,
                whiteSpace: 'nowrap',
              }}
            >
              {badge.text}
            </span>
          )}
        </div>

        {/* 인식 항목 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {mealItems.map((item, i) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 40 }}>
              <span
                style={{ flex: 'none', width: 8, height: 8, borderRadius: '50%', background: DOT_COLORS[i % DOT_COLORS.length] }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                {editing === item.id ? (
                  <input
                    autoFocus
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onBlur={() => commitEdit(item.id)}
                    onKeyDown={(e) => e.key === 'Enter' && commitEdit(item.id)}
                    style={{
                      width: '100%',
                      height: 24,
                      border: 'none',
                      outline: 'none',
                      background: 'var(--cream)',
                      borderRadius: 4,
                      fontSize: 14,
                      fontWeight: 700,
                      color: 'var(--ink)',
                      padding: '0 4px',
                    }}
                  />
                ) : (
                  <div style={{ fontSize: 14, fontWeight: 700, lineHeight: '20px', color: 'var(--ink)' }}>{item.name}</div>
                )}
                <div style={{ fontSize: 12, fontWeight: 400, lineHeight: '17px', color: 'var(--muted)' }}>{item.amount}</div>
              </div>

              <button
                className="pressable"
                aria-label={`${item.name} 수정`}
                onClick={() => startEdit(item)}
                style={{ flex: 'none', width: 26, height: 26, display: 'grid', placeItems: 'center' }}
              >
                <IconEdit size={18} color="#8C7A6B" />
              </button>
              <button
                className="pressable"
                aria-label={`${item.name} 삭제`}
                onClick={() => remove(item.id)}
                style={{ flex: 'none', width: 26, height: 26, display: 'grid', placeItems: 'center' }}
              >
                <IconTrash size={18} color="#8C7A6B" />
              </button>
            </div>
          ))}
        </div>

        {/* 확정 */}
        <button
          className="pressable"
          onClick={confirm}
          style={{
            width: '100%',
            height: 56,
            borderRadius: 16,
            background: 'var(--brown)',
            color: 'var(--white)',
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          이 식단으로 확정하기
        </button>

        {/* 직접 입력 */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 48,
            borderRadius: 12,
            background: 'var(--white)',
            border: '1px solid var(--beige-2)',
          }}
        >
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
            placeholder="메뉴를 직접 입력하세요"
            style={{
              position: 'absolute',
              top: 5,
              left: 5,
              width: 236,
              height: 36,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 14,
              fontWeight: 400,
              color: 'var(--ink)',
            }}
          />
          <button
            className="pressable"
            aria-label="메뉴 추가"
            onClick={addItem}
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
              width: 36,
              height: 36,
              borderRadius: 18,
              background: 'var(--brown-2)',
              color: 'var(--white)',
              fontSize: 22,
              fontWeight: 700,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
