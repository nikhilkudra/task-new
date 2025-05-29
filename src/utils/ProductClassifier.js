/**
 * Classifies products as exempt or non-exempt from basic sales tax
 */
class ProductClassifier {
  constructor() {
    // Keywords that indicate exempt categories (books, food, medical)
    this.exemptKeywords = [
      // Books
      'book',
      // Food
      'chocolate', 'chocolates',
      // Medical
      'pills', 'medicine', 'headache'
    ];
  }

  /**
   * Check if a product is exempt from basic sales tax
   * @param {string} productName - The name of the product
   * @returns {boolean} True if the product is exempt, false otherwise
   */
  isExempt(productName) {
    const lowerName = productName.toLowerCase();
    
    return this.exemptKeywords.some(keyword => 
      lowerName.includes(keyword)
    );
  }
}

module.exports = ProductClassifier;