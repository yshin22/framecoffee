import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import ProductCarousel from '../components/ProductCarousel';
import Loader from '../components/Loader';
import Message from '../components/Message'
import Paginate from '../components/Paginate';
import TitleAnimation from '../components/TitleAnimation';


  
const HomeScreen = () => {

  const {pageNumber, keyword} = useParams();

  // const { data, isLoading, error } = useGetProductsQuery({keyword, pageNumber}); 

  return (
    <>

      <TitleAnimation/>
      
      <div style={{width: '100%', height: '100vh', border: 'solid #303030', zIndex: '10', backgroundColor: '#e6e2de'}}>

      </div>
      
      {/* { !keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light mb-4'>Go Back</Link>} */}
         
    </>
   
  )
}

export default HomeScreen