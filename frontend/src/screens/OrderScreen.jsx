import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import {Row, Col, ListGroup, Image, Button, Card, Container} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {useSelector } from 'react-redux';
import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
    useGetOrderDetailsQuery, 
    usePayOrderMutation, 
    useGetPayPalClientIdQuery,
    useDeliverOrdersMutation
} 
from '../slices/ordersApiSlice';
import {
    useGetProductDetailsQuery,
} from '../slices/productsApiSlice';
import '../assets/styles/screens/orderscreen.css';
import Footer from '../components/Footer';


const OrderScreen = () => {
    // Get id from URL 
    const {id: orderId} = useParams();

    const [productId, setProductId] = useState("");

    // Get data from "orderId" (renamed "order")
    // "refetch" to get updated/ new data
    const {data: order, refetch, isLoading, error} = useGetOrderDetailsQuery(orderId);

    const {data: product, refetch: refetchProd} = useGetProductDetailsQuery(productId);

    const [payOrder, {isLoading: loadingPay}] = usePayOrderMutation();

    const [deliverOrder, {isLoading: loadingDeliver}] = useDeliverOrdersMutation();

    const [{isPending}, paypalDispatch] = usePayPalScriptReducer();

    const {data: paypal, isLoading: loadingPayPal, error: errorPayPal} = useGetPayPalClientIdQuery();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'clientId': paypal.clientId,
                        currency: 'USD',
                    }
                });
                paypalDispatch({type: 'setLoadingStatus', value: 'pending'});
            }
            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadPayPalScript();
                }
            }
        }
    }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal])

    useEffect(() => {

        if (productId) {
            console.log(`PRODUCT ID: ${productId}`)
            console.log(product)
            console.log(`COUNT IN STOCK: ${product?.countInStock}`)
        }
        

    }, [productId, product])


    async function setQuantity() {  
        console.log(`LENGTH OF ORDER ITEMS: ${order.orderItems.length}`)
        for (let i=0; i < order.orderItems.length; i++) {
            console.log(`LOOP: ${order.orderItems[i].product.toString()}`)
            let stringProd = order.orderItems[i].product.toString()
            await setProductId(stringProd);
            // console.log(`ORDER QTY: ${order.orderItems[i].qty}`)
            // let newQty = product.countInStock - order.orderItems[i].qty;
            // console.log(`qty after: ${newQty}`)
        }
    }

    function onApprove(data, actions) {
        return actions.order.capture().then(async function(details) {
            try {
                await payOrder({orderId, details});                

                await setQuantity();

                refetch();
                toast.success('Payment Successful');
            } catch (err) {
                toast.error(err?.data?.message || err.message);
            }
        });
    }

    // Remove before PRODUCTION!!!
    // async function onApproveTest() {
    //     await payOrder({orderId, details: {payer: {}}});
    //     refetch();
    //     toast.success('Payment Successful');
    // }

    function onError(err) {
        toast.error(err.message);
    }

    function createOrder(data, actions) {
        return actions.order
        .create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice,
                    },
                },
            ],
        }).then((orderId) => {
            return orderId;
        });
    }

    const deliverOrderHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order delivered');
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
    }


  return isLoading ? (
  <Loader/>
  ) : error ? (
  <Message variant='danger'/>
  ) : (
    <>
    <Container className='order-container'>
    <Row className='order-row'>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    {/* {console.log(`ORDER ID: ${order.orderItems[0].product}`)} */}
                    <h2>Shipping</h2>
                    <p>
                        <strong>Name: </strong> {order.user.name}
                    </p>
                    <p>
                        <strong>Email: </strong> {order.user.email}
                    </p>
                    <p>
                        <strong>Address: </strong> 
                        {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                        {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </p> 
                    {order.isDelivered ? (
                        <Message variant='success'>
                            Delivered on {order.deliveredAt}
                        </Message>
                    ) : (
                        <Message variant='danger'>
                            Not Delivered
                        </Message>
                    )}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                        <Message variant='success'>
                            Paid on {order.paidAt}
                        </Message>
                    ) : (
                        <Message variant='danger'>
                            Not Paid
                        </Message>
                    )}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    <h3>ORDER# {order._id}</h3>
                    {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                            <Row>
                                <Col md={1}>
                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col>
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>
                                </Col>
                                <Col md={4}>
                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup.Item>
            </ListGroup>

        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>${order.itemsPrice}</Col>
                        </Row>

                        <Row>
                            <Col>Shipping</Col>
                            <Col>${order.shippingPrice}</Col>
                        </Row>

                        <Row>
                            <Col>Tax</Col>
                            <Col>${order.taxPrice}</Col>
                        </Row>

                        <Row>
                            <Col>Total</Col>
                            <Col>${order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    {!order.isPaid && (
                        <ListGroup.Item style={{zIndex: '5'}}>
                            {loadingPay && <Loader/>}
                            {isPending ? <Loader/> : (
                                <div>
                                    <PayPalButtons
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                    onError={onError}>
                                    </PayPalButtons>
                                </div>
                            )}
                        </ListGroup.Item>
                    )}


                { loadingDeliver && <Loader/>}

                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <ListGroup.Item>
                        <Button type='button' className='btn btn-block' onClick={deliverOrderHandler}>
                            Marks as delivered
                        </Button>
                    </ListGroup.Item>
                )} 
                </ListGroup>
            </Card>
        </Col>
    </Row>
    </Container>
    <Footer/>
    </>
  );
}

export default OrderScreen