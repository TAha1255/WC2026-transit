export const metadata = {
  title: 'WC2026 Transit AI — محرك التنقل',
  description: 'خطط رحلتك لكأس العالم 2026 بالذكاء الاصطناعي',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
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
