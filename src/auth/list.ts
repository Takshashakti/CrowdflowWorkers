import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { users } from "../../db/schema";

export async function getall(c: Context) {
  const db = drizzle(c.env.DB);
  const result = await db.select().from(users);
  console.log("DB fetched");
  return c.json(result);
}