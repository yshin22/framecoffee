import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import {toast} from 'react-toastify';
import { AddressAutofill } from '@mapbox/search-js-react';
import { useValidateAddressMutation } from '../slices/shippoSlics';
const mapBoxKey = "pk.eyJ1IjoiZnJhbWVjb2ZmZWUiLCJhIjoiY2x0YXoyNXNmMWV6aTJrbXRia2Zpbm54dCJ9.GRGuO1Se8cyIaE11rNsXdQ"

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [state, setState] = useState(shippingAddress?.state || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const noShipStates = ['AK', 'Ak', 'Alaska', 'alaska', 'HI', 'Hi', 'Hawaii', 'hawaii'];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [validateAddress] = useValidateAddressMutation();

  const checkAddress = async (e) => {
    // console.log(address, address2, city, postalCode, state, country);
    try {
      const res = await validateAddress({
        address1: address, 
        address2: address2, 
        city: city, 
        state: state, 
        postalCode: postalCode, 
        country: country}).unwrap();

      console.log('VALIDATED ADDRESS', res)
      console.log('is valid?:', res.validation_results.is_valid)
      if (res.validation_results.is_valid === true) {        
        console.log('set valid: true')
        return [true, res]
      }
      else {
        console.log('set valid: false')
        return false
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await checkAddress()

    const [isValid, addy] = res;

    if (isValid === true) {
      console.log('ITS VALID')
      dispatch(saveShippingAddress({
        address: addy.street1,
        address2: addy.street2,
        city: addy.city,
        postalCode: addy.zip,
        state: addy.state,
        country: addy.country}));
      navigate('/payment');
    }
    else {
      console.log('ITS INVALID')
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
            country: 'US'
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
            autocomplete="address-line2"
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
            autocomplete="postal-code"
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
            autocomplete="country-name"
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
