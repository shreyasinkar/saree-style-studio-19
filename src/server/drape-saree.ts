import { createServerFn } from "@tanstack/react-start";

type DrapeInput = {
  userImage: string; // data URL or https URL
  sareeImage: string; // data URL or https URL
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

    const prompt =
      "Take the person from the first image and dress them in a saree made from the fabric/design shown in the second image. " +
      "Drape the saree realistically in classic Indian Nivi style: pleats neatly tucked at the waist, the pallu draped over the left shoulder, " +
      "the fabric flowing naturally around the body. Match the colors, motifs, border, and texture of the saree fabric exactly from the second image. " +
      "Include a matching blouse. Keep the person's face, body, hair, skin tone and pose unchanged. " +
      "Match the lighting, shadows and background of the original photo of the person. Photorealistic, high resolution, full body if possible." +
      (data.notes ? ` Additional style notes: ${data.notes}` : "");

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
