const TaxCalculator = require('../src/services/TaxCalculator');
const Item = require('../src/models/Item');

describe('TaxCalculator', () => {
  let calculator;
  
  beforeEach(() => {
    calculator = new TaxCalculator();
  });
  
  test('should calculate no tax for exempt non-imported items', () => {
    const book = new Item(1, 'book', 12.49, false, true);
    const tax = calculator.calculateTax(book);
    expect(tax).toBe(0);
  });
  
  test('should calculate basic sales tax for non-exempt non-imported items', () => {
    const cd = new Item(1, 'music CD', 14.99, false, false);
    const tax = calculator.calculateTax(cd);
    // 14.99 * 0.10 = 1.499 => rounded to 1.50
    expect(tax).toBe(1.50);
  });
  
  test('should calculate import duty for exempt imported items', () => {
    const chocolates = new Item(1, 'imported box of chocolates', 10.00, true, true);
    const tax = calculator.calculateTax(chocolates);
    // 10.00 * 0.05 = 0.50
    expect(tax).toBe(0.50);
  });
  
  test('should calculate both taxes for non-exempt imported items', () => {
    const perfume = new Item(1, 'imported bottle of perfume', 47.50, true, false);
    const tax = calculator.calculateTax(perfume);
    // 47.50 * 0.15 = 7.125 => rounded to 7.15
    expect(tax).toBe(7.15);
  });
  
  test('should round up to the nearest 0.05', () => {
    expect(calculator.roundToNearest0_05(0.12)).toBe(0.15);
    expect(calculator.roundToNearest0_05(0.10)).toBe(0.10);
    expect(calculator.roundToNearest0_05(0.01)).toBe(0.05);
    expect(calculator.roundToNearest0_05(0.06)).toBe(0.10);
  });
});