import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms and conditions for using the website and mobile tire services of ${site.legalName}.`,
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Service" image="/images/onsite-wheel-change.webp" crumbs={[{ label: "Terms of Service" }]} />
      <article className="container-x prose-legal max-w-3xl py-20">
        <p>Last updated: November 2026</p>
        <p>
          These terms govern your use of this website and the mobile tire and roadside assistance services provided by{" "}
          {site.legalName}. By using our website or booking a service, you agree to these terms.
        </p>

        <h2>Quotes</h2>
        <p>
          Quotes provided online or by phone are estimates based on the information you share. The final price may
          change after an on-site inspection of your vehicle, tires and wheels. We will always confirm any change with
          you before starting work.
        </p>

        <h2>Appointments</h2>
        <ul>
          <li>Appointment requests submitted online are confirmed once we contact you.</li>
          <li>Please make sure the vehicle is accessible and parked in a safe location for our technicians.</li>
          <li>Let us know as early as possible if you need to reschedule or cancel.</li>
        </ul>

        <h2>Service and safety</h2>
        <p>
          Our technicians may decline a repair that is unsafe, such as sidewall damage or a tire worn beyond legal
          limits, and will recommend an alternative. Roadside service is performed only when it can be done safely.
        </p>

        <h2>Warranty</h2>
        <p>
          We stand behind our repairs. Warranty coverage depends on the service performed and the products installed,
          and will be explained when your service is completed. Manufacturer warranties apply to tires purchased from
          third parties.
        </p>

        <h2>Customer-supplied tires</h2>
        <p>
          When we install tires you purchased online, you are responsible for ordering the correct size and
          specification. We are happy to help you choose before you buy.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the extent permitted by law, our liability is limited to the amount paid for the service in question. We
          are not responsible for pre-existing damage or for issues caused by parts we did not supply.
        </p>

        <h2>Website content</h2>
        <p>
          All content on this website is provided for general information. Tire brand names and logos belong to their
          respective owners.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Contact us at{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-brand-700">
            {site.email}
          </a>{" "}
          or {site.phone.display}.
        </p>
      </article>
    </>
  );
}
