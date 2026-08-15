import type { Metadata } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jayakacinnamon.lk"),
  title: {
    default: "Jayaka Cinnamon — Premium Ceylon Cinnamon from Sri Lanka",
    template: "%s — Jayaka Cinnamon",
  },
  description:
    "Jayaka Ceylon Cinnamon exports premium, estate-grown Ceylon cinnamon — sticks, powder, oils and quillings — cultivated, processed and shipped from Sri Lanka.",
  openGraph: {
    title: "Jayaka Cinnamon — Premium Ceylon Cinnamon from Sri Lanka",
    description:
      "Cultivated, crafted and exported from Sri Lanka. Explore Jayaka's full range of Ceylon cinnamon grades, powders and oils.",
    url: "https://jayakacinnamon.lk",
    siteName: "Jayaka Cinnamon",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayaka Cinnamon — Premium Ceylon Cinnamon from Sri Lanka",
    description:
      "Cultivated, crafted and exported from Sri Lanka. Explore Jayaka's full range of Ceylon cinnamon grades, powders and oils.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-velvet font-sans text-cocoa antialiased">
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
