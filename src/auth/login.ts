import { DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function login(c:Context) {
  const { phnNo } = await c.req.json();
  const db = drizzle(c.env.DB);
  const token = "token_" + Math.round(Math.random() * 10000000);
  const user = await db.update(users).set({ token }).where(eq(users.phnNo, phnNo)).returning();
  return c.json(user);
}

export async function verify(c:Context, db: DrizzleD1Database) {
  const token = c.req.header("Authorization");
  if(token) {
    const user = await db.select().from(users).where(eq(users.token, token));
    return (user[0].token === token)? user[0]: c.json({error: "Not Authorised"}, 401);
  }
  return c.json({error: "Not Authorised"}, 401);
}

export async function assignRole(c:Context) {
  const { id, role } = await c.req.json();
  const db = drizzle(c.env.DB);
  await db.update(users).set({authority: role}).where(eq(users.id, id));
  return c.json({message: "Role assigned"});
}
