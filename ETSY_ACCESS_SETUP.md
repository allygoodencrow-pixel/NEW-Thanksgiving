# Thanksgiving Etsy buyer access

The existing $39 draft is Etsy listing 4592268976 in shop 66552482 (TheCrowandCrown). Its 10 images and walkthrough remain. Buyer PDF Crow-Crown-Thanksgiving-Start-Here.pdf is already attached as listing file 1522999827735. The description explains the personal email link and buyer-selected password.

## Implemented

Existing Supabase project almqseeccuohdmlsjnhi holds cc_access_grants, cc_etsy_orders, restricted automation credential hashes, and the private thanksgiving-printables bucket. All 153 original assets were copied, downloaded back and SHA-256 verified. The store owner's existing account has access; saved parties were preserved. Authenticated buyers may read only their own grants and plans. Clients cannot grant themselves access. Paid-printable validates the current user and current entitlement on every download, with no-store responses. Full printables are removed from public app output. The repository contains only a migration and function source, never server keys or customer tokens.

Etsy-purchase accepts a server-only X-CC-Automation-Key whose SHA-256 hash is checked in cc_automation_keys. The plaintext credential must be held in Make's private HTTP module configuration, never in browser code, GitHub, PDF or a customer message. The handler requires shop 66552482, product 4592268976, a paid receipt and buyer_email. Do not substitute payment_email. Each order has a lease and immutable checkout email. New users receive a personal invitation; existing users receive a personal sign-in/setup link, preserving their password and saved parties. The order completion and grant are atomic. Successful repeat deliveries do not send another invitation. Failed email delivery remains retryable. Cancellation/refund handling revokes only that order's grant.

## Make still required before Etsy publication

Use the Allygoodencrow Make account, organization 7303154, team 2156011, us2.make.com, Etsy connection 11580663. The Make connector currently returns internal errors even for environment_get and scenario_run; no purchase scenario has been activated.

Create a scheduled receipt scan with durable retries, pagination and the selected shop/product. Query receipts via the verified Etsy connection. Preserve actual buyer_email and transactions. Add shop_id 66552482 to the verified receipt context (Etsy's receipt response may omit shop_id), then POST {receipt: {...}} to https://almqseeccuohdmlsjnhi.supabase.co/functions/v1/etsy-purchase with the private automation header. Scan updated receipts for cancellations/refunds and ensure failed or leased orders are revisited; a new-receipt-only trigger is insufficient. Check buyer_email availability on this connection. If Etsy withholds it, use a verified checkout-email capture process; do not publish a delivery promise until that path is tested. Keep unrelated Amazon scenario 6578634 intact. The unused on-demand Etsy audit shell 6562324 can yield its active-scenario slot to production fulfillment, avoiding a plan upgrade.

Before publishing, run the actual Make route with controlled receipt fixtures, verify duplicate handling and failed-email retry, and confirm transactional email receipt and password setup. No real paid Etsy order has yet been observed (shop receipts were empty). Do not claim a live order-to-email test passed.

## Other remaining access closure

GitHub repository allygoodencrow-pixel/NEW-Thanksgiving is public. Historical commits contain original printables even after this change removes them from latest app output. Make this existing repository private to close those copies. Earlier app deployment originals also need an anonymous URL check; retain Vercel's protection of historical vercel.app deployments.

## Validation

npm test, npm run typecheck and production build are required. Live Supabase tests used two temporary QA users and confirmed nonbuyer denial, paid download, cross-account isolation, no client self-upgrade and immediate revocation. Both users were deleted. Atomic SQL tests confirmed one lease, duplicate suppression, atomic grant and revocation; all fixture rows rolled back. The current password email was received in the approved owner's Gmail inbox on October 10, 2026. The temporary migration/verification credential has been disabled.

The consolidated migration here represents the final deployed schema. The live project already applied its constituent migrations; do not apply it a second time there. It is suitable for a fresh project after the original purchase and party schema.
