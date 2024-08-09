import React, { useState } from 'react';

const styles = `
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

.BookStore {
  text-align: center;
  padding: 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.search-section,
.add-section,
.display-section,
.cart-section {
  background: #fff;
  padding: 20px;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
}

h2 {
  color: #666;
  margin-top: 0;
}

input[type="text"],
input[type="number"] {
  width: calc(100% - 22px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  background: #f9f9f9;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

li:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

p {
  color: #999;
  margin: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-total {
  font-size: 1.2em;
  font-weight: bold;
}
`;

function BookStore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [newBook, setNewBook] = useState({ title: '', author: '', price: '' });
  const [books, setBooks] = useState([
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 10 },
    { title: '1984', author: 'George Orwell', price: 15 },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 20 },
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger', price: 25 },
    { title: 'Moby Dick', author: 'Herman Melville', price: 30 },
    { title: 'Pride and Prejudice', author: 'Jane Austen', price: 35 },
    { title: 'War and Peace', author: 'Leo Tolstoy', price: 40 },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', price: 45 },
    { title: 'Jane Eyre', author: 'Charlotte Brontë', price: 50 },
    { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', price: 55 },
  ]);
  const [cart, setCart] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddBook = () => {
    if (newBook.title && newBook.author && newBook.price) {
      setBooks([...books, newBook]);
      setNewBook({ title: '', author: '', price: '' });
    }
  };

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cartTotal = cart.reduce((total, book) => total + book.price, 0);

  return (
    <div className="BookStore">
      <style>{styles}</style>
      <h1>Book Store</h1>
      <div className="search-section">
        <h2>Search Books</h2>
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="add-section">
        <h2>Add Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: parseFloat(e.target.value) })}
        />
        <button onClick={handleAddBook}>Add Book</button>
      </div>
      <div className="display-section">
        <h2>Available Books</h2>
        {filteredBooks.length > 0 ? (
          <ul>
            {filteredBooks.map((book, index) => (
              <li key={index}>
                <strong>{book.title}</strong> by {book.author} - ${book.price}
                <button onClick={() => addToCart(book)}>Add to Cart</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No match found</p>
        )}
      </div>
      <div className="cart-section">
        <h2>Shopping Cart</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((book, index) => (
              <li key={index} className="cart-item">
                <span>{book.title}</span>
                <span>${book.price}</span>
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty</p>
        )}
        <div className="cart-total">Total: ${cartTotal}</div>
      </div>
    </div>
  );
}

export default BookStore;
