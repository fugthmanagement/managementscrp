"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { user, signIn, signUp, authMode } = useAuth();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [router, user]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signin") {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }

      router.replace("/dashboard");
    } catch (nextError) {
      setError(nextError.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80 shadow-luxe lg:grid-cols-[0.9fr_1.1fr]">
        <section className="border-b border-white/10 p-8 sm:p-10 lg:border-b-0 lg:border-r">
          <span className="pill">Secure access</span>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] text-white">
            Enter the Fugth Management command center.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-zinc-400">
            Sign in with Firebase email/password authentication. If your public Firebase key is not set yet, the app falls back to a local demo mode so the rest of the dashboard remains testable.
          </p>
          <div className="mt-10 space-y-4">
            {[
              "Protected dashboard routing",
              "Gemini API key isolated in a server route",
              "Call, marketing, and executive consultant workflows",
            ].map((item) => (
              <div key={item} className="panel px-4 py-3 text-sm text-zinc-300">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-10 text-sm text-zinc-500">
            <Link className="text-zinc-300 hover:text-white" href="/">Return to landing page</Link>
          </div>
        </section>

        <section className="p-8 sm:p-10">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            <button
              className={`rounded-full px-4 py-2 text-sm transition ${mode === "signin" ? "bg-white text-black" : "text-zinc-400"}`}
              onClick={() => setMode("signin")}
              type="button"
            >
              Sign in
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm transition ${mode === "signup" ? "bg-white text-black" : "text-zinc-400"}`}
              onClick={() => setMode("signup")}
              type="button"
            >
              Create account
            </button>
          </div>

          <div className="mt-8 space-y-3">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white">
              {mode === "signin" ? "Welcome back." : "Create your workspace."}
            </h2>
            <p className="text-sm text-zinc-400">
              Auth mode: <span className="text-zinc-200">{authMode}</span>
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block space-y-2 text-sm text-zinc-300">
              <span>Email address</span>
              <input
                className="input"
                type="email"
                placeholder="operator@company.com"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label className="block space-y-2 text-sm text-zinc-300">
              <span>Password</span>
              <input
                className="input"
                type="password"
                placeholder="••••••••"
                minLength={6}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
            <button className="btn-primary w-full" disabled={loading} type="submit">
              {loading ? "Working..." : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
