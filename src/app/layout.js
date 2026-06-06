export const metadata = {
  title: 'WC2026 Transit AI — محرك التنقل',
  description: 'خطط رحلتك لكأس العالم 2026 بالذكاء الاصطناعي — AI-powered transit planning for FIFA World Cup 2026',
  manifest: '/manifest.json',
  themeColor: '#f59e0b',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'WC2026 Transit',
  },
  openGraph: {
    title: 'WC2026 Transit AI 🏆',
    description: 'AI-powered match day transit planning for FIFA World Cup 2026',
    url: 'https://wc-2026-transit.vercel.app',
    siteName: 'WC2026 Transit AI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WC2026 Transit AI 🏆',
    description: 'Plan your World Cup 2026 match day transit in 3 languages',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;600;700&display=swap" rel="stylesheet"/>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="theme-color" content="#f59e0b"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="apple-mobile-web-app-title" content="WC2026 Transit"/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <link rel="apple-touch-icon" href="/icon-192.png"/>
      </head>
      <body style={{
        margin: 0,
        background: '#050d1a',
        color: '#e2e8f0',
        fontFamily: "'IBM Plex Sans Arabic', monospace",
        minHeight: '100vh',
      }}>
        {children}
      </body>
    </html>
  )
}
