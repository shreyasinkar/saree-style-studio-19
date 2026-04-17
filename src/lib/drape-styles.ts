export type DrapeStyle = {
  id: string;
  name: string;
  region: string;
  description: string;
  promptHint: string;
};

export const DRAPE_STYLES: DrapeStyle[] = [
  {
    id: "nivi",
    name: "Classic Nivi",
    region: "Pan-India",
    description: "Most common modern style — pleats at waist, pallu over left shoulder.",
    promptHint:
      "Drape in the classic Nivi (Andhra/standard modern) style: neat box pleats tucked at the front waist, pallu draped over the LEFT shoulder falling gracefully down the back.",
  },
  {
    id: "maharashtrian",
    name: "Maharashtrian (Nauvari)",
    region: "Maharashtra",
    description: "Nine-yard dhoti-style drape, no petticoat, very active and traditional.",
    promptHint:
      "Drape in the Maharashtrian Nauvari (nine-yard) style: dhoti-like drape between the legs, tucked at the back waist, pallu drawn tightly across the chest from right hip and pinned over the LEFT shoulder, no petticoat, traditional Marathi look.",
  },
  {
    id: "simple-pleated",
    name: "Simple Pleated",
    region: "Everyday",
    description: "Minimal, clean drape — neat pleats, plain pallu fall, no frills.",
    promptHint:
      "Drape in a simple, clean everyday style: a small number of neat pleats tucked at the front, pallu kept plain and falling straight over the LEFT shoulder without any decorative folds or pinning. Minimal and tidy.",
  },
  {
    id: "bengali",
    name: "Bengali (Atpoure)",
    region: "West Bengal",
    description: "No pleats, two pallu loops, key bunch detail on shoulder.",
    promptHint:
      "Drape in the traditional Bengali (Atpoure) style: NO pleats at the waist, the saree wraps around the body and the pallu is brought from back to front over the LEFT shoulder, then taken under the RIGHT arm and thrown back over the LEFT shoulder again, often with a small key-bunch tassel at the shoulder. Wide red-and-white border feel if applicable.",
  },
  {
    id: "gujarati",
    name: "Gujarati (Seedha Pallu)",
    region: "Gujarat / Rajasthan",
    description: "Front pallu — pleats at waist, pallu spread across the chest from right shoulder.",
    promptHint:
      "Drape in the Gujarati Seedha Pallu (front-pallu) style: pleats tucked at the waist as usual, but the pallu comes from the back, OVER the RIGHT shoulder, and is spread WIDE across the chest like a front panel, showing the pallu design prominently.",
  },
  {
    id: "one-touch",
    name: "One-Minute / One-Touch",
    region: "Modern",
    description: "Pre-stitched look — gown-like, instant drape, sleek pallu.",
    promptHint:
      "Drape in a modern one-minute / pre-stitched style: looks gown-like and sleek with already-formed pleats at the waist, a smoothly pre-pleated pallu pinned neatly over the LEFT shoulder. Contemporary, fitted, ready-to-wear silhouette.",
  },
];
