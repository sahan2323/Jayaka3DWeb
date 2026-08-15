// Product data sourced from Jayaka Ceylon Cinnamon's published product
// information (jayakacinnamon.lk). Specifications are only included where
// they were explicitly published — nothing here is invented.

export type ProductCategory =
  | "sticks"
  | "oils"
  | "powder"
  | "quillings"
  | "chips"
  | "leaves";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  shortDescription: string;
  description: string;
  image: string;
  grade?: string;
  specifications?: string[];
  featured?: boolean;
}

export const categoryLabels: Record<ProductCategory, string> = {
  sticks: "Sticks / Bales",
  oils: "Oils",
  powder: "Powder",
  quillings: "Quillings",
  chips: "Chips",
  leaves: "Leaves",
};

export const products: Product[] = [
  {
    id: "h1",
    name: "Cinnamon H1",
    category: "sticks",
    categoryLabel: "Sticks / Bales",
    grade: "Hamburg Grade",
    shortDescription: "Rough bark, strong flavor, golden brown.",
    description:
      "Identified as a Hamburg grade, H1 is our most popular grade among buyers. Made of rough bark, it delivers a very strong flavor and a golden brown appearance.",
    image: "/images/products/h1.jpg",
    specifications: ["Diameter: 21–23 mm", "Color: Golden brown", "Bark: Rough"],
    featured: true,
  },
  {
    id: "h2",
    name: "Cinnamon H2",
    category: "sticks",
    categoryLabel: "Sticks / Bales",
    grade: "Hamburg Grade",
    shortDescription: "Thicker bark, robust and spicier flavor.",
    description:
      "A widely used grade in cooking and baking for its warm, spicy flavor. H2 has a thicker bark that is more robust, with a stronger, spicier character than finer grades.",
    image: "/images/products/h2.jpg",
    specifications: ["Bark: Thicker, robust"],
  },
  {
    id: "m4",
    name: "Cinnamon M4",
    category: "sticks",
    categoryLabel: "Sticks / Bales",
    grade: "Mexican Grade",
    shortDescription: "Light brown, a top-selling mid-tier grade.",
    description:
      "Processed from the same Cinnamomum verum plant, M4 is a mid-rate grade valued for price and appearance. Quills are prepared using techniques handed down over generations in Sri Lanka. Very similar to the M5 grade.",
    image: "/images/products/m4.jpg",
    specifications: ["Diameter: 18–20 mm", "Color: Light brown"],
    featured: true,
  },
  {
    id: "c4",
    name: "Cinnamon C4",
    category: "sticks",
    categoryLabel: "Sticks / Bales",
    grade: "Continental Grade",
    shortDescription: "Economical grade, yellow to light brown.",
    description:
      "From the same evergreen species, Cinnamomum verum, C4 is a Continental cinnamon grade — yellow to light brown in appearance and one of the more economical grades among our stick offerings.",
    image: "/images/products/c4.jpg",
    specifications: [
      "Diameter: 13–14 mm",
      "Cut lengths: 5\", 10\", 21\"",
    ],
  },
  {
    id: "c5",
    name: "Cinnamon C5",
    category: "sticks",
    categoryLabel: "Sticks / Bales",
    grade: "Continental Grade",
    shortDescription: "Fine Continental grade, close to Alba.",
    description:
      "Second only to Alba in thickness and price, C5 is grown on our own estate and processed on our own premises — a refined alternative to the Alba stick.",
    image: "/images/products/c5.jpg",
    specifications: ["Diameter: 7–9 mm"],
  },
  {
    id: "c5-special",
    name: "Cinnamon C5 Special",
    category: "sticks",
    categoryLabel: "Sticks / Bales",
    grade: "Continental Grade",
    shortDescription: "One of our finest grades, close to Alba.",
    description:
      "The C5 Special grade is one of the best cinnamon grades we offer — second to Alba in thickness and price, sourced from our own estate and processed on our own premises.",
    image: "/images/products/c5-special.jpg",
    specifications: ["Diameter: 7–9 mm"],
    featured: true,
  },
  {
    id: "alba",
    name: "Cinnamon Alba",
    category: "sticks",
    categoryLabel: "Sticks / Bales",
    grade: "Finest Grade",
    shortDescription: "The thinnest, finest and most prized grade.",
    description:
      "The thinnest and finest grade in the cinnamon stick group, and the most expensive. Alba's fine diameter — close to a pencil — gives a good taste and a fresh, exotic aroma unmatched by coarser grades.",
    image: "/images/products/alba.jpg",
    specifications: ["Diameter: 8–10 mm"],
    featured: true,
  },
  {
    id: "bark-oil",
    name: "Ceylon Cinnamon Bark Oil",
    category: "oils",
    categoryLabel: "Oils",
    shortDescription: "Rare, potent oil distilled from the bark.",
    description:
      "Distilled from the bark of Cinnamomum zeylanicum. Rare, with a delicate aroma and a sweet, pungent taste — our bark oil contains more than 60% cinnamaldehyde, and is well suited to aromatherapy and food flavoring.",
    image: "/images/products/bark-oil.jpg",
    specifications: ["Cinnamaldehyde content: 60%+"],
  },
  {
    id: "leaf-oil",
    name: "Ceylon Cinnamon Leaf Oil",
    category: "oils",
    categoryLabel: "Oils",
    shortDescription: "Distilled from the glossy evergreen leaves.",
    description:
      "Drawn from the leaves of Cinnamomum verum, native to Sri Lanka. Used as an additive in soaps and a flavoring for seasonings, and valued in aromatherapy — diffused, applied topically, or added to bathwater.",
    image: "/images/products/leaf-oil.jpg",
  },
  {
    id: "quillings",
    name: "Cinnamon Quillings",
    category: "quillings",
    categoryLabel: "Quillings",
    shortDescription: "Larger bark pieces from the quilling process.",
    description:
      "A byproduct of peeling, processing and baling cinnamon quills — mainly larger bark pieces. Our quillings stand on par with the finest produced in Sri Lanka.",
    image: "/images/products/quillings.jpg",
  },
  {
    id: "powder",
    name: "Cinnamon Powder",
    category: "powder",
    categoryLabel: "Powder",
    shortDescription: "Finely ground bark, low-calorie and fiber-rich.",
    description:
      "Ground from the inner bark of the cinnamon tree. A low-calorie spice — around twelve calories in two teaspoons — and an excellent source of manganese, providing over one-third of the recommended daily intake per two-teaspoon serving.",
    image: "/images/products/powder.jpg",
    featured: true,
  },
  {
    id: "chips",
    name: "Cinnamon Chips",
    category: "chips",
    categoryLabel: "Chips",
    shortDescription: "Bark pieces from the peeling and baling process.",
    description:
      "Larger bark pieces resulting from the peeling, processing and baling of quills — a natural byproduct on par with the finest chips produced in Sri Lanka.",
    image: "/images/products/chips.jpg",
  },
  {
    id: "dried-leaves",
    name: "Dried Cinnamon Leaves",
    category: "leaves",
    categoryLabel: "Leaves",
    shortDescription: "Naturally dried leaves from the cinnamon tree.",
    description:
      "Dried leaves harvested from the cinnamon tree, prepared using the same careful, natural processing standards applied across our estate.",
    image: "/images/products/dried-leaves.jpg",
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export const categories: { id: "all" | ProductCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "sticks", label: "Sticks" },
  { id: "oils", label: "Oils" },
  { id: "powder", label: "Powder" },
  { id: "quillings", label: "Quillings" },
  { id: "chips", label: "Chips" },
  { id: "leaves", label: "Leaves" },
];
