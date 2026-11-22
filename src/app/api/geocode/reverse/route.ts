import { NextResponse } from "next/server";
import { isRateLimited, clientIp } from "@/lib/rate-limit";

export async function GET(request: Request) {
  const ip = clientIp(request.headers);
  if (isRateLimited(`geocode:${ip}`, 20, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
    return NextResponse.json({ ok: false, message: "Invalid coordinates." }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "SORI-Mobile-Tire-Website/1.0 (sorimobiletire@gmail.com)",
        },
        next: { revalidate: 0 },
      },
    );
    if (!res.ok) return NextResponse.json({ ok: false }, { status: 502 });
    const data = (await res.json()) as {
      address?: { city?: string; town?: string; village?: string; county?: string; state?: string };
    };
    const a = data.address ?? {};
    const label = [a.city || a.town || a.village, a.county, a.state].filter(Boolean).join(", ");
    return NextResponse.json({ ok: true, label: label || null });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
