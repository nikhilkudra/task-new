/**
 * Generates formatted receipts for shopping baskets
 */
class ReceiptGenerator {
  /**
   * Generate a formatted receipt for a list of items
   * @param {Item[]} items - The list of items to include in the receipt
   * @returns {string} The formatted receipt
   */
  generateReceipt(items) {
    let receipt = "";
    let totalSalesTax = 0;
    let totalAmount = 0;

    // Add each item to the receipt
    items.forEach((item) => {
      receipt += item.toReceiptString() + "\n";
      totalSalesTax += item.salesTax;
      totalAmount += item.getTotalPriceWithTax();
    });

    // Add sales tax and total
    receipt += `Sales Taxes: ${totalSalesTax.toFixed(2)}\n`;
    receipt += `Total: ${totalAmount.toFixed(2)}`;

    return receipt;
  }
}

module.exports = ReceiptGenerator;
