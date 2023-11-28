import React from 'react';
import '../assets/styles/home.css'
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import ProductCarousel from '../components/ProductCarousel';
import Loader from '../components/Loader';
import Message from '../components/Message'
import Paginate from '../components/Paginate';
import TitleAnimation from '../components/TitleAnimation';
import Footer from '../components/Footer';
import InstaFeeds from '../components/InstaFeeds';
import TextPath from '../components/TextPath';
import HomeContact from '../components/HomeContact';


  
const HomeScreen = () => {

  const {pageNumber, keyword} = useParams();

  // const { data, isLoading, error } = useGetProductsQuery({keyword, pageNumber}); 

  return (
    <div className='home-wrapper'>
      <div className='sec1'>
        <TitleAnimation/>
      </div>
      <div className='sec2'>
        <TextPath/>
      </div>
      <div className='sec3'>
        <InstaFeeds token={process.env.REACT_APP_INS_TOKEN} limit={9}/>
      </div>
      <div className='sec2'>
        <TextPath/>
      </div>
      {/* <div className='contact-container'> */}
        <HomeContact/>
      {/* </div> */}
      <div className='sec2'>
        <TextPath/>
      </div>
      <Footer/>
           {/* { !keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light mb-4'>Go Back</Link>} */}
    </div>
  )
  
}

export default HomeScreen