import { useEffect, useState } from 'react';
import { Form, Button, Spinner} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress, saveShippingQuote, updateTax } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import {toast} from 'react-toastify';
import { AddressAutofill } from '@mapbox/search-js-react';
import { useValidateAddressMutation, useCalculateShippingMutation } from '../slices/shippoSlics';
const mapBoxKey = "pk.eyJ1IjoiZnJhbWVjb2ZmZWUiLCJhIjoiY2x0YXoyNXNmMWV6aTJrbXRia2Zpbm54dCJ9.GRGuO1Se8cyIaE11rNsXdQ"

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const { shippingAddress } = cart;

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [state, setState] = useState(shippingAddress?.state || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [validateAddress] = useValidateAddressMutation();
  const [calculateShipping, isLoading, error] = useCalculateShippingMutation();

  // Validate address 
  // Corrects address if mispelling exists
  const checkAddress = async (e) => {
    try {
      const res = await validateAddress({
        address1: address, 
        address2: address2, 
        city: city, 
        state: state, 
        postalCode: postalCode, 
        country: country}).unwrap();

      console.log('VALIDATED ADDRESS', res)
      console.log('Is address valid?', res.validation_results.is_valid)

      if (res.validation_results.is_valid === true) {        
        // console.log('set valid: true')
        return [true, res]
      }
      else {
        // console.log('set valid: false')
        return false
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    
    const res = await checkAddress()

    // console.log('---RES---: ', res)

    // Check if address came back valid 
    if (res[0] === true) {

      // Check for Alaska, Hawaii, and non-US countries
      if (res[1].state === 'AK' || res[1].state === 'HI' || res[1].country !== 'US') {
        console.log('ITS INVALID: AK, HI, or non-US country')
        return toast.error('Currently not shipping to: Alaska and Hawaii');
      }
      else {
        // Set shipping address to address returned by shippo
        // This takes care of cases where states are not abbreviated
        dispatch(saveShippingAddress({
          address: res[1].street1,
          address2: res[1].street2,
          city: res[1].city,
          postalCode: res[1].zip,
          state: res[1].state,
          country: res[1].country}));

        // Need res[1] since cart's address won't update till next re-render
        // This is for when the customer backtracks and changes their address
        // By using res[1], we have the most updated address
        const newShippingAddress = res[1];

        // console.log(newShippingAddress)
        console.log('CART SHIPPING ADDRESS', cart.shippingAddress);
        
        // Calculate shipping rate and Shippo shipping profile
        const {shipment, shippingRate} = await calculateShipping({userInfo, cart, newShippingAddress}).unwrap();
         
        console.log('SHIPMENT: ', shipment);
        console.log('RATE: ', typeof shippingRate);
        
        // save shipment profile to cart local storage
        dispatch(saveShippingQuote(shipment));

        // Update tax after shipping address changed again
        dispatch(updateTax(Number(shippingRate)));
        
        navigate('/payment');
      } 
    }
    else {
      // console.log('ITS INVALID')
      return toast.error('Please enter a valid address!')
    }
  };

  return (
    <FormContainer>
        <CheckoutSteps step1 step2></CheckoutSteps>
      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='address'>
          <Form.Label>Address</Form.Label>
          <AddressAutofill accessToken={mapBoxKey}
          options={{
            language: 'en',
            country: 'US',
            limit: 10,
          }}
          >
            <Form.Control
              type='text'
              placeholder='Enter address'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              autoComplete='address-line1'
            ></Form.Control>
          </AddressAutofill>
        </Form.Group>

        <Form.Group className='my-2' controlId='address2'>
          <Form.Label>Address Line 2</Form.Label>
          <Form.Control
            type='text'
            placeholder='Apt / Suite / Bldg / Unit'
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            autoComplete="address-line2"
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
            autoComplete='address-level2'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='state'>
          <Form.Label>State</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter state'
            value={state}
            required
            onChange={(e) => setState(e.target.value)}
            autoComplete='address-level1'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
            autoComplete="postal-code"
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
            autoComplete="country-name"
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' 
        disabled={loading}
        >
            {loading ? (
              <>
                <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                />
                Loading...
              </>

            ): 'Continue'}
            {/* Continue */}
        </Button>

      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
