export interface Badge {
  id: string;
  src: string;
  alt: string;
}

// Add real files at the paths below. Alt text should describe what each
// badge actually certifies — update these once you tell me what the
// second one is (only "FDA Registered" is confirmed from the Our Story
// copy so far).
export const badges: Badge[] = [
  {
    id: "fda",
    src: "/images/badges/fda-registered.png",
    alt: "FDA Registered Exporter",
  },
  {
    id: "badge-2",
    src: "/images/badges/badge-2.png",
    alt: "Certification",
  },
];