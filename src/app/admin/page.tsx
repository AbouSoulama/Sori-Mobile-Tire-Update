import type { Metadata } from "next";
import { AdminApp } from "@/components/admin/AdminApp";
import { getAdminEmail, isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const configured = isAdminConfigured();
  const authed = configured ? await isAdminAuthenticated() : false;
  return <AdminApp configured={configured} initialAuthed={authed} adminEmail={getAdminEmail()} />;
}
