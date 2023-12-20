import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function getall(c: Context) {
  const db = drizzle(c.env.DB);
  const result = await db.select().from(users);
  console.log("DB fetched");
  return c.json(result);
}

export async function getuser(c: Context) {
  const db = drizzle(c.env.DB);
  const {id, phnNo} = c.req.query();
  if(id) {
    const result = await db.select().from(users).where(eq(users.id, parseInt(id)));
    return c.json(result);
  } else if(phnNo) {
    const result = await db.select().from(users).where(eq(users.phnNo, phnNo));
    return c.json(result);
  }
}