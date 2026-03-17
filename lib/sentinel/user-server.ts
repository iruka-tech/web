import 'server-only';
import { fetchSentinel } from '@/lib/sentinel/server';

export class SentinelRequestError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.name = 'SentinelRequestError';
    this.status = status;
    this.payload = payload;
  }
}

const parseResponsePayload = async (response: Response) => {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
};

export const requestSentinel = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
  const response = await fetchSentinel(path, init);

  const payload = await parseResponsePayload(response);
  if (!response.ok) {
    throw new SentinelRequestError(`Sentinel request failed (${response.status})`, response.status, payload);
  }

  return payload as T;
};
