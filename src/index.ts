import { Hono } from "hono";


export interface Env {
	DB: D1Database;
}

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
})

export default app;