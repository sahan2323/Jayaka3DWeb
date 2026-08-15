import Link from "next/link";
import { contact } from "@/data/company";
import { navLinks } from "@/components/navigation/nav-links";
import { Logo } from "@/components/ui/Logo";
import { SocialIconLink } from "@/components/ui/social-icons";

export function Footer() {
  return (
    <footer className="bg-cocoa text-velvet">
      <div className="container-edit py-16 sm:py-24">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo className="h-16 w-[280px] sm:h-[72px] sm:w-[320px]" />
            <p className="mt-5 max-w-sm text-sm text-velvet/55">
              Premium Ceylon cinnamon, cultivated, processed and exported from
              our own estate in Karandeniya, Sri Lanka.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <SocialIconLink
                platform="facebook"
                href={contact.social.facebook}
                label="Jayaka Cinnamon on Facebook"
                variant="dark"
              />
              <SocialIconLink
                platform="instagram"
                href={contact.social.instagram}
                label="Jayaka Cinnamon on Instagram"
                variant="dark"
              />
              <SocialIconLink
                platform="tiktok"
                href={contact.social.tiktok}
                label="Jayaka Cinnamon on TikTok"
                variant="dark"
              />
            </div>
          </div>

          <div>
            <span className="text-eyebrow text-velvet/40">Navigate</span>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-velvet/70 hover:text-velvet">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-eyebrow text-velvet/40">Contact</span>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-velvet/70">
              <li>
                <a href={contact.phoneHref} className="hover:text-velvet">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-velvet">
                  {contact.email}
                </a>
              </li>
              <li className="pt-2 text-velvet/50">
                {contact.headOffice.lines.join(", ")}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-velvet/10 pt-8 text-xs text-velvet/40 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Jayaka Ceylon Cinnamon (Pvt) Ltd. All rights reserved.</span>
          <span>Kurundugaha, Sri Lanka</span>
        </div>
      </div>
    </footer>
  );
}
