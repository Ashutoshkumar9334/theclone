import { GoogleGenAI } from "@google/genai";

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      client = new GoogleGenAI({ apiKey });
    } else {
      console.warn("API_KEY not found in environment.");
    }
  }
  return client;
};

export const getStylingAdvice = async (userQuery: string, context?: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "I apologize, but I cannot connect to the styling assistant right now.";

  try {
    const model = ai.models;
    const systemPrompt = `You are "Fabri", the AI Stylist for The Fabrima, a luxury fabric and fashion brand. 
    Your tone is elegant, helpful, and sophisticated.
    You help users choose fabrics for projects, suggest fashion pairings, and explain material care.
    Keep answers concise (under 100 words) unless asked for details.
    
    Context about current view: ${context || 'Browsing the store.'}`;

    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    return response.text || "I'm having trouble thinking of a style right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently offline. Please try again later.";
  }
};