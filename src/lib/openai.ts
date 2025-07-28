type ViralContentInput = {
  niche: string;
  goal: string;
  type: string;
};

export async function generateViralContent({
  niche,
  goal,
  type,
}: ViralContentInput): Promise<string> {
  const isDev = import.meta.env.DEV;
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  // ✅ Use dummy data if in dev or API key is missing
  if (isDev || !apiKey) {
    return `
Hook: Stop scrolling if you're into ${niche}! 🚀  
Caption: Discover how to ${goal} using the power of viral ${type}s.  
Hashtags: #${niche} #growth #viralcontent  
CTA: Follow us for more ${type}s like this!
`;
  }

  const prompt = `Generate a viral ${type} for the ${niche} niche to achieve ${goal}. Return a hook, caption, hashtags, and CTA.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a viral content generator." },
          { role: "user", content: prompt },
        ],
        temperature: 0.9,
      }),
    });

    if (response.status === 429) {
      throw new Error("Rate limit exceeded. Please wait and try again.");
    }

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? "No content returned.";
  } catch (error: any) {
    console.error("OpenAI Error:", error.message);

    // ❌ Fall back to dummy data on error
    return `
Hook: This might just be your breakthrough moment in ${niche}. 🎯  
Caption: Struggling to ${goal}? Try this viral ${type} strategy...  
Hashtags: #${niche}Tips #viralGrowth #strategy  
CTA: Hit that follow for more gems like this!
`;
  }
}
