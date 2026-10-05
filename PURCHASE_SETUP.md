# Thanksgiving purchase accounts

Use the existing Shopify product `10788940677414`, existing Supabase project `almqseeccuohdmlsjnhi`, and existing Vercel app at https://thanksgiving.thecrowandcrown.com/.

The product is a draft at USD 28.99 with the existing Home photo as its featured image. Do not publish it until the live purchase and email checks pass.

## Purchase delivery

`supabase/functions/shopify-purchase` accepts only signed `orders/paid` notifications from the configured store and selected product IDs. It verifies the HMAC over raw body bytes before parsing or writing. Unpaid, cancelled, unrelated and test orders are ignored (test orders require explicit configuration). A private fulfillment record and five-minute atomic lease prevent concurrent processing and completed-order retries.

New buyers receive a Supabase invitation at their checkout email, redirected to the app with `?setup=1`. The app asks them to set their own password; no password is emailed. Existing confirmed accounts receive a sign-in link without changing their password or private parties. Provider failures return retryable HTTP 503 and store only a generic error code. HTTP 200 for an eligible purchase means account email sending completed. A provider accepting a message does not prove inbox delivery.

The handler is designed for Shopify retries, not an indefinite independent queue. Review failed/pending receipts and replay the original signed notification after fixing delivery. If Shopify exhausts retries or removes a failing subscription, repair and re-register it. A crash after sending but before recording completion may cause a further access email; strict exactly-once delivery across SMTP and PostgreSQL is not promised.

This flow provisions purchase accounts. It does not add a paid-only entitlement gate to the existing local planner or change `cc_party_plans` RLS/revision/recovery protections. Public signup is removed from the app dialog; Supabase's signup API configuration is unchanged.

## Configuration

Deploy the function to the existing project. Browser-editor deployments must use the exact bundled source generated with `npx esbuild supabase/functions/shopify-purchase/index.ts --bundle --platform=neutral --external:npm:* --format=esm`.

The function uses Supabase's reserved server-side URL and service-role environment values. Never put these in browser configuration, GitHub, Vercel public environment variables or chat.

Set these function environment values:

| Name | Value |
| --- | --- |
| `THANKSGIVING_PRODUCT_IDS` | `10788940677414` |
| `SHOPIFY_STORE_DOMAIN` | `skt1ik-hi.myshopify.com` (verified in Shopify Domains) |
| `SHOPIFY_WEBHOOK_SECRET` | Owner enters the Shopify notification signing secret directly in Supabase |
| `ALLOW_TEST_ORDERS` | Omitted/false in production; true only for an authorized test |

Configure a JSON Order payment webhook in the existing Shopify store to `https://almqseeccuohdmlsjnhi.supabase.co/functions/v1/shopify-purchase`. Use the signing secret corresponding to that subscription, not an unrelated API token. JWT gateway verification must be off for this one endpoint because Shopify authenticates using its HMAC; all other endpoint settings stay unchanged. Obtain any required dashboard security-setting confirmation immediately before saving. `supabase/config.toml` records the intended CLI deployment setting.

Supabase Auth Site URL stays the production app root. Add the exact redirect `https://thanksgiving.thecrowandcrown.com/?setup=1`; preserve existing redirects. Invite and magic-link templates must retain Supabase's `{{ .ConfirmationURL }}` token. Set customer-friendly invite/access subjects and copy before launch.

SMTP host `smtp.resend.com`, port 465, username `resend`; sender `no-reply@mail.thecrowandcrown.com` / CROW & CROWN. The SMTP password must be a valid complete generated Resend API key with sending access to that verified domain. The owner must enter/save it directly, never paste it in chat. The October 5 signup test failed with SMTP 535 Authentication credentials invalid; a settings save does not resolve this failure.

## Database and verification

Migration `20261005204222_crow_crown_purchase_accounts.sql` is additive and was applied October 5. Do not recreate it blindly. `cc_purchase_fulfillments` has RLS and grants only to service_role. Customer roles cannot read or execute the claim RPC. Real-database transaction checks passed for RLS/restricted grants, first claim, concurrent-claim denial and completed-order protection; test rows rolled back. Existing planner tables were preserved.

Local purchase tests cover signature tampering, product/payment filtering, duplicates, leases, returning buyers, SMTP failure/retry and background completion. React tests cover invite password setup and preservation of private party state. Domain/UI/cloud/responsive/Home tests, typecheck, build and Deno check passed. Live paid webhook delivery, external inbox arrival, password setup/sign-in/reset and cross-device saving remain required before customer-ready status.
