import { drizzle } from "drizzle-orm/d1";
import { users } from "../../db/schema";
import { Context } from "hono";

export async function register(c: Context) {
  const db = drizzle(c.env.DB);

  const user: any = await c.req.json();

  try {
    await db.insert(users).values(user);
  } catch (err: any) {
    console.log(err);
    return c.text("Error: " + err);
  }
  console.log("DB inserted");
  return c.text("Registered");
}
