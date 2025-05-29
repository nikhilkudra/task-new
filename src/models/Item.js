/**
 * Represents a shopping item with quantity, name, price and tax information
 */
class Item {
    /**
     * Create a new item
     * @param {number} quantity - The quantity of the item
     * @param {string} name - The name of the item
     * @param {number} price - The base price of the item (without tax)
     * @param {boolean} isImported - Whether the item is imported
     * @param {boolean} isExempt - Whether the item is exempt from basic sales tax
     */
    constructor(quantity, name, price, isImported = false, isExempt = false) {
      this.quantity = quantity;
      this.name = name;
      this.price = price;
      this.isImported = isImported;
      this.isExempt = isExempt;
      this.salesTax = 0;
    }
  
    /**
     * Get the total base price (quantity * price)
     * @returns {number} The total base price
     */
    getTotalBasePrice() {
      return this.quantity * this.price;
    }
  
    /**
     * Get the total price including tax
     * @returns {number} The total price with tax
     */
    getTotalPriceWithTax() {
      return Number((this.getTotalBasePrice() + this.salesTax).toFixed(2));
    }
  
    /**
     * Set the calculated sales tax for this item
     * @param {number} tax - The calculated sales tax
     */
    setSalesTax(tax) {
      this.salesTax = tax;
    }
  
    /**
     * Get a formatted representation of the item for the receipt
     * @returns {string} Formatted item string
     */
    toReceiptString() {
      return `${this.quantity} ${this.name}: ${this.getTotalPriceWithTax().toFixed(2)}`;
    }
  }
  
  module.exports = Item;