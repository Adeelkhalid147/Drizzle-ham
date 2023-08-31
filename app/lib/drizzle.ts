import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { InferModel } from "drizzle-orm";
import { sql } from "@vercel/postgres";


// pgTable mai jo todos h wo table ka name h or table mai id or task to column hai 
export const todoTable = pgTable("todos", {
  id:serial("id").primaryKey(),
  task:varchar("task",{length:255}).notNull()
 
});

// type bnane k liye inferModel use hta h or type mai pgtable ka data jis variable mai store hta h wo variable put krte hai 

export type Todo = InferModel<typeof todoTable>;
export type NewTodo = InferModel<typeof todoTable, "insert">;

// connection bane k liye ye db wali line ase he paste kr deni h
export const db = drizzle(sql);




/* 

// 2nd cart data base get method for checkdata base work or not
// export const todoTable = pgTable("cart", {
 // name: varchar("name"),
  // id: integer("id").primaryKey(),
// })
*/