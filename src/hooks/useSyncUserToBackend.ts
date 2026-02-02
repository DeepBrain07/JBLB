import { useAuth } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import { syncUserToBackend, WAITLIST_ID_STORAGE_KEY } from "@/services/authApi";

/**
 * When the user is signed in, syncs them to your backend once per session
 * so they exist in your database. If they previously joined the waitlist,
 * we send their waitlist_id so the backend can merge the X user with that record (username + email).
 */
export function useSyncUserToBackend() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const syncedRef = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !getToken) return;
    if (syncedRef.current) return;

    let cancelled = false;
    const waitlistId =
      typeof window !== "undefined"
        ? window.localStorage.getItem(WAITLIST_ID_STORAGE_KEY)
        : null;

    const payload = waitlistId ? { waitlist_id: waitlistId } : undefined;

    syncUserToBackend(getToken, payload).then((result) => {
      if (cancelled) return;
      if (result.ok) {
        syncedRef.current = true;
        if (waitlistId && typeof window !== "undefined") {
          window.localStorage.removeItem(WAITLIST_ID_STORAGE_KEY);
        }
      } else {
        console.warn("[auth] Backend sync failed:", result.error);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, getToken]);
}
