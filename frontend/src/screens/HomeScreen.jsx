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
import {Parallax, ParallaxLayer} from '@react-spring/parallax'
import Footer from '../components/Footer';
import { useScroll } from '@react-spring/web';


  
const HomeScreen = () => {

  const {pageNumber, keyword} = useParams();

  // const { data, isLoading, error } = useGetProductsQuery({keyword, pageNumber}); 

  return (
    <div className='home-wrapper'>
      <section className='sec1'>
        <TitleAnimation/>
      </section>
      <section className='sec2'>
        <div>
          <h1>Hey how are you</h1>
        </div> 
      </section>
      <Footer/>

 
           {/* { !keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light mb-4'>Go Back</Link>} */}
    </div>
  )
  
}

export default HomeScreen