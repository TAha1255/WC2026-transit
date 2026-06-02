'use client'
import { useState } from 'react'

const CONTENT = {
  ar: {
    dir: 'rtl',
    nav_cta: 'ابدأ مجاناً',
    hero_badge: '🏆 كأس العالم ٢٠٢٦ — USA · Canada · Mexico',
    hero_title: 'لا تضيع وقتك في الزحام',
    hero_subtitle: 'خطط رحلتك للملعب بالذكاء الاصطناعي — ٣ مسارات مثلى، أوقات دقيقة، بلغتك',
    hero_cta: 'احسب مسارك الآن — مجاناً',
    hero_sub: 'لا يلزم تسجيل · ٣ خطط مجانية',
    stats: [
      { num: '16', label: 'ملعب مدعوم' },
      { num: '3', label: 'لغات' },
      { num: 'AI', label: 'مدعوم بكلود' },
      { num: '٣', label: 'استراتيجيات لكل رحلة' },
    ],
    how_title: 'كيف يشتغل؟',
    steps: [
      { icon: '🏟️', title: 'اختر ملعبك', desc: 'من MetLife نيويورك لأزتيكا مكسيكو — كل الملاعب موجودة' },
      { icon: '📍', title: 'أدخل موقعك', desc: 'من الفندق، المطار، أو أي مكان في المدينة' },
      { icon: '⚡', title: 'احصل على خطتك', desc: '٣ مسارات مثلى: الأسرع، الأهدأ، والسر المحلي' },
    ],
    features_title: 'ليش WC2026 Transit AI؟',
    features: [
      { icon: '🚨', title: 'آخر موعد آمن للمغادرة', desc: 'نحسب بالعكس من موعد المباراة — تعرف بالضبط متى تخرج من الفندق' },
      { icon: '🗝️', title: 'السر المحلي', desc: 'مسارات يعرفها السكان فقط — تتجنب الازدحام الرئيسي' },
      { icon: '📅', title: 'تصدير للتقويم', desc: 'احفظ خطتك في Google Calendar أو Apple iCal بضغطة واحدة' },
      { icon: '🌍', title: '٣ لغات', desc: 'عربي، إنجليزي، وإسباني — للمشجعين من كل مكان' },
    ],
    venues_title: 'الملاعب المدعومة',
    venues: [
      { flag: '🇺🇸', name: 'MetLife Stadium', city: 'نيويورك' },
      { flag: '🇲🇽', name: 'Estadio Azteca', city: 'مكسيكو سيتي' },
      { flag: '🇨🇦', name: 'BC Place', city: 'فانكوفر' },
      { flag: '🇺🇸', name: 'SoFi Stadium', city: 'لوس أنجلوس' },
    ],
    pricing_title: 'الأسعار',
    free_plan: 'مجاني',
    free_features: ['٣ خطط يومياً', 'كل الملاعب', 'كل اللغات'],
    pro_plan: 'Pro — $4.99/شهر',
    pro_features: ['خطط غير محدودة', 'كل الملاعب', 'كل اللغات', 'تصدير للتقويم', 'أولوية في الاستجابة'],
    pro_cta: 'اشترك الآن',
    free_cta: 'ابدأ مجاناً',
    faq_title: 'أسئلة شائعة',
    faqs: [
      { q: 'هل المعلومات حقيقية؟', a: 'نعم — نستخدم بيانات حقيقية من NJ Transit، مترو مكسيكو، SkyTrain فانكوفر، وغيرها.' },
      { q: 'هل يشتغل بدون إنترنت؟', a: 'يحتاج إنترنت لتوليد الخطة، لكن بعد التوليد تقدر تصدّره وتشوفه offline.' },
      { q: 'كيف أسجّل للـ Pro؟', a: 'اضغط "اشترك الآن" وتدفع بأي بطاقة — آمن عبر Lemon Squeezy.' },
    ],
    footer: 'WC2026 Transit AI · غير رسمي · مدعوم بـ Claude AI',
  },
  en: {
    dir: 'ltr',
    nav_cta: 'Get Started Free',
    hero_badge: '🏆 FIFA World Cup 2026 — USA · Canada · Mexico',
    hero_title: "Don't Get Stuck in the Crowd",
    hero_subtitle: 'AI-powered match day transit planning — 3 optimized routes, exact timing, in your language',
    hero_cta: 'Plan Your Route — Free',
    hero_sub: 'No signup required · 3 free plans',
    stats: [
      { num: '16', label: 'Venues' },
      { num: '3', label: 'Languages' },
      { num: 'AI', label: 'Powered by Claude' },
      { num: '3', label: 'Strategies per trip' },
    ],
    how_title: 'How It Works',
    steps: [
      { icon: '🏟️', title: 'Choose Your Venue', desc: 'From MetLife NY to Azteca Mexico City — all stadiums covered' },
      { icon: '📍', title: 'Enter Your Location', desc: 'From your hotel, airport, or anywhere in the city' },
      { icon: '⚡', title: 'Get Your Plan', desc: '3 optimized routes: Fastest, Easiest, and the Local Secret' },
    ],
    features_title: 'Why WC2026 Transit AI?',
    features: [
      { icon: '🚨', title: 'Latest Safe Departure Time', desc: 'We reverse-calculate from kickoff — know exactly when to leave your hotel' },
      { icon: '🗝️', title: 'Local Secret Routes', desc: 'Routes only locals know — avoid the main crowd bottlenecks' },
      { icon: '📅', title: 'Calendar Export', desc: 'Save your plan to Google Calendar or Apple iCal in one tap' },
      { icon: '🌍', title: '3 Languages', desc: 'Arabic, English, and Spanish — for fans from everywhere' },
    ],
    venues_title: 'Supported Venues',
    venues: [
      { flag: '🇺🇸', name: 'MetLife Stadium', city: 'New York' },
      { flag: '🇲🇽', name: 'Estadio Azteca', city: 'Mexico City' },
      { flag: '🇨🇦', name: 'BC Place', city: 'Vancouver' },
      { flag: '🇺🇸', name: 'SoFi Stadium', city: 'Los Angeles' },
    ],
    pricing_title: 'Pricing',
    free_plan: 'Free',
    free_features: ['3 plans per day', 'All venues', 'All languages'],
    pro_plan: 'Pro — $4.99/month',
    pro_features: ['Unlimited plans', 'All venues', 'All languages', 'Calendar export', 'Priority response'],
    pro_cta: 'Subscribe Now',
    free_cta: 'Start Free',
    faq_title: 'FAQ',
    faqs: [
      { q: 'Is the data accurate?', a: 'Yes — we use real data from NJ Transit, Mexico City Metro, Vancouver SkyTrain, and more.' },
      { q: 'Does it work offline?', a: 'Requires internet to generate a plan, but you can export and view it offline after.' },
      { q: 'How do I subscribe to Pro?', a: 'Click "Subscribe Now" and pay with any card — secured by Lemon Squeezy.' },
    ],
    footer: 'WC2026 Transit AI · Unofficial fan tool · Powered by Claude AI',
  },
  es: {
    dir: 'ltr',
    nav_cta: 'Empezar Gratis',
    hero_badge: '🏆 Copa Mundial FIFA 2026 — USA · Canadá · México',
    hero_title: 'No Pierdas Tiempo en el Tráfico',
    hero_subtitle: 'Planificación de viaje con IA para el día del partido — 3 rutas óptimas, tiempos exactos, en tu idioma',
    hero_cta: 'Planifica Tu Ruta — Gratis',
    hero_sub: 'Sin registro · 3 planes gratuitos',
    stats: [
      { num: '16', label: 'Estadios' },
      { num: '3', label: 'Idiomas' },
      { num: 'IA', label: 'Powered by Claude' },
      { num: '3', label: 'Estrategias por viaje' },
    ],
    how_title: '¿Cómo Funciona?',
    steps: [
      { icon: '🏟️', title: 'Elige Tu Estadio', desc: 'Desde MetLife NY hasta el Azteca — todos los estadios incluidos' },
      { icon: '📍', title: 'Ingresa Tu Ubicación', desc: 'Desde tu hotel, aeropuerto o cualquier lugar de la ciudad' },
      { icon: '⚡', title: 'Obtén Tu Plan', desc: '3 rutas optimizadas: Más Rápida, Más Cómoda y el Secreto Local' },
    ],
    features_title: '¿Por Qué WC2026 Transit AI?',
    features: [
      { icon: '🚨', title: 'Última Hora Segura de Salida', desc: 'Calculamos al revés desde el inicio del partido — sabe exactamente cuándo salir' },
      { icon: '🗝️', title: 'Rutas Secretas Locales', desc: 'Rutas que solo conocen los locales — evita los embotellamientos principales' },
      { icon: '📅', title: 'Exportar al Calendario', desc: 'Guarda tu plan en Google Calendar o Apple iCal con un toque' },
      { icon: '🌍', title: '3 Idiomas', desc: 'Árabe, inglés y español — para aficionados de todas partes' },
    ],
    venues_title: 'Estadios Disponibles',
    venues: [
      { flag: '🇺🇸', name: 'MetLife Stadium', city: 'Nueva York' },
      { flag: '🇲🇽', name: 'Estadio Azteca', city: 'Ciudad de México' },
      { flag: '🇨🇦', name: 'BC Place', city: 'Vancouver' },
      { flag: '🇺🇸', name: 'SoFi Stadium', city: 'Los Ángeles' },
    ],
    pricing_title: 'Precios',
    free_plan: 'Gratis',
    free_features: ['3 planes por día', 'Todos los estadios', 'Todos los idiomas'],
    pro_plan: 'Pro — $4.99/mes',
    pro_features: ['Planes ilimitados', 'Todos los estadios', 'Todos los idiomas', 'Exportar calendario', 'Respuesta prioritaria'],
    pro_cta: 'Suscribirse Ahora',
    free_cta: 'Empezar Gratis',
    faq_title: 'Preguntas Frecuentes',
    faqs: [
      { q: '¿Los datos son precisos?', a: 'Sí — usamos datos reales de NJ Transit, Metro CDMX, SkyTrain Vancouver y más.' },
      { q: '¿Funciona sin internet?', a: 'Necesita internet para generar el plan, pero puedes exportarlo y verlo sin conexión.' },
      { q: '¿Cómo me suscribo al Pro?', a: 'Haz clic en "Suscribirse Ahora" y paga con cualquier tarjeta — seguro con Lemon Squeezy.' },
    ],
    footer: 'WC2026 Transit AI · Herramienta no oficial · Powered by Claude AI',
  },
}

export default function LandingPage() {
  const [lang, setLang] = useState('en')
  const c = CONTENT[lang]

  const btnStyle = (primary) => ({
    padding: primary ? '14px 32px' : '12px 28px',
    borderRadius: '8px',
    border: primary ? 'none' : '1px solid rgba(245,158,11,0.4)',
    background: primary ? '#f59e0b' : 'transparent',
    color: primary ? '#000' : '#f59e0b',
    fontSize: primary ? '16px' : '14px',
    fontWeight: 700,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.2s',
  })

  return (
    <div style={{ background: '#050d1a', color: '#e2e8f0', fontFamily: "'IBM Plex Sans Arabic', sans-serif", minHeight: '100vh', direction: c.dir }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;600;700&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, background: 'rgba(5,13,26,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(245,158,11,0.1)', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
        <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: '16px' }}>🏆 WC2026 Transit AI</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Lang switcher */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {Object.keys(CONTENT).map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{ padding: '4px 8px', borderRadius: '4px', border: `1px solid ${lang === l ? '#f59e0b55' : 'rgba(255,255,255,0.1)'}`, background: lang === l ? 'rgba(245,158,11,0.12)' : 'transparent', color: lang === l ? '#f59e0b' : '#475569', fontSize: '11px', cursor: 'pointer' }}>
                {l === 'ar' ? '🇸🇦' : l === 'en' ? '🇬🇧' : '🇪🇸'} {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="/" style={btnStyle(true)}>{c.nav_cta}</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: 'center', padding: 'clamp(48px,8vw,96px) 24px', background: 'radial-gradient(ellipse at top, rgba(245,158,11,0.08) 0%, transparent 70%)' }}>
        <div style={{ display: 'inline-block', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '20px', padding: '6px 16px', fontSize: '13px', color: '#f59e0b', marginBottom: '24px', fontFamily: 'monospace' }}>
          {c.hero_badge}
        </div>
        <h1 style={{ fontSize: 'clamp(32px,6vw,64px)', fontWeight: 700, color: '#f8fafc', margin: '0 0 20px', lineHeight: 1.2 }}>
          {c.hero_title}
        </h1>
        <p style={{ fontSize: 'clamp(16px,2.5vw,20px)', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          {c.hero_subtitle}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/" style={btnStyle(true)}>{c.hero_cta}</a>
        </div>
        <p style={{ color: '#334155', fontSize: '12px', marginTop: '12px', fontFamily: 'monospace' }}>{c.hero_sub}</p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '48px' }}>
          {c.stats.map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px 24px', minWidth: '100px' }}>
              <div style={{ color: '#f59e0b', fontSize: '28px', fontWeight: 900, fontFamily: 'monospace' }}>{s.num}</div>
              <div style={{ color: '#475569', fontSize: '11px', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: 'clamp(48px,6vw,80px) 24px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700, color: '#f8fafc', marginBottom: '48px' }}>{c.how_title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '20px' }}>
          {c.steps.map((step, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', textAlign: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#f59e0b', color: '#000', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 900 }}>{i + 1}</div>
              <div style={{ fontSize: '36px', marginBottom: '12px', marginTop: '8px' }}>{step.icon}</div>
              <h3 style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{step.title}</h3>
              <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: 'clamp(48px,6vw,80px) 24px', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700, color: '#f8fafc', marginBottom: '48px' }}>{c.features_title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px' }}>
            {c.features.map((f, i) => (
              <div key={i} style={{ background: 'rgba(10,18,36,0.9)', border: '1px solid rgba(245,158,11,0.12)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{f.icon}</div>
                <h3 style={{ color: '#fcd34d', fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENUES */}
      <section style={{ padding: 'clamp(48px,6vw,80px) 24px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700, color: '#f8fafc', marginBottom: '36px' }}>{c.venues_title}</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {c.venues.map((v, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>{v.flag}</span>
              <div>
                <div style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 600 }}>{v.name}</div>
                <div style={{ color: '#475569', fontSize: '11px', fontFamily: 'monospace' }}>{v.city}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: 'clamp(48px,6vw,80px) 24px', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700, color: '#f8fafc', marginBottom: '48px' }}>{c.pricing_title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '20px' }}>
            {/* Free */}
            <div style={{ background: 'rgba(10,18,36,0.9)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '28px' }}>
              <div style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px' }}>{c.free_plan}</div>
              <div style={{ color: '#f8fafc', fontSize: '36px', fontWeight: 900, marginBottom: '20px' }}>$0</div>
              {c.free_features.map((f, i) => (
                <div key={i} style={{ color: '#64748b', fontSize: '13px', marginBottom: '8px' }}>✓ {f}</div>
              ))}
              <a href="/" style={{ ...btnStyle(false), display: 'block', textAlign: 'center', marginTop: '24px' }}>{c.free_cta}</a>
            </div>
            {/* Pro */}
            <div style={{ background: 'rgba(245,158,11,0.06)', border: '2px solid rgba(245,158,11,0.4)', borderRadius: '14px', padding: '28px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#f59e0b', color: '#000', fontSize: '11px', fontWeight: 700, padding: '3px 12px', borderRadius: '10px' }}>POPULAR</div>
              <div style={{ color: '#f59e0b', fontSize: '14px', marginBottom: '8px' }}>{c.pro_plan}</div>
              <div style={{ color: '#f8fafc', fontSize: '36px', fontWeight: 900, marginBottom: '20px' }}>$4.99</div>
              {c.pro_features.map((f, i) => (
                <div key={i} style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px' }}>✓ {f}</div>
              ))}
              <a href="/" style={{ ...btnStyle(true), display: 'block', textAlign: 'center', marginTop: '24px' }}>{c.pro_cta}</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: 'clamp(48px,6vw,80px) 24px', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700, color: '#f8fafc', marginBottom: '36px' }}>{c.faq_title}</h2>
        {c.faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 0' }}>
            <h3 style={{ color: '#fcd34d', fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>{faq.q}</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </section>

      {/* FINAL CTA */}
      <section style={{ textAlign: 'center', padding: 'clamp(48px,6vw,80px) 24px', background: 'radial-gradient(ellipse at bottom, rgba(245,158,11,0.08) 0%, transparent 70%)' }}>
        <h2 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 700, color: '#f8fafc', marginBottom: '20px' }}>
          {lang === 'ar' ? 'جاهز لكأس العالم؟' : lang === 'en' ? 'Ready for the World Cup?' : '¿Listo para la Copa Mundial?'}
        </h2>
        <a href="/" style={{ ...btnStyle(true), fontSize: '18px', padding: '16px 40px' }}>{c.hero_cta}</a>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: 'center', padding: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#1e293b', fontFamily: 'monospace', fontSize: '11px' }}>
        {c.footer} · <a href="/legal" style={{ color: '#334155', textDecoration: 'none' }}>Legal</a>
      </footer>
    </div>
  )
}
