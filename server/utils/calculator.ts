/**
 * Funkcja obliczająca kwotę brutto i podatek VAT.
 * @param netAmount - kwota netto
 * @param vatRate - stawka VAT jako liczba lub string ("zw", "np", "oo")
 * @returns obiekt { grossAmount, taxAmount }
 */
export function calculateVAT(netAmount: number, vatRate: number | string) {
  let taxAmount = 0;
  let grossAmount = netAmount;

  if (typeof vatRate === 'number') {
    // VAT w %
    taxAmount = (netAmount * vatRate) / 100;
    grossAmount = netAmount + taxAmount;
  } else if (typeof vatRate === 'string') {
    // "zw", "np", "oo"
    taxAmount = 0;
    grossAmount = netAmount;
  }

  return { grossAmount, taxAmount };
}


