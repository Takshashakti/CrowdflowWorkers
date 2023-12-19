import { Hono } from "hono";
import { register } from "./auth/register";
import { getall } from "./auth/list";
import { addReport, getallReports } from "./report";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => c.text("Crowdflow API alive!!"));

/* Auth endpoints */
app.post("/user/register", register);
// app.post("/user/login", login);
app.get("/user/getall", getall);

/* Report endpoints */
app.post("/report/register", addReport);
app.get("/report/getall", getallReports);

export default app;
