/**
 * Cloudflare Pages Function — POST /api/join
 *
 * Required environment variables (set in Cloudflare Pages dashboard):
 *   AIRTABLE_TOKEN   — your Airtable Personal Access Token
 *   AIRTABLE_BASE_ID — your base ID (starts with "app...")
 *
 * Airtable tables expected:
 *   "Current Members" — Name, Email, Phone, Department, Level, Instrument, Submitted At
 *   "Old Members"     — Name, Email, Phone, Graduation Year, Instrument, Message, Submitted At
 */

export async function onRequestPost(context) {
  const { request, env } = context

  try {
    const body = await request.json()
    const { type, ...fields } = body

    if (type !== 'current' && type !== 'old') {
      return json({ error: 'Invalid type' }, 400)
    }

    const tableName = type === 'current' ? 'Current Members' : 'Old Members'

    const record =
      type === 'current'
        ? {
            Name: fields.fullName,
            Email: fields.email,
            Phone: fields.phone,
            Department: fields.department,
            Level: fields.level,
            Instrument: fields.instrument,
            'Submitted At': new Date().toISOString(),
          }
        : {
            Name: fields.fullName,
            Email: fields.email,
            Phone: fields.phone,
            'Graduation Year': Number(fields.graduationYear) || fields.graduationYear,
            Instrument: fields.instrument,
            Message: fields.message,
            'Submitted At': new Date().toISOString(),
          }

    const res = await fetch(
      `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields: record }),
      },
    )

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error('Airtable error:', JSON.stringify(err))
      // Pass Airtable's message through so we can debug field name mismatches
      return json({ error: err?.error?.message ?? err?.error ?? 'Failed to save record', detail: err }, res.status)
    }

    return json({ ok: true }, 200)
  } catch (err) {
    console.error('Function error:', err)
    return json({ error: 'Internal error' }, 500)
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
