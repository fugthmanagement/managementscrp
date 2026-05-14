"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { firebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

const STORAGE_KEY = "fugth-auth-session";

const AuthContext = createContext(null);

function normalizeUser(user) {
  if (!user) {
    return null;
  }

  return {
    uid: user.uid || user.email,
    email: user.email,
    displayName: user.displayName || user.email?.split("@")[0] || "Operator",
  };
}

function readLocalUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeLocalUser(user) {
  if (typeof window === "undefined") {
    return;
  }

  if (!user) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState(isFirebaseConfigured ? "firebase" : "local");

  useEffect(() => {
    if (!firebaseAuth) {
      setUser(readLocalUser());
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, (nextUser) => {
      const normalized = normalizeUser(nextUser);
      setUser(normalized);
      setAuthMode("firebase");
      writeLocalUser(null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      authMode,
      async signIn(email, password) {
        if (firebaseAuth) {
          const credential = await signInWithEmailAndPassword(firebaseAuth, email, password);
          const normalized = normalizeUser(credential.user);
          setUser(normalized);
          setAuthMode("firebase");
          return normalized;
        }

        const fallbackUser = normalizeUser({ uid: email, email, displayName: email.split("@")[0] });
        setUser(fallbackUser);
        setAuthMode("local");
        writeLocalUser(fallbackUser);
        return fallbackUser;
      },
      async signUp(email, password) {
        if (firebaseAuth) {
          const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
          const normalized = normalizeUser(credential.user);
          setUser(normalized);
          setAuthMode("firebase");
          return normalized;
        }

        const fallbackUser = normalizeUser({ uid: email, email, displayName: email.split("@")[0] });
        setUser(fallbackUser);
        setAuthMode("local");
        writeLocalUser(fallbackUser);
        return fallbackUser;
      },
      async signOut() {
        if (firebaseAuth) {
          await firebaseSignOut(firebaseAuth);
        }

        setUser(null);
        writeLocalUser(null);
      },
    }),
    [authMode, loading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
