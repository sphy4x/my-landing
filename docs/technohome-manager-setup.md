# Techno Home Manager — Android PWA setup

Status: **code prepared in GitHub; production activation is blocked until backend access is provided and tests pass**.

## Architecture

- Customer: existing contact form at `https://technohome.gr/#contact`.
- Submission: browser POST -> `submit-inquiry` Supabase Edge Function -> protected `technohome_inquiries` table -> Web Push to technician.
- Technician: private installable PWA `https://technohome.gr/manager/`, sign in by email/password, read inquiries, change status, call via dialer, open WhatsApp/Viber.
- Public visitors have **no** SELECT/UPDATE/DELETE database grants. No service key in GitHub/Vite/browsers. Admin rights granted only to an explicitly approved Auth user.
- Old Viber handoff remains until `VITE_TH_LEAD_ENDPOINT` is configured.

## Blocker: Supabase access

The existing TechnoHome reviews project is `dubkthkfebmoakmpxumh`. It is not accessible with the currently connected Supabase account (permission denied). DO NOT use the NOXA Supabase project. Request proper TechnoHome project access from its owner, or agree which new independent Supabase organization/project to use; never ask anyone to paste a service key into a chat.

## Activation sequence

1. Verify ownership of the TechnoHome Supabase database (or create a dedicated independent one under an approved organization).
2. Apply `supabase/setup-manager.sql` to the **TechnoHome** database only. Review policies with the Security Advisor. Test anonymous SELECT/UPDATE are denied. Review data retention requirements before going live.
3. Create the technician's account in Supabase Auth Users with a strong private password, disable public signups. Add that account UUID to `technohome_managers` from a privileged SQL session.
4. Generate a fresh VAPID key pair via a secure environment (`npx web-push generate-vapid-keys`). Save **private** key only in Supabase Functions secrets, never in GitHub/website. Add environment secrets:
   - `TH_RATE_SECRET`: strong random secret for hashing rate-limit IP addresses;
   - `TH_VAPID_PUBLIC_KEY`, `TH_VAPID_PRIVATE_KEY`, `TH_VAPID_SUBJECT=mailto:technohome.gr@gmail.com`.
   - `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are normally injected by the Functions runtime; confirm before deployment.
5. Deploy `submit-inquiry` with `verify_jwt=false` as declared in `supabase/config.toml`. Its public CORS allowlist contains only `technohome.gr` and `www.technohome.gr`. Validate rate limiting and ensure the API only returns `ok` without customer data.
6. In GitHub repository Settings -> Secrets and variables -> Actions -> **Variables** (NOT private secrets for these four public values):
   - `VITE_TH_MANAGER_SUPABASE_URL=https://<technohome-project-ref>.supabase.co`
   - `VITE_TH_MANAGER_SUPABASE_KEY=<publishable Supabase key, NOT service-role key>`
   - `VITE_TH_MANAGER_VAPID_PUBLIC_KEY=<public VAPID key>`
   - `VITE_TH_LEAD_ENDPOINT=https://<technohome-project-ref>.supabase.co/functions/v1/submit-inquiry`
   The workflow references them at build time. Never add a service role key to VITE/GitHub variables or source code.
7. Deploy the application once all dependencies have passed tests, not before. Confirm all existing homepage SEO pages, robots and sitemap remain unchanged.
8. On the technician's Android: open Chrome -> `https://technohome.gr/manager/` -> 3-dot menu -> **Install app / Προσθήκη στην αρχική οθόνη** -> sign in -> tap **Ενεργοποίηση** -> allow notifications. Android notification permissions and browser restrictions may vary.
9. Test with a controlled inquiry (not real customer data). Verify: form success only after database insert, private dashboard refresh and status update, Android notification received with screen locked, WhatsApp/Viber links, login expiration, failed network, and spam rate limiting. Do NOT claim push works without an end-to-end test.

## Privacy and security

- Client names, phone numbers, area and descriptions are personal data; the legal basis and GDPR retention/deletion workflow must be approved by the business owner.
- `supabase/setup-manager.sql` enables RLS on all tables. The public form never inserts directly with an anonymous key; only a server-side Edge Function using a service key inserts records after validation and rate limiting.
- The privacy notice changes conditionally when the form backend becomes active. Record the policy version and final controller/processor arrangements before production launch.
- Lock-screen notifications deliberately contain NO names or phone numbers.
- Service worker caches **no** submissions, sessions, API responses or personal data.
- Never publish the manager table or authentication data in analytics, sitemap, search indexing or source logs. Manager HTML is `noindex`.

## Expected first release

- New / In progress / Done with counters, status filter and update
- Client name, phone, location, service and description
- One-tap phone, WhatsApp and Viber contact
- Android home-screen install and generic Web Push
- Manual refresh plus automatic refresh while screen is open

**Not included:** prices, quotes, customer accounts, advertising, image uploads, AI chat, payment processing or any paid Viber integrations.
