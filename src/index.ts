import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { users } from "../db/schema";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/user/register", async (c) => {
  const db = drizzle(c.env.DB);
  await db.insert(users).values({ name: "Karma" });
  return c.text("Hello Hono!");
})

export default app;
