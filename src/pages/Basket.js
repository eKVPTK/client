import React, { useEffect, useState } from 'react';
import { fetchBasket, removeFromBasket, updateBasketQuantity } from '../http/basketAPI'; 
import { getUserIdFromToken } from '../utils/auth'; 

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const loadBasket = async () => {
      const userId = getUserIdFromToken();

      if (!userId) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }  

      try {
        const basketData = await fetchBasket(userId);
        setBasketItems(basketData);
        calculateTotalPrice(basketData); 
      } catch (error) {
        setError('Error fetching basket data');
        console.error('Error fetching basket data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBasket();
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.device.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleRemoveFromBasket = async (deviceId) => {
    const userId = getUserIdFromToken();

    if (!userId) {
      setError('User not authenticated');
      return;
    }

    try {
      await removeFromBasket(userId, deviceId);
      const updatedItems = basketItems.filter(item => item.device.id !== deviceId);
      setBasketItems(updatedItems);
      calculateTotalPrice(updatedItems); 
      alert('Товар удален из корзины!');
    } catch (error) {
      setError('Error removing item from basket');
      console.error('Error removing item from basket:', error);
    }
  };

  const handleQuantityChange = async (deviceId, quantity) => {
    const userId = getUserIdFromToken();

    if (!userId) {
      setError('User not authenticated');
      return;
    }

    try {
      await updateBasketQuantity(userId, deviceId, quantity);
      const updatedItems = basketItems.map(item => 
        item.device.id === deviceId ? { ...item, quantity } : item
      );
      setBasketItems(updatedItems);
      calculateTotalPrice(updatedItems); 
    } catch (error) {
      setError('Error updating item quantity');
      console.error('Error updating item quantity:', error);
    }
  };

  const truncateDescription = (description, limit) => {
    const words = description.split(' ');
    if (words.length > limit) {
      return `${words.slice(0, limit).join(' ')}...`;
    }
    return description;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="basket" style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', maxWidth: '800px', margin: '0 auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h1 style={{ fontSize: '28px', color: '#333', marginBottom: '20px' }}>Корзина</h1>

      {basketItems.length === 0 ? (
        <p style={{ fontSize: '20px', color: '#666' }}>Ваша корзина пуста!</p>
      ) : (
        <div className="basket-list">
          {basketItems.map(item => (
            <div key={item.device.id} className="basket-item" style={{ display: 'flex', alignItems: 'center', padding: '10px', marginBottom: '10px', backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <img 
                src={`http://localhost:5000/${item.device.img}`} 
                alt={item.device.name} 
                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '5px', marginRight: '20px' }} 
              />
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '20px', color: '#333', marginBottom: '5px' }}>{item.device.name}</h2>
                <p style={{ fontSize: '16px', color: '#555', marginBottom: '5px' }}>
                  {truncateDescription(item.device.description, 20)} {/* Ограничение до 20 слов */}
                </p>
                <p style={{ fontSize: '18px', color: '#e74c3c', fontWeight: 'bold' }}>Цена: {item.device.price}₸</p>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                  <button 
                    onClick={() => handleQuantityChange(item.device.id, item.quantity - 1)} 
                    disabled={item.quantity <= 1} 
                    style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }}>
                    -
                  </button>
                  <span style={{ fontSize: '16px', margin: '0 10px' }}>{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.device.id, item.quantity + 1)} 
                    style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    +
                  </button>
                </div>
                <button 
                  onClick={() => handleRemoveFromBasket(item.device.id)} 
                  style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Удалить из корзины
                </button>
              </div>
            </div>
          ))}
          <div className="basket-total" style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
            <h3>Общая сумма: {totalPrice}₸</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
