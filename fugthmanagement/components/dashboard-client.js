"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const calls = [
  { id: 1, date: "2026-05-12", caller: "Maria Torres", status: "Booked estimate", seconds: 182 },
  { id: 2, date: "2026-05-12", caller: "Southside Dental", status: "Requested callback", seconds: 146 },
  { id: 3, date: "2026-05-11", caller: "Evan Brooks", status: "Qualified lead", seconds: 224 },
  { id: 4, date: "2026-05-10", caller: "Northline Logistics", status: "Pricing question", seconds: 193 },
];

const campaigns = [
  { label: "Reactivation", value: "41% open rate" },
  { label: "Local roofing offer", value: "18 booked meetings" },
  { label: "Review request flow", value: "29 new 5-star reviews" },
];

const leads = [
  { company: "Summit Roofing LLC", city: "Dallas, TX", signal: "Requested quote this week" },
  { company: "Aster Family Dental", city: "Plano, TX", signal: "Hiring front desk overflow" },
  { company: "Blue Peak HVAC", city: "Frisco, TX", signal: "Lead form abandoned twice" },
  { company: "Mason Property Group", city: "Irving, TX", signal: "High call volume after hours" },
];

const starters = [
  "Summarize the main weaknesses in our sales process.",
  "Create a high-conversion follow-up for the hottest leads.",
  "What should we upload next to improve the readiness score?",
];

function StarRating({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`text-lg transition ${star <= value ? "text-amber-300" : "text-zinc-600 hover:text-zinc-400"}`}
          onClick={() => onChange(star)}
          type="button"
        >
          ★
        </button>
      ))}
    </div>
  );
}

export function DashboardClient() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("calls");
  const [ratings, setRatings] = useState(() => Object.fromEntries(calls.map((call) => [call.id, 4])));
  const [playingId, setPlayingId] = useState(null);
  const [uploads, setUploads] = useState(["pricing-sheet.pdf", "brand-voice-notes.txt"]);
  const [businessInfo, setBusinessInfo] = useState("Luxury service brand focused on fast response, appointment capture, and reputation defense.");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "I am ready to act as your executive AI consultant. Ask about operations, lead conversion, or upload priorities.",
    },
  ]);
  const [prompt, setPrompt] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");
  const streamContainerRef = useRef(null);

  const readinessScore = Math.min(100, 32 + uploads.length * 14 + Math.min(30, Math.floor(businessInfo.length / 8)));

  useEffect(() => {
    if (streamContainerRef.current) {
      streamContainerRef.current.scrollTop = streamContainerRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleLogout() {
    await signOut();
    router.replace("/login");
  }

  function handleUpload(event) {
    const fileList = Array.from(event.target.files || []);
    if (!fileList.length) {
      return;
    }

    setUploads((current) => [...current, ...fileList.map((file) => file.name)]);
  }

  async function handleChatSubmit(event) {
    event.preventDefault();
    if (!prompt.trim() || chatLoading) {
      return;
    }

    const outgoingPrompt = prompt.trim();
    setChatError("");
    setPrompt("");
    setChatLoading(true);
    setMessages((current) => [
      ...current,
      { role: "user", content: outgoingPrompt },
      { role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: outgoingPrompt,
          businessContext: businessInfo,
          uploads,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Chat route did not return a readable response.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let streamed = "";

      while (!done) {
        const result = await reader.read();
        done = result.done;
        streamed += decoder.decode(result.value || new Uint8Array(), { stream: !done });
        setMessages((current) => {
          const next = [...current];
          next[next.length - 1] = { role: "assistant", content: streamed };
          return next;
        });
      }
    } catch (error) {
      setChatError(error.message || "Unable to stream response.");
      setMessages((current) => {
        const next = [...current];
        next[next.length - 1] = {
          role: "assistant",
          content: "The secure chat route is available, but a live response could not be completed. Check GEMINI_API_KEY on Vercel.",
        };
        return next;
      });
    } finally {
      setChatLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-ink">
      <div className="shell py-6 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="panel-strong flex flex-col gap-6 p-5">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Fugth Management</p>
              <h1 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">Operator dashboard</h1>
              <p className="mt-3 text-sm leading-7 text-zinc-400">Signed in as {user?.email}</p>
            </div>

            <div className="space-y-2">
              {[
                ["calls", "Call Intelligence"],
                ["marketing", "Marketing and Leads"],
                ["consultant", "Executive AI Consultant"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${activeTab === key ? "bg-white text-black" : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"}`}
                  onClick={() => setActiveTab(key)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Readiness</p>
              <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">{readinessScore}</p>
              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-white" style={{ width: `${readinessScore}%` }} />
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-400">Uploads and business context are already improving the consultant response quality.</p>
            </div>

            <button className="btn-secondary mt-auto" onClick={handleLogout} type="button">
              Sign out
            </button>
          </aside>

          <section className="space-y-6">
            {activeTab === "calls" ? (
              <div className="panel-strong p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Tab 1</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">Call Intelligence</h2>
                  </div>
                  <p className="max-w-xl text-sm leading-7 text-zinc-400">Inspect completed calls, play back the interaction UI, and score the AI agent to identify performance drift.</p>
                </div>
                <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
                  <div className="grid grid-cols-[1fr_1fr_1fr_180px_140px] gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3 text-xs uppercase tracking-[0.24em] text-zinc-500">
                    <span>Date</span>
                    <span>Caller</span>
                    <span>Status</span>
                    <span>Listen</span>
                    <span>Rating</span>
                  </div>
                  {calls.map((call) => (
                    <div key={call.id} className="grid grid-cols-[1fr_1fr_1fr_180px_140px] gap-3 border-b border-white/10 px-4 py-4 text-sm last:border-b-0">
                      <span className="text-zinc-300">{call.date}</span>
                      <span className="text-white">{call.caller}</span>
                      <span className="text-zinc-400">{call.status}</span>
                      <div className="flex items-center gap-3">
                        <button
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-white/10"
                          onClick={() => setPlayingId((current) => (current === call.id ? null : call.id))}
                          type="button"
                        >
                          {playingId === call.id ? "Pause" : "Listen"}
                        </button>
                        <div className="h-2 flex-1 rounded-full bg-white/10">
                          <div className="h-2 rounded-full bg-white" style={{ width: `${Math.min(100, (call.seconds / 240) * 100)}%` }} />
                        </div>
                      </div>
                      <StarRating
                        value={ratings[call.id]}
                        onChange={(value) => setRatings((current) => ({ ...current, [call.id]: value }))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {activeTab === "marketing" ? (
              <div className="space-y-6">
                <div className="panel-strong p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Tab 2</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">Marketing and Leads</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">Campaign metrics, pipeline movement, and scraped local prospects are grouped together so operators can act from one screen.</p>
                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {campaigns.map((campaign) => (
                      <div key={campaign.label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                        <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{campaign.label}</p>
                        <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">{campaign.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="panel-strong p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium text-white">Scraped local leads</h3>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">Updated 5 min ago</span>
                  </div>
                  <div className="mt-6 space-y-3">
                    {leads.map((lead) => (
                      <div key={lead.company} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-base font-medium text-white">{lead.company}</p>
                          <p className="text-sm text-zinc-500">{lead.city}</p>
                        </div>
                        <p className="mt-2 text-sm text-zinc-400">{lead.signal}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === "consultant" ? (
              <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
                <div className="panel-strong flex min-h-[680px] flex-col p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Tab 3</p>
                      <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">Executive AI Consultant</h2>
                    </div>
                    <p className="max-w-lg text-sm leading-7 text-zinc-400">Streaming responses mimic Gemini and ChatGPT-style interaction, grounded in the business context and uploads you provide.</p>
                  </div>

                  <div ref={streamContainerRef} className="mt-6 flex-1 space-y-4 overflow-y-auto rounded-3xl border border-white/10 bg-black/20 p-4">
                    {messages.map((message, index) => (
                      <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-7 ${message.role === "user" ? "bg-white text-black" : "border border-white/10 bg-white/[0.05] text-zinc-200"}`}>
                          {message.content || (chatLoading ? <span className="text-zinc-400">Thinking...</span> : null)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {starters.map((starter) => (
                      <button
                        key={starter}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-zinc-300 transition hover:bg-white/10"
                        onClick={() => setPrompt(starter)}
                        type="button"
                      >
                        {starter}
                      </button>
                    ))}
                  </div>

                  <form className="mt-4 space-y-3" onSubmit={handleChatSubmit}>
                    <textarea
                      className="input min-h-28 resize-none"
                      placeholder="Ask about operations, lead handling, readiness gaps, or customer messaging."
                      value={prompt}
                      onChange={(event) => setPrompt(event.target.value)}
                    />
                    {chatError ? <p className="text-sm text-rose-300">{chatError}</p> : null}
                    <div className="flex justify-end">
                      <button className="btn-primary" disabled={chatLoading} type="submit">
                        {chatLoading ? "Streaming..." : "Send to consultant"}
                      </button>
                    </div>
                  </form>
                </div>

                <aside className="space-y-6">
                  <div className="panel-strong p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">Knowledge base uploads</p>
                        <h3 className="mt-2 text-xl font-medium text-white">Ground the consultant</h3>
                      </div>
                      <label className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
                        Add files
                        <input className="hidden" multiple onChange={handleUpload} type="file" />
                      </label>
                    </div>
                    <div className="mt-5 rounded-3xl border border-dashed border-white/15 bg-black/20 p-5 text-sm leading-7 text-zinc-400">
                      Drop files here in production, or use the button above. Upload playbooks, pricing sheets, FAQs, offer decks, and call scripts.
                    </div>
                    <div className="mt-5 space-y-3">
                      {uploads.map((upload) => (
                        <div key={upload} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-300">
                          {upload}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="panel-strong p-6">
                    <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">Business context</p>
                    <textarea
                      className="input mt-4 min-h-36 resize-none"
                      value={businessInfo}
                      onChange={(event) => setBusinessInfo(event.target.value)}
                    />
                  </div>
                </aside>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}
