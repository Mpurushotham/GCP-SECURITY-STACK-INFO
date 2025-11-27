import { GoogleGenAI } from "@google/genai";

// Ideally this comes from process.env, but per instructions we assume it's available.
// In a real app, this would be a backend proxy call to hide the key.
const API_KEY = process.env.API_KEY || ''; 

let genAI: GoogleGenAI | null = null;

try {
  if (API_KEY) {
    genAI = new GoogleGenAI({ apiKey: API_KEY });
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI", error);
}

export const generateTutorResponse = async (question: string, context: string): Promise<string> => {
  if (!genAI) {
    return "API Key is missing. Please ensure process.env.API_KEY is set.";
  }

  try {
    const systemPrompt = `
      You are an expert Google Cloud Platform Security Architect. 
      You are tutoring a student who is learning about: ${context}.
      
      Keep your answer concise, technical, and authoritative.
      Use bullet points for clarity.
      If relevant, mention specific GCP products (e.g., Cloud Armor, VPC-SC, IAM).
      Do not give generic security advice; stick to the GCP implementation.
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'user', parts: [{ text: question }] }
      ]
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error connecting to the Security Tutor.";
  }
};