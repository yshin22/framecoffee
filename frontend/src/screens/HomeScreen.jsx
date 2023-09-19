import React from 'react'
import { useEffect, useState } from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
// import products from '../products'
import axios from 'axios'

  
const HomeScreen = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const {data} = await axios.get('http://localhost:8000/api/products')

      .catch(error => {
        if (error.response) {
          // The request was made, but the server responded with an error status code (e.g., 403)
          console.error('Error status:', error.response.status);
          console.error('Error data:', error.response.data);
        } else {
          // Something else went wrong
          console.error('Error:', error.message);
        }
      });
      setProducts(data);
    };

    fetchProducts();
  }, []); 

  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}/>
          </Col>
        ))}
      </Row>
    </>
   
  )
}

export default HomeScreen