import React, { useState } from 'react';
import './ProductList.css';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { addItem } from './features/CartSlice.jsx';

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [view, setView] = useState('home'); // 'home' | 'plants' | 'cart'

  // --- Helper to check if a plant is in the cart ---
  const isInCart = (plantName) => cartItems.some((item) => item.name === plantName);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // --- Navigation handlers ---
  const handleHomeClick = () => {
    setView('home');
    if (onHomeClick) onHomeClick();
  };

  const handlePlantsClick = () => setView('plants');
  const handleCartClick = () => setView('cart');
  const handleContinueShopping = () => setView('plants');

  // --- Add item to cart ---
  const handleAddToCart = (product) => {
    if (!isInCart(product.name)) {
      dispatch(addItem(product));
    }
  };

  // --- Styles ---
  const styleObj = {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  };

  const styleObjUl = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '250px',
  };

  const styleButton = {
    color: 'white',
    fontSize: '24px',
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
  };

  // --- Plant data ---
  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'Produces oxygen at night, improving air quality.', cost: 15 },
        { name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
        { name: 'Peace Lily', image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg', description: 'Removes mold spores and purifies the air.', cost: 18 },
        { name: 'Boston Fern', image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg', description: 'Adds humidity to the air and removes toxins.', cost: 20 },
      ],
    },
    {
      category: 'Succulents',
      plants: [
        { name: 'Echeveria', image: 'https://cdn.pixabay.com/photo/2016/05/09/15/36/echeveria-1383084_1280.jpg', description: 'Low-maintenance, perfect for sunny windows.', cost: 10 },
        { name: 'Jade Plant', image: 'https://cdn.pixabay.com/photo/2017/05/05/16/10/jade-plant-2288820_1280.jpg', description: 'Symbol of prosperity and good luck.', cost: 14 },
      ],
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f8f8' }}>
      {/* NAVBAR */}
      <div className="navbar" style={styleObj}>
        <div className="luxury" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="logo" height="60" />
          <button onClick={handleHomeClick} style={{ ...styleButton, textAlign: 'left' }}>
            <div>
              <h3 style={{ color: 'white', margin: 0 }}>Paradise Nursery</h3>
              <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
            </div>
          </button>
        </div>

        <div style={styleObjUl}>
          <button onClick={handlePlantsClick} style={styleButton}>Plants</button>
          <button onClick={handleCartClick} style={styleButton}>
            🛒 Cart ({totalQuantity})
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      {view === 'home' && (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <h1 className="home-title">Welcome to Paradise Nursery 🌿</h1>
          <p className="home-subtitle">Click “Plants” above to explore our green collection!</p>
        </div>
      )}

      {view === 'plants' && (
        <div className="product-grid" style={{ padding: '40px' }}>
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1>{category.category}</h1>
              <div className="product-list">
                {category.plants.map((plant, i) => (
                  <div className="product-card" key={i}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <div className="product-cost">${plant.cost}</div>
                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                      style={{
                        backgroundColor: isInCart(plant.name) ? '#a5a5a5' : '#4CAF50',
                        color: 'white',
                        cursor: isInCart(plant.name) ? 'not-allowed' : 'pointer',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        transition: '0.3s',
                      }}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'cart' && <CartItem onContinueShopping={handleContinueShopping} />}
    </div>
  );
}

export default ProductList;
