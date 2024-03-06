function addDecimals(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }
  
  // NOTE: the code below has been changed from the course code to fix an issue
  // with type coercion of strings to numbers.
  // Our addDecimals function expects a number and returns a string, so it is not
  // correct to call it passing a string as the argument.
  
  export function calcPrices(orderItems, shippingAddress, shippingPrice) {
    // Calculate the items price in whole number (pennies) to avoid issues with
    // floating point number calculations
    const itemsPrice = orderItems.reduce(
      (acc, item) => acc + (item.price * 100 * item.qty) / 100,
      0
    );
  
    // Calculate the shipping price
    // const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const finalShipRate = shippingPrice;
  
    // Tax for VA
    const taxPriceVA = 0.01 * itemsPrice;
    // Tax for all other
    const taxPrice = 0;

    // Calculate the total price
    if (shippingAddress.state === 'VA') {
      console.log('CALC PRICES VA')
      const totalPrice = itemsPrice + finalShipRate + taxPriceVA;

      return {
        itemsPrice: addDecimals(itemsPrice),
        shippingPrice: addDecimals(finalShipRate),
        taxPrice: addDecimals(taxPriceVA),
        totalPrice: addDecimals(totalPrice),
      };
    } else {
      console.log('CALC PRICES non-VA')
      const totalPrice = itemsPrice + finalShipRate + taxPrice;
      
      return {
        itemsPrice: addDecimals(itemsPrice),
        shippingPrice: addDecimals(finalShipRate),
        taxPrice: addDecimals(taxPrice),
        totalPrice: addDecimals(totalPrice),
      };
    }
  
  }