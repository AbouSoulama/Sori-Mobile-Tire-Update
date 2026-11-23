"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Loader2, Phone } from "lucide-react";
import Link from "next/link";
import {
  consentText,
  contactPreferenceOptions,
  rimSizeOptions,
  tireWidthOptions,
  usStates,
} from "@/lib/form-options";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

type Errors = Record<string, string>;

export function Field({
  label,
  name,
  error,
  optional,
  hint,
  children,
  className = "",
}: {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  hint?: string;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
  className?: string;
}) {
  const id = `${useId()}-${name}`;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {optional && <span className="ml-1 font-normal text-slate-muted">(optional)</span>}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy })}
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1 text-xs text-slate-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

export function TextField({
  label,
  name,
  errors,
  type = "text",
  optional,
  autoComplete,
  placeholder,
  className,
  inputMode,
  hint,
  min,
  max,
  step,
}: {
  label: string;
  name: string;
  errors: Errors;
  type?: string;
  optional?: boolean;
  autoComplete?: string;
  placeholder?: string;
  className?: string;
  inputMode?: "numeric" | "tel" | "email" | "text";
  hint?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
}) {
  return (
    <Field label={label} name={name} error={errors[name]} optional={optional} className={className} hint={hint}>
      {(a11y) => (
        <input
          {...a11y}
          name={name}
          type={type}
          required={!optional}
          autoComplete={autoComplete}
          placeholder={placeholder}
          inputMode={inputMode}
          min={min}
          max={max}
          step={step}
          className={`field ${errors[name] ? "border-red-400" : ""}`}
        />
      )}
    </Field>
  );
}

export function SelectField({
  label,
  name,
  errors,
  options,
  optional,
  placeholder = "Please choose an option",
  className,
  value,
  onChange,
  disabled,
}: {
  label: string;
  name: string;
  errors: Errors;
  options: readonly string[];
  optional?: boolean;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <Field label={label} name={name} error={errors[name]} optional={optional} className={className}>
      {(a11y) => (
        <select
          {...a11y}
          name={name}
          required={!optional}
          disabled={disabled}
          {...(value !== undefined ? { value, onChange: (e) => onChange?.(e.target.value) } : { defaultValue: "" })}
          className={`field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230b172a%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_14px_center] bg-no-repeat pr-10 disabled:bg-sand disabled:text-slate-muted ${
            errors[name] ? "border-red-400" : ""
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
}

export function TextAreaField({
  label,
  name,
  errors,
  optional,
  rows = 4,
  placeholder,
}: {
  label: string;
  name: string;
  errors: Errors;
  optional?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <Field label={label} name={name} error={errors[name]} optional={optional}>
      {(a11y) => (
        <textarea
          {...a11y}
          name={name}
          rows={rows}
          required={!optional}
          placeholder={placeholder}
          className={`field resize-y ${errors[name] ? "border-red-400" : ""}`}
        />
      )}
    </Field>
  );
}

export function FormSection({
  step,
  title,
  description,
  children,
}: {
  step: number;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="border-t border-navy/10 pt-8 first:border-t-0 first:pt-0">
      <legend className="sr-only">{title}</legend>
      <div className="mb-6 flex items-start gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy font-display text-lg font-bold text-brand">
          {step}
        </span>
        <div>
          <h3 className="text-2xl font-bold uppercase">{title}</h3>
          {description && <p className="text-sm text-slate-muted">{description}</p>}
        </div>
      </div>
      {children}
    </fieldset>
  );
}

export function TireSizeFields({ errors }: { errors: Errors }) {
  return (
    <div>
      <p className="mb-3 text-sm text-slate-muted">
        Tire size is printed on the sidewall, e.g. <strong className="text-navy">225/45 R17</strong> means width 225,
        profile 45, rim 17. Leave blank if you&apos;re not sure.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <SelectField label="Width" name="tireWidth" errors={errors} options={tireWidthOptions} optional />
        <TextField
          label="Profile"
          name="tireProfile"
          errors={errors}
          optional
          inputMode="numeric"
          placeholder="e.g. 55"
        />
        <SelectField label="Rim Size" name="rimSize" errors={errors} options={rimSizeOptions} optional />
      </div>
    </div>
  );
}

export function PersonalFields({ errors }: { errors: Errors }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TextField label="First name" name="firstName" errors={errors} autoComplete="given-name" />
      <TextField label="Last name" name="lastName" errors={errors} autoComplete="family-name" />
      <TextField label="Email" name="email" type="email" errors={errors} autoComplete="email" inputMode="email" />
      <TextField label="Phone" name="phone" type="tel" errors={errors} autoComplete="tel" inputMode="tel" />
      <TextField label="Address" name="address" errors={errors} autoComplete="street-address" className="sm:col-span-2" />
      <TextField label="City" name="city" errors={errors} autoComplete="address-level2" />
      <div className="grid grid-cols-[1.4fr_1fr] gap-4">
        <SelectField label="State" name="state" errors={errors} options={usStates} placeholder="Select" />
        <TextField
          label="ZIP code"
          name="postalCode"
          errors={errors}
          autoComplete="postal-code"
          inputMode="numeric"
          placeholder="20602"
        />
      </div>
    </div>
  );
}

export function ContactPreferenceField({ errors }: { errors: Errors }) {
  return (
    <div role="radiogroup" aria-labelledby="contact-pref-label">
      <p id="contact-pref-label" className="field-label">
        How do you prefer to be contacted?
      </p>
      <div className="flex gap-3">
        {contactPreferenceOptions.map((opt, i) => (
          <label
            key={opt}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-navy/15 px-5 py-2.5 text-sm font-semibold text-navy transition has-[:checked]:border-brand has-[:checked]:bg-brand-50"
          >
            <input type="radio" name="contactPreference" value={opt} defaultChecked={i === 0} className="accent-brand" />
            {opt}
          </label>
        ))}
      </div>
      {errors.contactPreference && <p className="field-error">{errors.contactPreference}</p>}
    </div>
  );
}

export function ConsentField({ errors }: { errors: Errors }) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-muted">
        <input
          type="checkbox"
          name="consent"
          required
          aria-invalid={Boolean(errors.consent)}
          className="mt-0.5 size-5 shrink-0 rounded accent-brand"
        />
        <span>
          {consentText.split("Terms and Conditions")[0]}
          <Link href="/terms-of-service" className="font-semibold text-navy underline underline-offset-2">
            Terms and Conditions
          </Link>
          ,{" "}
          <Link href="/privacy-policy" className="font-semibold text-navy underline underline-offset-2">
            Privacy Policy
          </Link>
          {consentText.split("Privacy Policy")[1]}
        </span>
      </label>
      {errors.consent && <p className="field-error">{errors.consent}</p>}
    </div>
  );
}

export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function SubmitButton({ submitting, children }: { submitting: boolean; children: ReactNode }) {
  return (
    <button type="submit" disabled={submitting} className="btn-primary w-full px-8 py-4 text-base sm:w-auto">
      {submitting ? <Loader2 className="size-5 animate-spin" aria-hidden /> : null}
      {submitting ? "Sending..." : children}
    </button>
  );
}

export function FormError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div role="alert" className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden />
      <p>
        {message}{" "}
        <a href={site.phone.href} className="font-semibold underline">
          {site.phone.display}
        </a>
      </p>
    </div>
  );
}

export function SuccessPanel({
  title,
  text,
  onReset,
  whatsappMessage,
}: {
  title: string;
  text: string;
  onReset: () => void;
  /** Prefilled WhatsApp body — ideally the same details as the admin email. */
  whatsappMessage: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const wa = whatsappLink(whatsappMessage);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    // Keep the success card in view (replacing a tall form used to leave the viewport on the footer).
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <div
      ref={panelRef}
      role="status"
      tabIndex={-1}
      className="scroll-mt-28 rounded-[2rem] bg-navy p-10 text-center text-white outline-none md:scroll-mt-32 md:p-14"
    >
      <CheckCircle2 className="mx-auto size-16 text-brand" aria-hidden />
      <h3 className="mt-6 text-4xl font-extrabold text-white uppercase">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-white/75">{text}</p>
      <p className="mx-auto mt-4 max-w-md text-sm text-white/55">
        Check your email for a confirmation. You can also message us on WhatsApp for a faster follow-up.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
        <a href={site.phone.href} className="btn-primary">
          <Phone className="size-4" /> Call {site.phone.display}
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="btn inline-flex border border-[#25d366]/40 bg-[#25d366] text-white hover:bg-[#1ebe57]"
        >
          Continue on WhatsApp
        </a>
        <button type="button" onClick={onReset} className="btn-ghost-light">
          Submit another request
        </button>
      </div>
    </div>
  );
}
