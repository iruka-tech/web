# Sentinel Web App Auth Context

## Model
- Sentinel is the control plane and canonical account system.
- The web app uses browser session auth through Sentinel.
- Programmatic clients use Sentinel API keys.
- Both resolve to the same Sentinel owner id.

## Frontend Boundaries
- Browser calls this app on same-origin `/api/*`.
- This app acts as a thin proxy to Sentinel `/api/v1/*`.
- The frontend does not call Delivery directly.
- The frontend never stores or handles user API keys.

## Auth Flow
1. `POST /api/auth/siwe/nonce`
2. `POST /api/auth/siwe/verify`
3. Sentinel returns and sets `sentinel_session`
4. App boot uses `GET /api/auth/me`
5. Logout uses `POST /api/auth/logout`

## Product Routes
- Signals use Sentinel `/signals`
- Simulations use Sentinel `/simulate/*`
- Telegram settings use Sentinel `/me/integrations/telegram*`

## Environment
```env
NEXT_PUBLIC_TELEGRAM_BOT_HANDLE=sentinel_beta_bot
SENTINEL_API_BASE_URL=http://localhost:3000/api/v1
DELIVERY_BASE_URL=http://localhost:3100
```

## Non-Goals
- No Supabase auth or profile layer
- No wallet-cookie fallback session model
- No Delivery-side linking from the frontend
- No per-user API-key storage in this app
