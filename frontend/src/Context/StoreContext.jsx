import { createContext, useEffect, useState } from "react";
import { api } from "../utils/api";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([]);

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const data = await api.getMenuItems();
            setFoodList(data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product.itemId == item);
                if (itemInfo) {
                    let itemPrice = itemInfo.price;
                    
                    // Apply discount if available
                    if (itemInfo.discount > 0) {
                        itemPrice = itemPrice * (1 - itemInfo.discount / 100);
                    }
                    
                    let quantity = cartItems[item];
                    
                    // Handle BOGO (Buy One Get One Free)
                    if (itemInfo.freeItem) {
                        // For BOGO, customer pays for half the quantity (rounded up)
                        const payableQuantity = Math.ceil(quantity / 2);
                        totalAmount += itemPrice * payableQuantity;
                    } else {
                        totalAmount += itemPrice * quantity;
                    }
                }
            }
        }
        return totalAmount;
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
