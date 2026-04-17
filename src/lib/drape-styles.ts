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
      "STYLE = CLASSIC NIVI (Andhra / standard modern). Required visible features: (1) 5-7 neat box pleats tucked into the front of the waistband at the navel, fanning downward; (2) the pallu (decorative end) draped diagonally from the front-right hip, across the torso, OVER the LEFT shoulder, falling loosely down the back to roughly the knees; (3) a fitted matching blouse and a petticoat is worn underneath; (4) ankles and feet are visible. Do NOT make it dhoti-style. Do NOT put the pallu over the right shoulder.",
  },
  {
    id: "maharashtrian",
    name: "Maharashtrian (Nauvari)",
    region: "Maharashtra",
    description: "Nine-yard dhoti-style drape, no petticoat, very active and traditional.",
    promptHint:
      "STYLE = MAHARASHTRIAN NAUVARI (nine-yard, kashta). This is a DHOTI-STYLE drape — mandatory and non-negotiable. Required visible features: (1) the saree is wrapped around the waist and the central portion is drawn BETWEEN THE LEGS from front to back and tucked firmly at the CENTER BACK of the waist, creating a clearly visible dhoti / trouser-like silhouette around the legs; (2) NO petticoat is worn and NO front pleats fan down at the navel — instead the lower body looks like loose pleated trousers; (3) the pallu is drawn tightly across the chest from the right hip, passed under the right arm, and pinned over the LEFT shoulder, falling down the back; (4) traditional Marathi look, ankles fully visible, ready for movement. Do NOT render this as a normal Nivi saree with a skirt — the dhoti-between-the-legs detail MUST be clearly visible.",
  },
  {
    id: "simple-pleated",
    name: "Simple Pleated",
    region: "Everyday",
    description: "Minimal, clean drape — neat pleats, plain pallu fall, no frills.",
    promptHint:
      "STYLE = SIMPLE EVERYDAY PLEATED. Required visible features: (1) a small number (4-5) of clean, minimal pleats tucked at the front waist; (2) the pallu falls STRAIGHT and PLAIN over the LEFT shoulder down the back, no decorative folds, no pinning, no pleating of the pallu; (3) tidy, understated, office/home-wear feel; (4) simple matching blouse. Avoid any ornate or regional flourishes.",
  },
  {
    id: "bengali",
    name: "Bengali (Atpoure)",
    region: "West Bengal",
    description: "No pleats, two pallu loops, key bunch detail on shoulder.",
    promptHint:
      "STYLE = BENGALI ATPOURE. Required visible features: (1) NO pleats tucked at the front waist — the saree wraps smoothly around the body; (2) the pallu travels from the back, comes OVER the LEFT shoulder to the front, then is brought UNDER the RIGHT arm and thrown back OVER the LEFT shoulder a SECOND time, creating two distinct pallu loops; (3) a small bunch of keys (chabi) is tied to the end of the pallu hanging from the LEFT shoulder as a traditional accent; (4) wide contrasting border (often red on white/cream) showcased prominently; (5) classic Bengali look. Do NOT add Nivi-style fanned pleats at the waist.",
  },
  {
    id: "gujarati",
    name: "Gujarati (Seedha Pallu)",
    region: "Gujarat / Rajasthan",
    description: "Front pallu — pleats at waist, pallu spread across the chest from right shoulder.",
    promptHint:
      "STYLE = GUJARATI SEEDHA PALLU (front-pallu, also called Rajasthani style). Required visible features: (1) pleats tucked at the front waist as usual; (2) the pallu comes from the BACK, OVER the RIGHT shoulder (NOT left), and is spread WIDE across the front of the chest like a decorative front panel, fully displaying the pallu's motifs and border; (3) the right end of the pallu is tucked into the waistband on the left side, holding the front panel flat; (4) traditional Gujarati/Rajasthani bridal or festive feel. The pallu MUST be at the front, not flowing down the back.",
  },
  {
    id: "one-touch",
    name: "One-Minute / One-Touch",
    region: "Modern",
    description: "Pre-stitched look — gown-like, instant drape, sleek pallu.",
    promptHint:
      "STYLE = MODERN ONE-MINUTE / PRE-STITCHED. Required visible features: (1) a sleek, gown-like fitted silhouette with already-formed crisp pleats stitched at the front waist; (2) a smoothly pre-pleated, narrow pallu pinned neatly and flat over the LEFT shoulder, falling in a controlled straight line down the back; (3) contemporary, ready-to-wear, fashion-forward look — no loose ends, no improvisation; (4) modern blouse style.",
  },
];
