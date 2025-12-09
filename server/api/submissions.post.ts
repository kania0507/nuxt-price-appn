import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { submissions } from '~/server/drizzle/schema';
import { usePriceCalculator } from '~/composables/usePriceCalculator';

const db = drizzle(new Database('./server/data.db'));

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body.productName || body.netAmount === undefined || !body.vatRate) {
      return createError({ statusCode: 400, message: 'Nieprawidłowe dane' });
    }

    // Konwertuj VAT na liczbę lub ustaw 0 dla zwolnionych
    const vatPercent = ['zw', 'np', 'oo'].includes(body.vatRate) ? 0 : parseFloat(body.vatRate);
    const net = parseFloat(body.netAmount);

    // Obliczenia VAT
    const { calculate } = usePriceCalculator();
    const { taxAmount, grossAmount } = calculate(net, vatPercent);

    const ip = event.node.req.socket.remoteAddress || 'unknown';
    const now = new Date().toISOString();

    await db.insert(submissions).values({
      productName: body.productName,
      netAmount: net,
      vatRate: body.vatRate,
      taxAmount,
      grossAmount,
      ip,
      createdAt: now
    });

    return { success: true, taxAmount, grossAmount };
  } catch (err: any) {
    console.error('Błąd zapisu do bazy:', err);
    throw createError({ statusCode: 500, message: 'Błąd zapisu do bazy' });
  }
});
