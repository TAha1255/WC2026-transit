'use client'
import { useState } from 'react'

const WALLETS = {
  USDT: { network: 'TRC20 (Tron)', address: 'TXGDfTmk5wviMjaJZgimW1ZHcE6Re7R1JA', icon: '💵', color: '#26a17b' },
  BTC:  { network: 'Bitcoin',      address: 'bc1pf0asjatqtd9rrfhucwcxmwfm7t0j46gcz99pat8uddajfr88jtjqnk8ary', icon: '₿', color: '#f7931a' },
  ETH:  { network: 'Ethereum',     address: '0xef56F75cb88c23073Ba1d270EFb224B08FD0e50d', icon: '⟠', color: '#627eea' },
  SOL:  { network: 'Solana',       address: '5g37gkA4tf8Wzep6eqU43Rmc5ifeDfzEFyujCpz9W7B6', icon: '◎', color: '#9945ff' },
}

const WHATSAPP = '96565724949'
const PAYPAL   = 'https://www.paypal.com/paypalme/tahafaradj/5'

const MSGS = {
  ar: { title: 'ترقية للـ Pro 🏆', subtitle: 'وصول كامل لكل البطولة بـ $5 فقط', select: 'اختر طريقة الدفع', copy: 'نسخ العنوان', copied: '✅ تم النسخ', step1: '١. انسخ عنوان المحفظة', step2: '٢. حوّل $5 من محفظتك', step3: '٣. أرسل إثبات التحويل على واتساب', whatsapp: '📱 إثبات الدفع عبر واتساب', paypal: '💳 ادفع عبر PayPal', warning: '⚠️ تأكد من الشبكة الصحيحة', back: 'رجوع' },
  en: { title: 'Upgrade to Pro 🏆', subtitle: 'Full tournament access for just $5', select: 'Select Payment Method', copy: 'Copy Address', copied: '✅ Copied!', step1: '1. Copy the wallet address', step2: '2. Send $5 from your wallet', step3: '3. Send payment proof on WhatsApp', whatsapp: '📱 Send Proof on WhatsApp', paypal: '💳 Pay with PayPal', warning: '⚠️ Use the correct network', back: 'Go Back' },
  es: { title: 'Actualizar a Pro 🏆', subtitle: 'Acceso completo al torneo por solo $5', select: 'Seleccionar Método de Pago', copy: 'Copiar Dirección', copied: '✅ ¡Copiado!', step1: '1. Copia la dirección', step2: '2. Envía $5 desde tu billetera', step3: '3. Envía comprobante por WhatsApp', whatsapp: '📱 Enviar Comprobante', paypal: '💳 Pagar con PayPal', warning: '⚠️ Usa la red correcta', back: 'Volver' },
}

export default function CryptoPayment({ lang = 'en', onClose }) {
  const [coin,   setCoin]   = useState('USDT')
  const [copied, setCopied] = useState(false)
  const m = MSGS[lang] || MSGS.en
  const wallet = WALLETS[coin]

  function copyAddress() {
    navigator.clipboard.writeText(wallet.address).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function openPayPal() {
    window.open(PAYPAL, '_blank')
  }

  function openWhatsApp() {
    const msg = encodeURIComponent(`WC2026 Transit AI Pro Payment\nCoin: ${coin}\nNetwork: ${wallet.network}\nAmount: $5`)
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank')
  }

  const btnStyle = (color, bg) => ({
    width: '100%', padding: '13px', borderRadius: '8px',
    border: `1px solid ${color}`,
    background: bg,
    color: 'white', fontSize: '14px', fontWeight: 700,
    cursor: 'pointer', marginBottom: '10px',
    display: 'block', textAlign: 'center',
  })

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#0a1224', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '16px', padding: '28px', maxWidth: '420px', width: '100%' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>🏟️</div>
          <h2 style={{ color: '#f8fafc', fontSize: '20px', fontWeight: 700, margin: '0 0 6px' }}>{m.title}</h2>
          <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>{m.subtitle}</p>
        </div>

        {/* Amount */}
        <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '8px', padding: '12px', textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ color: '#f59e0b', fontSize: '32px', fontWeight: 900 }}>$5</div>
          <div style={{ color: '#64748b', fontSize: '11px' }}>One-time · Full tournament access</div>
        </div>

        {/* PayPal */}
        <button onClick={openPayPal} style={{ ...btnStyle('#0070ba', '#0070ba'), marginBottom: '10px' }}>
          💳 {m.paypal}
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ color: '#334155', fontSize: '11px', fontFamily: 'monospace' }}>OR CRYPTO</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
        </div>

        {/* Coin selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px', marginBottom: '14px' }}>
          {Object.entries(WALLETS).map(([c, w]) => (
            <button key={c} onClick={() => setCoin(c)}
              style={{ padding: '10px 6px', borderRadius: '8px', border: `1px solid ${coin === c ? w.color + '88' : 'rgba(255,255,255,0.07)'}`, background: coin === c ? `${w.color}15` : 'rgba(255,255,255,0.02)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '18px' }}>{w.icon}</span>
              <span style={{ color: coin === c ? w.color : '#475569', fontFamily: 'monospace', fontSize: '10px', fontWeight: coin === c ? 700 : 400 }}>{c}</span>
            </button>
          ))}
        </div>

        {/* Network */}
        <div style={{ background: `${wallet.color}12`, border: `1px solid ${wallet.color}33`, borderRadius: '6px', padding: '8px 12px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#64748b', fontSize: '11px', fontFamily: 'monospace' }}>Network</span>
          <span style={{ color: wallet.color, fontSize: '11px', fontFamily: 'monospace', fontWeight: 700 }}>{wallet.network}</span>
        </div>

        {/* Address */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 12px', marginBottom: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ color: '#94a3b8', fontFamily: 'monospace', fontSize: '10px', flex: 1, wordBreak: 'break-all', lineHeight: 1.6 }}>{wallet.address}</span>
          <button onClick={copyAddress}
            style={{ padding: '6px 10px', borderRadius: '6px', border: `1px solid ${wallet.color}44`, background: `${wallet.color}12`, color: wallet.color, fontFamily: 'monospace', fontSize: '10px', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {copied ? m.copied : m.copy}
          </button>
        </div>

        {/* Steps */}
        <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px', padding: '10px 14px', marginBottom: '10px' }}>
          {[m.step1, m.step2, m.step3].map((s, i) => (
            <div key={i} style={{ color: '#64748b', fontSize: '12px', marginBottom: i < 2 ? '4px' : 0 }}>{s}</div>
          ))}
        </div>

        {/* Warning */}
        <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', padding: '8px 12px', marginBottom: '14px' }}>
          <span style={{ color: '#f87171', fontSize: '11px' }}>{m.warning}</span>
        </div>

        {/* WhatsApp */}
        <button onClick={openWhatsApp} style={{ ...btnStyle('#25d366', '#25d366'), marginBottom: '10px' }}>
          {m.whatsapp}
        </button>

        {/* Back */}
        <button onClick={onClose}
          style={{ width: '100%', padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', color: '#475569', fontSize: '13px', cursor: 'pointer' }}>
          {m.back}
        </button>
      </div>
    </div>
  )
}
