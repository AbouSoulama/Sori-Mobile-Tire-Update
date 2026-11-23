"use client";

import { contactWhatsAppMessage } from "@/lib/form-summary";
import { FormError, Honeypot, SubmitButton, SuccessPanel, TextAreaField, TextField } from "./fields";
import { useFormSubmit } from "./useFormSubmit";

export function ContactForm() {
  const { status, errors, message, submitted, onSubmit, reset } = useFormSubmit("/api/contact");

  if (status === "success") {
    return (
      <SuccessPanel
        title="Message sent"
        text="Thanks for reaching out! We'll get back to you as soon as possible."
        onReset={reset}
        whatsappMessage={contactWhatsAppMessage(submitted ?? {})}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      <Honeypot />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Full name" name="name" errors={errors} autoComplete="name" />
        <TextField label="Email" name="email" type="email" errors={errors} autoComplete="email" />
        <TextField label="Phone" name="phone" type="tel" errors={errors} autoComplete="tel" optional />
        <TextField label="Subject" name="subject" errors={errors} optional />
      </div>
      <TextAreaField label="Message" name="message" errors={errors} rows={5} placeholder="How can we help you?" />
      <FormError message={message} />
      <SubmitButton submitting={status === "submitting"}>Send Message</SubmitButton>
    </form>
  );
}
