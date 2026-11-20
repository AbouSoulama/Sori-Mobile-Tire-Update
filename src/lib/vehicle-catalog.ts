import "server-only";
import type { RowDataPacket } from "mysql2";
import { getPool, isDbConfigured } from "./db";
import { vehicleCatalog, type VehicleCatalog } from "./vehicles";

/** Reads makes/models from MySQL so they can be managed there; falls back to the bundled list. */
export async function getVehicleCatalog(): Promise<VehicleCatalog> {
  if (!isDbConfigured()) return vehicleCatalog;
  try {
    const [rows] = await getPool().query<RowDataPacket[]>(
      `SELECT mk.name AS make, md.name AS model
         FROM vehicle_makes mk
         LEFT JOIN vehicle_models md ON md.make_id = mk.id AND md.is_active = 1
        WHERE mk.is_active = 1
        ORDER BY mk.sort_order, mk.name, md.sort_order, md.name`,
    );
    if (rows.length === 0) return vehicleCatalog;
    const catalog: VehicleCatalog = {};
    for (const row of rows) {
      catalog[row.make] ??= [];
      if (row.model) catalog[row.make].push(row.model);
    }
    return catalog;
  } catch (error) {
    console.error("[vehicles] falling back to bundled catalog", error);
    return vehicleCatalog;
  }
}
