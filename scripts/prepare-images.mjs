// One-off asset pipeline: converts raw WordPress media + stock photos into optimized files in public/images.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const out = "public/images";
await mkdir(`${out}/brands`, { recursive: true });

const jobs = [
  // Logo
  { src: "IMG-20240731-WA0003.webp", dest: "logo.webp", width: 640 },
  { src: "IMG-20240731-WA0003.webp", dest: "logo.png", width: 512, format: "png" },

  // Stock (Pexels license)
  { src: "stock/6870331.jpg", dest: "hero-tire-service.webp", width: 1920 },
  { src: "stock/6870316.jpg", dest: "technician-rolling-tire.webp", width: 1200 },
  { src: "stock/6870318.jpg", dest: "technician-impact-wrench.webp", width: 1200 },
  { src: "stock/8986133.jpg", dest: "wheel-lug-nuts.webp", width: 1200 },
  { src: "stock/3806249.jpg", dest: "tire-inspection.webp", width: 1600 },
  { src: "stock/17600886.jpg", dest: "onsite-wheel-change.webp", width: 1600 },
  { src: "stock/12216205.jpg", dest: "roadside-flat-tire.webp", width: 1600 },

  // Original WordPress media (cropped frames removed where needed)
  { src: "wp-media/IMG-20240731-WA0013-1.jpg", dest: "smt-tire-handling.webp", width: 1000, crop: { left: 24, top: 24, width: 1032, height: 1030 } },
  { src: "wp-media/IMG-20240731-WA0014.jpg", dest: "smt-tire-mounting.webp", width: 1000, crop: { left: 24, top: 24, width: 1032, height: 632 } },
  { src: "wp-media/20476_instructions_step3_1000x1000.webp", dest: "plug-tire.webp", width: 900 },
  { src: "wp-media/S8-en-cas-de-crevaison-des-solutions-pour-ne-pas-rester-sur-le-bas-cote-197316.jpg", dest: "puncture-repair.webp", width: 1000 },
  { src: "wp-media/car-wheel_6077549e04746.webp", dest: "alloy-wheel.webp", width: 1000 },
  { src: "wp-media/balancer.png", dest: "wheel-balancer.webp", width: 600 },
  { src: "wp-media/10034345a.jpg", dest: "tpms-diagram.webp", width: 900 },
  { src: "wp-media/Wheel-Alignments-2.jpg", dest: "wheel-alignment.webp", width: 900 },

  // Brand logos
  { src: "wp-media/michelin.jpg", dest: "brands/michelin.webp", width: 400 },
  { src: "wp-media/pirelli-480x320-1.webp", dest: "brands/pirelli.webp", width: 480 },
  { src: "wp-media/images-1.png", dest: "brands/continental.webp", width: 400 },
  { src: "wp-media/general-tyres-480x320-1.png", dest: "brands/general-tire.webp", width: 480 },
  { src: "wp-media/timeline-13.png", dest: "brands/goodyear.webp", width: 480 },
  { src: "wp-media/NEWS_180229944_AR_0_DYBMYAUVVPUP.webp", dest: "brands/sumitomo.webp", width: 480, crop: { left: 140, top: 90, width: 520, height: 90 } },
];

for (const job of jobs) {
  let img = sharp(job.src);
  if (job.crop) img = img.extract(job.crop);
  img = img.resize({ width: job.width, withoutEnlargement: true });
  img = job.format === "png" ? img.png() : img.webp({ quality: 80 });
  await img.toFile(`${out}/${job.dest}`);
  console.log("ok", job.dest);
}
