import { useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {Row, Col, ListGroup, Image, Button, Card, Container, Modal} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {useSelector } from 'react-redux';
import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
    useGetOrderDetailsQuery, 
    usePayOrderMutation, 
    useGetPayPalClientIdQuery,
    useDeliverOrdersMutation,
    useDeleteOrderMutation,
} 
from '../slices/ordersApiSlice';
import {useCreateLabelMutation} from '../slices/shippoSlics';
import '../assets/styles/screens/orderscreen.css';
import ReactRouterPrompt from "react-router-prompt";

const OrderScreen = () => {
    // Get id from URL 
    const {id: orderId} = useParams();

    const navigate = useNavigate();

    const [timer, setTimer] = useState(false);

    // Get data from "orderId" (renamed "order")
    // "refetch" to get updated/ new data
    const {data: order, refetch, isLoading, error} = useGetOrderDetailsQuery(orderId);

    const [deleteOrder, {isLoading: loadingDelete}] = useDeleteOrderMutation();

    const [payOrder, {isLoading: loadingPay}] = usePayOrderMutation();

    const [deliverOrder, {isLoading: loadingDeliver}] = useDeliverOrdersMutation();

    const [createLabel] = useCreateLabelMutation();

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

    const labelHandler = async () => {
        try {
            console.log('INSIDE LABEL HANDLER');
            const res = await createLabel({
                fullName: userInfo.name,
                address1: order.shippingAddress.address,
                city: order.shippingAddress.city,
                state: order.shippingAddress.state,
                postalCode: order.shippingAddress.postalCode,
                country: order.shippingAddress.country,
                phoneNumber: '703-111-1111',
                email: userInfo.email,
            }).unwrap();
            console.log(res);
            console.log('OUTSIDE LABEL HANDLER');
        } catch (err) {
            console.log(err);
        }
    }

    // Allow cusomters to have item in cart for set duration.
    // Delete order and update PRODUCT STOCK if time exceeded.
    // Set timer to "true" so that user will not be prompted
    // Redirect to Cart.
    // 1 minute = 60000
    // 15 minutes = 900000
    // 30 minutes = 1,800,000
    // useEffect(() => {
    //     if (!userInfo?.isAdmin && !order?.isPaid) {
    //         const timer = setTimeout(async() => {
    //             setTimer(true);
    //             await deleteOrder(orderId);
    //             toast.error('Session has expired')
    //             navigate(`/cart`);
    //         }, 60000)

    //         return () => {
    //             clearTimeout(timer);
    //           }
    //     }
    // }, [timer])
    
    // Handler for when user is exiting page/ tab.
    // DELETEs current order and restores stock qty of product if user continues to leave
    // useEffect(() => {
    //     // const handleBeforeUnload = async (e) => {
    //     //     const beforeUnloadTimeout = setTimeout(async() => {
    //     //         console.log('SET TIMEOUT FUNCTION')
    //     //         await deleteOrder(orderId)
    //     //     })
    //     //     e.preventDefault();
    //     //     await deleteOrder(orderId)
    //     //     return (e.returnValue = '');
    //     // }

    //     const handleBeforeUnload = () => {
    //         window.confirm('are')
    //     }

    //     if (!order?.isPaid) {
    //         window.addEventListener('beforeunload', handleBeforeUnload, {capture: true});
    //         return () => {
    //           window.removeEventListener('beforeunload', handleBeforeUnload, {capture: true});
    //         };
    //     }
    //   }, [order]);

    // Handler for when Paypal order is approved
    // Calls "payOrder", where "order.isPaid" is set to "true"
    function onApprove(data, actions) {
        return actions.order.capture().then(async function(details) {
            try {
                console.log(orderId)
                await payOrder({orderId, details});
                refetch();
                labelHandler();           
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
    <Message variant='danger'>{error.data.message}</Message>
  ) : (
    <>
        {/* <ReactRouterPrompt
                // Prompts user when using back button on "Order" page.
                // DELETEs current order and updates current stock
                // 3 things must follow:
                //
                // 1) User is not admin:
                //    (Admin should be able to access "orders" freely, so that
                //    they are not always prompted. More for testing purposes, because in reality,
                //    "orders" should appear in profile as "paid", meaning that particular orders
                //    page shouldn't create any prompts)
                //
                // 2) Order is not paid
                //
                // 3) timer is false:
                //    (set by settimeout to true when timer is finished. This makes
                //    sure that user is not prompted when session expires and is automatically 
                //    routed to "/cart")
                when={!order.isPaid && timer === false}
                beforeConfirm={async() => {
                    console.log('this runs')
                    await deleteOrder(orderId);
                }}
            >
                {({ isActive, onConfirm, onCancel }) =>
                isActive && (
                    <Modal show={isActive}>
                        <div>
                            <p>Do you really want to leave? Your items will be reset</p>
                            <button onClick={onConfirm}>Ok</button>
                            <button onClick={onCancel}>Cancel</button>
                        </div>
                    </Modal>
                )
                }
            </ReactRouterPrompt> */}
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
                        {order.shippingAddress.address}{order.shippingAddress.address2 ? (' ' + order.shippingAddress.address2) : (<></>)}, {order.shippingAddress.city}, {order.shippingAddress.state} {' '}
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
                                    {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
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
                            <Col>${(order.itemsPrice.toFixed(2))}</Col>
                        </Row>

                        <Row>
                            <Col>Shipping</Col>
                            <Col>${(order.shippingPrice).toFixed(2)}</Col>
                        </Row>

                        <Row>
                            <Col>Tax</Col>
                            <Col>${(order.taxPrice).toFixed(2)}</Col>
                        </Row>

                        <Row>
                            <Col>Total</Col>
                            <Col>${(order.totalPrice).toFixed(2)}</Col>
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
                {userInfo && !userInfo.isAdmin && order.isPaid && (
                    <ListGroup.Item>
                        <Button href='/'>Return Home</Button>
                    </ListGroup.Item>
                )}
                </ListGroup>
            </Card>
        </Col>
    </Row>
    </Container>
    </>
  );
}

export default OrderScreen


// const DisableHeader =()=> {
//     let location = useLocation();
//     const [count, setCount] = useState(0);

//     useEffect(()=> {    
//         setCount(count + 1);
//         console.log('Location changed!', location.pathname);
//     }, [location]);

//     return (
//         <div>
//             disable header
//         </div>
//     )
// }

// export {DisableHeader}