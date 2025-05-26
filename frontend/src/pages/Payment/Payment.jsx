import React, { useCallback, useContext } from "react";
import "./Payment.css";
import { StoreContext } from "../../Context/StoreContext";
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import api from "../../utils/api";

const stripePromise = loadStripe('pk_test_51RL30Q4RrwrJsL3COD7A7MQc8QGaMoVfCDETnJywSofxxfEIYfSz0fQFRuwZLTkaRHJIpo6NCZZC8MDrQbelkwmV00kzkTVrVn');

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

    const fetchClientSecret = useCallback(async () => {
        const payment = await api.getPayment(totalAmount);
        console.log(payment)
        return payment.clientSecret;
    }, []);

    const options = { fetchClientSecret };

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
                <div id="checkout">
                    <EmbeddedCheckoutProvider
                        stripe={stripePromise}
                        options={options}
                    >
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                </div>
            </div>
        </form>
    );
};

export default Payment;
