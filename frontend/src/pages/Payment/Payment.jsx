import React, { useContext } from "react";
import "./Payment.css";
import { StoreContext } from "../../Context/StoreContext";

const Payment = () => {
    const { cartItems, food_list, getTotalCartAmount } = useContext(StoreContext);
    const deliveryFee = getTotalCartAmount() * 0.1;
    const totalAmount = getTotalCartAmount() + deliveryFee;

    const calculateItemTotal = (item, quantity) => {
        let itemPrice = item.price;

        // Apply discount if available
        if (item.discount > 0) {
            itemPrice = itemPrice * (1 - item.discount / 100);
        }

        // Handle BOGO
        if (item.freeItem) {
            const payableQuantity = Math.ceil(quantity / 2);
            return itemPrice * payableQuantity;
        }

        return itemPrice * quantity;
    };

    return (
        <form className="payment">
            <div className="paymentleft">
                <h2>Payment</h2>
                <h1>Rs. {totalAmount.toFixed(2)}</h1>
                <div className="order-details">
                    {food_list.map((item) => {
                        if (cartItems[item.itemId] > 0) {
                            const quantity = cartItems[item.itemId];
                            const itemTotal = calculateItemTotal(item, quantity);
                            const displayPrice = item.discount > 0 ?
                                (item.price * (1 - item.discount / 100)).toFixed(2) :
                                item.price.toFixed(2);
                            return (
                                <div key={item._id}>
                                    <div className="item">
                                        <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{item.name}</p>
                                        <p className="price">Rs.{itemTotal}</p>
                                    </div>
                                    <p className="quantity">Qty {quantity} each</p>
                                    <hr />
                                </div>
                            );
                        }
                    })}
                    <div className="item">
                        <p>Delivery Charge(10%)</p>
                        <p className="price">Rs.{deliveryFee.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="payment-right">
                <div className="cart-total">
                    <h2>Pay with card</h2>
                    <form>
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" />

                        <label>Card information</label>
                        <div className="card-input">
                            <input type="text" className="card-number" placeholder="1234 1234 1234 1234" />
                            <div className="card-extra">
                                <input type="text" placeholder="MM / YY" />
                                <input type="text" placeholder="CVC" />
                            </div>
                        </div>


                        <label>Cardholder name</label>
                        <input type="text" placeholder="Full name on card" />

                        <label>Country or region</label>
                        <select>
                            <option>Sri Lanka</option>
                            <option>India</option>
                            <option>USA</option>
                            <option>UK</option>
                        </select>

                        <button type="submit">Pay</button>
                    </form>
                </div>
            </div>
        </form>
    );
};

export default Payment;
