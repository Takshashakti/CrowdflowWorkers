import { text, integer, sqliteTable, real, int } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("Users", {
  id: integer("id").primaryKey().unique(),
  name: text("name"),
  token: text("token"),
  phnNo: text("phnNo").unique(),
  gender: text("gender"),
  age: integer("age"),
  authority: integer("authority"),
  organisation: text("organisation")
})

export const reports = sqliteTable("Reports", {
  id: integer("id").primaryKey().unique(),
  user_id: integer("user_id").references(() => users.id),
  description: text("description"),
  image_url: text("image_url"),
  type: text("type"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  city: text("city"),
  state: text("state"),
  district: text("district"),
  time: integer("time"),
  // incidents_id: integer("incidents_id").references(() => incidents.id)
})

// export const incidents = sqliteTable("Incidents", {
//   id: integer("id").primaryKey().unique(),
//   avg_lat: integer("avg_lat"),
//   avg_long: integer("avg_long"),
//   radius: real("radius"),
//   address: text("address"),
//   status: text("status")
// })