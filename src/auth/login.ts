import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function login(c:Context) {
  const { phnNo } = await c.req.json();
  const db = drizzle(c.env.DB);
  const token = "token_" + Math.round(Math.random() * 10000000);
  await db.update(users).set({ token }).where(eq(users.phnNo, phnNo));
  const role = (await db.select().from(users).where(eq(users.phnNo, phnNo)))[0].authority;
  c.json({ token, role });
}