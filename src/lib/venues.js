export const VENUES = {
  metlife: {
    id: 'metlife', flag: '🇺🇸',
    name_ar: 'ملعب نيويورك نيوجيرسي', name_en: 'MetLife Stadium',
    city: { ar: 'نيويورك / نيوجيرسي', en: 'New York / New Jersey', es: 'Nueva York / Nueva Jersey' },
    capacity: 82500, security_wait: 42, congestion: 9, no_parking: true,
    transit_context: `NJ Transit Rail: Penn Station → MetLife, 25min, $105 RT. Official Shuttle: Port Authority, 40min, $80. No parking. Local secret: PATH to Secaucus $4.25.`,
    matches: [
      { date: '2026-06-14T15:00:00-04:00', label: { ar: 'مباراة المجموعات', en: 'Group Stage Match', es: 'Partido de Grupos' } },
      { date: '2026-06-21T18:00:00-04:00', label: { ar: 'مباراة المجموعات', en: 'Group Stage Match', es: 'Partido de Grupos' } },
      { date: '2026-07-19T18:00:00-04:00', label: { ar: '🏆 النهائي', en: '🏆 The Final', es: '🏆 La Final' } },
    ],
    suggested: ['Times Square, New York', 'JFK Airport, Queens', 'Newark Penn Station, NJ'],
  },
  azteca: {
    id: 'azteca', flag: '🇲🇽',
    name_ar: 'إستاديو أزتيكا', name_en: 'Estadio Azteca',
    city: { ar: 'مكسيكو سيتي', en: 'Mexico City', es: 'Ciudad de México' },
    capacity: 83000, security_wait: 50, congestion: 8, no_parking: true, altitude_m: 2240,
    transit_context: `Metro Line 2 to Tasqueña then Tren Ligero to stadium, 55min, 8 MXN. Local secret: Metrobús Line 4 to Canal de Miramontes then taxi.`,
    matches: [
      { date: '2026-06-11T14:00:00-06:00', label: { ar: '🎉 مباراة الافتتاح', en: '🎉 Opening Match', es: '🎉 Partido Inaugural' } },
      { date: '2026-06-17T14:00:00-06:00', label: { ar: 'مباراة المجموعات', en: 'Group Stage Match', es: 'Partido de Grupos' } },
      { date: '2026-07-05T17:00:00-06:00', label: { ar: 'دور الـ١٦', en: 'Round of 16', es: 'Octavos de Final' } },
    ],
    suggested: ['Aeropuerto AIFA, CDMX', 'Zona Rosa, CDMX', 'Centro Histórico, Zócalo'],
  },
  bcplace: {
    id: 'bcplace', flag: '🇨🇦',
    name_ar: 'ملعب BC Place', name_en: 'BC Place Stadium',
    city: { ar: 'فانكوفر', en: 'Vancouver', es: 'Vancouver' },
    capacity: 54500, security_wait: 30, congestion: 7, no_parking: false,
    transit_context: `SkyTrain Expo Line to Stadium-Chinatown, 8min, $3.15 CAD. From YVR: Canada Line 30min. Local secret: Mobi Bike 20min, $4 CAD.`,
    matches: [
      { date: '2026-06-13T15:00:00-07:00', label: { ar: 'مباراة المجموعات', en: 'Group Stage Match', es: 'Partido de Grupos' } },
      { date: '2026-06-20T18:00:00-07:00', label: { ar: 'مباراة المجموعات', en: 'Group Stage Match', es: 'Partido de Grupos' } },
      { date: '2026-07-03T17:00:00-07:00', label: { ar: 'دور الـ١٦', en: 'Round of 16', es: 'Octavos de Final' } },
    ],
    suggested: ['YVR Airport, Vancouver', 'Gastown, Vancouver', 'Yaletown, Vancouver'],
  },
  sofi: {
    id: 'sofi', flag: '🇺🇸',
    name_ar: 'ملعب SoFi', name_en: 'SoFi Stadium',
    city: { ar: 'لوس أنجلوس', en: 'Los Angeles', es: 'Los Ángeles' },
    capacity: 70240, security_wait: 38, congestion: 9, no_parking: false,
    transit_context: `Metro K Line direct to SoFi Stadium station, 35min, $1.75. From LAX: free shuttle then K Line 20min. Local secret: ITC free shuttle from downtown Inglewood.`,
    matches: [
      { date: '2026-06-15T20:00:00-07:00', label: { ar: 'مباراة المجموعات', en: 'Group Stage Match', es: 'Partido de Grupos' } },
      { date: '2026-06-22T20:00:00-07:00', label: { ar: 'مباراة المجموعات', en: 'Group Stage Match', es: 'Partido de Grupos' } },
      { date: '2026-07-06T19:00:00-07:00', label: { ar: 'ربع النهائي', en: 'Quarter Final', es: 'Cuartos de Final' } },
    ],
    suggested: ['LAX Airport, Inglewood', 'Downtown Los Angeles', 'Hollywood & Highland'],
  },
}

export function buildSystemPrompt(venue, lang = 'ar') {
  const langMap = {
    ar: 'Arabic',
    en: 'English',
    es: 'Spanish',
  }
  const targetLang = langMap[lang] || 'English'

  return `You are a transit AI for FIFA World Cup 2026.
IMPORTANT: Generate ALL text in ${targetLang}. Both "instruction_ar" and "ai_context_note_ar" fields must be written in ${targetLang}.

VENUE: ${venue.name_en} ${venue.flag} | ${venue.city.en}
SECURITY: ${venue.security_wait}min | CONGESTION: ${venue.congestion}/10
${venue.no_parking ? 'NO PARKING on matchdays.' : ''}
${venue.altitude_m ? `ALTITUDE: ${venue.altitude_m}m — warn fans to acclimatize.` : ''}
TRANSIT: ${venue.transit_context}

Return ONLY this JSON, no markdown, no backticks:
{"strategies":{"fastest":{"total_duration_minutes":0,"recommended_departure_time":"ISO","estimated_arrival_time":"ISO","steps":[{"step_number":1,"mode":"TRAIN","line_or_flight_id":"string","origin":"string","destination":"string","departure_time":"ISO","arrival_time":"ISO","fare_estimate":"string","instruction_ar":"text in ${targetLang}","ai_context_note_ar":"text in ${targetLang}"}]},"minimal_stress":{"total_duration_minutes":0,"recommended_departure_time":"ISO","estimated_arrival_time":"ISO","steps":[]},"local_secret":{"total_duration_minutes":0,"recommended_departure_time":"ISO","estimated_arrival_time":"ISO","steps":[]}}}`
}
