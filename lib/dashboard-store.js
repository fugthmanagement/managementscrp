const STORAGE_KEY = "fugth-dashboard-state";

export const defaultDashboardState = {
  calls: [
    { id: 1, date: "2026-05-12", caller: "Maria Torres", status: "Booked estimate", seconds: 182, rating: 4 },
    { id: 2, date: "2026-05-12", caller: "Southside Dental", status: "Requested callback", seconds: 146, rating: 4 },
    { id: 3, date: "2026-05-11", caller: "Evan Brooks", status: "Qualified lead", seconds: 224, rating: 5 },
    { id: 4, date: "2026-05-10", caller: "Northline Logistics", status: "Pricing question", seconds: 193, rating: 3 },
  ],
  uploads: ["pricing-sheet.pdf", "brand-voice-notes.txt"],
  businessInfo: "Luxury service brand focused on fast response, appointment capture, and reputation defense.",
  knowledgeEntries: [
    {
      id: 1,
      title: "Offer positioning",
      content: "Primary promise: respond faster than any competitor and convert missed-call traffic into booked revenue.",
    },
  ],
  messages: [
    {
      role: "assistant",
      content: "I am ready to act as your executive AI consultant. Ask about operations, lead conversion, or upload priorities.",
    },
  ],
};

export function readDashboardState() {
  if (typeof window === "undefined") {
    return defaultDashboardState;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultDashboardState;
    }

    return {
      ...defaultDashboardState,
      ...JSON.parse(raw),
    };
  } catch {
    return defaultDashboardState;
  }
}

export function writeDashboardState(state) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
