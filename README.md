# 🏆 WC2026 Transit AI

## رفع المشروع على الإنترنت — خطوة بخطوة

### الخطوة ١: نزّل Node.js
روح nodejs.org ونزّل النسخة LTS

### الخطوة ٢: فك ضغط المشروع
فك ضغط الملف وافتح الفولدر

### الخطوة ٣: افتح Terminal داخل الفولدر
- Windows: Shift + Right Click داخل الفولدر ← "Open PowerShell here"
- Mac: Terminal ← اسحب الفولدر

### الخطوة ٤: نفّذ هذه الأوامر بالترتيب
```
npm install
```

### الخطوة ٥: أنشئ ملف .env.local
انسخ الملف .env.local.example واسمه .env.local
افتحه وحط مفتاح Anthropic:
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxx
```

### الخطوة ٦: جرّب محلياً
```
npm run dev
```
افتح المتصفح: http://localhost:3000

### الخطوة ٧: ارفع على GitHub
```
git init
git add .
git commit -m "WC2026 Transit AI"
```
روح github.com ← New Repository ← اسمه wc2026-transit
انسخ الأوامر اللي يعطيك إياها GitHub والصقها في Terminal

### الخطوة ٨: ارفع على Vercel
روح vercel.com ← Add New Project ← اختار الـ repository من GitHub
في Environment Variables أضف:
- ANTHROPIC_API_KEY = مفتاحك

اضغط Deploy ← خلال دقيقة يعطيك رابط!
