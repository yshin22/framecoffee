//decimal helper function
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

// calculate price of everything in cart
export const updateCart = (state) => {
    //calculate items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
             
    //calculate shipping price (if order is over $100, then free shipping, else, $10)
    // state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
    state.shippingPrice = 0;

    //calculate tax price (%15)
    state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));
    
    //calculate total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    // save to local storage
    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}