export type ServiceSummary = {
  slug: string;
  title: string;
  description: string;
  href: string;
  image: string;
};

export const coreServices: ServiceSummary[] = [
  {
    slug: "flat-tire-repair",
    title: "Flat Tire Repair",
    description:
      "We quickly repair flat tires at your location, ensuring safe and efficient service with high-quality tools and materials.",
    href: "/puncture-repair",
    image: "/images/plug-tire.webp",
  },
  {
    slug: "online-tire-purchases",
    title: "Online Tire Purchases Assistance",
    description:
      "We guide you through the online tire purchasing process, helping you select the best tires for your vehicle, ensuring a perfect fit and optimal value.",
    href: "/tire-purchase-assistance",
    image: "/images/technician-rolling-tire.webp",
  },
  {
    slug: "tire-installation",
    title: "Tire Installation",
    description:
      "After you have selected the right tires for your vehicle, you need professional tire installation service. We mount them on-site.",
    href: "/other#tire-assembly",
    image: "/images/smt-tire-mounting.webp",
  },
  {
    slug: "full-repair",
    title: "Full Repair",
    description:
      "A full tire repair includes inspecting the tire inside and out, cleaning the puncture area, and applying a plug-patch combo to seal the damage, ensuring the tire remains safe for use.",
    href: "/puncture-repair",
    image: "/images/puncture-repair.webp",
  },
  {
    slug: "wheel-repair",
    title: "Wheel Repair",
    description:
      "Our wheel repair service addresses damage and imperfections, restoring your wheels to their optimal condition.",
    href: "/wheel-repair",
    image: "/images/alloy-wheel.webp",
  },
  {
    slug: "tire-balancing",
    title: "Tire Balancing",
    description:
      "Regular tire balancing is key to keeping your vehicle safe and performing at its best.",
    href: "/other#wheel-balance",
    image: "/images/wheel-balancer.webp",
  },
];

export const additionalServices = [
  {
    id: "calibrate-tpms",
    title: "Calibrate the TPM Sensor",
    description:
      "Checking the tire pressure sensor, programming universal TPMS sensors, and installing and mounting tires with TPMS.",
    image: "/images/tpms-diagram.webp",
  },
  {
    id: "wheel-balance",
    title: "Wheel Balance",
    description:
      "Wheel balancing is the process of correcting the natural imbalance of a vehicle's tires. It distributes the mass evenly around the axis of rotation of the wheels.",
    image: "/images/wheel-balancer.webp",
  },
  {
    id: "tire-cap",
    title: "Tire Cap",
    description:
      "Valve caps for car tires are essential small accessories that protect your tire valves against dust, humidity and debris.",
    image: "/images/wheel-lug-nuts.webp",
  },
  {
    id: "tire-assembly",
    title: "Tire Assembly",
    description:
      "Regardless of how the vehicle is powered, we recommend always fitting the best tires at the rear, not the front. The rear axle ensures the stability of the vehicle on the road.",
    image: "/images/smt-tire-mounting.webp",
  },
  {
    id: "valve-stem",
    title: "Valve Stem Replacement",
    description:
      "A valve stem combines a rubber body with grooves for the cap, a core, and a metal rod inside the body that keeps the seal tight. We replace worn or leaking stems on-site.",
    image: "/images/technician-impact-wrench.webp",
  },
  {
    id: "tire-disposal",
    title: "Tire Disposal",
    description:
      "We take care of your worn tires responsibly, so they can be retreaded and reused instead of ending up in a landfill.",
    image: "/images/smt-tire-handling.webp",
  },
  {
    id: "tire-patch",
    title: "Tire Patch",
    description:
      "Tire repair with a patch/plug combo. Our repair patches are made of high-quality natural rubber with excellent wear resistance.",
    image: "/images/plug-tire.webp",
  },
];
