"use client";

import { useState, type FormEvent } from "react";

export type FormStatus = "idle" | "submitting" | "success" | "error";

export function useFormSubmit(endpoint: string, { arrayFields = [] as string[] } = {}) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, unknown> = {};
    for (const key of new Set(data.keys())) {
      payload[key] = arrayFields.includes(key) ? data.getAll(key) : data.get(key);
    }
    for (const key of arrayFields) payload[key] ??= [];

    setStatus("submitting");
    setErrors({});
    setMessage("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      setErrors(json.errors ?? {});
      setMessage(json.message ?? "Something went wrong. Please try again.");
      setStatus("error");
      requestAnimationFrame(() => {
        form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      });
    } catch {
      setMessage("Network error. Please check your connection or call us directly.");
      setStatus("error");
    }
  }

  return { status, errors, message, onSubmit, reset: () => setStatus("idle") };
}
