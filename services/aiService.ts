
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIInsights = async (context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analise os seguintes dados da concessionária agrícola e gere insights estratégicos em JSON: ${context}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, description: "MAINTENANCE, SALES, or INVENTORY" },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              confidence: { type: Type.NUMBER },
              actionRequired: { type: Type.BOOLEAN }
            },
            required: ["type", "title", "description", "confidence", "actionRequired"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Insight Error:", error);
    return [];
  }
};

export const predictMaintenance = async (equipmentData: any) => {
  const prompt = `Com base nestes dados de uso e falhas históricas: ${JSON.stringify(equipmentData)}, 
  preveja quando será a próxima manutenção necessária e quais peças podem falhar. Responda em Português.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt
  });
  
  return response.text;
};
