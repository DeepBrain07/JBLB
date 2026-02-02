# Backend: Syncing Clerk Users to Your Database

The frontend sends authenticated users to your backend so you can store them in your database and **merge them with their waitlist record** (username + email from the waitlist form). Your backend must implement the endpoint below and verify the Clerk JWT.

## Endpoint

| Method | Path           | Auth                |
|--------|----------------|---------------------|
| POST   | `/api/users/sync` | `Authorization: Bearer <clerk_session_jwt>` |

- **Request body:** optional JSON. May include:
  - `waitlist_id` (string): The waitlist record id (e.g. `your_id` returned from `POST /api/waitlist/submit/`). When present, backend should **link this Clerk user to that waitlist row** (set `clerk_user_id` on that row so username + email are merged with the X user).
- **Success:** `200` with optional `{ "user": { "id": "...", ... } }`.
- **Failure:** `401` if token invalid/expired, `4xx/5xx` with `{ "message" }` or `{ "error" }`.

## Merging the X user with the waitlist record

Waitlist collects **X username** and **email**. When the same person later signs in with X, you need to attach their Clerk user to that waitlist row.

1. **Preferred: use `waitlist_id` from the body**  
   The frontend stores the waitlist id (e.g. `your_id`) in localStorage after they complete the form, and sends it in the sync request. Backend should:
   - Find the waitlist row with that id.
   - Set `clerk_user_id` (or your users table id) on that row so the record is linked to the X-authenticated user.

2. **Fallback: match by X username**  
   If no `waitlist_id` is sent, find the waitlist row where **username** equals the X (Twitter) handle from Clerk (from JWT claims or Clerk Backend API). Update that row with `clerk_user_id`.  
   So treat waitlist **username** as the X handle.

3. **Fallback: match by email**  
   If you have the user’s email from Clerk (JWT or API), find the waitlist row by **email** and link it.

## What the backend should do

1. **Read the token** from the `Authorization` header: `Bearer <token>`.
2. **Verify the JWT** with Clerk:
   - Use Clerk’s JWKS: `https://<your-clerk-frontend-api>/.well-known/jwks.json`  
     (e.g. `https://relaxed-chipmunk-66.clerk.accounts.dev/.well-known/jwks.json`).
   - Verify signature and expiry; decode the payload.
3. **Get user data from the token** (e.g. `sub` = Clerk user ID; optionally X username, email from claims or Clerk API).
4. **Merge with waitlist** (see above): if body has `waitlist_id`, update that waitlist row with `clerk_user_id`; else try match by X username, then by email.
5. **Create or update the user** in your database (by `sub` or your own external id).
6. **Return 200** (and optionally the saved user).

## Getting more user data (optional)

JWT claims often include only `sub` (user id). To get email, name, etc.:

- **Option A – Backend:** Call Clerk’s Backend API with the same JWT (or with your Clerk secret key) to fetch the user:  
  `GET https://api.clerk.com/v1/users/{userId}`  
  (use the `sub` from the token as `userId`).  
  See [Clerk Backend API – Users](https://clerk.com/docs/reference/backend-api/tag/Users).
- **Option B – Webhooks:** In Clerk Dashboard, add a webhook for `user.created` / `user.updated` and create/update users in your DB when Clerk sends events. The frontend sync can then be a simple “ensure user exists” step.

## Example (Node/Express-style)

```js
// Pseudocode
app.post('/api/users/sync', async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });

  const payload = await verifyClerkJwt(token); // use Clerk JWKS
  const clerkUserId = payload.sub;
  const { waitlist_id } = req.body || {};

  // Merge with waitlist: link this Clerk user to the waitlist row (username + email)
  if (waitlist_id) {
    await db.waitlist.updateMany(
      { your_id: waitlist_id }, // or your actual waitlist id column
      { clerk_user_id: clerkUserId }
    );
  } else {
    // Fallback: match by X username from Clerk (payload.username or Clerk API)
    const xUsername = payload.username ?? await getXUsernameFromClerk(clerkUserId);
    if (xUsername) {
      await db.waitlist.updateMany(
        { username: xUsername },
        { clerk_user_id: clerkUserId }
      );
    }
  }

  const user = await db.users.upsert({
    where: { clerk_user_id: clerkUserId },
    create: { clerk_user_id: clerkUserId, email: payload.email ?? null, ... },
    update: { email: payload.email ?? null, ... },
  });

  return res.status(200).json({ user });
});
```

## Environment (backend)

- **Clerk JWKS URL:** from your Clerk Dashboard (Frontend API domain) + `/.well-known/jwks.json`.
- Optional: **Clerk Secret Key** if you call Clerk’s Backend API to fetch full user details.

Once this endpoint is implemented and deployed (e.g. at `https://jblb-app.onrender.com/api/users/sync`), the frontend will sync signed-in users automatically when they open the dashboard.
