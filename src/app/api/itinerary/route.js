import Anthropic from '@anthropic-ai/sdk'
import { VENUES, buildSystemPrompt } from '@/lib/venues'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request) {
  try {
    const { origin, venueId, matchDate, mobility } = await request.json()

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
      max_tokens: 3000,
      system: buildSystemPrompt(venue),
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

    const raw = message.content[0].text
    const cleaned = raw.replace(/```json|```/g, '').trim()
    const itinerary = JSON.parse(cleaned)

    return Response.json({ success: true, itinerary })

  } catch (error) {
    console.error('API error:', error.message)
    return Response.json(
      { error: 'حدث خطأ. تحقق من البيانات وأعد المحاولة.' },
      { status: 500 }
    )
  }
}
