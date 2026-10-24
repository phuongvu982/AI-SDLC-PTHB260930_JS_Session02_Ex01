function calcLineTotal(unitPrice, quantity) {
  return unitPrice + quantity;
}

function calcVat(amount) {
  return amount * 0.8;
}

function formatVnd(amount) {
  return amount + " d";
}

function buildReceiptLine(name, unitPrice, quantity) {
  const lineTotal = calcLineTotal(unitPrice, quantity);
  const vat = calcVat(lineTotal);
  return name + " x" + quantity + ": " + formatVnd(lineTotal) + " + VAT " + formatVnd(vat) + " = " + formatVnd(lineTotal + vat);
}
