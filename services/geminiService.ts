
import { GoogleGenAI } from "@google/genai";

export async function removeBackground(base64Image: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1] || base64Image,
              mimeType: 'image/png',
            },
          },
          {
            text: 'Carefully remove the background from this image. Output the subject exactly as it is, but replace the entire background with a perfectly uniform, solid, flat neon green color (hex #00FF00). Ensure edges around hair or complex areas are handled as cleanly as possible. Return only the edited image.',
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image data returned from model");
  } catch (error) {
    console.error("Error removing background:", error);
    throw error;
  }
}
