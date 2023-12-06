import React from 'react'
import {Card, ListGroup, ListGroupItem, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {

    const origin = product.origin;
    const cuppingNote = product.cuppingNote;
    const roastingLevel = product.roastingLevel
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
            {(product.category === 'Coffee Beans') && 
                <div>
                    <p>
                        <span style={{fontWeight: '800', textDecorationLine: 'underline'}}>Origin</span>: <i> {product.origin}</i>
                    </p>
                    <p>
                        <span style={{fontWeight: '800', textDecorationLine: 'underline'}}>Cupping Note</span>: <i> {product.cuppingNote}</i>
                    </p>
                    <p>
                        <span style={{fontWeight: '800', textDecorationLine: 'underline'}}>Roasting Level</span>: <i>{product.roastingLevel}</i>
                    </p>
                </div>
            }

            <Card.Text as="h3">
                ${product.price}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product