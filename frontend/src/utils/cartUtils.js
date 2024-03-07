//decimal helper function
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}
export const round2 = (num) => Math.round((num + Number.EPSILON) * 100) / 100

// calculate price of everything in cart
export const updateCart = (state) => {
    // Calculate the items price in whole number (pennies) to avoid issues with
    // floating point number calculations    
    const itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + (item.price * 100 * item.qty) / 100, 0);
    
    //calculate items price
    state.itemsPrice = addDecimals(itemsPrice);
             
    //calculate shipping price (if order is over $100, then free shipping, else, $10)
    // state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
    // const shippingPrice = itemsPrice > 100 ? 0 : 10;

    const shippingPrice = state.shippingPrice;

    state.shippingPrice = Number(addDecimals(shippingPrice));

    console.log('STATE.SHIPPING PRICE: ',  state.shippingPrice);

    //calculate tax price (%1) for VA
    const taxPriceVA = 0.01 * itemsPrice;
    // %0 for all other states
    const taxPrice = 0;
    
    if (state.shippingAddress.state !== 'VA') {
        console.log('NOT VA')
        state.taxPrice = addDecimals(taxPrice);
        const totalPrice = itemsPrice + shippingPrice + taxPrice;
        // Calculate the total price
        state.totalPrice = addDecimals(totalPrice);

        console.log('TAX: ', state.taxPrice)
        console.log('TOTAL: ', state.totalPrice)
    }
    else {
        console.log('VA')
        state.taxPrice = addDecimals(taxPriceVA);
        const totalPrice = itemsPrice + shippingPrice + taxPriceVA;
        // Calculate the total price
        state.totalPrice = addDecimals(totalPrice);
        console.log('TAX: ', state.taxPrice)
        console.log('TOTAL: ', state.totalPrice)
    }
    
    // Save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}