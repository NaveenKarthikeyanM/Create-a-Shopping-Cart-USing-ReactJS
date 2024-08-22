import React, { useReducer, useState } from 'react';
import './Cart.css';
import appleImage from './apple.png';

const initialState = {
  cart: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }]
        };
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id)
      };
    default:
      return state;
  }
};

const Cart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const products = [
    { id: 1, name: 'Product 1', price: 100, image: appleImage }, // Use the imported image
    { id: 2, name: 'Product 2', price: 150, image: appleImage },
    { id: 3, name: 'Product 3', price: 200, image: appleImage },
  ];

  const addItemToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const updateItemQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    } else {
      dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    }
  };

  const removeItemFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  return (
    <div className="cart-container">
      <header className="cart-header">
        <h1>My Shopping Cart</h1>
        <button className="my-cart-button" onClick={() => setIsCartVisible(!isCartVisible)}>
          My Cart ({state.cart.length})
        </button>
      </header>

      <div className="products-container">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <div className="product-image">
              <img src={product.image || '#'} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <button onClick={() => addItemToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      {isCartVisible && (
        <div className="cart-content">
          <h2>Your Cart</h2>
          {state.cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            <ul className="cart-list">
              {state.cart.map(item => (
                <li key={item.id} className="cart-item">
                  {item.name} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}
                  <div className="cart-item-actions">
                    <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                    <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                    <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
