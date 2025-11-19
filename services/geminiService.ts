import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

// System instruction to guide Gemini to be an expert prompt engineer
const SYSTEM_INSTRUCTION = `
You are an elite Senior Technical Architect and Prompt Engineer specializing in "Vibe Coding". 
Your goal is to transform vague, simple, or rough user ideas into highly detailed, structured, and technically rigorous prompts suitable for advanced AI coding agents (like Gemini 2.5, Claude 3.5 Sonnet, GPT-4o).

Your output will be used by another AI to generate a high-quality web application.

Follow these rules for the output prompt:
1.  **Role Definition**: Start by defining the persona (e.g., "Act as a World-Class Frontend Engineer...").
2.  **Tech Stack Specification**: Explicitly request modern, robust tools. Default to: React 18+, TypeScript, Tailwind CSS, Lucide React (for icons), and Vite. Mention "No CSS files, use Tailwind only".
3.  **Design & Aesthetics ("The Vibe")**: Translate the user's "vibe" into design terminology (e.g., "Glassmorphism", "Bento Grid layout", "Neobrutalism", "Dark Mode gradient backgrounds"). If undefined, default to a clean, modern, dark-themed aesthetic.
4.  **Features & Requirements**: Break down the app into core features.
5.  **Code Quality**: Enforce functional components, hooks, proper type definitions, and separation of concerns.
6.  **Format**: The output must be a single coherent prompt block that the user can copy and paste. Use Markdown formatting for readability within the prompt (headers, bullet points).

INPUT: A raw idea from the user.
OUTPUT: A polished, "super AI friendly" prompt.
`;

export const optimizePrompt = async (rawInput: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: `Here is my rough app idea: "${rawInput}". \n\nPlease rewrite this into a perfect, detailed prompt for an AI coding assistant.` }
          ]
        }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // A bit of creativity to interpret the "vibe"
        topP: 0.95,
        topK: 40,
      }
    });

    return response.text || "Could not generate optimized prompt. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
