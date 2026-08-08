import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Models } from "appwrite";
import {
  appwriteConfigured,
  getCurrentUser,
  loginWithEmailPassword,
  logoutCurrentSession
} from "../lib/appwrite";

const INACTIVITY_TIMEOUT_MS = 3 * 60 * 1000;
const ACTIVITY_EVENTS: Array<keyof WindowEventMap> = [
  "mousemove",
  "mousedown",
  "keydown",
  "scroll",
  "touchstart",
  "click"
];

type AuthContextValue = {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  configured: boolean;
  timedOut: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  clearTimedOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);
  const [timedOut, setTimedOut] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const userRef = useRef(user);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  async function refresh() {
    if (!appwriteConfigured) {
      setUser(null);
      setLoading(false);
      return;
    }

    const nextUser = await getCurrentUser();
    setUser(nextUser);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function login(email: string, password: string) {
    setTimedOut(false);
    await loginWithEmailPassword(email.trim(), password);
    const nextUser = await getCurrentUser();
    setUser(nextUser);
  }

  async function logout() {
    try {
      await logoutCurrentSession();
    } finally {
      setUser(null);
    }
  }

  function clearTimedOut() {
    setTimedOut(false);
  }

  useEffect(() => {
    if (!user) {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    const logoutForInactivity = async () => {
      if (!userRef.current) return;
      setTimedOut(true);
      try {
        await logoutCurrentSession();
      } finally {
        setUser(null);
      }
    };

    const resetTimer = () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        void logoutForInactivity();
      }, INACTIVITY_TIMEOUT_MS);
    };

    resetTimer();
    ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, resetTimer, { passive: true });
    });

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, resetTimer);
      });
    };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        configured: appwriteConfigured,
        timedOut,
        login,
        logout,
        refresh,
        clearTimedOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
