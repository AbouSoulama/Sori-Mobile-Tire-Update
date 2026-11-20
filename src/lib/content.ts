import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";

async function readJson<T>(name: string): Promise<T> {
  const file = path.join(process.cwd(), "content", name);
  return JSON.parse(await readFile(file, "utf8")) as T;
}

export type ServiceAreaContent = {
  radiusMiles: number;
  headline: string;
  intro: string;
  note: string;
  hub: { name: string; lat: number; lng: number };
  cities: string[];
};

export type FaqContent = {
  intro: string;
  items: { q: string; a: string }[];
};

export type ReviewsContent = {
  googleBusinessUrl: string;
  placeId: string;
  rating: number;
  reviewCount: number;
  sourceLabel: string;
  reviews: { author: string; rating: number; text: string; service?: string }[];
};

export type PricingContent = {
  disclaimer: string;
  currency: string;
  items: { name: string; from: number; unit: string; note?: string }[];
};

export type HoursContent = {
  regular: { days: string; time: string }[];
  emergency: string;
  note?: string;
};

export type GalleryContent = {
  title: string;
  intro: string;
  items: { src: string; alt: string; caption?: string }[];
};

export const getServiceArea = () => readJson<ServiceAreaContent>("service-area.json");
export const getFaq = () => readJson<FaqContent>("faq.json");
export const getReviews = () => readJson<ReviewsContent>("reviews.json");
export const getPricing = () => readJson<PricingContent>("pricing.json");
export const getHours = () => readJson<HoursContent>("hours.json");
export const getGallery = () => readJson<GalleryContent>("gallery.json");
