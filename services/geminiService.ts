import { GoogleGenAI } from "@google/genai";

// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
const API_KEY = process.env.API_KEY || '';

let genAI: GoogleGenAI | null = null;

try {
  if (API_KEY) {
    genAI = new GoogleGenAI({ apiKey: API_KEY });
  } else {
    console.warn("Gemini API Key is missing. AI features will be disabled.");
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI", error);
}

export const generateTutorResponse = async (question: string, context: string): Promise<string> => {
  if (!genAI) {
    return "API Key is missing. Please ensure API_KEY is set in your environment variables.";
  }

  try {
    const systemInstruction = `
      You are an expert Google Cloud Platform Security Architect. 
      You are tutoring a student who is learning about: ${context}.
      
      Keep your answer concise, technical, and authoritative.
      Use bullet points for clarity.
      If relevant, mention specific GCP products (e.g., Cloud Armor, VPC-SC, IAM).
      Do not give generic security advice; stick to the GCP implementation.
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: question,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error connecting to the Security Tutor.";
  }
};