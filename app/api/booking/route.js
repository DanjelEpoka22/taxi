import { NextResponse } from 'next/server';

// sends an email notification for a booking using resend (https://resend.com,
// free tier available). add RESEND_API_KEY and RESEND_TO_EMAIL to your
// environment variables to enable this. without them, the route simply
// returns sent:false and the whatsapp booking still works on its own.

export async function POST(request) {
  const body = await request.json();
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.RESEND_TO_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'bookings@taxielbasan.al';

  if (!apiKey || !toEmail) {
    return NextResponse.json({ sent: false, reason: 'email not configured' });
  }

  const text = body.message || JSON.stringify(body, null, 2);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `New taxi booking — ${body.name || 'unknown'} — ${body.destination || ''}`,
        text,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ sent: false, error: err }, { status: 502 });
    }
    return NextResponse.json({ sent: true });
  } catch (err) {
    return NextResponse.json({ sent: false, error: String(err) }, { status: 500 });
  }
}
