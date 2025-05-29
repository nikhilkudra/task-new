const ProductClassifier = require('../src/utils/ProductClassifier');

describe('ProductClassifier', () => {
  let classifier;
  
  beforeEach(() => {
    classifier = new ProductClassifier();
  });
  
  test('should classify books as exempt', () => {
    expect(classifier.isExempt('book')).toBe(true);
    expect(classifier.isExempt('imported book')).toBe(true);
    expect(classifier.isExempt('paperback book')).toBe(true);
  });
  
  test('should classify food items as exempt', () => {
    expect(classifier.isExempt('chocolate bar')).toBe(true);
    expect(classifier.isExempt('box of chocolates')).toBe(true);
    expect(classifier.isExempt('imported box of chocolates')).toBe(true);
  });
  
  test('should classify medical items as exempt', () => {
    expect(classifier.isExempt('packet of headache pills')).toBe(true);
    expect(classifier.isExempt('medicine')).toBe(true);
  });
  
  test('should classify other items as non-exempt', () => {
    expect(classifier.isExempt('music CD')).toBe(false);
    expect(classifier.isExempt('bottle of perfume')).toBe(false);
    expect(classifier.isExempt('imported bottle of perfume')).toBe(false);
  });
});