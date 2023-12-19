import { Context } from "hono";

export async function login(c:Context) {
  const { username, password } = await c.req.json();
}