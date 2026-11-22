import { getPool } from "@/lib/db";
import { handleFormPost } from "@/lib/form-handler";
import { deliverFormEmails, type MailRow } from "@/lib/mail";
import { notifyCustomerChannels } from "@/lib/notify";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleFormPost(request, contactSchema, {
    name: "contact",
    persist: async (d, ip) => {
      await getPool().execute(
        `INSERT INTO contact_messages (name, email, phone, subject, message, ip_address) VALUES (?, ?, ?, ?, ?, ?)`,
        [d.name, d.email, d.phone, d.subject, d.message, ip],
      );
    },
    notify: async (d) => {
      const rows: MailRow[] = [
        ["Name", d.name],
        ["Email", d.email],
        ["Phone", d.phone],
        ["Subject", d.subject],
        ["Message", d.message],
      ];
      const adminOk = await deliverFormEmails({
        form: "contact",
        adminSubject: `New message from ${d.name}${d.subject ? `: ${d.subject}` : ""}`,
        adminRows: rows,
        replyTo: d.email,
        customer: {
          to: d.email,
          kind: "contact",
          name: d.name,
          summary: rows.filter(([label]) => !["Email", "Name"].includes(label)),
        },
      });
      await notifyCustomerChannels({ kind: "contact message", emailName: d.name, phone: d.phone });
      return adminOk;
    },
  });
}
