"use client";

import { useEffect, useState } from "react";
import { serviceOptions, timeSlotOptions, waitPreferenceOptions } from "@/lib/form-options";
import type { VehicleCatalog } from "@/lib/vehicles";
import {
  ConsentField,
  ContactPreferenceField,
  Field,
  FormError,
  FormSection,
  Honeypot,
  PersonalFields,
  SelectField,
  SubmitButton,
  SuccessPanel,
  TextAreaField,
  TireSizeFields,
} from "./fields";
import { VehicleFields } from "./VehicleFields";
import { useFormSubmit } from "./useFormSubmit";

const today = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

export function AppointmentForm({ catalog }: { catalog: VehicleCatalog }) {
  const { status, errors, message, onSubmit, reset } = useFormSubmit("/api/appointment");
  const [date, setDate] = useState("");
  const [available, setAvailable] = useState<string[]>([...timeSlotOptions]);
  const [booked, setBooked] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (!date) {
      setAvailable([...timeSlotOptions]);
      setBooked([]);
      return;
    }
    let cancelled = false;
    setLoadingSlots(true);
    fetch(`/api/availability?date=${encodeURIComponent(date)}`)
      .then((r) => r.json())
      .then((data: { slots?: string[]; booked?: string[] }) => {
        if (cancelled) return;
        setAvailable(data.slots?.length ? data.slots : [...timeSlotOptions]);
        setBooked(data.booked ?? []);
      })
      .catch(() => {
        if (!cancelled) {
          setAvailable([...timeSlotOptions]);
          setBooked([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });
    return () => {
      cancelled = true;
    };
  }, [date]);

  if (status === "success") {
    return (
      <SuccessPanel
        title="Appointment requested"
        text="Thank you! We'll contact you shortly to confirm your appointment. We come to you - anywhere, anytime."
        onReset={reset}
        whatsappKind="appointment request"
      />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-10">
      <Honeypot />

      <FormSection step={1} title="Service Selection">
        <div className="space-y-4">
          <SelectField label="Service" name="service" errors={errors} options={serviceOptions} />
          <TextAreaField
            label="Include a message to our technicians"
            name="message"
            errors={errors}
            optional
            rows={3}
          />
        </div>
      </FormSection>

      <FormSection step={2} title="Vehicle Information">
        <VehicleFields catalog={catalog} errors={errors} />
      </FormSection>

      <FormSection
        step={3}
        title="Appointment Details"
        description="Select a date — taken time slots are hidden automatically."
      >
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Date" name="appointmentDate" error={errors.appointmentDate}>
              {(a11y) => (
                <input
                  {...a11y}
                  type="date"
                  name="appointmentDate"
                  min={today()}
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`field ${errors.appointmentDate ? "border-red-400" : ""}`}
                />
              )}
            </Field>
            <SelectField
              label={loadingSlots ? "Time (loading…)" : "Time"}
              name="appointmentTime"
              errors={errors}
              options={available}
              placeholder={date ? "Select an open time" : "Pick a date first"}
            />
          </div>
          {booked.length > 0 && (
            <p className="text-sm text-slate-muted">
              {booked.length} slot{booked.length > 1 ? "s" : ""} already requested that day and hidden from the list.
            </p>
          )}
          <div role="radiogroup" aria-labelledby="wait-label">
            <p id="wait-label" className="field-label">
              Are you going to wait while we work?
            </p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {waitPreferenceOptions.map((opt) => (
                <label
                  key={opt}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border border-navy/15 px-4 py-3 has-[:checked]:border-brand has-[:checked]:bg-brand-50"
                >
                  <input type="radio" name="waitPreference" value={opt} required className="accent-brand" />
                  <span className="text-sm font-semibold">{opt}</span>
                </label>
              ))}
            </div>
            {errors.waitPreference && <p className="field-error">{errors.waitPreference}</p>}
          </div>
          <TireSizeFields errors={errors} />
        </div>
      </FormSection>

      <FormSection step={4} title="Your contact details">
        <PersonalFields errors={errors} />
        <ContactPreferenceField errors={errors} />
        <ConsentField errors={errors} />
      </FormSection>

      <FormError message={message} />
      <SubmitButton submitting={status === "submitting"}>Request appointment</SubmitButton>
    </form>
  );
}
