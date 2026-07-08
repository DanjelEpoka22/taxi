import { NextResponse } from 'next/server';

// this route calls aviationstack (https://aviationstack.com) which has a free
// tier. add AVIATIONSTACK_API_KEY to your environment variables to enable it.
// without a key, the route returns configured:false and the widget shows a
// manual fallback message instead of breaking.

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const flightNumber = searchParams.get('flight');

  if (!flightNumber) {
    return NextResponse.json({ error: 'missing flight number' }, { status: 400 });
  }

  const apiKey = process.env.AVIATIONSTACK_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ configured: false });
  }

  try {
    const res = await fetch(
      `https://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${encodeURIComponent(flightNumber)}`
    );
    const json = await res.json();
    const flight = json?.data?.[0];
    if (!flight) {
      return NextResponse.json({ configured: true, found: false });
    }
    return NextResponse.json({
      configured: true,
      found: true,
      status: flight.flight_status,
      arrival: flight.arrival?.scheduled,
      estimated: flight.arrival?.estimated,
      terminal: flight.arrival?.terminal,
      airport: flight.arrival?.airport,
    });
  } catch (err) {
    return NextResponse.json({ configured: true, found: false, error: 'lookup failed' }, { status: 502 });
  }
}
