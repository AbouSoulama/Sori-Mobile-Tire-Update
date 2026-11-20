"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Navigation, Phone, Siren } from "lucide-react";

type Loc = { lat: number; lng: number; label: string };

export function EmergencyClient({
  phoneDisplay,
  phoneHref,
  whatsappHref,
  hubCity,
}: {
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
  hubCity: string;
}) {
  const [loc, setLoc] = useState<Loc | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "denied">("idle");

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("denied");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        let label = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        try {
          const res = await fetch(`/api/geocode/reverse?lat=${lat}&lng=${lng}`);
          if (res.ok) {
            const data = (await res.json()) as { ok?: boolean; label?: string | null };
            if (data.label) label = data.label;
          }
        } catch {
          /* keep coordinates */
        }
        setLoc({ lat, lng, label });
        setStatus("ok");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: true, timeout: 12000 },
    );
  }, []);

  const waDigits = whatsappHref.match(/\d+/)?.[0] ?? "13012669830";
  const waText = loc
    ? `EMERGENCY flat tire. Approximate location: ${loc.label} (https://maps.google.com/?q=${loc.lat},${loc.lng}). Please call me back.`
    : `EMERGENCY flat tire near ${hubCity}, MD. Please call me back — I need roadside help.`;
  const wa = `https://wa.me/${waDigits}?text=${encodeURIComponent(waText)}`;

  return (
    <section className="relative isolate min-h-[calc(100dvh-5rem)] overflow-hidden bg-navy text-white">
      <div
        aria-hidden
        className="absolute -top-24 right-0 size-[28rem] rounded-full bg-brand/25 blur-3xl"
      />
      <div className="container-x relative flex flex-col justify-center py-16 md:py-24">
        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/40 bg-brand/15 px-4 py-1.5 text-sm font-bold tracking-wide text-brand uppercase">
          <Siren className="size-4" aria-hidden /> 24/7 emergency
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[0.92] font-extrabold uppercase md:text-7xl">
          Flat tire?
          <span className="block text-brand">Call now. We come to you.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/75">
          No forms. No waiting for email. Tap call — our mobile team will head your way in the {hubCity} / Southern
          Maryland area.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:max-w-md">
          <a
            href={phoneHref}
            className="btn-primary px-8 py-5 text-lg shadow-[0_20px_50px_-12px_rgba(247,148,29,0.85)]"
          >
            <Phone className="size-6" /> Call {phoneDisplay}
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn border border-[#25d366]/50 bg-[#25d366] py-4 text-base text-white hover:bg-[#1ebe57]"
          >
            WhatsApp emergency message
          </a>
        </div>

        <div className="mt-10 max-w-lg rounded-3xl border border-white/10 bg-white/[0.05] p-5">
          <p className="flex items-center gap-2 text-sm font-bold tracking-widest text-brand uppercase">
            <Navigation className="size-4" aria-hidden /> Your approximate location
          </p>
          {status === "loading" && <p className="mt-3 text-white/60">Detecting location…</p>}
          {status === "ok" && loc && (
            <p className="mt-3 flex items-start gap-2 text-white/85">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
              <span>
                {loc.label}
                <span className="mt-1 block text-sm text-white/50">
                  Shared only if you send WhatsApp — we never upload it silently.
                </span>
              </span>
            </p>
          )}
          {(status === "denied" || status === "idle") && (
            <p className="mt-3 text-white/60">
              Location unavailable. Tell us your address or mile marker when you call.
            </p>
          )}
        </div>

        <p className="mt-8 text-sm text-white/45">
          Not an emergency?{" "}
          <Link href="/schedule-appointment" className="text-brand underline underline-offset-2">
            Schedule a visit
          </Link>{" "}
          or{" "}
          <Link href="/service-area" className="text-brand underline underline-offset-2">
            check our service area
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
