import { useState } from 'react'
import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import VerticallyCenteredModal from './VerticallyCenteredModal'
import '../assets/styles/product.css'
// import Rating from './Rating'

const Product = ({product}) => {

const [modal1Show, setModal1Show] = useState(false);
const [modal2Show, setModal2Show] = useState(false);
const [modal3Show, setModal3Show] = useState(false);


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
                <div className='beans-desc'>
                    <p>
                        <Link className='beans-desc-link' onClick={() => setModal1Show(true)}>
                            <span style={{fontWeight: '800', textDecorationLine: 'underline'}}>Origin</span>: <i> {product.origin}</i>
                        </Link>
                    </p>
                    <p>
                        <Link className='beans-desc-link' onClick={() => setModal1Show(true)}>
                            <span style={{fontWeight: '800', textDecorationLine: 'underline'}}>Cupping Note</span>: <i> {product.cuppingNote}</i>
                        </Link>
                    </p>
                    <p>
                    <Link className='beans-desc-link' onClick={() => setModal1Show(true)}>
                        <span style={{fontWeight: '800', textDecorationLine: 'underline'}}>Roasting Level</span>: <i>{product.roastingLevel}</i>
                    </Link>
                    </p>
                </div>
            }

            <VerticallyCenteredModal show={modal1Show} onHide={() => setModal1Show(false)} prod={product}/>
            {/* <VerticallyCenteredModal show={modal2Show} onHide={() => setModal2Show(false)} prod={product}/>
            <VerticallyCenteredModal show={modal3Show} onHide={() => setModal3Show(false)} prod={product}/> */}


            <Card.Text as="h3">
                ${(product.price).toFixed(2)}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product