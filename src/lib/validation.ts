import { z } from "zod";
import {
  contactPreferenceOptions,
  rimSizeOptions,
  serviceOptions,
  timeSlotOptions,
  tireWidthOptions,
  usStates,
  waitPreferenceOptions,
} from "./form-options";

const required = (label: string, max = 150) =>
  z
    .string({ error: `${label} is required` })
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} is too long`);

const optional = (max = 150) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : null));

const phone = z
  .string({ error: "Phone is required" })
  .trim()
  .min(1, "Phone is required")
  .refine((v) => v.replace(/\D/g, "").length >= 10, "Enter a valid phone number");

const email = z.string({ error: "Email is required" }).trim().min(1, "Email is required").pipe(z.email("Enter a valid email"));

const consent = z.literal("on", { error: "Please accept the terms to continue" });

const personal = {
  lastName: required("Last name", 100),
  firstName: required("First name", 100),
  email,
  phone,
  address: required("Address", 255),
  city: required("City", 120),
  state: z.enum(usStates, { error: "Select a state" }),
  postalCode: z
    .string({ error: "ZIP code is required" })
    .trim()
    .regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code"),
  contactPreference: z.enum(contactPreferenceOptions).default("Phone"),
  consent,
};

const vehicle = {
  vehicleYear: optional(4),
  vehicleMake: optional(80),
  vehicleModel: optional(120),
};

const tire = {
  tireWidth: z
    .union([z.enum(tireWidthOptions), z.literal("")])
    .optional()
    .transform((v) => v || null),
  tireProfile: z
    .string()
    .trim()
    .regex(/^(\d{2})?$/, "Profile is a 2-digit number, e.g. 55")
    .optional()
    .transform((v) => v || null),
  rimSize: z
    .union([z.enum(rimSizeOptions), z.literal("")])
    .optional()
    .transform((v) => v || null),
};

export const quoteSchema = z.object({
  services: z
    .array(z.enum(serviceOptions), { error: "Select at least one service" })
    .min(1, "Select at least one service"),
  quantity: z.coerce
    .number({ error: "Quantity is required" })
    .int("Enter a whole number")
    .min(1, "Quantity must be at least 1")
    .max(100, "Quantity looks too high"),
  ...vehicle,
  ...tire,
  ...personal,
  message: optional(3000),
});

export const appointmentSchema = z.object({
  service: z.enum(serviceOptions, { error: "Select a service" }),
  message: optional(3000),
  ...vehicle,
  appointmentDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Select a date")
    .refine((v) => v >= new Date(Date.now() - 86_400_000).toISOString().slice(0, 10), "Pick a date in the future"),
  appointmentTime: z.enum(timeSlotOptions as [string, ...string[]], { error: "Select a time" }),
  waitPreference: z.enum(waitPreferenceOptions),
  ...tire,
  ...personal,
});

export const contactSchema = z.object({
  name: required("Name", 150),
  email,
  phone: optional(40),
  subject: optional(190),
  message: required("Message", 3000),
});

export const newsletterSchema = z.object({ email });

export type QuoteInput = z.infer<typeof quoteSchema>;
export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

export type FieldErrors = Record<string, string>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}
