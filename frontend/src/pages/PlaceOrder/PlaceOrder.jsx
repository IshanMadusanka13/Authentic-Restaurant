import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    phone: ''
  });

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Pre-fill form with user data
      const nameParts = parsedUser.name.split(' ');
      setFormData({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: parsedUser.email || '',
        street: parsedUser.address || '',
        phone: parsedUser.phone_number || ''
      });
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-field">
          <input 
            type="text" 
            name='firstName' 
            placeholder='First name'
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input 
            type="text" 
            name='lastName' 
            placeholder='Last name'
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <input 
          type="email" 
          name='email' 
          placeholder='Email address'
          value={formData.email}
          onChange={handleInputChange}
        />
        <input 
          type="text" 
          name='street' 
          placeholder='Address'
          value={formData.street}
          onChange={handleInputChange}
        />
        <input 
          type="text" 
          name='phone' 
          placeholder='Phone'
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>Rs.{getTotalCartAmount()}.00</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Charge(10%)</p><p>Rs.{(getTotalCartAmount() * 10 / 100).toFixed(2)}</p></div>
            <hr />
            <div className="cart-total-details"><b>Total</b><b>Rs.{(getTotalCartAmount() + getTotalCartAmount() * 10 / 100).toFixed(2)}</b></div>
          </div>
          <button onClick={() => navigate('/payment')}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
