const Item = require('../models/Item');
const ProductClassifier = require('./ProductClassifier');

/**
 * Parses input strings into item objects
 */
class InputParser {
  constructor() {
    this.classifier = new ProductClassifier();
  }

  /**
   * Parse a multi-line input string into an array of items
   * @param {string} input - The input string to parse
   * @returns {Item[]} Array of parsed items
   * @throws {Error} If input is invalid
   */
  parseInput(input) {
    if (!input || typeof input !== 'string') {
      throw new Error('Input must be a non-empty string');
    }
    
    const lines = input.trim().split('\n');
    const items = [];
    
    for (const line of lines) {
      if (line.trim() === '') continue;
      
      const item = this.parseLine(line);
      items.push(item);
    }
    
    return items;
  }

  /**
   * Parse a single line of input
   * @param {string} line - The line to parse
   * @returns {Item} The parsed item
   * @throws {Error} If line format is invalid
   */
  parseLine(line) {
    // Expected format: "1 book at 12.49"
    const regex = /^(\d+)\s+(.+?)\s+at\s+(\d+\.\d+)$/;
    const match = line.trim().match(regex);
    
    if (!match) {
      throw new Error(`Invalid input format: ${line}`);
    }
    
    const quantity = parseInt(match[1], 10);
    const name = match[2].trim();
    const price = parseFloat(match[3]);
    
    const isImported = name.toLowerCase().includes('imported');
    const isExempt = this.classifier.isExempt(name);
    
    return new Item(quantity, name, price, isImported, isExempt);
  }
}

module.exports = InputParser;