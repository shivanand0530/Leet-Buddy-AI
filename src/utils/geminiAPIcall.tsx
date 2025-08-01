import axios from "axios";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function askGemini(prompt: string, language: string = "en") {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    // const apiUrl = import.meta.env.GEMINI_API_URL;
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              { text: prompt },
              { text: `Respond in ${language}` }
            ]
          }
        ]
      }
    );
    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
  } catch (error: any) {
    return `Error: ${error?.response?.data?.error?.message || error.message}`;
  }
}