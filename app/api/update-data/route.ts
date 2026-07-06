import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data.json');

function isSafePayload(value: unknown): value is { Roadmap?: string[]; 'Important Links'?: Array<{ title: string; url: string }> } {
  if (!value || typeof value !== 'object') return false;

  const record = value as Record<string, unknown>;
  const roadmap = record.Roadmap;
  const links = record['Important Links'];

  if (roadmap !== undefined && (!Array.isArray(roadmap) || roadmap.some((item) => typeof item !== 'string'))) {
    return false;
  }

  if (links !== undefined && (!Array.isArray(links) || links.some((item) => !item || typeof item !== 'object' || typeof (item as { title?: unknown }).title !== 'string' || typeof (item as { url?: unknown }).url !== 'string'))) {
    return false;
  }

  return true;
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('x-admin-key');
  const expectedKey = process.env.DATA_EDIT_KEY;

  if (!expectedKey || authHeader !== expectedKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!isSafePayload(body)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(body, null, 2) + '\n');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
