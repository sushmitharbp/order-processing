import React, { useState } from 'react';
import './App.css';

// Product class definition
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// Shopping cart class definition
class ShoppingCart {
  constructor(items = []) {
    this.items = items;
  }

  addItem(product) {
    this.items.push(product);
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
}


const OrderProcessingApp = () => {
  const [cart, setCart] = useState(new ShoppingCart());
  const [selectedProductId, setSelectedProductId] = useState('');

  
  const products = [
    new Product(1, 'Product A', 10),
    new Product(2, 'Product B', 15),
    new Product(3, 'Product c', 20),
    new Product(4, 'Product D', 25),
    new Product(5, 'Product E', 30),
    new Product(6, 'Product F', 35),
    new Product(7, 'Product G', 40),
    new Product(8, 'Product H', 38),
    new Product(9, 'Product I', 24),
    new Product(10, 'Product J', 5)
  ];

  const handleAddItem = () => {
    const product = products.find(p => p.id === parseInt(selectedProductId));
    if (product) {
      const newCart = new ShoppingCart([...cart.items]);
      newCart.addItem(product);
      setCart(newCart);
      setSelectedProductId('');
    }
  };

  const handleRemoveItem = (productId) => {
    const newCart = new ShoppingCart([...cart.items]);
    newCart.removeItem(productId);
    setCart(newCart);
  };

  return (
    <div className="app">
      <h2>Order Processing App</h2>
      <div className="product-selection">
        <label>
          Select Product:
          <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} - ${product.price}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleAddItem} className="add-button">Add Product</button>
      </div>
      <div className="shopping-cart">
        <h3>Shopping Cart:</h3>
        {cart.items.length > 0 ? (
          cart.items.map(item => (
            <div key={item.id} className="cart-item">
              <p>{item.name} - ${item.price}</p>
              <button onClick={() => handleRemoveItem(item.id)} className="remove-button">Remove</button>
            </div>
          ))
        ) : (
          <p>The cart is empty.</p>
        )}
        <p>Total: ${cart.getTotal()}</p>
      </div>
    </div>
  );
};

export default OrderProcessingApp;
