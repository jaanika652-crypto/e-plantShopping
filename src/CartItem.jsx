import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateQuantity, removeItem } from './features/CartSlice.jsx';

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Increase quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrease quantity or remove item if quantity becomes 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Total cost calculation
  const total = cartItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-container" style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Your Cart is Empty</h1>
        <button onClick={onContinueShopping} style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer' }}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container" style={{ padding: '20px' }}>
      <h1>Your Cart</h1>
      {cartItems.map((item) => (
        <div className="cart-item" key={item.name} style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
          <img src={item.image} alt={item.name} width="100" height="100" style={{ borderRadius: '8px' }} />
          <div className="item-details" style={{ flex: 1 }}>
            <h3>{item.name}</h3>
            <p>Unit Cost: ${item.cost.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: ${(item.cost * item.quantity).toFixed(2)}</p>

            <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => handleDecrement(item)} style={{ padding: '5px 10px' }}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)} style={{ padding: '5px 10px' }}>+</button>
            </div>

            <button
              onClick={() => handleRemove(item)}
              style={{
                marginTop: '10px',
                padding: '8px 15px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <h2>Total: ${total.toFixed(2)}</h2>
      <button onClick={onContinueShopping} style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer', marginTop: '20px' }}>
        Continue Shopping
      </button>
    </div>
  );
};

export default CartItem;
