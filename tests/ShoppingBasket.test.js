const ShoppingBasket = require('../src/services/ShoppingBasket');
const Item = require('../src/models/Item');

describe('ShoppingBasket', () => {
  let basket;
  
  beforeEach(() => {
    basket = new ShoppingBasket();
  });
  
  test('should add an item and calculate its tax', () => {
    const item = new Item(1, 'music CD', 14.99, false, false);
    basket.addItem(item);
    
    expect(basket.getItems().length).toBe(1);
    expect(item.salesTax).toBe(1.50); // 10% of 14.99, rounded
  });
  
  test('should add multiple items', () => {
    const items = [
      new Item(1, 'book', 12.49, false, true),
      new Item(1, 'music CD', 14.99, false, false),
      new Item(1, 'chocolate bar', 0.85, false, true)
    ];
    
    basket.addItems(items);
    
    expect(basket.getItems().length).toBe(3);
    expect(items[0].salesTax).toBe(0); // exempt
    expect(items[1].salesTax).toBe(1.50); // 10% of 14.99, rounded
    expect(items[2].salesTax).toBe(0); // exempt
  });
  
  test('should clear all items', () => {
    basket.addItem(new Item(1, 'book', 12.49, false, true));
    basket.clear();
    
    expect(basket.getItems().length).toBe(0);
  });
});