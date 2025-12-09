export function usePriceCalculator() {
  function calculate(netAmount: number, vatRate: number) {
    if (netAmount < 0) throw new Error("Kwota netto nie może być ujemna");
    if (vatRate < 0) throw new Error("VAT nie może być ujemny");

    const taxAmount = +(netAmount * (vatRate / 100)).toFixed(2);
    const grossAmount = +(netAmount + taxAmount).toFixed(2);

    return { taxAmount, grossAmount };
  }

  return { calculate };
}