import { NextResponse } from 'next/server';
import { issueAdminSession, clearAdminSession, constantTimeEq } from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({}));
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 });
  if (typeof password !== 'string' || !constantTimeEq(password, expected)) {
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: 'invalid' }, { status: 401 });
  }
  await issueAdminSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
