import { db } from "../utils/db";
import { submissions } from "../drizzle/schema";

export default defineEventHandler(async () => {
  try {
    return await db.select().from(submissions).all();
  } catch (err) {
    console.error(err);
    throw createError({ statusCode: 500, message: "Błąd pobierania danych" });
  }
});