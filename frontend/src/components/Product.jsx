import React from 'react'
import {Card, ListGroup, ListGroupItem, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
  return (
    <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant="top"></Card.Img>
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as="div" className='product-title'> 
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>

            {/* <Card.Text as='div'>
                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>

            </Card.Text> */}
            
            <div>
                <p>
                    Origin | Ethiopia
                </p>
                <p>
                    Cupping Note |
                </p>
                <p>
                    Roasting Level |
                </p>
            </div>

            <Card.Text as="h3">
                ${product.price}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product