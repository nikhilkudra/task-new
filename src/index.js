const InputParser = require('./utils/InputParser');
const ShoppingBasket = require('./services/ShoppingBasket');
const ReceiptGenerator = require('./services/ReceiptGenerator');

/**
 * Main application class for the Sales Tax problem
 */
class SalesTaxApp {
  constructor() {
    this.inputParser = new InputParser();
    this.shoppingBasket = new ShoppingBasket();
    this.receiptGenerator = new ReceiptGenerator();
  }

  /**
   * Process input and generate a receipt
   * @param {string} input - The input string containing items
   * @returns {string} The generated receipt
   */
  processInput(input) {
    try {
      // Parse input
      const items = this.inputParser.parseInput(input);
      
      // Clear basket and add new items
      this.shoppingBasket.clear();
      this.shoppingBasket.addItems(items);
      
      // Generate receipt
      return this.receiptGenerator.generateReceipt(this.shoppingBasket.getItems());
    } catch (error) {
      return `Error processing input: ${error.message}`;
    }
  }
}

/**
 * Process the sample inputs from the problem statement
 */
function processSampleInputs() {
  const app = new SalesTaxApp();
  
  const input1 = `1 book at 12.49
1 music CD at 14.99
1 chocolate bar at 0.85`;

  const input2 = `1 imported box of chocolates at 10.00
1 imported bottle of perfume at 47.50`;

  const input3 = `1 imported bottle of perfume at 27.99
1 bottle of perfume at 18.99
1 packet of headache pills at 9.75
1 box of imported chocolates at 11.25`;

  console.log('Output 1:');
  console.log(app.processInput(input1));
  console.log('\nOutput 2:');
  console.log(app.processInput(input2));
  console.log('\nOutput 3:');
  console.log(app.processInput(input3));
}

// If this file is being run directly (not imported), process sample inputs
if (require.main === module) {
  processSampleInputs();
}

module.exports = SalesTaxApp;