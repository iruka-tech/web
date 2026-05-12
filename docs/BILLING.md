# Billing frontend notes

The app treats payment providers as UI adapters only. The backend owns plan, amount, recipient, payment verification, and Pro entitlement writes.

Supported provider identifiers in frontend types:

- `daimo`: current checkout modal path when the backend returns a Daimo session and client secret.
- `x402`: reserved for the near-term HTTP 402 stablecoin rail.
- `mpp`: reserved for Machine Payments Protocol / Stripe-Tempo style HTTP 402 flows.

Frontend rules:

- Do not grant, extend, or downgrade plans from the client.
- Do not store provider client secrets in URLs, localStorage, analytics, or logs.
- Keep provider-specific UI behind a small switch/helper; shared upgrade pages should stay provider-neutral.
- If a provider is not available yet, show a quiet unavailable state instead of attempting a broken modal.
