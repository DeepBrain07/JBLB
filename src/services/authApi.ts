/**
 * Syncs the current Clerk user to your backend so they exist in your database
 * and can be merged with their waitlist record (username + email).
 * The backend must verify the Clerk JWT and upsert/link the user (see BACKEND_AUTH.md).
 */

const SYNC_ENDPOINT = "/api/waitlist/clerk-auth/";

/** Key used in localStorage to pass waitlist record id to sync (merge with X user). */
export const WAITLIST_ID_STORAGE_KEY = "jblb_waitlist_id";

export type SyncUserResult =
  | { ok: true; user?: { id: string; [key: string]: unknown } }
  | { ok: false; error: string };

export type SyncUserPayload = {
  /** Waitlist record id (e.g. your_id from waitlist submit) so backend can link Clerk user to that row. */
  waitlist_id?: string;
};

/**
 * Sends the Clerk session token to your backend. Backend should:
 * 1. Verify the JWT with Clerk
 * 2. If payload.waitlist_id is present, update that waitlist row with clerk_user_id (merge)
 * 3. Else try matching waitlist by X username or email from Clerk
 * 4. Create/update user and return 200
 */
export async function syncUserToBackend(
  getToken: (options?: { template?: string }) => Promise<string | null>,
  payload?: SyncUserPayload
): Promise<SyncUserResult> {
  const token = await getToken();
  if (!token) {
    return { ok: false, error: "No session token" };
  }

  try {
    const response = await fetch(SYNC_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload ?? {}),
    });

    const data = await response.json().catch(() => null);
    console.log(response)

    if (!response.ok) {
      return {
        ok: false,
        error: data?.message ?? data?.error ?? `Sync failed: ${response.status}`,
      };
    }

    return { ok: true, user: data?.user ?? undefined };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return { ok: false, error: message };
  }
}
