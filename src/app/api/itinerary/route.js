import Anthropic from '@anthropic-ai/sdk'
import { VENUES, buildSystemPrompt } from '@/lib/venues'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Simple in-memory IP tracker
// يُعاد تعيينه كل ما يُعاد تشغيل السيرفر — كافي للبداية
const ipUsage = new Map()
const FREE_LIMIT = 3
const RESET_MS = 24 * 60 * 60 * 1000 // 24 ساعة

function getClientIP(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function checkLimit(ip) {
  const now = Date.now()
  const record = ipUsage.get(ip)

  // أول مرة أو انتهت الـ 24 ساعة
  if (!record || now - record.firstRequest > RESET_MS) {
    ipUsage.set(ip, { count: 1, firstRequest: now })
    return { allowed: true, remaining: FREE_LIMIT - 1 }
  }

  // وصل الحد
  if (record.count >= FREE_LIMIT) {
    return { allowed: false, remaining: 0 }
  }

  // زيادة العداد
  record.count++
  return { allowed: true, remaining: FREE_LIMIT - record.count }
}

export async function POST(request) {
  try {
    const ip = getClientIP(request)
    const { allowed, remaining } = checkLimit(ip)

    // تجاوز الحد
    if (!allowed) {
      return Response.json({
        error: 'free_limit_reached',
        error_ar: 'انتهت خططك المجانية — ادعم المشروع للحصول على وصول كامل',
        remaining: 0,
      }, { status: 429 })
    }

    const { origin, venueId, matchDate, mobility, lang } = await request.json()

    if (!origin || !venueId || !matchDate) {
      return Response.json({ error: 'بيانات ناقصة' }, { status: 400 })
    }

    const venue = VENUES[venueId]
    if (!venue) {
      return Response.json({ error: 'ملعب غير موجود' }, { status: 400 })
    }

    const arrivalTime = new Date(new Date(matchDate).getTime() - 30 * 60 * 1000).toISOString()

    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 4000,
      system: buildSystemPrompt(venue, lang || 'ar'),
      messages: [{
        role: 'user',
        content: `Origin: ${origin}
Venue: ${venue.name_en}
Required arrival: ${arrivalTime}
Kickoff: ${matchDate}
Mobility: ${mobility || 'Standard'}
Return ONLY valid JSON.`
      }]
    })

    const raw     = message.content[0].text
    const cleaned = raw.replace(/```json|```/g, '').trim()
    const itinerary = JSON.parse(cleaned)

    return Response.json({
      success: true,
      itinerary,
      remaining,
    })

  } catch (error) {
    console.error('API error:', error.message)
    return Response.json(
      { error: 'حدث خطأ. تحقق من البيانات وأعد المحاولة.' },
      { status: 500 }
    )
  }
}
