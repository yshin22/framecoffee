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
import {Parallax, ParallaxLayer} from '@react-spring/parallax'
import Footer from '../components/Footer';
import { useScroll } from '@react-spring/web';


  
const HomeScreen = () => {

  const {pageNumber, keyword} = useParams();

  // const { data, isLoading, error } = useGetProductsQuery({keyword, pageNumber}); 



  const {scrollYProgress} = useScroll();
  

  return (
    <>

      <Parallax pages={3} >
        <ParallaxLayer speed={1} style={{}}>
          <TitleAnimation/>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.5}>
          <h1>Doing well, too?</h1>
        </ParallaxLayer>

        <ParallaxLayer offset={2}>
          <Footer/>
        </ParallaxLayer>
      </Parallax>


      {/* <TitleAnimation/>
      
      <div style={{width: '100%', height: '100vh', border: 'solid #303030',backgroundColor: '#e6e2de'}}>

      </div> */}
      
      {/* { !keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light mb-4'>Go Back</Link>} */}
         
    </>
   
  )
}

export default HomeScreen