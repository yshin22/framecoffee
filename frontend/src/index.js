import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import {HelmetProvider} from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import ShopScreen from './screens/ShopScreen';

import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import MenuScreen from './screens/MenuScreen';
import MenuEditScreen from './screens/admin/MenuEditScreen';
import WholesaleScreen from './screens/WholesaleScreen';
import GalleryScreen from './screens/GalleryScreen';
import MusicScreen from './screens/MusicScreen';
import ArtShowScreen from './screens/ArtShowScreen';
import ArtShowListScreen from './screens/admin/ArtShowListScreen';
import ArtShowEditScreen from './screens/admin/ArtShowEditScreen';

import PrivacyPolicy from './screens/PrivacyPolicy';
import RefundPolicy from './screens/RefundPolicy';
import TermsOfService from './screens/TermsOfService';
import ShippingPolicy from './screens/ShippingPolicy';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/about' element={<AboutScreen/>}/>
      <Route path='/shop' element={<ShopScreen/>}/>
      <Route path='/menu' element={<MenuScreen/>}/>
      <Route path='/wholesale' element={<WholesaleScreen/>}/>
      <Route path='/gallery' element={<GalleryScreen/>}/>
      <Route path='/artshow' element={<ArtShowScreen/>}/>
      <Route path='/music' element={<MusicScreen/>}/>

      <Route path='/search/:keyword' element={<ShopScreen/>}/>
      <Route path='/page/:pageNumber' element={<HomeScreen/>}/>
      <Route path='/search/:keyword/page/:pageNumber' element={<ShopScreen/>}/>
      <Route path='/product/:id' element={<ProductScreen/>}/>
      <Route path='/cart' element={<CartScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>
      <Route path='/shipping' element={<ShippingScreen/>}/>

      <Route path='/privacypolicy' element={<PrivacyPolicy/>}/>
      <Route path='/refundpolicy' element={<RefundPolicy/>}/>
      <Route path='/termsofservice' element={<TermsOfService/>}/>
      <Route path='/shippingpolicy' element={<ShippingPolicy/>}/>


      <Route path='' element={<PrivateRoute/>}>
        <Route path='/shipping' element={<ShippingScreen/>}/>
        <Route path='/payment' element={<PaymentScreen/>}/>
        <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
        <Route path='/order/:id' element={<OrderScreen/>}/>
        <Route path='/profile' element={<ProfileScreen/>}/>
      </Route>

      <Route path='' element={<AdminRoute/>}>
        <Route path='/admin/orderlist' element={<OrderListScreen/>}/>
        <Route path='/admin/productlist' element={<ProductListScreen/>}/>
        <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen/>}/>
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
        <Route path='/admin/userlist' element={<UserListScreen/>}/>
        <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}/>
        <Route path='/admin/menuedit' element={<MenuEditScreen/>}/>
        <Route path='/admin/artshowlist' element={<ArtShowListScreen/>}/>
        <Route path='/admin/artshow/:id/edit' element={<ArtShowEditScreen/>}/>


      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router}/>
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
