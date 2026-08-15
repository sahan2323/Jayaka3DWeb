// Company information sourced from jayakacinnamon.lk (About Us / Contact Us).
// Nothing here is invented — certifications, dates and figures are only
// included where the source explicitly states them.

export const company = {
  name: "Jayaka Cinnamon",
  legalName: "Jayaka Ceylon Cinnamon (Pvt) Ltd",
  founded: 2022,
  tagline: "Exporting the finest Ceylon cinnamon to the world.",
  mission:
    "To source the finest cinnamon and process it using sustainable methods to produce a range of products that are both delicious and nutritious — educating customers on the benefits of cinnamon while operating with ethical, customer-first business practices.",
  vision:
    "To be the leading provider of high-quality cinnamon products that enhance the taste and health of our customers.",
  founderNote:
    "Jayaka is the brainchild of our CEO, Mr. P.D. Samarasinghe, who comes from a family of three generations of cinnamon traders based in Kurundugaha — Sri Lanka's cinnamon capital. He draws on four decades of cinnamon expertise to deliver the best Ceylon cinnamon to the world.",
  registration:
    "Jayaka is a recognized exporter registered with the U.S. Food and Drug Administration (FDA).",
};

export const contact = {
  phone: "+94 77 793 1504",
  phoneHref: "tel:+94777931504",
  email: "info@jayakacinnamon.lk",
  headOffice: {
    label: "Head Office",
    lines: ["No 1, Jambugasmulla Mawatha", "Nugegoda", "Sri Lanka"],
  },
  factory: {
    label: "Factory",
    lines: ["Borakanda", "Karandeniya"],
  },
  hours: [
    { days: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
    { days: "Saturday – Sunday", time: "8:00 AM – 1:00 PM" },
  ],
  social: {
    facebook: "https://www.facebook.com/jayakacinnamon",
    instagram: "https://www.instagram.com/jayaka_cinnamon/",
    tiktok: "https://www.tiktok.com/@jayakacinnamon",
  },
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d629.1255847352676!2d80.0977001542693!3d6.268940646127443!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae181684a612299%3A0x1dbcdee18756ca68!2sJayaka%20Ceylon%20Cinnamon!5e0!3m2!1sen!2slk!4v1676798373483!5m2!1sen!2slk",
};

export interface JourneyStage {
  id: string;
  label: string;
  description: string;
}

// Used by both the "WE CULTIVATE / WE HARVEST..." scroll statement and
// the Cinnamon Journey path.
export const journeyStages: JourneyStage[] = [
  {
    id: "origin",
    label: "Sri Lanka",
    description: "Our story begins in Kurundugaha, Sri Lanka's cinnamon capital.",
  },
  {
    id: "cultivate",
    label: "Cultivation",
    description: "We plant and grade the finest Cinnamomum verum on our own estate.",
  },
  {
    id: "harvest",
    label: "Harvest",
    description: "Bark is peeled by hand, following techniques passed through generations.",
  },
  {
    id: "process",
    label: "Processing",
    description: "The outer bark is removed and the inner strip is rubbed and rolled into quills.",
  },
  {
    id: "craft",
    label: "Craft",
    description: "Each quill is shaped and graded by our village workforce, by hand.",
  },
  {
    id: "quality",
    label: "Quality",
    description: "Sticks, quillings, powder and oils are sorted and graded for quality.",
  },
  {
    id: "export",
    label: "Export",
    description: "FDA-registered and ready to ship, worldwide, from our own facility.",
  },
  {
    id: "world",
    label: "The World",
    description: "From Kurundugaha to kitchens and manufacturers around the globe.",
  },
];

export const statementLines = [
  "WE CULTIVATE.",
  "WE HARVEST.",
  "WE PROCESS.",
  "WE CRAFT.",
  "WE REFINE.",
  "WE EXPORT.",
];

export const ceylonVsCassia = [
  { attribute: "Botanical source", ceylon: "Cinnamomum zeylanicum", cassia: "Cinnamomum cassia" },
  { attribute: "Origin", ceylon: "Indigenous to Sri Lanka", cassia: "China, Indonesia, Vietnam" },
  { attribute: "Coumarin level", ceylon: "Negligible — under 0.004%", cassia: "High — up to 5%" },
  { attribute: "Price", ceylon: "Premium", cassia: "Economical" },
  { attribute: "Flavor", ceylon: "Mild, delicate aroma", cassia: "Intense, sharp flavor" },
  { attribute: "Structure", ceylon: "Handcrafted, multi-layered quills", cassia: "Single thick curled layer" },
  { attribute: "Texture", ceylon: "Soft, easy to break", cassia: "Hard, harder to break" },
  { attribute: "Color", ceylon: "Light to golden brown", cassia: "Dark reddish brown" },
];

export const ceylonBenefits = [
  "Anti-inflammatory",
  "Antioxidant",
  "May help reduce risk of diabetes",
  "Antimicrobial — supports the body against bacterial, fungal and viral infection",
];
