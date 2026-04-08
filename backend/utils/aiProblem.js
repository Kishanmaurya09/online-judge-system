import OpenAI from "openai";

// 🔥 DIRECT KEY (temporary fix)
const openai = new OpenAI({
  
  apiKey: process.env.OPENAI_API_KEY
});

export const generateProblem = async () => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `
Return ONLY valid JSON. No text.

Format:
{
  "title": "...",
  "description": "...",
  "inputFormat": "...",
  "outputFormat": "...",
  "constraints": "...",
  "testCases": [
    { "input": "...", "output": "..." },
    { "input": "...", "output": "..." }
  ]
}
`,
      },
    ],
  });

  return response.choices[0].message.content;
};