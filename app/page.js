import Link from "next/link";

const pillars = [
  {
    title: "Call Intelligence",
    description: "Capture every inbound conversation, replay outcomes, and rate AI performance from a single luxury control panel.",
  },
  {
    title: "Marketing and Leads",
    description: "Track campaigns, inspect local lead lists, and move prospects from cold outreach to booked revenue.",
  },
  {
    title: "Executive AI Consultant",
    description: "Upload operating context, stream Gemini-backed answers, and measure readiness with a live score.",
  },
];

const stats = [
  ["94%", "AI caller satisfaction"],
  ["3.1x", "more leads retained"],
  ["24/7", "coverage without voicemail"],
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_24%),linear-gradient(to_bottom,transparent,rgba(255,255,255,0.03))]" />
        <div className="shell relative py-8">
          <header className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Fugth Management</p>
            </div>
            <nav className="hidden items-center gap-2 md:flex">
              <a className="nav-link" href="#platform">Platform</a>
              <a className="nav-link" href="#dashboard">Dashboard</a>
              <a className="nav-link" href="#security">Security</a>
            </nav>
            <div className="flex items-center gap-3">
              <Link className="nav-link hidden sm:inline-flex" href="/login">Login</Link>
              <Link className="btn-primary" href="/dashboard">Open Dashboard</Link>
            </div>
          </header>

          <div className="grid gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
            <div className="space-y-8">
              <span className="pill">Vercel-native Next.js deployment</span>
              <div className="space-y-6">
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                  High-trust AI operations for businesses that cannot afford missed conversations.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-zinc-400">
                  Your landing page is now positioned as a production-ready control center: dark-mode luxury branding,
                  Firebase sign-in, Vercel API routes, and a three-part dashboard built for calls, growth, and executive guidance.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link className="btn-primary" href="/login">Start With Login</Link>
                <a className="btn-secondary" href="#dashboard">See Dashboard Design</a>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map(([value, label]) => (
                  <div key={label} className="panel px-5 py-4">
                    <p className="text-3xl font-semibold tracking-[-0.05em] text-white">{value}</p>
                    <p className="mt-2 text-sm text-zinc-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-strong overflow-hidden p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Live Stack</p>
                  <h2 className="mt-2 text-2xl font-medium text-white">Luxury dark command surface</h2>
                </div>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                  Secure
                </span>
              </div>
              <div className="mt-6 space-y-4">
                {pillars.map((pillar, index) => (
                  <div key={pillar.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">0{index + 1}</p>
                        <h3 className="mt-2 text-xl font-medium text-white">{pillar.title}</h3>
                      </div>
                      <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5" />
                    </div>
                    <p className="mt-3 text-sm leading-7 text-zinc-400">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="shell py-16 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            "Email/password authentication routed through Firebase with a fallback local mode for pre-production demos.",
            "Protected dashboard navigation so only authenticated operators can access customer intelligence surfaces.",
            "API route isolation for Gemini access so your model key stays server-side on Vercel.",
          ].map((item) => (
            <div key={item} className="panel p-6 text-sm leading-7 text-zinc-300">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="dashboard" className="border-y border-white/10 bg-white/[0.02] py-16 lg:py-24">
        <div className="shell grid gap-8 lg:grid-cols-[0.55fr_1.45fr]">
          <div className="space-y-4">
            <span className="pill">Dashboard structure</span>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-white">Three tabs, one operating system.</h2>
            <p className="text-base leading-8 text-zinc-400">
              The dashboard is wired around the exact flows you asked for: call playback and ratings, marketing intelligence,
              and an executive AI consultant with uploads, readiness scoring, and streaming answers.
            </p>
          </div>
          <div className="panel-strong grid gap-4 p-4 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-3xl border border-white/10 bg-black/30 p-5">
                <h3 className="text-lg font-medium text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="security" className="shell py-16 lg:py-24">
        <div className="panel-strong grid gap-8 p-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <span className="pill">Security posture</span>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white">Vercel handles the frontend and the private room for your keys.</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
              Firebase config is loaded from public environment variables where appropriate, while Gemini requests stay inside
              the Next.js API route. That gives you the deployment model you asked for: simple hosting on the edge and secure
              server-side access for model calls.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-sm leading-7 text-zinc-300">
            <p>NEXT_PUBLIC_FIREBASE_API_KEY</p>
            <p className="text-zinc-500">Loaded client-side for Firebase auth initialization.</p>
            <div className="my-4 h-px bg-white/10" />
            <p>GEMINI_API_KEY</p>
            <p className="text-zinc-500">Consumed only inside app/api/chat/route.js and never exposed to the browser.</p>
            <div className="mt-8">
              <Link className="btn-primary" href="/login">Continue to App</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
