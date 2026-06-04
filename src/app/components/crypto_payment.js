'use client'
import { useState } from 'react'

// ← حط عناوين محافظك هنا
const WALLETS = {
  USDT: {
    network: 'TRC20 (Tron)',
    address: 'TXGDfTmk5wviMjaJZgimW1ZHcE6Re7R1JA',
    icon: '💵',
    color: '#26a17b',
    note: 'USDT on TRC20 network only',
  },
  BTC: {
    network: 'Bitcoin',
    address: 'bc1pf0asjatqtd9rrfhucwcxmwfm7t0j46gcz99pat8uddajfr88jtjqnk8ary',
    icon: '₿',
    color: '#f7931a',
    note: 'Bitcoin network',
  },
  ETH: {
    network: 'Ethereum (ERC20)',
    address: '0xef56F75cb88c23073Ba1d270EFb224B08FD0e50d',
    icon: '⟠',
    color: '#627eea',
    note: 'Ethereum network only',
  },
  SOL: {
    network: 'Solana',
    address: '5g37gkA4tf8Wzep6eqU43Rmc5ifeDfzEFyujCpz9W7B6',
    icon: '◎',
    color: '#9945ff',
    note: 'Solana network',
  },
}

const AMOUNT = 5 // USD

const MSGS = {
  ar: {
    title: 'ترقية للـ Pro 🏆',
    subtitle: 'وصول كامل لكل البطولة',
    amount: 'المبلغ: $5 USDT',
    select: 'اختر العملة',
    copy: 'نسخ العنوان',
    copied: '✅ تم النسخ',
    step1: '١. انسخ عنوان المحفظة',
    step2: '٢. حوّل $5 من محفظتك',
    step3: '٣. أرسل إثبات التحويل على واتساب',
    whatsapp: 'أرسل إثبات على واتساب',
    warning: '⚠️ تأكد من الشبكة الصحيحة قبل التحويل',
    back: 'رجوع',
  },
  en: {
    title: 'Upgrade to Pro 🏆',
    subtitle: 'Full access for the entire tournament',
    amount: 'Amount: $5 USDT equivalent',
    select: 'Select Currency',
    copy: 'Copy Address',
    copied: '✅ Copied!',
    step1: '1. Copy the wallet address',
    step2: '2. Send $5 worth from your wallet',
    step3: '3. Send payment proof on WhatsApp',
    whatsapp: 'Send Proof on WhatsApp',
    warning: '⚠️ Make sure to use the correct network',
    back: 'Go Back',
  },
  es: {
    title: 'Actualizar a Pro 🏆',
    subtitle: 'Acceso completo para todo el torneo',
    amount: 'Monto: $5 equivalente en USDT',
    select: 'Seleccionar Moneda',
    copy: 'Copiar Dirección',
    copied: '✅ ¡Copiado!',
    step1: '1. Copia la dirección de la billetera',
    step2: '2. Envía $5 desde tu billetera',
    step3: '3. Envía comprobante por WhatsApp',
    whatsapp: 'Enviar Comprobante por WhatsApp',
    warning: '⚠️ Asegúrate de usar la red correcta',
    back: 'Volver',
  },
}

export default function CryptoPayment({ lang = 'en', onClose }) {
  const [selected, setSelected] = useState('USDT')
  const [copied,   setCopied]   = useState(false)
  const m = MSGS[lang] || MSGS.en
  const wallet = WALLETS[selected]

  function copyAddress() {
    navigator.clipboard.writeText(wallet.address).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // WhatsApp number
  const PAYPAL_LINK = 'https://www.paypal.com/paypalme/tahafaradj/5'
  const WHATSAPP_NUMBER = '96565724949'
  const whatsappMsg = encodeURIComponent(`WC2026 Transit AI - Pro Payment\nCrypto: ${selected}\nNetwork: ${wallet.network}\nAmount: $${AMOUNT}`)
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#0a1224', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '16px', padding: '28px', maxWidth: '440px', width: '100%', boxShadow: '0 0 60px rgba(245,158,11,0.1)' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ color: '#f8fafc', fontSize: '20px', fontWeight: 700, margin: '0 0 6px' }}>{m.title}</h2>
          <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>{m.subtitle}</p>
        </div>

        {/* Currency selector */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ color: '#475569', fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.12em', marginBottom: '10px' }}>{m.select.toUpperCase()}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px' }}>
            {Object.entries(WALLETS).map(([coin, w]) => (
              <button key={coin} onClick={() => setSelected(coin)}
                style={{ padding: '10px 6px', borderRadius: '8px', border: `1px solid ${selected === coin ? w.color + '88' : 'rgba(255,255,255,0.07)'}`, background: selected === coin ? `${w.color}15` : 'rgba(255,255,255,0.02)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', transition: 'all 0.15s' }}>
                <span style={{ fontSize: '20px' }}>{w.icon}</span>
                <span style={{ color: selected === coin ? w.color : '#475569', fontFamily: 'monospace', fontSize: '10px', fontWeight: selected === coin ? 700 : 400 }}>{coin}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Network badge */}
        <div style={{ background: `${wallet.color}12`, border: `1px solid ${wallet.color}33`, borderRadius: '6px', padding: '8px 12px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#64748b', fontSize: '11px', fontFamily: 'monospace' }}>Network</span>
          <span style={{ color: wallet.color, fontSize: '11px', fontFamily: 'monospace', fontWeight: 700 }}>{wallet.network}</span>
        </div>

        {/* Amount */}
        <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', textAlign: 'center' }}>
          <div style={{ color: '#f59e0b', fontFamily: 'monospace', fontSize: '24px', fontWeight: 900 }}>${AMOUNT}</div>
          <div style={{ color: '#64748b', fontSize: '11px', marginTop: '2px' }}>{selected} equivalent</div>
        </div>

        {/* Address */}
        <div style={{ marginBottom: '16px' }}>
          <p style={{ color: '#475569', fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.12em', marginBottom: '8px' }}>WALLET ADDRESS</p>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontFamily: 'monospace', fontSize: '10px', flex: 1, wordBreak: 'break-all', lineHeight: 1.6 }}>
              {wallet.address}
            </span>
            <button onClick={copyAddress}
              style={{ padding: '8px 12px', borderRadius: '6px', border: `1px solid ${wallet.color}44`, background: `${wallet.color}12`, color: wallet.color, fontFamily: 'monospace', fontSize: '10px', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {copied ? m.copied : m.copy}
            </button>
          </div>
        </div>

        {/* Steps */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px 14px', marginBottom: '16px' }}>
          {[m.step1, m.step2, m.step3].map((step, i) => (
            <div key={i} style={{ color: '#64748b', fontSize: '12px', marginBottom: i < 2 ? '6px' : 0, lineHeight: 1.5 }}>{step}</div>
          ))}
        </div>

        {/* Warning */}
        <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', padding: '8px 12px', marginBottom: '16px' }}>
          <span style={{ color: '#f87171', fontSize: '11px' }}>{m.warning}</span>
        </div>

        {/* PayPal button */}
        <a href="https://www.paypal.com/paypalme/tahafaradj/5" target="_blank" rel="noreferrer"
          style={{ display: 'block', padding: '13px', background: '#003087', borderRadius: '8px', color: 'white', fontWeight: 700, fontSize: '14px', textDecoration: 'none', textAlign: 'center', marginBottom: '10px' }}>
          💳 Pay with PayPal — $5
        </a>
        <a href={whatsappUrl} target="_blank" rel="noreferrer"
          style={{ display: 'block', padding: '13px', background: '#25d366', borderRadius: '8px', color: 'white', fontWeight: 700, fontSize: '14px', textDecoration: 'none', textAlign: 'center', marginBottom: '10px' }}>
          📱 {m.whatsapp}
        </a>

        {/* Back */}
        <button onClick={onClose}
          style={{ width: '100%', padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', color: '#334155', fontSize: '13px', cursor: 'pointer' }}>
          {m.back}
        </button>
      </div>
    </div>
  )
}
