'use client'
import { useState, useEffect } from 'react'
import { VENUES } from '@/lib/venues'
import { LANGUAGES, t } from '@/lib/i18n'

const ft = iso => { try { return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }) } catch { return '--:--' } }
const fd = (m) => !m && m !== 0 ? '--' : m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`

const MODE_ICONS  = { WALK: '🚶', BUS: '🚌', TRAIN: '🚆', METRO: '🚇', BIKE: '🚲', SHUTTLE: '🚐' }
const MODE_COLORS = { WALK: '#f59e0b', BUS: '#3b82f6', TRAIN: '#a78bfa', METRO: '#06b6d4', BIKE: '#34d399', SHUTTLE: '#60a5fa' }

const STRATS = (lang) => ({
  fastest:        { label: t(lang, 'fastest'), color: '#f59e0b' },
  minimal_stress: { label: t(lang, 'minimal'), color: '#06b6d4' },
  local_secret:   { label: t(lang, 'secret'),  color: '#a78bfa' },
})

const FREE_LIMIT = 3
const STORAGE_KEY = 'wc2026_usage'

function getUsage() {
  try { return parseInt(localStorage.getItem(STORAGE_KEY) || '0') } catch { return 0 }
}
function incrementUsage() {
  try { localStorage.setItem(STORAGE_KEY, String(getUsage() + 1)) } catch {}
}

function calcALSDT(kickoffISO, venue) {
  if (!kickoffISO || !venue) return null
  const kickoff  = new Date(kickoffISO)
  const totalMin = 30 + venue.security_wait + 15 + 35 + 10
  return new Date(kickoff.getTime() - totalMin * 60000)
}

function exportICS(venue, match, alsdt, lang) {
  const fmt = iso => new Date(iso).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//WC2026//EN',
    'BEGIN:VEVENT',
    `UID:alsdt-${venue.id}-${Date.now()}@wc2026`,
    `DTSTART:${fmt(alsdt)}`,
    `DTEND:${fmt(new Date(new Date(alsdt).getTime() + 10 * 60000))}`,
    `SUMMARY:🚨 ${t(lang, 'alsdt')} — ${venue.name_en}`,
    'BEGIN:VALARM', 'TRIGGER:-PT15M', 'ACTION:DISPLAY',
    `DESCRIPTION:${t(lang, 'alsdt_warn')}`,
    'END:VALARM', 'END:VEVENT',
    'BEGIN:VEVENT',
    `UID:kickoff-${venue.id}-${Date.now()}@wc2026`,
    `DTSTART:${fmt(match.date)}`,
    `DTEND:${fmt(new Date(new Date(match.date).getTime() + 110 * 60000))}`,
    `SUMMARY:${match.label[lang] || match.label.en} — ${venue.name_en} ${venue.flag}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  a.download = `wc2026-${venue.id}.ics`
  a.click()
}

// ── Paywall Popup ─────────────────────────────────
function PaywallPopup({ lang, onClose }) {
  const msgs = {
    ar: { title: 'انتهت خططك المجانية 🏆', subtitle: 'استخدمت ٣ خطط مجانية', desc: 'احصل على وصول كامل لكل البطولة بـ $5 فقط — مرة واحدة، بدون اشتراك شهري', cta: 'احصل على الوصول الكامل — $5', or: 'أو', free: 'ارجع للصفحة الرئيسية' },
    en: { title: 'Free Plans Used Up 🏆', subtitle: 'You\'ve used your 3 free plans', desc: 'Get full access for the entire tournament for just $5 — one time, no monthly subscription', cta: 'Get Full Access — $5', or: 'or', free: 'Go back' },
    es: { title: 'Planes Gratuitos Agotados 🏆', subtitle: 'Has usado tus 3 planes gratuitos', desc: 'Obtén acceso completo al torneo por solo $5 — una vez, sin suscripción mensual', cta: 'Obtener Acceso Completo — $5', or: 'o', free: 'Volver' },
  }
  const m = msgs[lang] || msgs.en

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#0a1224', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '16px', padding: '36px', maxWidth: '420px', width: '100%', textAlign: 'center', boxShadow: '0 0 60px rgba(245,158,11,0.15)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏟️</div>
        <h2 style={{ color: '#f8fafc', fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>{m.title}</h2>
        <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '16px' }}>{m.subtitle}</p>
        <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '10px', padding: '16px', marginBottom: '24px' }}>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
        </div>

        {/* Usage dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
          ))}
        </div>

        <a
          href="https://YOUR_LEMON_SQUEEZY_LINK"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'block', padding: '14px', background: '#f59e0b', color: '#000', borderRadius: '8px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', marginBottom: '12px' }}>
          {m.cta}
        </a>
        <p style={{ color: '#334155', fontSize: '12px', margin: '0 0 12px' }}>{m.or}</p>
        <button onClick={onClose}
          style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 20px', color: '#475569', fontSize: '13px', cursor: 'pointer', width: '100%' }}>
          {m.free}
        </button>
      </div>
    </div>
  )
}

// ── Usage Counter ─────────────────────────────────
function UsageBar({ used, lang }) {
  const remaining = FREE_LIMIT - used
  const msgs = {
    ar: `${remaining} خطة مجانية متبقية`,
    en: `${remaining} free plan${remaining !== 1 ? 's' : ''} remaining`,
    es: `${remaining} plan${remaining !== 1 ? 'es' : ''} gratuito${remaining !== 1 ? 's' : ''} restante${remaining !== 1 ? 's' : ''}`,
  }
  return (
    <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '8px', padding: '10px 14px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
      <span style={{ color: '#94a3b8', fontSize: '12px' }}>{msgs[lang] || msgs.en}</span>
      <div style={{ display: 'flex', gap: '6px' }}>
        {[1,2,3].map(i => (
          <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: i <= used ? '#334155' : '#f59e0b', border: `1px solid ${i <= used ? '#1e293b' : '#f59e0b'}` }} />
        ))}
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════
export default function Home() {
  const [lang,        setLang]        = useState('ar')
  const [venueId,     setVenueId]     = useState('metlife')
  const [matchIdx,    setMatchIdx]    = useState(0)
  const [origin,      setOrigin]      = useState('')
  const [mobility,    setMobility]    = useState('Standard')
  const [activeStrat, setActiveStrat] = useState('fastest')
  const [result,      setResult]      = useState(null)
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState(null)
  const [clock,       setClock]       = useState('')
  const [copied,      setCopied]      = useState(false)
  const [usage,       setUsage]       = useState(0)
  const [showPaywall, setShowPaywall] = useState(false)

  const dir = LANGUAGES[lang].dir

  useEffect(() => {
    const timer = setInterval(() => setClock(new Date().toLocaleTimeString('en-GB', { hour12: false })), 1000)
    setUsage(getUsage())
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setResult(null); setError(null)
    setOrigin(VENUES[venueId].suggested[0])
    setMatchIdx(0)
  }, [venueId])

  const venue  = VENUES[venueId]
  const match  = venue.matches[matchIdx]
  const alsdt  = calcALSDT(match.date, venue)
  const strats = STRATS(lang)
  const steps  = result?.strategies?.[activeStrat]?.steps || []

  async function generate() {
    // Check usage limit
    if (usage >= FREE_LIMIT) {
      setShowPaywall(true)
      return
    }
    if (!origin) return
    setLoading(true); setError(null); setResult(null)
    try {
      const res = await fetch('/api/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, venueId, matchDate: match.date, mobility, lang }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || t(lang, 'error'))
      setResult(data.itinerary)
      // Increment usage after success
      incrementUsage()
      setUsage(getUsage())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function copyPlan() {
    const txt = `🏆 WC2026\n${venue.name_en} ${venue.flag}\n${match.label[lang] || match.label.en}\n⏰ ${t(lang,'alsdt')}: ${alsdt ? ft(alsdt.toISOString()) : '--'}\n${steps.map(s => `• ${s.instruction_ar}`).join('\n') || '--'}`
    await navigator.clipboard.writeText(txt).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const inp = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '9px 12px', color: '#e2e8f0', fontFamily: "'IBM Plex Sans Arabic', monospace", fontSize: '12px', width: '100%', boxSizing: 'border-box', outline: 'none', direction: dir }
  const lbl = { color: '#475569', fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.12em', marginBottom: '5px', display: 'block', textAlign: dir === 'rtl' ? 'right' : 'left' }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '18px 14px', direction: dir }}>

      {/* PAYWALL */}
      {showPaywall && <PaywallPopup lang={lang} onClose={() => setShowPaywall(false)} />}

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid rgba(245,158,11,0.12)', paddingBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 10px #f59e0b', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#334155', fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.15em' }}>WC2026 TRANSIT AI · POWERED BY CLAUDE</span>
          </div>
          <h1 style={{ margin: 0, fontSize: 'clamp(17px,4vw,24px)', fontWeight: 700, color: '#f8fafc' }}>
            🏆 {t(lang, 'title')}
          </h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'monospace', fontSize: 'clamp(18px,3vw,26px)', fontWeight: 700, color: '#f59e0b' }}>{clock}</div>
          {alsdt && <div style={{ color: '#ef4444', fontFamily: 'monospace', fontSize: '10px', marginTop: '2px' }}>ALSDT <span style={{ fontWeight: 700 }}>{ft(alsdt.toISOString())}</span></div>}
        </div>
      </div>

      {/* LANGUAGE */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
        {Object.entries(LANGUAGES).map(([code, l]) => (
          <button key={code} onClick={() => setLang(code)}
            style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${lang === code ? '#f59e0b55' : 'rgba(255,255,255,0.08)'}`, background: lang === code ? 'rgba(245,158,11,0.12)' : 'transparent', color: lang === code ? '#f59e0b' : '#475569', fontFamily: 'monospace', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
            {l.flag} {l.label}
          </button>
        ))}
      </div>

      {/* USAGE BAR */}
      <UsageBar used={usage} lang={lang} />

      {/* VENUE TABS */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
        {Object.values(VENUES).map(v => (
          <button key={v.id} onClick={() => setVenueId(v.id)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: `1px solid ${venueId === v.id ? '#f59e0b55' : 'rgba(255,255,255,0.06)'}`, background: venueId === v.id ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.02)', color: venueId === v.id ? '#f59e0b' : '#334155', fontSize: '11px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <span style={{ fontSize: '16px' }}>{v.flag}</span>
            <span style={{ fontWeight: venueId === v.id ? 700 : 400 }}>{v.city[lang] || v.city.en}</span>
          </button>
        ))}
      </div>

      {/* VENUE INFO */}
      <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.12)', borderRadius: '8px', padding: '10px 14px', marginBottom: '14px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ color: '#fcd34d', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700 }}>{venue.name_en} {venue.flag}</span>
        <span style={{ color: '#475569', fontFamily: 'monospace', fontSize: '9px' }}>CAP {venue.capacity.toLocaleString()}</span>
        <span style={{ color: venue.congestion >= 9 ? '#ef4444' : '#f59e0b', fontFamily: 'monospace', fontSize: '9px' }}>{'▓'.repeat(venue.congestion)}{'░'.repeat(10 - venue.congestion)} {venue.congestion}/10</span>
        <span style={{ color: '#475569', fontFamily: 'monospace', fontSize: '9px' }}>{t(lang, 'security')} ~{venue.security_wait}m</span>
        {venue.no_parking && <span style={{ color: '#ef4444', fontFamily: 'monospace', fontSize: '9px' }}>🚫 {t(lang, 'no_parking')}</span>}
        {venue.altitude_m && <span style={{ color: '#f59e0b', fontFamily: 'monospace', fontSize: '9px' }}>⛰️ {venue.altitude_m}m</span>}
      </div>

      {/* FORM */}
      <div style={{ background: 'rgba(10,18,36,0.9)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '18px', marginBottom: '14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={lbl}>{t(lang, 'select_match').toUpperCase()}</label>
            <select style={{ ...inp, cursor: 'pointer' }} value={matchIdx} onChange={e => { setMatchIdx(+e.target.value); setResult(null) }}>
              {venue.matches.map((m, i) => <option key={i} value={i}>{m.label[lang] || m.label.en}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>{t(lang, 'kickoff').toUpperCase()}</label>
            <div style={{ ...inp, color: '#f59e0b', fontFamily: 'monospace', fontSize: '13px', fontWeight: 700 }}>
              {ft(match.date)} · {new Date(match.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
            </div>
          </div>
          <div>
            <label style={lbl}>{t(lang, 'mobility').toUpperCase()}</label>
            <select style={{ ...inp, cursor: 'pointer' }} value={mobility} onChange={e => setMobility(e.target.value)}>
              <option value="Standard">{t(lang, 'mob_standard')}</option>
              <option value="Fast Walking">{t(lang, 'mob_fast')}</option>
              <option value="Low Cost">{t(lang, 'mob_cheap')}</option>
              <option value="Minimal Transits">{t(lang, 'mob_min')}</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={lbl}>{t(lang, 'origin').toUpperCase()}</label>
          <input style={inp} value={origin} onChange={e => setOrigin(e.target.value)} placeholder={t(lang, 'choose_origin')} />
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {venue.suggested.map(s => (
            <button key={s} onClick={() => setOrigin(s)}
              style={{ padding: '4px 9px', borderRadius: '4px', border: `1px solid ${origin === s ? '#f59e0b44' : 'rgba(255,255,255,0.06)'}`, background: origin === s ? 'rgba(245,158,11,0.08)' : 'transparent', color: origin === s ? '#fcd34d' : '#334155', fontFamily: 'monospace', fontSize: '9px', cursor: 'pointer' }}>
              {s.split(',')[0]}
            </button>
          ))}
        </div>

        <button onClick={generate} disabled={loading}
          style={{ width: '100%', padding: '13px', background: loading ? 'rgba(245,158,11,0.06)' : usage >= FREE_LIMIT ? 'rgba(245,158,11,0.2)' : 'rgba(245,158,11,0.12)', border: `1px solid ${loading ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.4)'}`, borderRadius: '8px', color: loading ? '#78350f' : '#f59e0b', fontSize: '14px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          {loading
            ? <><span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span> {t(lang, 'calculating')}</>
            : usage >= FREE_LIMIT ? '🔒 Upgrade to Pro — $5' : t(lang, 'calculate')}
        </button>
      </div>

      {/* ALSDT */}
      {alsdt && (
        <div style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: '10px', padding: '12px 16px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ color: '#f87171', fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.12em' }}>ALSDT</div>
            <div style={{ color: '#fca5a5', fontSize: '11px', marginTop: '2px' }}>{t(lang, 'alsdt_warn')}</div>
          </div>
          <div style={{ color: '#ef4444', fontFamily: 'monospace', fontSize: '30px', fontWeight: 900 }}>{ft(alsdt.toISOString())}</div>
        </div>
      )}

      {/* ERROR */}
      {error && <div style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', padding: '12px 16px', marginBottom: '14px', color: '#f87171', fontSize: '13px' }}>⚠️ {error}</div>}

      {/* RESULTS */}
      {result?.strategies && (
        <>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
            {Object.entries(strats).map(([k, cfg]) => (
              <button key={k} onClick={() => setActiveStrat(k)}
                style={{ flex: 1, padding: '9px', borderRadius: '6px', border: `1px solid ${activeStrat === k ? cfg.color + '55' : 'rgba(255,255,255,0.06)'}`, background: activeStrat === k ? `${cfg.color}10` : 'transparent', color: activeStrat === k ? cfg.color : '#334155', fontSize: '11px', cursor: 'pointer', fontWeight: activeStrat === k ? 700 : 400 }}>
                {cfg.label}
              </button>
            ))}
          </div>

          {(() => {
            const s   = result.strategies[activeStrat]
            const cfg = strats[activeStrat]
            if (!s) return null
            return (
              <div style={{ background: 'rgba(10,18,36,0.9)', border: `1px solid ${cfg.color}28`, borderRadius: '10px', padding: '16px', marginBottom: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: `${cfg.color}15`, borderRadius: '8px', overflow: 'hidden', marginBottom: '12px' }}>
                  <div style={{ background: 'rgba(10,18,36,0.95)', padding: '10px 12px' }}>
                    <div style={{ color: '#334155', fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.12em' }}>{t(lang, 'depart').toUpperCase()}</div>
                    <div style={{ color: '#e2e8f0', fontFamily: 'monospace', fontSize: '22px', fontWeight: 700 }}>{ft(s.recommended_departure_time)}</div>
                  </div>
                  <div style={{ background: 'rgba(10,18,36,0.95)', padding: '10px 12px', textAlign: 'right' }}>
                    <div style={{ color: '#334155', fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.12em' }}>{t(lang, 'arrive').toUpperCase()}</div>
                    <div style={{ color: cfg.color, fontFamily: 'monospace', fontSize: '22px', fontWeight: 700 }}>{ft(s.estimated_arrival_time)}</div>
                  </div>
                </div>
                <div style={{ color: cfg.color, fontFamily: 'monospace', fontSize: '10px', textAlign: 'center', marginBottom: '12px' }}>{fd(s.total_duration_minutes)} {t(lang, 'total')}</div>
                {(s.steps || []).map((st, i) => {
                  const mode = (st.mode || 'WALK').toUpperCase()
                  const col  = MODE_COLORS[mode] || '#f59e0b'
                  return (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.02)', borderLeft: dir === 'ltr' ? `2px solid ${col}` : 'none', borderRight: dir === 'rtl' ? `2px solid ${col}` : 'none', borderRadius: '6px', padding: '10px 12px', marginBottom: '6px' }}>
                      <div style={{ color: '#e2e8f0', fontSize: '12px', lineHeight: 1.6 }}>{MODE_ICONS[mode] || '🔹'} {st.instruction_ar}</div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '5px', flexWrap: 'wrap' }}>
                        <span style={{ color: '#475569', fontFamily: 'monospace', fontSize: '9px' }}>{ft(st.departure_time)} → {ft(st.arrival_time)}</span>
                        {st.line_or_flight_id && <span style={{ color: col, fontFamily: 'monospace', fontSize: '9px', background: `${col}15`, padding: '0 5px', borderRadius: '3px' }}>{st.line_or_flight_id}</span>}
                        {st.fare_estimate && <span style={{ color: '#64748b', fontFamily: 'monospace', fontSize: '9px' }}>{st.fare_estimate}</span>}
                      </div>
                      {st.ai_context_note_ar && <div style={{ color: '#334155', fontSize: '10px', marginTop: '6px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '6px' }}>🤖 {st.ai_context_note_ar}</div>}
                    </div>
                  )
                })}
              </div>
            )
          })()}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '8px', marginBottom: '14px' }}>
            <button onClick={() => exportICS(venue, match, alsdt?.toISOString(), lang)}
              style={{ padding: '10px', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '8px', color: '#10b981', fontSize: '12px', cursor: 'pointer', textAlign: 'center' }}>
              📅 {t(lang, 'export_cal')}
            </button>
            <button onClick={copyPlan}
              style={{ padding: '10px', background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: '8px', color: '#a78bfa', fontSize: '12px', cursor: 'pointer', textAlign: 'center' }}>
              {copied ? t(lang, 'copied') : `📋 ${t(lang, 'copy_plan')}`}
            </button>
            <button onClick={() => window.print()}
              style={{ padding: '10px', background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '8px', color: '#f59e0b', fontSize: '12px', cursor: 'pointer', textAlign: 'center' }}>
              🖨️ {t(lang, 'print')}
            </button>
          </div>
        </>
      )}

      {!result && !loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#1e293b' }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>🏟️</div>
          <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.1em' }}>{t(lang, 'calculate').toUpperCase()}</div>
        </div>
      )}

      <div style={{ marginTop: '24px', textAlign: 'center', color: '#0f172a', fontFamily: 'monospace', fontSize: '8px' }}>
        WC2026 TRANSIT AI · POWERED BY CLAUDE · FIFA WORLD CUP 2026™
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes spin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        select option { background:#0a1224; color:#e2e8f0; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:rgba(245,158,11,0.2); border-radius:2px; }
      `}</style>
    </div>
  )
}
