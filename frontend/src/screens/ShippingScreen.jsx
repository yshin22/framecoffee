import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import { AddressAutofill } from '@mapbox/search-js-react';
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, address2, city, postalCode, state, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
        <CheckoutSteps step1 step2></CheckoutSteps>
      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='address'>
          <Form.Label>Address</Form.Label>
          <AddressAutofill accessToken={mapBoxKey}>
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
