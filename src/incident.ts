import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { incidents } from "../db/schema";
import { and, eq } from "drizzle-orm";

export async function getallIncidents(c: Context) {
  const db = drizzle(c.env.DB);
  const result = await db.select().from(incidents);
  return c.json(result);
}

export async function getIncidentById(c: Context) {
  const db = drizzle(c.env.DB);
  const { id } = c.req.query();
  if (id !== "") {
    const result = await db
      .select()
      .from(incidents)
      .where(eq(incidents.id, parseInt(id)));
    return c.json(result);
  }
  return c.json({ message: "Please provide user_id" });
}

export async function getIncidentAssignedToUser(c: Context) {
  const db = drizzle(c.env.DB);
  const { userId } = c.req.query();
  if (userId !== "") {
    const result = await db
      .select()
      .from(incidents)
      .where(eq(incidents.assignedTo, parseInt(userId)));
    return c.json(result);
  }
  return c.json({ message: "Please provide user_id" });
}

export async function assignIncident(c: Context) {
  const db = drizzle(c.env.DB);
  const { id, userId } = await c.req.json();
  if (id !== "" && userId !== "") {
    const result = await db
      .update(incidents)
      .set({ assignedTo: parseInt(userId) })
      .where(eq(incidents.id, parseInt(id)))
      .returning();
    return c.json(result);
  } else {
    return c.json({ message: "Please provide id and user_id" });
  }
}

export async function updateIncidentStatus(c: Context) {
  const db = drizzle(c.env.DB);
  const { id, status } = await c.req.json();
  if (id !== "" && status !== "") {
    const result = await db
      .update(incidents)
      .set({ status: status })
      .where(eq(incidents.id, parseInt(id)))
      .returning();
    return c.json(result);
  }
}
