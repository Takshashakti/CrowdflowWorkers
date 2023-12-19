import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { reports } from "../db/schema";

type Report = {
  user_id: number;
  description: string;
  image_url: string;
  type: string;
  location: string;
  address: string;
  time: number;
  disaster_id: number;
};

export async function addReport(c: Context) {
  try {
    const report: Report = await c.req.json();
    const db = drizzle(c.env.DB);
    await db.insert(reports).values(report);
  } catch (err) {
    return c.json({ error: "Invalid JSON" }, 400);
  }
  return c.text("Report added");
}

export async function getallReports(c: Context) {
  const db = drizzle(c.env.DB);
  const result = await db.select().from(reports);
  return c.json(result);
}