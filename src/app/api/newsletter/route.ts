import { getPool } from "@/lib/db";
import { handleFormPost } from "@/lib/form-handler";
import { notifyBusiness, sendCustomerConfirmation } from "@/lib/mail";
import { newsletterSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleFormPost(request, newsletterSchema, {
    name: "newsletter",
    limit: 3,
    persist: async (d) => {
      await getPool().execute(
        `INSERT INTO newsletter_subscribers (email) VALUES (?) ON DUPLICATE KEY UPDATE is_active = 1`,
        [d.email.toLowerCase()],
      );
    },
    notify: async (d) => {
      const [admin, customer] = await Promise.allSettled([
        notifyBusiness("New newsletter subscriber", [["Email", d.email]]),
        sendCustomerConfirmation({ to: d.email, kind: "newsletter" }),
      ]);
      return (
        (admin.status === "fulfilled" && admin.value) ||
        (customer.status === "fulfilled" && customer.value)
      );
    },
  });
}
