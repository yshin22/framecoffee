import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// local storage
const initialState = localStorage.getItem('cart') ? JSON.parse
(localStorage.getItem('cart')) 
: {cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal'};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // State: current state
        // action: any data in paylaod. sending data to the cart and we can access that data using "action.payload"
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id);

            if(existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === 
                existItem._id ? item: x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            // return all items from cart other than one we want to delete
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

            // then update local storage
            return updateCart(state);
        },
         saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
         },
         savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
         },
         clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateCart(state);
         }
    },
});

export const {
    addToCart, 
    removeFromCart, 
    saveShippingAddress, 
    savePaymentMethod,
    clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;