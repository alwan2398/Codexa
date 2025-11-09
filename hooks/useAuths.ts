import { useEffect } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { useAuthStore } from "@/store/authStore";

export const useAuths = () => {
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const { isSignedIn: clerkSignedIn } = useAuth();
  const { user: dbUser, setUser, setIsLoaded } = useAuthStore();

  useEffect(() => {
    const syncUserWithDatabase = async () => {
      if (clerkLoaded && clerkSignedIn && clerkUser) {
        try {
          // Sync user dengan database
          const response = await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            console.error("Failed to sync user with database");
          }
        } catch (error) {
          console.error("Error syncing user with database:", error);
        }
      } else if (clerkLoaded && !clerkSignedIn) {
        setUser(null);
      }

      setIsLoaded(clerkLoaded);
    };

    syncUserWithDatabase();
  }, [clerkUser, clerkLoaded, clerkSignedIn, setUser, setIsLoaded]);

  // Pastikan isSignedIn selalu boolean
  const isSignedIn = Boolean(dbUser && clerkSignedIn);

  return {
    user: dbUser,
    isLoaded: clerkLoaded,
    isSignedIn, // Sekarang selalu boolean
    clerkUser,
  };
};
