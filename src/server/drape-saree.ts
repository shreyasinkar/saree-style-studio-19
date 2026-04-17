import { createServerFn } from "@tanstack/react-start";

type DrapeInput = {
  userImage: string;
  sareeImage: string;
  styleHint?: string;
  notes?: string;
};

function base64ToGenerativePart(base64Data: string, mimeType: string) {
  // Strip data URL prefix if present (e.g. "data:image/jpeg;base64,")
  const base64 = base64Data.includes(",") ? base64Data.split(",")[1] : base64Data;
  return {
    inline_data: {
      mime_type: mimeType,
      data: base64,
    },
  };
}

function getMimeType(dataUrl: string): string {
  if (dataUrl.startsWith("data:")) {
    const match = dataUrl.match(/data:([^;]+);/);
    if (match) return match[1];
  }
  return "image/jpeg"; // default fallback
}

export const drapeSaree = createServerFn({ method: "POST" })
  .inputValidator((input: DrapeInput) => {
    if (!input?.userImage || typeof input.userImage !== "string") {
      throw new Error("Missing user image");
    }
    if (!input?.sareeImage || typeof input.sareeImage !== "string") {
      throw new Error("Missing saree image");
    }
    if (input.userImage.length > 15_000_000 || input.sareeImage.length > 15_000_000) {
      throw new Error("Image too large. Please use an image under 10MB.");
    }
    return input;
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("AI service not configured");

    const styleHint =
      data.styleHint ??
      "Drape in the classic Nivi style: neat pleats tucked at the waist, pallu over the LEFT shoulder.";

    const prompt =
      "TASK: Photorealistic virtual try-on. Take the person from the FIRST image and dress them in a saree made from the fabric shown in the SECOND image.\n\n" +
      "=== CRITICAL DRAPING STYLE (MUST FOLLOW EXACTLY) ===\n" +
      styleHint + "\n" +
      "The draping style above is the MOST IMPORTANT requirement. Do NOT default to a generic Nivi drape unless that is what was requested. " +
      "The pleat placement, pallu direction, shoulder used, and overall silhouette MUST visibly match the described regional style. " +
      "If the style says NO pleats, do not add pleats. If it says front pallu, the pallu must spread across the chest. " +
      "If it says dhoti-style (Nauvari), the saree must be drawn between the legs like a dhoti with no petticoat showing.\n\n" +
      "=== FABRIC ===\n" +
      "Use the EXACT colors, motifs, border pattern, and texture of the fabric from the SECOND image. Include a matching blouse appropriate for the chosen drape style.\n\n" +
      "=== PRESERVE FROM ORIGINAL ===\n" +
      "Keep the person's face, identity, body shape, hair, skin tone, and pose UNCHANGED. " +
      "Match the original lighting direction, shadows, and background exactly.\n\n" +
      "=== OUTPUT ===\n" +
      "Photorealistic, high resolution, sharp fabric detail, natural fabric folds and shadows, full body framing if possible." +
      (data.notes ? `\n\nAdditional notes: ${data.notes}` : "");

    const userMime = getMimeType(data.userImage);
    const sareeMime = getMimeType(data.sareeImage);

    const requestBody = JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt },
            base64ToGenerativePart(data.userImage, userMime),
            base64ToGenerativePart(data.sareeImage, sareeMime),
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["IMAGE", "TEXT"],
      },
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      }
    );

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      if (response.status === 429) {
        throw new Error(`Gemini API rate limit/quota hit (429): ${text.slice(0, 200)}`);
      }
      if (response.status === 403) {
        throw new Error("Invalid Gemini API key. Please check your GEMINI_API_KEY.");
      }
      console.error("Gemini API error:", response.status, text);
      throw new Error(`Gemini API error ${response.status}: ${text.slice(0, 200)}`);
    }

    const json = await response.json() as {
      candidates?: Array<{
        content?: {
          parts?: Array<{
            text?: string;
            inlineData?: { mimeType?: string; data?: string };
          }>;
        };
      }>;
    };

    // Extract the generated image from Gemini response
    const parts = json.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find((p) => p.inlineData?.data);

    if (!imagePart?.inlineData?.data) {
      console.error("No image returned from Gemini", JSON.stringify(json).slice(0, 500));
      throw new Error("AI did not return an image. Please try a different photo.");
    }

    const mimeType = imagePart.inlineData.mimeType ?? "image/png";
    const imageUrl = `data:${mimeType};base64,${imagePart.inlineData.data}`;

    return { image: imageUrl };
  });