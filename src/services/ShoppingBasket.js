const TaxCalculator = require("./TaxCalculator");

/**
 * Represents a shopping basket containing items
 */
class ShoppingBasket {
  /**
   * Create a new shopping basket
   */
  constructor() {
    this.items = [];
    this.taxCalculator = new TaxCalculator();
  }

  /**
   * Add an item to the basket
   * @param {Item} item - The item to add
   */
  addItem(item) {
    // Calculate tax for the item
    const tax = this.taxCalculator.calculateTax(item);
    item.setSalesTax(tax);

    this.items.push(item);
  }

  /**
   * Add multiple items to the basket
   * @param {Item[]} items - The items to add
   */
  addItems(items) {
    items.forEach((item) => this.addItem(item));
  }

  /**
   * Get all items in the basket
   * @returns {Item[]} Array of items
   */
  getItems() {
    return this.items;
  }

  /**
   * Clear all items from the basket
   */
  clear() {
    this.items = [];
  }
}

module.exports = ShoppingBasket;
