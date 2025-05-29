const SalesTaxApp = require('../src/index');

describe('SalesTaxApp', () => {
  let app;
  
  beforeEach(() => {
    app = new SalesTaxApp();
  });
  
  test('should process input 1 correctly', () => {
    const input = `1 book at 12.49
1 music CD at 14.99
1 chocolate bar at 0.85`;
    
    const receipt = app.processInput(input);
    
    const expected = 
      '1 book: 12.49\n' +
      '1 music CD: 16.49\n' +
      '1 chocolate bar: 0.85\n' +
      'Sales Taxes: 1.50\n' +
      'Total: 29.83';
    
    expect(receipt).toBe(expected);
  });
  
  test('should process input 2 correctly', () => {
    const input = `1 imported box of chocolates at 10.00
1 imported bottle of perfume at 47.50`;
    
    const receipt = app.processInput(input);
    
    const expected = 
      '1 imported box of chocolates: 10.50\n' +
      '1 imported bottle of perfume: 54.65\n' +
      'Sales Taxes: 7.65\n' +
      'Total: 65.15';
    
    expect(receipt).toBe(expected);
  });
  
  test('should process input 3 correctly', () => {
    const input = `1 imported bottle of perfume at 27.99
1 bottle of perfume at 18.99
1 packet of headache pills at 9.75
1 box of imported chocolates at 11.25`;
    
    const receipt = app.processInput(input);
    
    const expected = 
      '1 imported bottle of perfume: 32.19\n' +
      '1 bottle of perfume: 20.89\n' +
      '1 packet of headache pills: 9.75\n' +
      '1 box of imported chocolates: 11.85\n' +
      'Sales Taxes: 6.70\n' +
      'Total: 74.68';
    
    expect(receipt).toBe(expected);
  });
  
  test('should handle invalid input', () => {
    const input = 'invalid input';
    
    const receipt = app.processInput(input);
    
    expect(receipt).toContain('Error processing input');
  });
});