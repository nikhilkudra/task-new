/**
 * Handles tax calculation based on item properties
 */
class TaxCalculator {
  constructor() {
    this.BASIC_SALES_TAX_RATE = 0.1; // 10%
    this.IMPORT_DUTY_RATE = 0.05; // 5%
  }

  /**
   * Calculate sales tax for a given item
   * @param {Item} item - The item to calculate tax for
   * @returns {number} The calculated sales tax
   */
  calculateTax(item) {
    let taxRate = 0;

    // Apply basic sales tax if not exempt
    if (!item.isExempt) {
      taxRate += this.BASIC_SALES_TAX_RATE;
    }

    // Apply import duty if imported
    if (item.isImported) {
      taxRate += this.IMPORT_DUTY_RATE;
    }

    // Calculate tax amount with rounding
    const baseAmount = item.getTotalBasePrice();
    const taxAmount = this.roundToNearest0_05(baseAmount * taxRate);

    return taxAmount;
  }

  /**
   * Round up to the nearest 0.05
   * @param {number} value - The value to round
   * @returns {number} The rounded value
   */
  roundToNearest0_05(value) {
    return Math.ceil(value * 20) / 20;
  }
}

module.exports = TaxCalculator;
