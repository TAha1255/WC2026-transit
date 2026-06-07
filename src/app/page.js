'use client'
import { useState, useEffect } from 'react'
import { VENUES } from '@/lib/venues'
import { LANGUAGES, t } from '@/lib/i18n'

// ── Payment Modal (inline) ─────────────────────────
const WALLETS = {
  USDT: { network:'TRC20', address:'TXGDfTmk5wviMjaJZgimW1ZHcE6Re7R1JA', icon:'💵', color:'#26a17b' },
  BTC:  { network:'Bitcoin', address:'bc1pf0asjatqtd9rrfhucwcxmwfm7t0j46gcz99pat8uddajfr88jtjqnk8ary', icon:'₿', color:'#f7931a' },
  ETH:  { network:'Ethereum', address:'0xef56F75cb88c23073Ba1d270EFb224B08FD0e50d', icon:'⟠', color:'#627eea' },
  SOL:  { network:'Solana', address:'5g37gkA4tf8Wzep6eqU43Rmc5ifeDfzEFyujCpz9W7B6', icon:'◎', color:'#9945ff' },
}

function PaymentModal({ lang, onClose }) {
  const [coin, setCoin] = useState('USDT')
  const [copied, setCopied] = useState(false)
  const w = WALLETS[coin]

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.92)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{background:'#0a1224',border:'1px solid rgba(245,158,11,0.4)',borderRadius:'16px',padding:'24px',maxWidth:'380px',width:'100%'}}>
        <div style={{textAlign:'center',marginBottom:'16px'}}>
          <div style={{fontSize:'32px'}}>🏆</div>
          <h2 style={{color:'#f8fafc',fontSize:'18px',fontWeight:700,margin:'8px 0 4px'}}>
            {lang==='ar'?'احصل على الوصول الكامل':'Get Full Access'}
          </h2>
          <div style={{color:'#f59e0b',fontSize:'28px',fontWeight:900}}>$5</div>
          <div style={{color:'#64748b',fontSize:'11px'}}>One-time · Full tournament</div>
        </div>

      {/* Lemon Squeezy */}
<a href="https://wc2026transitai.lemonsqueezy.com/checkout/buy/e5598070-a109-4c36-ac5a-9b34cdafbbb3"
  style={{display:'block',padding:'12px',background:'#f59e0b',borderRadius:'8px',color:'#000',fontSize:'14px',fontWeight:700,textAlign:'center',textDecoration:'none',marginBottom:'10px'}}>
  💳 {lang==='ar'?'اشترك الآن — $5':'Get Full Access — $5'}
</a>

        <div style={{textAlign:'center',color:'#334155',fontSize:'11px',margin:'8px 0'}}>── OR CRYPTO ──</div>

        {/* Coins */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'6px',marginBottom:'10px'}}>
          {Object.entries(WALLETS).map(([c,ww])=>(
            <button key={c} onClick={()=>setCoin(c)}
              style={{padding:'8px 4px',borderRadius:'6px',border:`1px solid ${coin===c?ww.color+'88':'rgba(255,255,255,0.07)'}`,background:coin===c?`${ww.color}15`:'transparent',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:'3px'}}>
              <span style={{fontSize:'16px'}}>{ww.icon}</span>
              <span style={{color:coin===c?ww.color:'#475569',fontSize:'9px',fontFamily:'monospace',fontWeight:coin===c?700:400}}>{c}</span>
            </button>
          ))}
        </div>

        {/* Network */}
        <div style={{background:`${w.color}12`,border:`1px solid ${w.color}33`,borderRadius:'6px',padding:'6px 10px',marginBottom:'8px',display:'flex',justifyContent:'space-between'}}>
          <span style={{color:'#64748b',fontSize:'10px',fontFamily:'monospace'}}>Network</span>
          <span style={{color:w.color,fontSize:'10px',fontFamily:'monospace',fontWeight:700}}>{w.network}</span>
        </div>

        {/* Address */}
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',padding:'10px',marginBottom:'8px',display:'flex',gap:'8px',alignItems:'center'}}>
          <span style={{color:'#94a3b8',fontFamily:'monospace',fontSize:'9px',flex:1,wordBreak:'break-all',lineHeight:1.5}}>{w.address}</span>
          <button onClick={()=>{navigator.clipboard.writeText(w.address).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2000)}}
            style={{padding:'5px 8px',borderRadius:'5px',border:`1px solid ${w.color}55`,background:`${w.color}15`,color:w.color,fontSize:'9px',cursor:'pointer',flexShrink:0,fontFamily:'monospace'}}>
            {copied?'✅':lang==='ar'?'نسخ':'Copy'}
          </button>
        </div>

        <div style={{background:'rgba(239,68,68,0.06)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:'6px',padding:'7px 10px',marginBottom:'10px'}}>
          <span style={{color:'#f87171',fontSize:'11px'}}>⚠️ {lang==='ar'?'أرسل إثبات التحويل على واتساب':'Send payment proof on WhatsApp'}</span>
        </div>

        {/* WhatsApp */}
        <a href={`https://wa.me/96565724949?text=${encodeURIComponent('WC2026 Pro - '+coin+' $5')}`}
          style={{display:'block',padding:'12px',background:'#25d366',borderRadius:'8px',color:'white',fontSize:'13px',fontWeight:700,textAlign:'center',textDecoration:'none',marginBottom:'8px'}}>
          📱 {lang==='ar'?'أرسل إثبات على واتساب':'Send Proof on WhatsApp'}
        </a>

        <button onClick={onClose}
          style={{width:'100%',padding:'10px',background:'transparent',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',color:'#475569',fontSize:'13px',cursor:'pointer'}}>
          {lang==='ar'?'رجوع':'Go Back'}
        </button>
      </div>
    </div>
  )
}

// ── Helpers ────────────────────────────────────────
const ft = iso => { try { return new Date(iso).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',hour12:false}) } catch { return '--:--' } }
const MODE_ICONS  = { WALK:'🚶', BUS:'🚌', TRAIN:'🚆', METRO:'🚇', BIKE:'🚲', SHUTTLE:'🚐' }
const MODE_COLORS = { WALK:'#f59e0b', BUS:'#3b82f6', TRAIN:'#a78bfa', METRO:'#06b6d4', BIKE:'#34d399', SHUTTLE:'#60a5fa' }
const STRATS = lang => ({ fastest:{label:t(lang,'fastest'),color:'#f59e0b'}, minimal_stress:{label:t(lang,'minimal'),color:'#06b6d4'}, local_secret:{label:t(lang,'secret'),color:'#a78bfa'} })
const FREE_LIMIT = 3
const KEY = 'wc2026_usage'
const getUsage = () => { try { return parseInt(localStorage.getItem(KEY)||'0') } catch { return 0 } }
const addUsage  = () => { try { localStorage.setItem(KEY, String(getUsage()+1)) } catch {} }

function calcALSDT(iso, venue) {
  if (!iso||!venue) return null
  return new Date(new Date(iso).getTime()-(30+venue.security_wait+15+35+10)*60000)
}

function UsageBar({ used, lang }) {
  const rem = FREE_LIMIT - used
  const msg = { ar:`${rem} خطة مجانية متبقية`, en:`${rem} free plan${rem!==1?'s':''} remaining`, es:`${rem} planes gratuitos restantes` }
  return (
    <div style={{background:'rgba(245,158,11,0.06)',border:'1px solid rgba(245,158,11,0.15)',borderRadius:'8px',padding:'10px 14px',marginBottom:'14px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'8px',flexWrap:'wrap'}}>
      <span style={{color:'#94a3b8',fontSize:'12px'}}>{msg[lang]||msg.en}</span>
      <div style={{display:'flex',gap:'6px'}}>
        {[1,2,3].map(i=><div key={i} style={{width:'10px',height:'10px',borderRadius:'50%',background:i<=used?'#334155':'#f59e0b'}}/>)}
      </div>
    </div>
  )
}

// ── Main ───────────────────────────────────────────
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
  const [showModal,   setShowModal]   = useState(false)

  const dir = LANGUAGES[lang].dir

  useEffect(()=>{ const t=setInterval(()=>setClock(new Date().toLocaleTimeString('en-GB',{hour12:false})),1000); setUsage(getUsage()); return()=>clearInterval(t) },[])
  useEffect(()=>{ setResult(null); setError(null); setOrigin(VENUES[venueId].suggested[0]); setMatchIdx(0) },[venueId])

  const venue  = VENUES[venueId]
  const match  = venue.matches[matchIdx]
  const alsdt  = calcALSDT(match.date, venue)
  const strats = STRATS(lang)
  const steps  = result?.strategies?.[activeStrat]?.steps||[]

  async function generate() {
    if (usage >= FREE_LIMIT) { setShowModal(true); return }
    if (!origin) return
    setLoading(true); setError(null); setResult(null)
    try {
      const res  = await fetch('/api/itinerary',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({origin,venueId,matchDate:match.date,mobility,lang})})
      const data = await res.json()
      if (!data.success) throw new Error(data.error||t(lang,'error'))
      setResult(data.itinerary); addUsage(); setUsage(getUsage())
    } catch(e) { setError(e.message) }
    finally { setLoading(false) }
  }

  async function copyPlan() {
    await navigator.clipboard.writeText(`🏆 WC2026\n${venue.name_en} ${venue.flag}\n${match.label[lang]||match.label.en}\n⏰ ALSDT: ${alsdt?ft(alsdt.toISOString()):'--'}\n${steps.map(s=>`• ${s.instruction_ar}`).join('\n')||'--'}`).catch(()=>{})
    setCopied(true); setTimeout(()=>setCopied(false),2000)
  }

  const inp = {background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'6px',padding:'9px 12px',color:'#e2e8f0',fontFamily:"'IBM Plex Sans Arabic',monospace",fontSize:'12px',width:'100%',boxSizing:'border-box',outline:'none',direction:dir}
  const lbl = {color:'#475569',fontFamily:'monospace',fontSize:'9px',letterSpacing:'0.12em',marginBottom:'5px',display:'block',textAlign:dir==='rtl'?'right':'left'}

  return (
    <div style={{maxWidth:'900px',margin:'0 auto',padding:'18px 14px',direction:dir}}>

      {showModal && <PaymentModal lang={lang} onClose={()=>setShowModal(false)}/>}

      {/* HEADER */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'20px',borderBottom:'1px solid rgba(245,158,11,0.12)',paddingBottom:'16px',flexWrap:'wrap',gap:'10px'}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px'}}>
            <div style={{width:'7px',height:'7px',borderRadius:'50%',background:'#f59e0b',boxShadow:'0 0 10px #f59e0b',animation:'pulse 2s infinite'}}/>
            <span style={{color:'#334155',fontFamily:'monospace',fontSize:'9px',letterSpacing:'0.15em'}}>WC2026 TRANSIT AI · POWERED BY CLAUDE</span>
          </div>
          <h1 style={{margin:0,fontSize:'clamp(17px,4vw,24px)',fontWeight:700,color:'#f8fafc'}}>🏆 {t(lang,'title')}</h1>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontFamily:'monospace',fontSize:'clamp(18px,3vw,26px)',fontWeight:700,color:'#f59e0b'}}>{clock}</div>
          {alsdt&&<div style={{color:'#ef4444',fontFamily:'monospace',fontSize:'10px',marginTop:'2px'}}>ALSDT <span style={{fontWeight:700}}>{ft(alsdt.toISOString())}</span></div>}
        </div>
      </div>

      {/* LANG */}
      <div style={{display:'flex',gap:'6px',marginBottom:'16px'}}>
        {Object.entries(LANGUAGES).map(([code,l])=>(
          <button key={code} onClick={()=>setLang(code)}
            style={{padding:'6px 12px',borderRadius:'6px',border:`1px solid ${lang===code?'#f59e0b55':'rgba(255,255,255,0.08)'}`,background:lang===code?'rgba(245,158,11,0.12)':'transparent',color:lang===code?'#f59e0b':'#475569',fontFamily:'monospace',fontSize:'11px',cursor:'pointer',display:'flex',alignItems:'center',gap:'5px'}}>
            {l.flag} {l.label}
          </button>
        ))}
      </div>

      <UsageBar used={usage} lang={lang}/>

      {/* VENUES */}
      <div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'14px'}}>
        {Object.values(VENUES).map(v=>(
          <button key={v.id} onClick={()=>setVenueId(v.id)}
            style={{padding:'8px 12px',borderRadius:'8px',border:`1px solid ${venueId===v.id?'#f59e0b55':'rgba(255,255,255,0.06)'}`,background:venueId===v.id?'rgba(245,158,11,0.1)':'rgba(255,255,255,0.02)',color:venueId===v.id?'#f59e0b':'#334155',fontSize:'11px',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:'2px'}}>
            <span style={{fontSize:'16px'}}>{v.flag}</span>
            <span style={{fontWeight:venueId===v.id?700:400}}>{v.city[lang]||v.city.en}</span>
          </button>
        ))}
      </div>

      {/* VENUE INFO */}
      <div style={{background:'rgba(245,158,11,0.05)',border:'1px solid rgba(245,158,11,0.12)',borderRadius:'8px',padding:'10px 14px',marginBottom:'14px',display:'flex',gap:'16px',flexWrap:'wrap',alignItems:'center'}}>
        <span style={{color:'#fcd34d',fontFamily:'monospace',fontSize:'11px',fontWeight:700}}>{venue.name_en} {venue.flag}</span>
        <span style={{color:'#475569',fontFamily:'monospace',fontSize:'9px'}}>CAP {venue.capacity.toLocaleString()}</span>
        <span style={{color:venue.congestion>=9?'#ef4444':'#f59e0b',fontFamily:'monospace',fontSize:'9px'}}>{'▓'.repeat(venue.congestion)}{'░'.repeat(10-venue.congestion)} {venue.congestion}/10</span>
        <span style={{color:'#475569',fontFamily:'monospace',fontSize:'9px'}}>{t(lang,'security')} ~{venue.security_wait}m</span>
        {venue.no_parking&&<span style={{color:'#ef4444',fontFamily:'monospace',fontSize:'9px'}}>🚫 {t(lang,'no_parking')}</span>}
        {venue.altitude_m&&<span style={{color:'#f59e0b',fontFamily:'monospace',fontSize:'9px'}}>⛰️ {venue.altitude_m}m</span>}
      </div>

      {/* FORM */}
      <div style={{background:'rgba(10,18,36,0.9)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'12px',padding:'18px',marginBottom:'14px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'12px',marginBottom:'12px'}}>
          <div>
            <label style={lbl}>{t(lang,'select_match').toUpperCase()}</label>
            <select style={{...inp,cursor:'pointer'}} value={matchIdx} onChange={e=>{setMatchIdx(+e.target.value);setResult(null)}}>
              {venue.matches.map((m,i)=><option key={i} value={i}>{m.label[lang]||m.label.en}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>{t(lang,'kickoff').toUpperCase()}</label>
            <div style={{...inp,color:'#f59e0b',fontFamily:'monospace',fontSize:'13px',fontWeight:700}}>
              {ft(match.date)} · {new Date(match.date).toLocaleDateString('en-GB',{day:'numeric',month:'short'})}
            </div>
          </div>
          <div>
            <label style={lbl}>{t(lang,'mobility').toUpperCase()}</label>
            <select style={{...inp,cursor:'pointer'}} value={mobility} onChange={e=>setMobility(e.target.value)}>
              <option value="Standard">{t(lang,'mob_standard')}</option>
              <option value="Fast Walking">{t(lang,'mob_fast')}</option>
              <option value="Low Cost">{t(lang,'mob_cheap')}</option>
              <option value="Minimal Transits">{t(lang,'mob_min')}</option>
            </select>
          </div>
        </div>

        <div style={{marginBottom:'10px'}}>
          <label style={lbl}>{t(lang,'origin').toUpperCase()}</label>
          <input style={inp} value={origin} onChange={e=>setOrigin(e.target.value)} placeholder={t(lang,'choose_origin')}/>
        </div>

        <div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'14px'}}>
          {venue.suggested.map(s=>(
            <button key={s} onClick={()=>setOrigin(s)}
              style={{padding:'4px 9px',borderRadius:'4px',border:`1px solid ${origin===s?'#f59e0b44':'rgba(255,255,255,0.06)'}`,background:origin===s?'rgba(245,158,11,0.08)':'transparent',color:origin===s?'#fcd34d':'#334155',fontFamily:'monospace',fontSize:'9px',cursor:'pointer'}}>
              {s.split(',')[0]}
            </button>
          ))}
        </div>

        <button onClick={generate} disabled={loading}
          style={{width:'100%',padding:'13px',background:loading?'rgba(245,158,11,0.06)':'rgba(245,158,11,0.12)',border:`1px solid ${loading?'rgba(245,158,11,0.1)':'rgba(245,158,11,0.4)'}`,borderRadius:'8px',color:loading?'#78350f':'#f59e0b',fontSize:'14px',fontWeight:700,cursor:loading?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>
          {loading?<><span style={{animation:'spin 1s linear infinite',display:'inline-block'}}>⟳</span> {t(lang,'calculating')}</>:t(lang,'calculate')}
        </button>
      </div>

      {/* ALSDT */}
      {alsdt&&(
        <div style={{background:'rgba(239,68,68,0.07)',border:'1px solid rgba(239,68,68,0.18)',borderRadius:'10px',padding:'12px 16px',marginBottom:'14px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div>
            <div style={{color:'#f87171',fontFamily:'monospace',fontSize:'9px',letterSpacing:'0.12em'}}>ALSDT</div>
            <div style={{color:'#fca5a5',fontSize:'11px',marginTop:'2px'}}>{t(lang,'alsdt_warn')}</div>
          </div>
          <div style={{color:'#ef4444',fontFamily:'monospace',fontSize:'30px',fontWeight:900}}>{ft(alsdt.toISOString())}</div>
        </div>
      )}

      {error&&<div style={{background:'rgba(239,68,68,0.07)',border:'1px solid rgba(239,68,68,0.25)',borderRadius:'10px',padding:'12px 16px',marginBottom:'14px',color:'#f87171',fontSize:'13px'}}>⚠️ {error}</div>}

      {/* RESULTS */}
      {result?.strategies&&(
        <>
          <div style={{display:'flex',gap:'6px',marginBottom:'12px'}}>
            {Object.entries(strats).map(([k,cfg])=>(
              <button key={k} onClick={()=>setActiveStrat(k)}
                style={{flex:1,padding:'9px',borderRadius:'6px',border:`1px solid ${activeStrat===k?cfg.color+'55':'rgba(255,255,255,0.06)'}`,background:activeStrat===k?`${cfg.color}10`:'transparent',color:activeStrat===k?cfg.color:'#334155',fontSize:'11px',cursor:'pointer',fontWeight:activeStrat===k?700:400}}>
                {cfg.label}
              </button>
            ))}
          </div>
          {(()=>{
            const s=result.strategies[activeStrat]; const cfg=strats[activeStrat]; if(!s) return null
            return(
              <div style={{background:'rgba(10,18,36,0.9)',border:`1px solid ${cfg.color}28`,borderRadius:'10px',padding:'16px',marginBottom:'12px'}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:`${cfg.color}15`,borderRadius:'8px',overflow:'hidden',marginBottom:'12px'}}>
                  <div style={{background:'rgba(10,18,36,0.95)',padding:'10px 12px'}}>
                    <div style={{color:'#334155',fontFamily:'monospace',fontSize:'8px',letterSpacing:'0.12em'}}>{t(lang,'depart').toUpperCase()}</div>
                    <div style={{color:'#e2e8f0',fontFamily:'monospace',fontSize:'22px',fontWeight:700}}>{ft(s.recommended_departure_time)}</div>
                  </div>
                  <div style={{background:'rgba(10,18,36,0.95)',padding:'10px 12px',textAlign:'right'}}>
                    <div style={{color:'#334155',fontFamily:'monospace',fontSize:'8px',letterSpacing:'0.12em'}}>{t(lang,'arrive').toUpperCase()}</div>
                    <div style={{color:cfg.color,fontFamily:'monospace',fontSize:'22px',fontWeight:700}}>{ft(s.estimated_arrival_time)}</div>
                  </div>
                </div>
                <div style={{color:cfg.color,fontFamily:'monospace',fontSize:'10px',textAlign:'center',marginBottom:'12px'}}>{s.total_duration_minutes}m {t(lang,'total')}</div>
                {(s.steps||[]).map((st,i)=>{
                  const mode=(st.mode||'WALK').toUpperCase(); const col=MODE_COLORS[mode]||'#f59e0b'
                  return(
                    <div key={i} style={{background:'rgba(255,255,255,0.02)',borderLeft:dir==='ltr'?`2px solid ${col}`:'none',borderRight:dir==='rtl'?`2px solid ${col}`:'none',borderRadius:'6px',padding:'10px 12px',marginBottom:'6px'}}>
                      <div style={{color:'#e2e8f0',fontSize:'12px',lineHeight:1.6}}>{MODE_ICONS[mode]||'🔹'} {st.instruction_ar}</div>
                      <div style={{display:'flex',gap:'8px',marginTop:'5px',flexWrap:'wrap'}}>
                        <span style={{color:'#475569',fontFamily:'monospace',fontSize:'9px'}}>{ft(st.departure_time)} → {ft(st.arrival_time)}</span>
                        {st.line_or_flight_id&&<span style={{color:col,fontFamily:'monospace',fontSize:'9px',background:`${col}15`,padding:'0 5px',borderRadius:'3px'}}>{st.line_or_flight_id}</span>}
                        {st.fare_estimate&&<span style={{color:'#64748b',fontFamily:'monospace',fontSize:'9px'}}>{st.fare_estimate}</span>}
                      </div>
                      {st.ai_context_note_ar&&<div style={{color:'#334155',fontSize:'10px',marginTop:'6px',borderTop:'1px solid rgba(255,255,255,0.04)',paddingTop:'6px'}}>🤖 {st.ai_context_note_ar}</div>}
                    </div>
                  )
                })}
              </div>
            )
          })()}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'8px',marginBottom:'14px'}}>
            <button onClick={()=>{const fmt=iso=>new Date(iso).toISOString().replace(/[-:]/g,'').split('.')[0]+'Z';const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//WC2026//EN','BEGIN:VEVENT',`UID:${venue.id}-${Date.now()}@wc2026`,`DTSTART:${fmt(alsdt.toISOString())}`,`SUMMARY:🚨 ALSDT — ${venue.name_en}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));a.download=`wc2026-${venue.id}.ics`;a.click()}}
              style={{padding:'10px',background:'rgba(16,185,129,0.07)',border:'1px solid rgba(16,185,129,0.25)',borderRadius:'8px',color:'#10b981',fontSize:'12px',cursor:'pointer',textAlign:'center'}}>
              📅 {t(lang,'export_cal')}
            </button>
            <button onClick={copyPlan}
              style={{padding:'10px',background:'rgba(167,139,250,0.07)',border:'1px solid rgba(167,139,250,0.25)',borderRadius:'8px',color:'#a78bfa',fontSize:'12px',cursor:'pointer',textAlign:'center'}}>
              {copied?t(lang,'copied'):`📋 ${t(lang,'copy_plan')}`}
            </button>
            <button onClick={()=>window.print()}
              style={{padding:'10px',background:'rgba(245,158,11,0.07)',border:'1px solid rgba(245,158,11,0.25)',borderRadius:'8px',color:'#f59e0b',fontSize:'12px',cursor:'pointer',textAlign:'center'}}>
              🖨️ {t(lang,'print')}
            </button>
          </div>
        </>
      )}

      {!result&&!loading&&(
        <div style={{textAlign:'center',padding:'40px',color:'#1e293b'}}>
          <div style={{fontSize:'40px',marginBottom:'10px'}}>🏟️</div>
          <div style={{fontFamily:'monospace',fontSize:'10px',letterSpacing:'0.1em'}}>{t(lang,'calculate').toUpperCase()}</div>
        </div>
      )}

      {/* FLOATING UPGRADE BUTTON */}
      {usage>=FREE_LIMIT&&(
        <div onClick={()=>setShowModal(true)}
          style={{position:'fixed',bottom:'24px',left:'50%',transform:'translateX(-50%)',zIndex:998,background:'#f59e0b',color:'#000',padding:'14px 28px',borderRadius:'50px',fontSize:'14px',fontWeight:900,cursor:'pointer',boxShadow:'0 0 30px rgba(245,158,11,0.5)',whiteSpace:'nowrap',userSelect:'none'}}>
          💳 {lang==='ar'?'احصل على الوصول الكامل — $5':'Get Full Access — $5'}
        </div>
      )}

      <div style={{marginTop:'24px',paddingBottom:'80px',textAlign:'center',color:'#0f172a',fontFamily:'monospace',fontSize:'8px'}}>
        WC2026 TRANSIT AI · POWERED BY CLAUDE · FIFA WORLD CUP 2026™
      </div>

      {/* KO-FI BUTTON */}
      <div style={{position:'fixed',bottom:'24px',right:'16px',zIndex:997}}>
        <a href="https://ko-fi.com/tahalfaraj" target="_blank" rel="noreferrer"
          style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 16px',background:'#FF5E5B',borderRadius:'50px',color:'white',textDecoration:'none',fontSize:'13px',fontWeight:700,boxShadow:'0 4px 20px rgba(255,94,91,0.4)'}}>
          ☕ {lang==='ar'?'ادعم المشروع':'Support Us'}
        </a>
      </div>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.25}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        select option{background:#0a1224;color:#e2e8f0}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:rgba(245,158,11,0.2);border-radius:2px}
      `}</style>
    </div>
  )
}
