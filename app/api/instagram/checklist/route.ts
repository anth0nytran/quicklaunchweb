import { NextResponse } from 'next/server';
import { appendToGoogleSheet } from '@/lib/google-sheets';

export const runtime = 'nodejs';

const TAB_NAME = 'IG Audit Leads';
const HEADERS = ['Timestamp', 'Email', 'GBP Link', 'Source'];

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
    if (!data || typeof data !== 'object') throw new Error();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid body.' }, { status: 400 });
  }

  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  if (!email || !email.includes('@')) {
    return NextResponse.json({ ok: false, error: 'Valid email required.' }, { status: 400 });
  }

  const gbpLink = typeof data.gbpLink === 'string' ? data.gbpLink.trim() : '';
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });
  const source = typeof data.source === 'string' ? data.source : 'instagram_booked';

  try {
    await appendToGoogleSheet(TAB_NAME, HEADERS, [timestamp, email, gbpLink, source]);
  } catch (err) {
    console.error('[Audit API] Google Sheets error:', err);
  }

  return NextResponse.json({ ok: true });
}
