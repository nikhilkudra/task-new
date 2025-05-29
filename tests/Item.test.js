const Item = require('../src/models/Item');

describe('Item', () => {
  test('should create an item with correct properties', () => {
    const item = new Item(1, 'book', 12.49, false, true);
    
    expect(item.quantity).toBe(1);
    expect(item.name).toBe('book');
    expect(item.price).toBe(12.49);
    expect(item.isImported).toBe(false);
    expect(item.isExempt).toBe(true);
    expect(item.salesTax).toBe(0);
  });
  
  test('should calculate total base price correctly', () => {
    const item = new Item(2, 'book', 12.49, false, true);
    
    expect(item.getTotalBasePrice()).toBe(24.98);
  });
  
  test('should calculate total price with tax correctly', () => {
    const item = new Item(1, 'music CD', 14.99, false, false);
    item.setSalesTax(1.50);
    
    expect(item.getTotalPriceWithTax()).toBe(16.49);
  });
  
  test('should format receipt string correctly', () => {
    const item = new Item(1, 'music CD', 14.99, false, false);
    item.setSalesTax(1.50);
    
    expect(item.toReceiptString()).toBe('1 music CD: 16.49');
  });
  
  test('should handle multiple quantities in receipt string', () => {
    const item = new Item(3, 'book', 12.49, false, true);
    
    expect(item.toReceiptString()).toBe('3 book: 37.47');
  });
});