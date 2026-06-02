export default function LegalPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', color: '#e2e8f0', fontFamily: "'IBM Plex Sans Arabic', sans-serif", lineHeight: 1.8 }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(245,158,11,0.2)', paddingBottom: '20px', marginBottom: '40px' }}>
        <a href="/" style={{ color: '#f59e0b', textDecoration: 'none', fontFamily: 'monospace', fontSize: '12px' }}>← Back to App</a>
        <h1 style={{ margin: '16px 0 4px', fontSize: '28px', fontWeight: 700, color: '#f8fafc' }}>
          🏆 WC2026 Transit AI — Legal
        </h1>
        <p style={{ color: '#475569', fontSize: '13px', margin: 0 }}>Last updated: June 1, 2026</p>
      </div>

      {/* Terms of Service */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ color: '#f59e0b', fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Terms of Service</h2>

        <h3 style={{ color: '#cbd5e1', fontSize: '15px', marginBottom: '8px' }}>1. Service Description</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          WC2026 Transit AI ("the Service") provides AI-powered transit planning for FIFA World Cup 2026 fans. The Service generates route recommendations based on real transit data and artificial intelligence.
        </p>

        <h3 style={{ color: '#cbd5e1', fontSize: '15px', margin: '20px 0 8px' }}>2. Subscription Plans</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          <strong style={{ color: '#e2e8f0' }}>Free Plan:</strong> 3 route calculations per day.<br />
          <strong style={{ color: '#e2e8f0' }}>Pro Plan ($4.99/month):</strong> Unlimited route calculations, all venues, all languages (Arabic, English, Spanish).
        </p>

        <h3 style={{ color: '#cbd5e1', fontSize: '15px', margin: '20px 0 8px' }}>3. Acceptable Use</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          You agree to use the Service only for personal, non-commercial travel planning. You may not resell, redistribute, or reverse-engineer any part of the Service.
        </p>

        <h3 style={{ color: '#cbd5e1', fontSize: '15px', margin: '20px 0 8px' }}>4. Disclaimer</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          Transit routes and times are AI-generated estimates based on available data. WC2026 Transit AI is not affiliated with FIFA, transit agencies, or any official World Cup organization. Always verify departure times with official transit providers before travel.
        </p>

        <h3 style={{ color: '#cbd5e1', fontSize: '15px', margin: '20px 0 8px' }}>5. Changes to Service</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          We reserve the right to modify or discontinue the Service at any time. Subscribers will be notified 7 days in advance of any significant changes.
        </p>
      </section>

      {/* Privacy Policy */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ color: '#f59e0b', fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Privacy Policy</h2>

        <h3 style={{ color: '#cbd5e1', fontSize: '15px', marginBottom: '8px' }}>1. Data We Collect</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          <strong style={{ color: '#e2e8f0' }}>Location data:</strong> Your origin location (entered manually, not tracked automatically).<br />
          <strong style={{ color: '#e2e8f0' }}>Usage data:</strong> Number of route calculations, selected venues and matches.<br />
          <strong style={{ color: '#e2e8f0' }}>Account data:</strong> Email address for subscription management only.
        </p>

        <h3 style={{ color: '#cbd5e1', fontSize: '15px', margin: '20px 0 8px' }}>2. How We Use Your Data</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          Data is used solely to provide the Service. We do not sell, share, or monetize your personal data with third parties.
        </p>

        <h3 style={{ color: '#cbd5e1', fontSize: '15px', margin: '20px 0 8px' }}>3. Third-Party Services</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          We use Anthropic (Claude AI) for route generation. Route queries are processed securely and not stored beyond the session. Payment processing is handled by Lemon Squeezy — we do not store payment information.
        </p>

        <h3 style={{ color: '#cbd5e1', fontSize: '15px', margin: '20px 0 8px' }}>4. Cookies</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          We use minimal cookies only for session management and language preference. No advertising or tracking cookies are used.
        </p>

        <h3 style={{ color: '#cbd5e1', fontSize: '15px', margin: '20px 0 8px' }}>5. Contact</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          For privacy-related requests, contact us at: <span style={{ color: '#f59e0b' }}>privacy@wc2026transit.app</span>
        </p>
      </section>

      {/* Refund Policy */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ color: '#f59e0b', fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Refund Policy</h2>

        <h3 style={{ color: '#cbd5e1', fontSize: '15px', marginBottom: '8px' }}>1. Subscription Refunds</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          We offer a <strong style={{ color: '#e2e8f0' }}>7-day full refund</strong> on all new subscriptions. If you are not satisfied within 7 days of your first payment, contact us for a complete refund — no questions asked.
        </p>

        <h3 style={{ color: '#cbd5e1', fontSize: '15px', margin: '20px 0 8px' }}>2. Cancellation</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period. No partial refunds are issued for unused days after 7 days from purchase.
        </p>

        <h3 style={{ color: '#cbd5e1', fontSize: '15px', margin: '20px 0 8px' }}>3. How to Request a Refund</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          Email us at <span style={{ color: '#f59e0b' }}>support@wc2026transit.app</span> with your order number and reason. Refunds are processed within 5 business days.
        </p>
      </section>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px', textAlign: 'center' }}>
        <p style={{ color: '#334155', fontFamily: 'monospace', fontSize: '11px' }}>
          WC2026 Transit AI · Not affiliated with FIFA · Powered by Claude AI
        </p>
        <a href="/" style={{ color: '#f59e0b', textDecoration: 'none', fontFamily: 'monospace', fontSize: '11px' }}>← Back to App</a>
      </div>
    </div>
  )
}
