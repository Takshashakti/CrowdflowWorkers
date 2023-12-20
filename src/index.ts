import { Hono } from "hono";
import {cors} from "hono/cors";
import { register } from "./auth/register";
import { getall, getuser } from "./auth/list";
import { addReport, getReport, getReportByIncident, getallReports, upvoteReport } from "./report";
import { login } from "./auth/login";
import { assignIncident, getIncidentAssignedToUser, getIncidentById, getallIncidents, updateIncidentStatus } from "./incident";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();
app.use("*", cors());

app.get("/", (c) => c.text("Crowdflow API alive!!"));

/* Auth endpoints */
app.post("/user/register", register);
app.post("/user/login", login);
app.get("/user/get", getuser);
app.get("/user/getall", getall);
// app.post("/user/")

/* Report endpoints */
app.post("/report/register", addReport);
app.get("/report/getall", getallReports);
app.get("/report/get", getReport);
app.get("/report/getByIncident", getReportByIncident);
app.get("/report/upvote", upvoteReport);

/* Incident endpoints */
app.get("/incident/getall", getallIncidents);
app.get("/incident/getById", getIncidentById);
app.get("/incident/getByUser", getIncidentAssignedToUser);
app.post("/incident/assign", assignIncident)
app.post("/incident/update", updateIncidentStatus)


export default app;
