import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth/session';
import { getDeliveryWebhookUrl } from '@/lib/delivery/server';
import { buildWhaleMovementTemplate, SignalTemplateError, type WhaleTemplateRequest } from '@/lib/signals/templates';
import { requestSentinel, SentinelRequestError } from '@/lib/sentinel/user-server';
import type { CreateSignalRequest, SignalRecord } from '@/lib/types/signal';

export async function POST(request: Request) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let payload: WhaleTemplateRequest;
  try {
    payload = (await request.json()) as WhaleTemplateRequest;
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  try {
    const templatePayload = buildWhaleMovementTemplate(payload);
    const createSignalPayload: CreateSignalRequest = {
      ...templatePayload,
      webhook_url: getDeliveryWebhookUrl(),
    };

    const signal = await requestSentinel<SignalRecord>('/signals', {
      method: 'POST',
      body: JSON.stringify(createSignalPayload),
    });

    return NextResponse.json(signal, { status: 201 });
  } catch (error) {
    if (error instanceof SignalTemplateError) {
      return NextResponse.json(
        {
          error: 'invalid_template_input',
          details: error.message,
        },
        { status: 400 }
      );
    }

    if (error instanceof SentinelRequestError) {
      return NextResponse.json(
        {
          error: 'sentinel_create_failed',
          details: error.message,
          payload: error.payload,
        },
        { status: error.status }
      );
    }

    return NextResponse.json(
      {
        error: 'template_create_failed',
        details: error instanceof Error ? error.message : 'unknown_error',
      },
      { status: 500 }
    );
  }
}
