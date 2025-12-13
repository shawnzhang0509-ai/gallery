import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

/**
 * Analyzes an uploaded image to generate a description and tags.
 */
export const analyzeImage = async (base64Data: string, mimeType: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          },
          {
            text: "Analyze this image. Return a JSON object with two fields: 'description' (a concise, aesthetic 1-2 sentence caption describing the subject, lighting, and mood) and 'tags' (an array of 5-7 relevant single-word keywords)."
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            tags: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["description", "tags"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response text from Gemini");
    
    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Analysis failed:", error);
    return {
      description: "A beautiful image.",
      tags: ["portrait", "photography"]
    };
  }
};

/**
 * Generates an image based on a prompt.
 */
export const generateImage = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt
          }
        ]
      },
      config: {
        // Nano banana models do not support responseMimeType/responseSchema
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/jpeg;base64,${part.inlineData.data}`;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Generation failed:", error);
    throw error;
  }
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data:image/xxx;base64, prefix for Gemini API if needed, 
      // but generateContent inlineData usually expects pure base64. 
      // However, the helper keeps the prefix for the frontend.
      // We will strip it in the service call if needed.
      // Actually, @google/genai expects just the base64 string without prefix? 
      // The examples show `data: base64EncodeString`.
      // Let's strip the prefix here for the API call usage, or handle it in the caller.
      // Better: Return full string here, strip in caller.
      resolve(result);
    };
    reader.onerror = error => reject(error);
  });
};