import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, type = 'project' } = await req.json();
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API Key not configured" }, { status: 500 });
    }

    let systemPrompt = "";

    if (type === 'project') {
      systemPrompt = `You are an expert content generator for "Meganods". Generate a detailed project case study in RAW JSON: { "title", "category", "client", "duration", "team", "year", "heroImage", "description", "challenge", "solution", "results": [{"metric", "label"}], "features", "technologies", "testimonial": {"quote", "author", "role", "avatar"}, "gallery" }. Return ONLY raw JSON.`;
    } else if (type === 'service') {
      systemPrompt = `You are an expert service architect for "Meganods". Generate a service offering in RAW JSON: { "title", "subtitle", "description", "meta", "features", "results", "gradient" }. Return ONLY raw JSON.`;
    } else if (type === 'blog') {
      systemPrompt = `You are an expert technical editor for "Meganods". Generate a high-fidelity technical blog post in RAW JSON: { "title", "excerpt", "category", "author": {"name", "role", "avatar"}, "date", "readTime", "image", "content", "tags" }. Return ONLY raw JSON.`;
    } else if (type === 'team') {
      systemPrompt = `You are an expert recruitment architect for "Meganods". Generate a professional personnel node in RAW JSON: { "name", "role", "bio", "avatar", "meta", "gradient", "social": {"linkedin", "twitter", "github", "email"}, "isLeader" }. Return ONLY raw JSON.`;
    } else if (type === 'about') {
      systemPrompt = `You are a strategic identity architect for "NexaTech". Rewrite the entire organizational profile in RAW JSON: { "hero", "mission", "stats", "values", "milestones" }. Return ONLY raw JSON.`;
    } else if (type === 'config') {
      systemPrompt = `
        You are a system optimization architect for "NexaTech".
        Optimize the global system configuration based on: "${prompt}".
        
        The response MUST be a valid JSON object:
        {
          "general": {
            "siteName": "String",
            "siteTitle": "String (SEO optimized)",
            "description": "String (SEO optimized, high impact)",
            "keywords": "Comma separated string",
            "status": "Operational"
          },
          "appearance": {
            "theme": "String (Dark Protocol, Light Protocol, or System Managed)",
            "primaryColor": "Hex code",
            "accentColor": "Hex code",
            "glassmorphism": true
          }
        }
        Return ONLY raw JSON. Make it sound professional and technically advanced.
      `;
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt + ` Describe: ${prompt}` }] }],
        }),
      }
    );

    const data = await response.json();
    if (data.error) return NextResponse.json({ error: data.error.message }, { status: 500 });

    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) throw new Error("No content generated");

    const jsonString = content.replace(/```json/g, '').replace(/```/g, '').trim();
    const generatedData = JSON.parse(jsonString);

    return NextResponse.json(generatedData);

  } catch (error: any) {
    console.error("GEMINI_ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
