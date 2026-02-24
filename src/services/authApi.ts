/**
 * Syncs the current Clerk user to your backend so they exist in your database.
 * The backend must verify the Clerk JWT and upsert/link the user.
 */

// 1. Base configuration
const SYNC_ENDPOINT = `/api/waitlist/clerk-auth/`;

/** Storage Keys */
export const WAITLIST_ID_STORAGE_KEY = "jblb_waitlist_id";
export const BACKEND_USER_DATA_KEY = "jblb_backend_user_data";
export const BACKEND_ACCESS_TOKEN_KEY = "jblb_access_token";

export type SyncUserResult =
  | { ok: true; user?: any }
  | { ok: false; error: string };

export type SyncUserPayload = {
  clerk_user_id: string;
  email: string;
  username: string;
  provider: string;
  referral_code?: string;
  waitlist_id?: string;
};

/**
 * Sends Clerk user data to the backend, saves the response (tokens, IDs) 
 * to localStorage for reference across the app.
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
    console.log("Syncing user to backend at:", SYNC_ENDPOINT);
    console.log("Payload:", payload);

    const response = await fetch(SYNC_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Once backend CORS and JWT verification is active, uncomment below:
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload ?? {}),
    });

    const contentType = response.headers.get("content-type");
    let data: any = null;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
      console.log("Backend sync response data:", data);
    }

    if (!response.ok) {
      return {
        ok: false,
        error: data?.message ?? data?.error ?? `Sync failed: ${response.status}`,
      };
    }

    // --- REFERENCE DATA STORAGE ---
    // Save the full response object for the frontend to use (referral links, wallet addresses, etc.)
    if (data) {
      localStorage.setItem(BACKEND_USER_DATA_KEY, JSON.stringify(data));
      
      // Specifically save the backend's own tokens if they exist
      if (data.access_token) {
        localStorage.setItem(BACKEND_ACCESS_TOKEN_KEY, data.access_token);
      }
      
      console.log("✅ Backend data cached in localStorage for reference.");
    }

    return { ok: true, user: data };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    console.error("Error syncing user to backend:", err);
    return { ok: false, error: message };
  }
}