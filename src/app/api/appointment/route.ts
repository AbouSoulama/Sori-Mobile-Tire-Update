import type { RowDataPacket } from "mysql2";
import { getPool, isDbConfigured } from "@/lib/db";
import { handleFormPost } from "@/lib/form-handler";
import { deliverFormEmails, type MailRow } from "@/lib/mail";
import { notifyCustomerChannels } from "@/lib/notify";
import { appointmentSchema } from "@/lib/validation";

export async function POST(request: Request) {
  return handleFormPost(request, appointmentSchema, {
    name: "appointment",
    persist: async (d, ip) => {
      if (isDbConfigured()) {
        const [taken] = await getPool().query<RowDataPacket[]>(
          `SELECT id FROM appointments
           WHERE appointment_date = ? AND appointment_time = ? AND status IN ('requested', 'confirmed')
           LIMIT 1`,
          [d.appointmentDate, d.appointmentTime],
        );
        if (taken.length) {
          throw new Error("TIME_TAKEN");
        }
      }
      await getPool().execute(
        `INSERT INTO appointments
          (service, message, vehicle_year, vehicle_make, vehicle_model, appointment_date, appointment_time,
           wait_preference, tire_width, tire_profile, rim_size, first_name, last_name, email, phone,
           address, city, state, postal_code, contact_preference, ip_address)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          d.service,
          d.message,
          d.vehicleYear,
          d.vehicleMake,
          d.vehicleModel,
          d.appointmentDate,
          d.appointmentTime,
          d.waitPreference,
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
          d.contactPreference,
          ip,
        ],
      );
    },
    notify: async (d) => {
      const rows: MailRow[] = [
        ["Service", d.service],
        ["Date", d.appointmentDate],
        ["Time", d.appointmentTime],
        ["Customer will", d.waitPreference],
        ["Vehicle", [d.vehicleYear, d.vehicleMake, d.vehicleModel].filter(Boolean).join(" ")],
        ["Tire size", d.tireWidth ? `${d.tireWidth}/${d.tireProfile ?? "?"} R${d.rimSize ?? "?"}` : null],
        ["Name", `${d.firstName} ${d.lastName}`],
        ["Email", d.email],
        ["Phone", d.phone],
        ["Address", `${d.address}, ${d.city}, ${d.state} ${d.postalCode}`],
        ["Preferred contact", d.contactPreference],
        ["Message to technicians", d.message],
      ];
      const adminOk = await deliverFormEmails({
        form: "appointment",
        adminSubject: `New appointment: ${d.service} on ${d.appointmentDate} at ${d.appointmentTime}`,
        adminRows: rows,
        replyTo: d.email,
        customer: {
          to: d.email,
          kind: "appointment",
          name: d.firstName,
          summary: rows.filter(([label]) => !["Email", "Name"].includes(label)),
        },
      });
      await notifyCustomerChannels({ kind: "appointment request", emailName: d.firstName, phone: d.phone });
      return adminOk;
    },
  });
}
