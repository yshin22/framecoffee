import { useState } from 'react'
import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import VerticallyCenteredModal from './VerticallyCenteredModal'
import '../assets/styles/product.css'
// import Rating from './Rating'

const Product = ({product}) => {

const [modalShow, setModalShow] = useState(false);

  return (
    <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant="top" style={{height: '400px', objectFit: 'cover'}}></Card.Img>
        </Link>

        <Card.Body>
            <Link className='product-title-wrapper' to={`/product/${product._id}`}>
                <Card.Title as="div" className='product-title'> 
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>

            {/* <Card.Text as='div'>
                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>

            </Card.Text> */}
            {(product.category === 'Coffee Beans') && 
                <div className='beans-desc' onClick={() => setModalShow(true)}>
                    <p>
                        <Link className='beans-desc-link'>
                            <span style={{fontWeight: '800', textDecorationLine: 'underline'}}>Origin</span>: <i> {product.origin}</i>
                        </Link>
                    </p>
                    <p>
                        <span style={{fontWeight: '800', textDecorationLine: 'underline'}}>Cupping Note</span>: <i> {product.cuppingNote}</i>
                    </p>
                    <p>
                        <span style={{fontWeight: '800', textDecorationLine: 'underline'}}>Roasting Level</span>: <i>{product.roastingLevel}</i>
                    </p>
                </div>
            }

            <VerticallyCenteredModal  show={modalShow}
            onHide={() => setModalShow(false)}/>

            <Card.Text as="h3">
                ${(product.price).toFixed(2)}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product