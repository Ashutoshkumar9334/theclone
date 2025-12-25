
import { GoogleGenAI } from "@google/genai";

export const getStylingAdvice = async (userQuery: string, context?: string): Promise<string> => {
  // Always create instance before call to ensure latest API_KEY is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  if (!process.env.API_KEY) {
    console.warn("API_KEY not found in environment.");
    return "I apologize, but I cannot connect to the styling assistant right now.";
  }

  try {
    const systemInstruction = `You are "Fabri", the AI Stylist for The Fabrima, a luxury fabric and fashion brand. 
    Your tone is elegant, helpful, and sophisticated.
    You help users choose fabrics for projects, suggest fashion pairings, and explain material care.
    Keep answers concise (under 100 words) unless asked for details.
    
    Context about current view: ${context || 'Browsing the store.'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction,
      }
    });

    return response.text || "I'm having trouble thinking of a style right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently offline. Please try again later.";
  }
};
