import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.legalName} collects, uses and protects your personal information.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" image="/images/tire-inspection.webp" crumbs={[{ label: "Privacy Policy" }]} />
      <article className="container-x prose-legal max-w-3xl py-20">
        <p>Last updated: November 2026</p>
        <p>
          {site.legalName} (&ldquo;SORI Mobile Tire&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your
          privacy. This policy explains what information we collect through {site.url.replace("https://", "")}, how
          we use it, and the choices you have.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>Contact details you provide: name, email address, phone number, street address, city, state and ZIP code.</li>
          <li>Vehicle and service details: year, make, model, tire size, requested services, preferred appointment date and time, and messages you send us.</li>
          <li>Your preferred contact method and consent choices.</li>
          <li>Basic technical data such as IP address, used only to protect our forms against spam and abuse.</li>
        </ul>

        <h2>How we use your information</h2>
        <ul>
          <li>To prepare quotes, schedule appointments and dispatch our mobile technicians to your location.</li>
          <li>To contact you by phone, email or text message about your request.</li>
          <li>To send newsletter offers and updates, only if you subscribe. You can unsubscribe at any time.</li>
          <li>To keep records of our services and improve our customer experience.</li>
        </ul>

        <h2>Text messages</h2>
        <p>
          By checking the consent box on our forms, you agree that we may send you text notifications related to your
          request. Message and data rates may apply. Reply STOP to opt out at any time.
        </p>

        <h2>Sharing</h2>
        <p>
          We do not sell your personal information. We only share it with service providers that help us operate
          (such as our hosting and email providers), or when required by law.
        </p>

        <h2>Cookies</h2>
        <p>
          Our website uses only essential cookies needed for it to function. Embedded content such as Google Maps or
          WhatsApp may set their own cookies under their respective privacy policies.
        </p>

        <h2>Data retention and security</h2>
        <p>
          We keep your information only as long as needed to provide our services and meet legal obligations, and we
          protect it with reasonable administrative and technical safeguards.
        </p>

        <h2>Your choices</h2>
        <p>
          You may ask us to access, correct or delete your personal information by emailing{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-brand-700">
            {site.email}
          </a>{" "}
          or calling {site.phone.display}.
        </p>

        <h2>Contact</h2>
        <p>
          {site.legalName}
          <br />
          {site.address.full}
        </p>
      </article>
    </>
  );
}
