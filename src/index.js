import React from 'react';
import ReactDOM from 'react-dom';
import Cart from './Components/Cart';
import './index.css';

const App = () => {
  return (
    <div>
      <h1>My Shopping Cart</h1>
      <Cart />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

