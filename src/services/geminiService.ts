import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface CropRecommendation {
  cropName: string;
  seedVariety: string;
  growingDuration: string;
  waterRequirement: string;
  fertilizerRequirement: string;
  expectedYieldPerAcre: string;
  expectedMarketPrice: string;
  estimatedProfit: string;
  farmingSteps: string[];
  riskFactors: string[];
}

export const getCropRecommendations = async (params: {
  location: string;
  soilType: string;
  farmSize: string;
  season: string;
  waterAvailability: string;
  temperature: string;
  rainfall: string;
}): Promise<CropRecommendation[]> => {
  const prompt = `Analyze:
Location: ${params.location}
Soil Type: ${params.soilType}
Farm Size: ${params.farmSize}
Season: ${params.season}
Water Availability: ${params.waterAvailability}
Temperature: ${params.temperature}
Rainfall: ${params.rainfall}

Return the top 5 best crops for this land.
For each crop, provide:
- crop name
- recommended seed varieties
- growing duration
- water requirement
- fertilizer requirement
- expected yield per acre
- expected market price
- estimated profit
- farming steps
- risk factors

Return response in JSON format as an array of objects.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            cropName: { type: Type.STRING },
            seedVariety: { type: Type.STRING },
            growingDuration: { type: Type.STRING },
            waterRequirement: { type: Type.STRING },
            fertilizerRequirement: { type: Type.STRING },
            expectedYieldPerAcre: { type: Type.STRING },
            expectedMarketPrice: { type: Type.STRING },
            estimatedProfit: { type: Type.STRING },
            farmingSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
            riskFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["cropName", "seedVariety", "growingDuration", "waterRequirement", "fertilizerRequirement", "expectedYieldPerAcre", "expectedMarketPrice", "estimatedProfit", "farmingSteps", "riskFactors"],
        },
      },
    },
  });

  return JSON.parse(response.text || "[]");
};

export const detectCropDisease = async (base64Image: string): Promise<{
  disease: string;
  treatment: string;
  fertilizerSuggestion: string;
}> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
      {
        text: "Analyze this crop image for diseases. Return the disease name, treatment recommendation, and fertilizer suggestion in JSON format.",
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          disease: { type: Type.STRING },
          treatment: { type: Type.STRING },
          fertilizerSuggestion: { type: Type.STRING },
        },
        required: ["disease", "treatment", "fertilizerSuggestion"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
};
