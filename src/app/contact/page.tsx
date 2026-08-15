import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock, Factory } from "lucide-react";
import { contact } from "@/data/company";
import { QuoteForm } from "@/components/contact/QuoteForm";
import { SocialIconLink } from "@/components/ui/social-icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a quote from Jayaka Ceylon Cinnamon — reach our head office in Nugegoda or our factory in Karandeniya, Sri Lanka.",
};

export default function ContactPage() {
  return (
    <>
      <header className="pt-40 pb-16 sm:pt-52 sm:pb-20">
        <div className="container-edit">
          <span className="text-eyebrow text-cinnamon">Contact</span>
          <h1 className="text-display mt-4 max-w-3xl text-5xl text-cocoa sm:text-7xl">
            Request a quote.
          </h1>
          <p className="text-editorial mt-8 max-w-xl text-cocoa/60">
            Tell us your grade, quantity and destination — our team replies
            within one business day.
          </p>
        </div>
      </header>

      <section className="bg-velvet pb-24 sm:pb-32">
        <div className="container-edit grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="flex flex-col gap-8">
            <InfoRow icon={<Phone size={18} />} label="Phone">
              <a href={contact.phoneHref} className="hover:text-cinnamon">
                {contact.phone}
              </a>
            </InfoRow>

            <InfoRow icon={<Mail size={18} />} label="Email">
              <a href={`mailto:${contact.email}`} className="hover:text-cinnamon">
                {contact.email}
              </a>
            </InfoRow>

            <InfoRow icon={<MapPin size={18} />} label={contact.headOffice.label}>
              {contact.headOffice.lines.join(", ")}
            </InfoRow>

            <InfoRow icon={<Factory size={18} />} label={contact.factory.label}>
              {contact.factory.lines.join(", ")}
            </InfoRow>

            <InfoRow icon={<Clock size={18} />} label="Business Hours">
              <div className="flex flex-col gap-1">
                {contact.hours.map((h) => (
                  <span key={h.days}>
                    {h.days}: {h.time}
                  </span>
                ))}
              </div>
            </InfoRow>

            <div className="mt-4 overflow-hidden rounded-3xl border border-cocoa/10">
              <iframe
                src={contact.mapEmbed}
                title="Jayaka Ceylon Cinnamon location"
                className="h-64 w-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div>
              <span className="text-eyebrow text-cocoa/40">Follow Us</span>
              <div className="mt-3 flex items-center gap-3">
                <SocialIconLink
                  platform="facebook"
                  href={contact.social.facebook}
                  label="Jayaka Cinnamon on Facebook"
                  variant="light"
                />
                <SocialIconLink
                  platform="instagram"
                  href={contact.social.instagram}
                  label="Jayaka Cinnamon on Instagram"
                  variant="light"
                />
                <SocialIconLink
                  platform="tiktok"
                  href={contact.social.tiktok}
                  label="Jayaka Cinnamon on TikTok"
                  variant="light"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-cocoa/10 bg-white p-8 sm:p-12">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cinnamon/10 text-cinnamon">
        {icon}
      </span>
      <div>
        <span className="text-eyebrow text-cocoa/40">{label}</span>
        <div className="mt-1 text-cocoa/80">{children}</div>
      </div>
    </div>
  );
}
