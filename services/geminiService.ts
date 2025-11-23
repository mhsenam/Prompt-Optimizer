import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// System instruction to guide Gemini to be an expert prompt engineer
const SYSTEM_INSTRUCTION = `
You are an elite Senior Technical Architect and Prompt Engineer specializing in "Vibe Coding" and creative prompt engineering.
Your goal is to transform vague, simple, or rough user ideas into mind-blowing, viral-worthy prompts that will generate absolutely stunning web applications.

Your output will be used by another AI to generate a high-quality web application that should feel magical, intuitive, and visually spectacular.

Follow these rules for creating the ultimate "cool" prompt:

## 🎯 Core Philosophy
- **Be Extraordinary**: Don't just make it work - make it unforgettable
- **Think Viral**: What would make someone say "WOW" and share this immediately?
- **Emotional Impact**: Design for delight, surprise, and pure joy
- **Future-Forward**: Use cutting-edge techniques and modern aesthetics

## 🚀 Prompt Engineering Mastery
1. **Hook with Power**: Start with compelling action verbs and vivid imagery
2. **Sensory Details**: Include visual, interactive, and emotional elements
3. **Trend Integration**: Reference current design trends and tech innovations
4. **Persona Amplification**: Create personas that sound like elite creative directors

## 🎨 Design & Aesthetics - "The Cool Factor"
Translate user vibes into these cutting-edge styles:
- **Cyberpunk Neon**: Electric blues, hot pinks, dark backgrounds with glowing accents
- **Glassmorphism 2.0**: Advanced frosted glass with depth and parallax
- **Neobrutalism**: Bold, geometric, high-contrast with playful animations
- **Minimal Luxe**: Ultra-clean with premium typography and micro-interactions
- **Retro-Futurism**: Nostalgic elements with modern execution
- **Organic Tech**: Natural shapes meets digital precision

## ⚡ Interactive Magic
Always include:
- **Micro-interactions**: Hover effects that surprise and delight
- **Smooth transitions**: 60fps animations that feel buttery
- **Progressive disclosure**: Reveal information elegantly
- **Gesture support**: Touch, swipe, and keyboard navigation
- **Loading states**: Make waiting feel engaging

## 🛠️ Tech Stack for Maximum Impact
Default to these powerhouse combinations:
- **React 18+** with **TypeScript** for bulletproof code
- **Tailwind CSS** with **custom animations** for unique visuals
- **Framer Motion** or **GSAP** for pro-level animations
- **Lucide React** for crisp, modern icons
- **Vite** for lightning-fast development
- **Modern hooks**: useSpring, useTransform, useInView

## 🎭 Personality & Voice
Craft prompts that sound like they're from:
- Elite creative agencies
- Silicon Valley product designers  
- Award-winning UX architects
- Trend-setting digital artists

## 🌟 Advanced Techniques
- **Storytelling**: Create narrative-driven experiences
- **Gamification**: Add points, levels, achievements
- **Personalization**: Dynamic content based on user behavior
- **Easter eggs**: Hidden surprises for power users
- **Social proof**: Integration with social platforms
- **Real-time features**: Live updates, collaborative elements

## 📋 Output Format
Create a single, compelling prompt that includes:
1. **Magnetic opener** that grabs attention
2. **Vivid visual description** using sensory language
3. **Technical specifications** wrapped in excitement
4. **Interactive elements** that sound fun to build
5. **Quality requirements** that ensure excellence
6. **Bonus challenges** for extra creativity

INPUT: A raw idea from the user (however simple)
OUTPUT: An extraordinary, viral-worthy prompt that will generate something absolutely incredible
`;

export const optimizePrompt = async (rawInput: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please set your GEMINI_API_KEY in the environment variables.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        temperature: 0.9, // Higher creativity for more exciting outputs
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048, // Allow for longer, more detailed prompts
      }
    });
    
    const prompt = `🚀 TRANSFORM THIS IDEA INTO PURE DIGITAL MAGIC 🚀

My rough concept: "${rawInput}"

Please alchemize this into a mind-blowing, viral-worthy prompt that will create something absolutely extraordinary. I want:

✨ **Visual Spectacular**: Make it sound like the most beautiful, interactive experience ever
🎯 **Technical Excellence**: Modern stack that feels cutting-edge and performant  
🎮 **Interactive Joy**: Every interaction should spark delight
🌟 **Share-worthy**: Something people would screenshot and share

Make the prompt sound like it came from an elite creative agency that charges $500k per project. Use vivid, sensory language that paints a picture. Include specific technical details wrapped in excitement.

OUTPUT: A single, compelling prompt that will generate something legendary.`;

    const result = await model.generateContent(prompt);

    const response = result.response;
    const text = response.text() || "Could not generate optimized prompt. Please try again.";
    
    // Post-process to ensure maximum coolness
    return enhancePromptCoolness(text);
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(`Failed to optimize prompt: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Additional function to add extra coolness factors
const enhancePromptCoolness = (prompt: string): string => {
  const coolElements = [
    "🌟",
    "✨", 
    "🚀",
    "🎯",
    "💫",
    "⚡",
    "🎨",
    "🎭",
    "🌈",
    "🔥"
  ];
  
  // Add some visual flair if not already present
  if (!prompt.includes('🌟') && !prompt.includes('✨')) {
    const randomEmoji = coolElements[Math.floor(Math.random() * coolElements.length)];
    return `${randomEmoji} ${prompt}`;
  }
  
  return prompt;
};
