import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import AlertModal from '../components/AlertModal'
import { IconCheck } from '../components/Icons'
import { useApp } from '../state/AppContext'
import { getDataSummary, deleteDataScopes } from '../api/account'

const formatSize = (bytes, items) => {
  if (bytes > 0) {
    const mb = bytes / (1024 * 1024)
    return mb >= 0.1 ? `${mb.toFixed(1)}MB` : `${Math.max(Math.round(bytes / 1024), 1)}KB`
  }
  return `${items}건`
}

/** 설정 - 데이터 관리 (실제 저장량 조회·삭제) */
export default function SettingsDataManageScreen() {
  const navigate = useNavigate()
  const { dataChecks, setDataChecks } = useApp()
  const [rows, setRows] = useState([])
  const [alert, setAlert] = useState('')
  const [busy, setBusy] = useState(false)

  const load = () =>
    getDataSummary()
      .then((d) =>
        setRows(
          (d?.categories ?? []).map((c) => ({
            key: c.key,
            label: c.label,
            size: formatSize(c.bytes, c.items),
            items: c.items,
          })),
        ),
      )
      .catch(() => setRows([]))

  useEffect(() => {
    load()
  }, [])

  const removeSelected = async () => {
    const scopes = rows.filter((r) => dataChecks[r.key]).map((r) => r.key)
    if (!scopes.length) {
      setAlert('삭제할 항목을 선택해주세요.')
      return
    }
    if (busy) return
    setBusy(true)
    try {
      const res = await deleteDataScopes(scopes)
      await load()
      setDataChecks({})
      setAlert(res?.message || '선택한 데이터를 삭제했습니다.')
    } catch (e) {
      setAlert(e.message || '삭제에 실패했어요.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="screen">
      <Header title="데이터 관리" align="center" weight={700} fallback="/settings/data" />

      <span
        style={{ position: 'absolute', top: 124, left: 24, width: 345, fontSize: 14, fontWeight: 500, lineHeight: '21px', color: 'var(--muted)' }}
      >
        영구 삭제를 원하는 요소를 체크하세요. 연동 해제 시 서버에서 해당 원본은 삭제되며 가상 수명 잔고도 갱신됩니다.
      </span>

      <div
        style={{
          position: 'absolute',
          top: 211,
          left: 24,
          width: 345,
          height: 248,
          borderRadius: 16,
          background: 'var(--white)',
          boxShadow: 'var(--shadow-card)',
          overflow: 'hidden',
        }}
      >
        {rows.length === 0 && (
          <div style={{ position: 'absolute', top: 24, left: 0, width: 345, textAlign: 'center', fontSize: 14, color: 'var(--muted)' }}>
            저장된 데이터를 불러오는 중입니다.
          </div>
        )}
        {rows.map(({ key, label, size, items }, i) => {
          const on = dataChecks[key]
          return (
            <div key={key} style={{ position: 'absolute', top: i * 62, left: 0, width: 345, height: 62 }}>
              <button
                className="pressable"
                onClick={() => setDataChecks({ ...dataChecks, [key]: !on })}
                aria-pressed={on}
                style={{ position: 'absolute', inset: 0, width: 345, height: 62, textAlign: 'left' }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    background: 'var(--cream)',
                    border: '1px solid var(--beige-2)',
                  }}
                >
                  {on && (
                    <span style={{ position: 'absolute', top: 3, left: 3 }}>
                      <IconCheck size={14} color="#A67C52" />
                    </span>
                  )}
                </span>
                <span style={{ position: 'absolute', top: 21, left: 54, fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{label}</span>
                <span
                  style={{
                    position: 'absolute',
                    top: 22,
                    left: 265,
                    width: 60,
                    textAlign: 'right',
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--muted)',
                  }}
                >
                  {items === 0 ? '없음' : size}
                </span>
              </button>
              {i < rows.length - 1 && (
                <div style={{ position: 'absolute', top: 61, left: 20, width: 305, height: 1, background: 'var(--beige-2)' }} />
              )}
            </div>
          )
        })}
      </div>

      <button
        className="pressable"
        onClick={removeSelected}
        style={{
          position: 'absolute',
          top: 655,
          left: 24,
          width: 345,
          height: 52,
          borderRadius: 16,
          background: 'var(--white)',
          border: '1px solid var(--beige-2)',
          color: 'var(--ink)',
          fontSize: 15,
          fontWeight: 700,
        }}
      >
        선택 항목 삭제
      </button>

      <AlertModal open={!!alert} message={alert} onClose={() => setAlert('')} />

      <button
        className="pressable"
        onClick={() => navigate('/settings/data/manage/delete')}
        style={{
          position: 'absolute',
          top: 723,
          left: 24,
          width: 345,
          height: 56,
          borderRadius: 16,
          background: 'var(--red)',
          color: 'var(--white)',
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        계정 및 전체 데이터 삭제
      </button>

    </div>
  )
}
