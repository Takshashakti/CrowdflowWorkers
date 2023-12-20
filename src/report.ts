import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { incidents, reports } from "../db/schema";
import { eq, and, between } from "drizzle-orm";
import { verify } from "./auth/login";

type Report = {
  title: string;
  description: string;
  image_url: string;
  type: string;
  latitude: number;
  longitude: number;
  city: string;
  district: string;
  state: string;
};

type User = {
  id: number;
  name: string;
  token: string;
  phnNo: string;
  gender: string;
  age: number;
  authority: number;
  organisation: string;
};

export async function addReport(c: Context) {
  try {
    const report: Report = await c.req.json();
    const addr = JSON.parse(report.image_url);
    // report.city = addr.city;
    report.state = addr.address.state;
    report.district = addr.address.state_district;
    const db = drizzle(c.env.DB);
    const user = await verify(c, db);

    const diff = 0.00001;

    const nearby = await db
      .select()
      .from(reports)
      .where(
        and(
          eq(reports.type, report.type),
          eq(reports.city, report.city),
          eq(reports.district, report.district),
          eq(reports.state, report.state),
          between(
            reports.latitude,
            report.latitude - diff,
            report.latitude + diff
          ),
          between(
            reports.longitude,
            report.longitude - diff,
            report.longitude + diff
          )
        )
      );
    if (nearby.length !== 0) {
      const inc_id = nearby[0].incidents_id;
      await db.insert(reports).values({
        user_id: (user as User).id,
        ...report,
        time: Date.now(),
        incidents_id: inc_id,
      });
    } else {
      const incident = await db
        .insert(incidents)
        .values({
          city: report.city,
          state: report.state,
          district: report.district,
          status: "pending",
        })
        .returning();

      await db.insert(reports).values({
        user_id: (user as User).id,
        ...report,
        time: Date.now(),
        incidents_id: incident[0].id,
      });
    }
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

export async function upvoteReport(c: Context) {
  const db = drizzle(c.env.DB);
  const { id } = await c.req.query();
  if (id !== "") {
    const result = await db
      .select()
      .from(reports)
      .where(eq(reports.id, parseInt(id)));

    const user = await verify(c, db);
    const {
      city,
      state,
      district,
      description,
      title,
      image_url,
      latitude,
      longitude,
      type,
      incidents_id,
    } = result[0];
    await db.insert(reports).values({
      user_id: (user as User).id,
      title,
      description,
      image_url,
      type,
      latitude,
      longitude,
      city,
      state,
      district,
      time: Date.now(),
      incidents_id: incidents_id,
    });
    return c.json({ msg: "Done" });
  }
  return c.json({});
}

export async function getReport(c: Context) {
  const { id, type, city, district, state, incidents_id } = c.req.query();
  const db = drizzle(c.env.DB);
  if (id !== "") {
    const result = await db
      .select()
      .from(reports)
      .where(eq(reports.id, parseInt(id)));
    return c.json(result);
  }
  if (type !== "") {
    const result = await db
      .select()
      .from(reports)
      .where(eq(reports.type, type));
    return c.json(result);
  }
  if (city !== "") {
    const result = await db
      .select()
      .from(reports)
      .where(eq(reports.city, city));
    return c.json(result);
  }
  if (district !== "") {
    const result = await db
      .select()
      .from(reports)
      .where(eq(reports.district, district));
    return c.json(result);
  }
  if (state !== "") {
    const result = await db
      .select()
      .from(reports)
      .where(eq(reports.state, state));
    return c.json(result);
  }
  return c.json({});
}

export async function getReportByIncident(c: Context) {
  const { id } = c.req.query();
  const db = drizzle(c.env.DB);
  if (id !== "") {
    const result = await db
      .select()
      .from(reports)
      .where(eq(reports.incidents_id, parseInt(id)));
    return c.json(result);
  } else {
    return c.json({ err: "Invalid" });
  }
}