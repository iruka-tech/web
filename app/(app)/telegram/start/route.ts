import { NextRequest, NextResponse } from 'next/server';
import { telegramBotUrl } from '@/lib/telegram/config';
import { resolveTelegramReturnTo, TELEGRAM_RETURN_TO_COOKIE, TELEGRAM_RETURN_TO_PARAM } from '@/lib/telegram/setup-flow';

const expireReturnTo = (response: NextResponse) => {
  response.cookies.set(TELEGRAM_RETURN_TO_COOKIE, '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
};

export async function GET(request: NextRequest) {
  const returnTo = resolveTelegramReturnTo(request.nextUrl.searchParams.get(TELEGRAM_RETURN_TO_PARAM));
  const response = NextResponse.redirect(telegramBotUrl);

  if (returnTo) {
    response.cookies.set(TELEGRAM_RETURN_TO_COOKIE, returnTo, {
      httpOnly: true,
      maxAge: 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  } else {
    expireReturnTo(response);
  }

  return response;
}
