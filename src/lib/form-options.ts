export const serviceOptions = [
  "Flat Tire Repair",
  "Tire Purchases Assistance",
  "Wheel Repair",
  "Plug Tire",
  "Patch Tire",
  "Mounting",
  "Wheel Balance",
  "Tire Disposal",
  "Valve Stem Replacement",
  "Calibrate TPM Sensor",
] as const;

const currentYear = new Date().getFullYear() + 1;
export const yearOptions = Array.from({ length: currentYear - 2000 + 1 }, (_, i) =>
  String(currentYear - i),
);

export const tireWidthOptions = [
  "175", "185", "195", "205", "215", "225", "235", "245", "255",
  "265", "275", "285", "295", "305", "315", "325", "335",
] as const;

export const rimSizeOptions = ["13", "14", "15", "16", "17", "18", "19", "20", "21", "22"] as const;

export const contactPreferenceOptions = ["Phone", "Email"] as const;

export const waitPreferenceOptions = [
  "I will wait for my vehicle",
  "I will leave my vehicle",
] as const;

export const timeSlotOptions = Array.from({ length: 96 }, (_, i) => {
  const minutes = i * 15;
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h24 < 12 ? "AM" : "PM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
});

export const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois",
  "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
  "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
] as const;

export const consentText =
  "I accept the Terms and Conditions, Privacy Policy and Cookie Policy. I may receive text notifications from SORI Mobile Tire and can write to you at any time.";
