import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Models } from "appwrite";
import { ADMIN_ACCESS_DENIED_MESSAGE, isAuthorizedAdmin } from "../lib/adminAccess";
import {
  appwriteConfigured,
  getCurrentUser,
  loginWithEmailPassword,
  logoutCurrentSession
} from "../lib/appwrite";

const INACTIVITY_TIMEOUT_MS = 3 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000;
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
  const failedAttemptsRef = useRef(0);
  const lockUntilRef = useRef(0);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  async function rejectUnauthorizedSession() {
    try {
      await logoutCurrentSession();
    } catch {
      // Ignore logout failures when clearing unauthorized sessions.
    } finally {
      setUser(null);
    }
  }

  async function refresh() {
    if (!appwriteConfigured) {
      setUser(null);
      setLoading(false);
      return;
    }

    const nextUser = await getCurrentUser();
    if (nextUser && !isAuthorizedAdmin(nextUser)) {
      await rejectUnauthorizedSession();
      setLoading(false);
      return;
    }

    setUser(nextUser);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function login(email: string, password: string) {
    setTimedOut(false);

    const now = Date.now();
    if (now < lockUntilRef.current) {
      const minutes = Math.ceil((lockUntilRef.current - now) / 60000);
      throw new Error(`Too many failed attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`);
    }

    try {
      await loginWithEmailPassword(email.trim(), password);
      const nextUser = await getCurrentUser();

      if (!isAuthorizedAdmin(nextUser)) {
        await rejectUnauthorizedSession();
        failedAttemptsRef.current += 1;
        if (failedAttemptsRef.current >= MAX_FAILED_ATTEMPTS) {
          lockUntilRef.current = Date.now() + LOCKOUT_MS;
          failedAttemptsRef.current = 0;
        }
        throw new Error(ADMIN_ACCESS_DENIED_MESSAGE);
      }

      failedAttemptsRef.current = 0;
      lockUntilRef.current = 0;
      setUser(nextUser);
    } catch (error) {
      if (error instanceof Error && error.message === ADMIN_ACCESS_DENIED_MESSAGE) {
        throw error;
      }

      failedAttemptsRef.current += 1;
      if (failedAttemptsRef.current >= MAX_FAILED_ATTEMPTS) {
        lockUntilRef.current = Date.now() + LOCKOUT_MS;
        failedAttemptsRef.current = 0;
        throw new Error("Too many failed attempts. Try again in 5 minutes.");
      }

      throw new Error(ADMIN_ACCESS_DENIED_MESSAGE);
    }
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
