import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const submissions = sqliteTable("submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productName: text("productName").notNull(),
  netAmount: real("netAmount").notNull(),
  vatRate: text("vatRate").notNull(),
  taxAmount: real("taxAmount").notNull(),
  grossAmount: real("grossAmount").notNull(),
  ip: text("ip"),
  createdAt: text("createdAt").notNull(),
});
