export const site = {
  name: "SORI Mobile Tire",
  legalName: "SORI Mobile Tire Roadside Assistance LLC",
  shortName: "SMT RSA",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sori-mobile-tire.com",
  noindex: process.env.NEXT_PUBLIC_NOINDEX === "true",
  tagline:
    "At Sori Mobile Tire, we provide exceptional wheel repair services anytime, anywhere, with our fully equipped van and skilled agents to ensure your satisfaction.",
  phone: {
    display: "+1 227 213 7071",
    href: "tel:+12272137071",
  },
  whatsapp: {
    display: "+1 301 266 9830",
    href: "https://wa.me/13012669830?text=Hello!%20I%20have%20a%20question%20about%20your%20mobile%20tire%20services.",
  },
  email: "contact@sori-mobile-tire.com",
  address: {
    street: "3812 Light Arms Pl",
    city: "Waldorf",
    region: "MD",
    postalCode: "20602",
    country: "US",
    full: "3812 Light Arms Pl, Waldorf, MD 20602, United States",
  },
  geo: { lat: 38.6246, lng: -76.9391 },
  mapEmbed:
    "https://maps.google.com/maps?q=3812%20Light%20Arms%20Pl%2C%20Waldorf%2C%20MD%2020602&z=14&output=embed",
  hours: [
    { days: "Monday - Friday", time: "8:00 AM - 7:00 PM" },
    { days: "Saturday", time: "9:00 AM - 5:00 PM" },
    { days: "Sunday", time: "10:00 AM - 4:00 PM" },
  ],
  emergency: "24/7 Emergency Service Available",
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "",
  },
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Schedule", href: "/schedule-appointment" },
  { label: "Contact", href: "/contact" },
] as const;

export const utilityLinks = [
  { label: "Emergency", href: "/emergency" },
  { label: "Service Area", href: "/service-area" },
  { label: "FAQ", href: "/faq" },
] as const;

/** Entries of the "Services" dropdown (same pages as the former WordPress submenu). */
export const servicesMenu = [
  {
    label: "Puncture Repair",
    description: "Plug, patch or full repair, right where you are.",
    href: "/puncture-repair",
  },
  {
    label: "Tire Purchase Assistance",
    description: "We help you choose tires online, then install them.",
    href: "/tire-purchase-assistance",
  },
  {
    label: "Wheel Repair & Balancing",
    description: "Cracks, dents, corrosion and vibration, fixed.",
    href: "/wheel-repair",
  },
  {
    label: "Other Services",
    description: "TPMS, valve stems, mounting, disposal and more.",
    href: "/other",
  },
] as const;

export const footerQuickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Service Area", href: "/service-area" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Get a Quote", href: "/get-a-quote" },
] as const;

export const footerServiceLinks = [
  { label: "Emergency Flat Tire", href: "/emergency" },
  { label: "Wheel Repair", href: "/wheel-repair" },
  { label: "Plug Tire", href: "/puncture-repair" },
  { label: "Mounting Tire", href: "/other#tire-assembly" },
  { label: "Wheel Balance", href: "/other#wheel-balance" },
  { label: "Mobile Service", href: "/services" },
] as const;

export const brands = [
  { name: "Michelin", src: "/images/brands/michelin.webp" },
  { name: "Pirelli", src: "/images/brands/pirelli.webp" },
  { name: "Continental", src: "/images/brands/continental.webp" },
  { name: "Goodyear", src: "/images/brands/goodyear.webp" },
  { name: "General Tire", src: "/images/brands/general-tire.webp" },
  { name: "Sumitomo", src: "/images/brands/sumitomo.webp" },
] as const;

export const testimonials = [
  {
    quote:
      "Professional and efficient. The wheel repair was flawless, and the convenience of on-site service saved me so much time.",
    service: "Wheel Repair",
  },
  {
    quote:
      "Sori Mobile Tire went above and beyond. They quickly repaired my flat tire and were incredibly courteous. Will definitely use them again!",
    service: "Flat Tire Repair",
  },
  {
    quote:
      "Fantastic experience! They helped me choose the perfect tires online and came to my location for installation. Great service!",
    service: "Tire Purchase Assistance",
  },
  {
    quote:
      "Outstanding service! They were at my location within an hour and handled the wheel repair expertly. Couldn't be happier with the results.",
    service: "Wheel Repair",
  },
] as const;
