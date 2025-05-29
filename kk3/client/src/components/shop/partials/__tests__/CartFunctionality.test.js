import { cartList, addToCart } from '../../../shop/productDetails/Mixins';
import { totalCost, quantity, subTotal } from '../Mixins';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Cart Functionality', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('cartList function', () => {
    test('should return null when cart is empty', () => {
      expect(cartList()).toBeNull();
    });

    test('should return array of product IDs when cart has items', () => {
      const mockCart = [
        { id: 'product1', quantitiy: 2, price: 10 },
        { id: 'product2', quantitiy: 1, price: 20 }
      ];
      localStorage.setItem('cart', JSON.stringify(mockCart));
      
      const result = cartList();
      expect(result).toEqual(['product1', 'product2']);
    });

    test('should handle invalid JSON gracefully', () => {
      localStorage.setItem('cart', 'invalid json');
      expect(cartList()).toBeNull();
    });
  });

  describe('totalCost function', () => {
    test('should return 0 when cart is empty', () => {
      expect(totalCost()).toBe(0);
    });

    test('should calculate total cost correctly', () => {
      const mockCart = [
        { id: 'product1', quantitiy: 2, price: 10 },
        { id: 'product2', quantitiy: 1, price: 20 }
      ];
      localStorage.setItem('cart', JSON.stringify(mockCart));
      
      expect(totalCost()).toBe(40); // (2 * 10) + (1 * 20) = 40
    });

    test('should handle invalid data gracefully', () => {
      localStorage.setItem('cart', 'invalid json');
      expect(totalCost()).toBe(0);
    });
  });

  describe('quantity function', () => {
    test('should return 0 when product not in cart', () => {
      expect(quantity('nonexistent')).toBe(0);
    });

    test('should return correct quantity for existing product', () => {
      const mockCart = [
        { id: 'product1', quantitiy: 3, price: 10 }
      ];
      localStorage.setItem('cart', JSON.stringify(mockCart));
      
      expect(quantity('product1')).toBe(3);
    });
  });

  describe('subTotal function', () => {
    test('should return 0 when product not in cart', () => {
      expect(subTotal('nonexistent', 10)).toBe(0);
    });

    test('should calculate subtotal correctly', () => {
      const mockCart = [
        { id: 'product1', quantitiy: 3, price: 10 }
      ];
      localStorage.setItem('cart', JSON.stringify(mockCart));
      
      expect(subTotal('product1', 10)).toBe(30); // 3 * 10 = 30
    });
  });

  describe('addToCart function', () => {
    test('should add new product to empty cart', () => {
      const mockDispatch = jest.fn();
      const mockSetQuantity = jest.fn();
      const mockSetAlert = jest.fn();
      const mockFetchData = jest.fn();
      const mockTotalCost = jest.fn(() => 25);

      addToCart(
        'product1',
        2,
        12.5,
        mockDispatch,
        mockSetQuantity,
        mockSetAlert,
        mockFetchData,
        mockTotalCost
      );

      const cart = JSON.parse(localStorage.getItem('cart'));
      expect(cart).toHaveLength(1);
      expect(cart[0]).toEqual({
        id: 'product1',
        quantitiy: 2,
        price: 12.5
      });
    });

    test('should not add duplicate product to cart', () => {
      const existingCart = [
        { id: 'product1', quantitiy: 1, price: 10 }
      ];
      localStorage.setItem('cart', JSON.stringify(existingCart));

      const mockDispatch = jest.fn();
      const mockSetQuantity = jest.fn();
      const mockSetAlert = jest.fn();
      const mockFetchData = jest.fn();
      const mockTotalCost = jest.fn(() => 10);

      addToCart(
        'product1',
        2,
        10,
        mockDispatch,
        mockSetQuantity,
        mockSetAlert,
        mockFetchData,
        mockTotalCost
      );

      const cart = JSON.parse(localStorage.getItem('cart'));
      expect(cart).toHaveLength(1); // Should still be 1 item
    });

    test('should call all callback functions', () => {
      const mockDispatch = jest.fn();
      const mockSetQuantity = jest.fn();
      const mockSetAlert = jest.fn();
      const mockFetchData = jest.fn();
      const mockTotalCost = jest.fn(() => 25);

      addToCart(
        'product1',
        2,
        12.5,
        mockDispatch,
        mockSetQuantity,
        mockSetAlert,
        mockFetchData,
        mockTotalCost
      );

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockSetQuantity).toHaveBeenCalledWith(1);
      expect(mockSetAlert).toHaveBeenCalledWith(false);
      expect(mockFetchData).toHaveBeenCalled();
    });
  });
});
