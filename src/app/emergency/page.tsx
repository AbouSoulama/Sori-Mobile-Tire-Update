import type { Metadata } from "next";
import { EmergencyClient } from "@/components/emergency/EmergencyClient";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Emergency Flat Tire",
  description:
    "Flat tire emergency in Waldorf, MD or Southern Maryland? Call SORI Mobile Tire 24/7 — we come to you.",
  alternates: { canonical: "/emergency" },
  robots: { index: true, follow: true },
};

export default function EmergencyPage() {
  return (
    <EmergencyClient
      phoneDisplay={site.phone.display}
      phoneHref={site.phone.href}
      whatsappHref={site.whatsapp.href}
      hubCity={site.address.city}
    />
  );
}
