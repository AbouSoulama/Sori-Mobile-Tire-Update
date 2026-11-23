"use client";

import { serviceOptions } from "@/lib/form-options";
import { quoteWhatsAppMessage } from "@/lib/form-summary";
import type { VehicleCatalog } from "@/lib/vehicles";
import {
  ConsentField,
  ContactPreferenceField,
  FormError,
  FormSection,
  Honeypot,
  PersonalFields,
  SubmitButton,
  SuccessPanel,
  TextAreaField,
  TextField,
  TireSizeFields,
} from "./fields";
import { VehicleFields } from "./VehicleFields";
import { useFormSubmit } from "./useFormSubmit";

export function QuoteForm({ catalog }: { catalog: VehicleCatalog }) {
  const { status, errors, message, submitted, onSubmit, reset } = useFormSubmit("/api/quote", {
    arrayFields: ["services"],
  });

  if (status === "success") {
    return (
      <SuccessPanel
        title="Quote request sent"
        text="Thank you! We received your request and will get back to you shortly with a custom quote."
        onReset={reset}
        whatsappMessage={quoteWhatsAppMessage(submitted ?? {})}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-10">
      <Honeypot />

      <FormSection step={1} title="Service Selection" description="Select any services you need:">
        <div className="grid gap-3 sm:grid-cols-2">
          {serviceOptions.map((service) => (
            <label
              key={service}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-navy/15 px-4 py-3.5 font-semibold text-navy transition hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-brand-50"
            >
              <input type="checkbox" name="services" value={service} className="size-5 rounded accent-brand" />
              {service}
            </label>
          ))}
        </div>
        {errors.services && <p className="field-error mt-2">{errors.services}</p>}
        <div className="mt-6 max-w-xs">
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            inputMode="numeric"
            errors={errors}
            placeholder="e.g. 4"
            hint="How many tires / units do you need?"
            min={1}
            max={100}
            step={1}
          />
        </div>
      </FormSection>

      <FormSection step={2} title="Vehicle Information" description="Please enter your vehicle information">
        <VehicleFields catalog={catalog} errors={errors} />
      </FormSection>

      <FormSection step={3} title="Tire Information">
        <TireSizeFields errors={errors} />
      </FormSection>

      <FormSection step={4} title="Personal Information">
        <PersonalFields errors={errors} />
      </FormSection>

      <FormSection step={5} title="Additional Information">
        <div className="space-y-6">
          <TextAreaField label="Would you like to leave a message?" name="message" errors={errors} optional />
          <ContactPreferenceField errors={errors} />
          <ConsentField errors={errors} />
        </div>
      </FormSection>

      <div className="space-y-4">
        <FormError message={message} />
        <SubmitButton submitting={status === "submitting"}>Submit My Quote</SubmitButton>
      </div>
    </form>
  );
}
