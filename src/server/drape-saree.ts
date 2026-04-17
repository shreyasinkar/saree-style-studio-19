import { createServerFn } from "@tanstack/react-start";

type DrapeInput = {
  userImage: string;
  sareeImage: string;
  styleHint?: string;
  notes?: string;
};

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
    const apiKey = process.env.LOVABLE_API_KEY;
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

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: data.userImage } },
              { type: "image_url", image_url: { url: data.sareeImage } },
            ],
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Too many requests. Please wait a moment and try again.");
      }
      if (response.status === 402) {
        throw new Error("AI credits exhausted. Please add credits to continue.");
      }
      const text = await response.text().catch(() => "");
      console.error("AI gateway error:", response.status, text);
      throw new Error("Failed to generate draped image. Please try again.");
    }

    const json = (await response.json()) as {
      choices?: Array<{
        message?: {
          content?: string;
          images?: Array<{ image_url?: { url?: string } }>;
        };
      }>;
    };

    const imageUrl = json.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!imageUrl) {
      console.error("No image returned from AI", JSON.stringify(json).slice(0, 500));
      throw new Error("AI did not return an image. Please try a different photo.");
    }

    return { image: imageUrl };
  });
