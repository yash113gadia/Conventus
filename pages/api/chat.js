// Server-side proxy for the Conventus chatbot, backed by OpenRouter.
// Keeps the API key out of the client bundle. Set OPENROUTER_API_KEY in your env.
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// IMPORTANT: only FREE models (model id ending in ":free") may be used here —
// the OpenRouter API key belongs to Yash Gadia and must not incur paid usage.
// Free models are frequently rate-limited (HTTP 429), so we try them in order
// and fall through to the next one until a response is returned.
const MODELS = [
    'openai/gpt-oss-120b:free',
    'z-ai/glm-4.5-air:free',
    'nvidia/nemotron-nano-9b-v2:free',
    'meta-llama/llama-3.3-70b-instruct:free',
    'openai/gpt-oss-20b:free',
];

import CONVENTUS_CONTEXT from '../../lib/conventus-context';

const SYSTEM_PROMPT = `You are the official AI assistant for Conventus, the Model United Nations (MUN) Society of NIET, Greater Noida. Answer questions about the club, its events, committees, and people.

Use ONLY the verified knowledge below. If something is not covered, say you don't have that detail yet and point the user to the contact page (/ContactForm) — do NOT invent dates, names, fees, or facts. The official website is conventusmun.com. CMUN Connect has concluded and registration is closed. Never tell users that registration is open. Direct them to /cmun-connect for the conference recap and gallery.

Keep replies concise (1–3 sentences), warm, and professional. Plain text only — no markdown.

=== VERIFIED KNOWLEDGE BASE ===
${CONVENTUS_CONTEXT}`;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        console.error('OPENROUTER_API_KEY is not configured');
        return res.status(500).json({ error: 'Chat service is not configured' });
    }

    const { message } = req.body || {};
    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'A "message" string is required' });
    }

    const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message },
    ];

    let lastStatus = 0;
    for (const model of MODELS) {
        try {
            const upstream = await fetch(OPENROUTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                    'HTTP-Referer': 'https://www.conventusmun.com',
                    'X-Title': 'Conventus MUN',
                },
                body: JSON.stringify({ model, messages }),
            });

            if (!upstream.ok) {
                lastStatus = upstream.status;
                console.error(`OpenRouter ${model} -> ${upstream.status}, trying next`);
                continue; // rate-limited / unavailable — fall through to next free model
            }

            const data = await upstream.json();
            const content = data?.choices?.[0]?.message?.content;
            if (content && typeof content === 'string' && content.trim()) {
                return res.status(200).json({ content: content.trim() });
            }
            console.error(`OpenRouter ${model} returned empty content, trying next`);
        } catch (error) {
            console.error(`Chat proxy error on ${model}:`, error);
        }
    }

    return res.status(502).json({
        error: lastStatus === 429
            ? 'The assistant is busy right now — please try again in a moment.'
            : 'Could not reach the chat service.',
    });
}
