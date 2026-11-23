/** Client-safe helpers: format submitted form data like the admin notification email. */

function line(label: string, value: unknown): string | null {
  if (value === null || value === undefined || value === "") return null;
  const text = Array.isArray(value) ? value.filter(Boolean).join(", ") : String(value);
  if (!text.trim()) return null;
  return `${label}: ${text}`;
}

function joinLines(rows: Array<string | null>) {
  return rows.filter(Boolean).join("\n");
}

function tireSize(payload: Record<string, unknown>) {
  const width = payload.tireWidth;
  if (!width) return null;
  return `${width}/${payload.tireProfile || "?"} R${payload.rimSize || "?"}`;
}

function vehicle(payload: Record<string, unknown>) {
  return [payload.vehicleYear, payload.vehicleMake, payload.vehicleModel].filter(Boolean).join(" ");
}

function fullName(payload: Record<string, unknown>) {
  return [payload.firstName, payload.lastName].filter(Boolean).join(" ");
}

function address(payload: Record<string, unknown>) {
  const parts = [payload.address, payload.city, payload.state, payload.postalCode].filter(Boolean);
  return parts.length ? parts.join(", ") : null;
}

export function quoteWhatsAppMessage(payload: Record<string, unknown>) {
  const body = joinLines([
    line("Services", payload.services),
    line("Quantity", payload.quantity),
    line("Vehicle", vehicle(payload)),
    line("Tire size", tireSize(payload)),
    line("Name", fullName(payload)),
    line("Email", payload.email),
    line("Phone", payload.phone),
    line("Address", address(payload)),
    line("Preferred contact", payload.contactPreference),
    line("Message", payload.message),
  ]);
  return `Hi SORI Mobile Tire — I just submitted a quote request on your website.\n\n${body}`;
}

export function appointmentWhatsAppMessage(payload: Record<string, unknown>) {
  const body = joinLines([
    line("Service", payload.service),
    line("Date", payload.appointmentDate),
    line("Time", payload.appointmentTime),
    line("Customer will", payload.waitPreference),
    line("Vehicle", vehicle(payload)),
    line("Tire size", tireSize(payload)),
    line("Name", fullName(payload)),
    line("Email", payload.email),
    line("Phone", payload.phone),
    line("Address", address(payload)),
    line("Preferred contact", payload.contactPreference),
    line("Message to technicians", payload.message),
  ]);
  return `Hi SORI Mobile Tire — I just submitted an appointment request on your website.\n\n${body}`;
}

export function contactWhatsAppMessage(payload: Record<string, unknown>) {
  const body = joinLines([
    line("Name", payload.name),
    line("Email", payload.email),
    line("Phone", payload.phone),
    line("Subject", payload.subject),
    line("Message", payload.message),
  ]);
  return `Hi SORI Mobile Tire — I just submitted a contact message on your website.\n\n${body}`;
}
