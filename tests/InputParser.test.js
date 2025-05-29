const InputParser = require('../src/utils/InputParser');

describe('InputParser', () => {
  let parser;
  
  beforeEach(() => {
    parser = new InputParser();
  });
  
  test('should parse a valid single line input', () => {
    const line = '1 book at 12.49';
    const item = parser.parseLine(line);
    
    expect(item).not.toBeNull();
    expect(item.quantity).toBe(1);
    expect(item.name).toBe('book');
    expect(item.price).toBe(12.49);
    expect(item.isImported).toBe(false);
    expect(item.isExempt).toBe(true); // books are exempt
  });
  
  test('should parse a valid imported item', () => {
    const line = '1 imported box of chocolates at 10.00';
    const item = parser.parseLine(line);
    
    expect(item).not.toBeNull();
    expect(item.quantity).toBe(1);
    expect(item.name).toBe('imported box of chocolates');
    expect(item.price).toBe(10.00);
    expect(item.isImported).toBe(true);
    expect(item.isExempt).toBe(true); // chocolates are exempt
  });
  
  test('should parse multiple lines of input', () => {
    const input = `1 book at 12.49
1 music CD at 14.99
1 chocolate bar at 0.85`;
    
    const items = parser.parseInput(input);
    
    expect(items.length).toBe(3);
    expect(items[0].name).toBe('book');
    expect(items[1].name).toBe('music CD');
    expect(items[2].name).toBe('chocolate bar');
  });
  
  test('should handle empty lines', () => {
    const input = `1 book at 12.49

1 chocolate bar at 0.85`;
    
    const items = parser.parseInput(input);
    
    expect(items.length).toBe(2);
  });
  
  test('should throw error for invalid line format', () => {
    const line = 'invalid format';
    expect(() => parser.parseLine(line)).toThrow('Invalid input format: invalid format');
  });
  
  test('should throw error for empty input', () => {
    expect(() => {
      parser.parseInput('');
    }).toThrow();
  });
});