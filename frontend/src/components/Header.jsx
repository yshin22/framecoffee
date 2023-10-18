import React, { useState } from 'react'
import '../assets/styles/header.css'
import {Row, Col, Stack, NavbarToggle, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {Badge, Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import logo from "../assets/logo.png"
import {LinkContainer} from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import {useSelector, useDispatch} from 'react-redux'


const Header = () => {

    const {cartItems} = useSelector((state) => state.cart);
    const {userInfo} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');

        }catch (error) {
            console.log(error);
        }
    }
    const showNav = {
        transform: 'translateX(50%)', 
        transition: 'transform 1s',  
    }

    const hideNav = {
        transform: 'translateX(0%)', 
        transition: 'transform 1s', 
    }

    const rotateLogo = {
        transform: 'rotate(0deg)',
        transition: 'transform 1s',
    }

    const rotateBack = {
        transform: 'rotate(-90deg)',
        transition: 'transform 1s',
    }

    const reverseLogo = {
        transform: 'translateX(-120%)',
        transition: 'transform 1s',
    }

    const showPage = {
        transform: 'translateX(35%)',
        transition: 'transform 1s',
    }


    console.log(cartItems);

    const [visible, setVisible] = useState(false);

  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='lg' className='navbar-main' collapseOnSelect>
            <Container className='nav-container'>

                <LinkContainer to="/" className='logo'>
                    <Navbar.Brand>
                        <img src={logo} alt="framecoffee" />
                    </Navbar.Brand>
                </LinkContainer>

                <Button className='frame-button'>FRAME</Button>

                <Navbar.Toggle aria-controls='navbar-collapse'/>
                <Navbar.Collapse id='navbar-collapse' style={{flexDirection: 'column'}}>

                    <Nav className='navbar-pages'>
                        <LinkContainer to='/about'>
                            <Nav.Link>
                                ABOUT
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/shop'>
                            <Nav.Link>
                                SHOP
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/cafe'>
                            <Nav.Link>
                                CAFE
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>

                    <div className='nav-cart-login'>
                            <LinkContainer to="/cart">
                                <Nav.Link><FaShoppingCart/>Cart
                                {
                                    cartItems.length > 0 && (
                                        <Badge pill bg='success' style={{marginleft: '5px'}}>
                                            {cartItems.reduce((a, c) => a + c.qty, 0)}
                                        </Badge>)
                                }
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>

                            ) : (<LinkContainer to="/login">
                                <Nav.Link href='/login'><FaUser/>Login</Nav.Link>
                            </LinkContainer>)}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header