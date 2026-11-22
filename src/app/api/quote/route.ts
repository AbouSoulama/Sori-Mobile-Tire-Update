import { getPool } from "@/lib/db";
import { handleFormPost } from "@/lib/form-handler";
import { deliverFormEmails, type MailRow } from "@/lib/mail";
import { notifyCustomerChannels } from "@/lib/notify";
import { quoteSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleFormPost(request, quoteSchema, {
    name: "quote",
    persist: async (d, ip) => {
      await getPool().execute(
        `INSERT INTO quote_requests
          (services, vehicle_year, vehicle_make, vehicle_model, tire_width, tire_profile, rim_size,
           first_name, last_name, email, phone, address, city, state, postal_code, message,
           contact_preference, ip_address)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          JSON.stringify(d.services),
          d.vehicleYear,
          d.vehicleMake,
          d.vehicleModel,
          d.tireWidth,
          d.tireProfile,
          d.rimSize,
          d.firstName,
          d.lastName,
          d.email,
          d.phone,
          d.address,
          d.city,
          d.state,
          d.postalCode,
          d.message,
          d.contactPreference,
          ip,
        ],
      );
    },
    notify: async (d) => {
      const rows: MailRow[] = [
        ["Services", d.services],
        ["Vehicle", [d.vehicleYear, d.vehicleMake, d.vehicleModel].filter(Boolean).join(" ")],
        ["Tire size", d.tireWidth ? `${d.tireWidth}/${d.tireProfile ?? "?"} R${d.rimSize ?? "?"}` : null],
        ["Name", `${d.firstName} ${d.lastName}`],
        ["Email", d.email],
        ["Phone", d.phone],
        ["Address", `${d.address}, ${d.city}, ${d.state} ${d.postalCode}`],
        ["Preferred contact", d.contactPreference],
        ["Message", d.message],
      ];
      const adminOk = await deliverFormEmails({
        form: "quote",
        adminSubject: `New quote request from ${d.firstName} ${d.lastName}`,
        adminRows: rows,
        replyTo: d.email,
        customer: {
          to: d.email,
          kind: "quote",
          name: d.firstName,
          summary: rows.filter(([label]) => !["Email", "Name"].includes(label)),
        },
      });
      await notifyCustomerChannels({ kind: "quote request", emailName: d.firstName, phone: d.phone });
      return adminOk;
    },
  });
}
