const ReceiptGenerator = require('../src/services/ReceiptGenerator');
const Item = require('../src/models/Item');

describe('ReceiptGenerator', () => {
  let generator;
  
  beforeEach(() => {
    generator = new ReceiptGenerator();
  });
  
  test('should generate receipt for multiple items', () => {
    const book = new Item(1, 'book', 12.49, false, true);
    book.setSalesTax(0);
    
    const cd = new Item(1, 'music CD', 14.99, false, false);
    cd.setSalesTax(1.50);
    
    const chocolate = new Item(1, 'chocolate bar', 0.85, false, true);
    chocolate.setSalesTax(0);
    
    const items = [book, cd, chocolate];
    const receipt = generator.generateReceipt(items);
    
    const expected = 
      '1 book: 12.49\n' +
      '1 music CD: 16.49\n' +
      '1 chocolate bar: 0.85\n' +
      'Sales Taxes: 1.50\n' +
      'Total: 29.83';
    
    expect(receipt).toBe(expected);
  });
  
  test('should generate receipt for imported items', () => {
    const chocolates = new Item(1, 'imported box of chocolates', 10.00, true, true);
    chocolates.setSalesTax(0.50);
    
    const perfume = new Item(1, 'imported bottle of perfume', 47.50, true, false);
    perfume.setSalesTax(7.15);
    
    const items = [chocolates, perfume];
    const receipt = generator.generateReceipt(items);
    
    const expected = 
      '1 imported box of chocolates: 10.50\n' +
      '1 imported bottle of perfume: 54.65\n' +
      'Sales Taxes: 7.65\n' +
      'Total: 65.15';
    
    expect(receipt).toBe(expected);
  });
  
  test('should generate receipt with correct formatting', () => {
    const item = new Item(1, 'book', 12.49, false, true);
    item.setSalesTax(0);
    
    const receipt = generator.generateReceipt([item]);
    
    const expected = 
      '1 book: 12.49\n' +
      'Sales Taxes: 0.00\n' +
      'Total: 12.49';
    
    expect(receipt).toBe(expected);
  });
});