import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ reply: "API Key missing in Vercel settings." });
    }

    // Call Google's Gemini API directly
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    const botReply = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ reply: botReply });
  } catch (error) {
    return NextResponse.json({ reply: "I encountered an error processing that request." });
  }
}
