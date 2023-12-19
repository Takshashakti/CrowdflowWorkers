import { text, integer, sqliteTable, real } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("Users", {
  id: integer("id").primaryKey().unique(),
  name: text("name"),
  token: text("token"),
  phnNo: text("phnNo"),
  gender: text("gender"),
  age: integer("age"),
  location: text("location")
})

export const reports = sqliteTable("Reports", {
  id: integer("id").primaryKey().unique(),
  user_id: integer("user_id").references(() => users.id),
  description: text("description"),
  image_url: text("image_url"),
  type: text("type"),
  location: text("location"),
  address: text("address"),
  time: integer("time"),
  disaster_id: integer("disaster_id").references(() => disasters.id)
})

export const disasters = sqliteTable("Disasters", {
  id: integer("id").primaryKey().unique(),
  avg_loc: text("avg_loc"),
  radius: real("radius"),
  address: text("address"),
  status: text("status")
})