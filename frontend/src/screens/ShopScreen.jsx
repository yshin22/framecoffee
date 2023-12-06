import {Row, Col, Container} from 'react-bootstrap';
import '../assets/styles/screens/shopscreen.css';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message'
import Paginate from '../components/Paginate';
import Footer from '../components/Footer';


const ShopScreen = () => {

  const {pageNumber, keyword} = useParams();

  const { data, isLoading, error } = useGetProductsQuery({keyword, pageNumber}); 

  return (
    <>
      <Container className='shop-container'>
        { isLoading ? (
          <Loader/>) 
          : error ? (
            <Message variant='danger'>
              {error?.data?.message || error.error}
            </Message>
            ) 
          : (<>
            <Row className='page-title'>
              <h1>BEANS</h1>
            </Row>
            <Row className='sub-title py-2'>
              <h2>Life happens, <span className='selectWord'>coffee</span> helps.</h2>
            </Row>
            <Row>
              {data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product}/>
                </Col>
              ))}
            </Row>
            <Paginate
            pages={data.pages}
            page={data.page}
            keyword = {keyword ? keyword : ''}/>
          </>) }
      </Container>
      <Footer/>
    </>
  )
}

export default ShopScreen