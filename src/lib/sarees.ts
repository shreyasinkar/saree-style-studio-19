import saree1 from "@/assets/saree-1-red.jpg";
import saree2 from "@/assets/saree-2-green.jpg";
import saree3 from "@/assets/saree-3-blue.jpg";
import saree4 from "@/assets/saree-4-pink.jpg";
import saree5 from "@/assets/saree-5-black.jpg";
import saree6 from "@/assets/saree-6-yellow.jpg";

export type Saree = {
  id: string;
  name: string;
  color: string;
  fabric: string;
  image: string;
};

export const SAREES: Saree[] = [
  { id: "red-banarasi", name: "Royal Banarasi", color: "Red", fabric: "Silk", image: saree1 },
  { id: "green-kanjivaram", name: "Emerald Kanjivaram", color: "Green", fabric: "Silk", image: saree2 },
  { id: "blue-silk", name: "Sapphire Drape", color: "Blue", fabric: "Silk", image: saree3 },
  { id: "pink-georgette", name: "Blush Reverie", color: "Pink", fabric: "Georgette", image: saree4 },
  { id: "black-sequin", name: "Midnight Gold", color: "Black", fabric: "Silk", image: saree5 },
  { id: "yellow-chanderi", name: "Sunflower Chanderi", color: "Yellow", fabric: "Chanderi", image: saree6 },
];
