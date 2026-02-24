import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import { syncUserToBackend, WAITLIST_ID_STORAGE_KEY } from "@/services/authApi";

export function useSyncUserToBackend() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const syncedRef = useRef(false);

  useEffect(() => {
    // 1. Wait for everything to load
    if (!isLoaded || !isSignedIn || !user || syncedRef.current) return;

    let cancelled = false;

    // 2. Extract specific data for your backend requirements
    // const email = user.primaryEmailAddress?.emailAddress || "";
    
    // For Twitter, 'username' is often in the external account object
    const twitterAccount = user.externalAccounts.find(acc => acc.provider === 'twitter' || acc.provider === 'x');
    const username = user.username || twitterAccount?.username || "unknown";
    const provider = twitterAccount ? "twitter" : "google"; // Basic logic to detect provider

    // 3. Get referral code from URL (if any) or LocalStorage
    const urlParams = new URLSearchParams(window.location.search);
    const referral_code = urlParams.get("ref") || "";

    // 4. Get waitlist ID from storage
    const waitlistId = window.localStorage.getItem(WAITLIST_ID_STORAGE_KEY);

    const payload = {
      clerk_user_id: user.id,
      email: "deepbrain78@gmail.com",
      username: username,
      provider: provider,
      referral_code: referral_code,
      waitlist_id: waitlistId || undefined, 
    };

    console.log(payload)
    syncUserToBackend(getToken, payload).then((result) => {
      if (cancelled) return;
      if (result.ok) {
        syncedRef.current = true;
        if (waitlistId) {
          window.localStorage.removeItem(WAITLIST_ID_STORAGE_KEY);
        }
      } else {
        console.warn("[auth] Backend sync failed:", result.error);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, user, getToken]);
}