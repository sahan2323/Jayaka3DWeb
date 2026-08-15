export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/our-story", label: "Our Story" },
  { href: "/products", label: "Products" },
  { href: "/ceylon-cinnamon", label: "Ceylon Cinnamon" },
  { href: "/contact", label: "Contact" },
];
