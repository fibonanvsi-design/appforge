import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const generateSchema = z.object({
  prompt: z.string().min(1).max(8000),
});

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { prompt } = generateSchema.parse(body);

    const baseUrl = process.env.AI_BASE_URL;
    const apiKey = process.env.AI_API_KEY;
    const model = process.env.AI_MODEL || 'oc/big-pickle';

    if (!baseUrl || !apiKey) {
      return NextResponse.json(
        { error: 'AI service is not configured' },
        { status: 503 }
      );
    }

    const systemMessage = [
      'You are AppForge AI, an expert web developer assistant.',
      'You help users build web applications by generating clean, production-ready code.',
      'Respond with complete, working code. Use descriptive variable names.',
      'Prefer HTML/CSS/JS, React, or Next.js depending on the request.',
      'Wrap code blocks in markdown fences with the appropriate language tag.',
    ].join(' ');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000);

    let completion;
    try {
      const res = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: prompt },
          ],
          temperature: 0.4,
          max_tokens: 4096,
        }),
        signal: controller.signal,
      });

      const data = await res.json();

      if (!res.ok) {
        const message =
          data?.error?.message || `AI request failed (${res.status})`;
        return NextResponse.json({ error: message }, { status: 502 });
      }

      completion = data?.choices?.[0]?.message?.content;
    } finally {
      clearTimeout(timeout);
    }

    if (!completion) {
      return NextResponse.json(
        { error: 'AI returned an empty response' },
        { status: 502 }
      );
    }

    return NextResponse.json({ response: completion });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'AI request timed out' },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
