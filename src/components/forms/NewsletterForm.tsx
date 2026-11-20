"use client";

import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Honeypot } from "./fields";
import { useFormSubmit } from "./useFormSubmit";

export function NewsletterForm() {
  const { status, errors, message, onSubmit } = useFormSubmit("/api/newsletter");

  if (status === "success") {
    return (
      <p role="status" className="flex items-center gap-2 text-sm font-semibold text-brand">
        <CheckCircle2 className="size-5" aria-hidden /> You&apos;re subscribed. Thank you!
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <Honeypot />
      <div className="flex rounded-full border border-white/15 bg-white/5 p-1.5 focus-within:border-brand">
        <label htmlFor="newsletter-email" className="sr-only">
          Your email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          placeholder="Your email address"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          aria-label="Subscribe"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-navy transition hover:bg-brand-600 disabled:opacity-60"
        >
          {status === "submitting" ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
        </button>
      </div>
      {(errors.email || (status === "error" && message)) && (
        <p className="mt-2 text-xs text-red-300">{errors.email ?? message}</p>
      )}
    </form>
  );
}
