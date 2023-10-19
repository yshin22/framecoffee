import React, { useEffect, useState } from 'react'
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
import { current } from '@reduxjs/toolkit'


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
        transform: 'translateX(-70%)',
        transition: 'transform 1s',
    }

    const showPage = {
        transform: 'translateX(80%)',
        transition: 'transform 1s',
    }

    const hidePage = {
        transform: 'translateX(0)',
        transition: 'transform 1s',
    }
    const showSearch = {
        transform: 'translateX(0)',
        transition: 'transform 1s'
    }
    const hideSearch = {
        transform: 'translateX(-180px)',
        transition: 'transform 1s'
    }


    console.log(cartItems);

    const [visible, setVisible] = useState(false);

    const buttonHandler = () => {
        setVisible(current => !current);
    }

  return (
    <header>
        <Navbar bg='dark' variant='light' expand='lg' className='navbar-main' collapseOnSelect
        style={visible ? {...showNav} : {...hideNav}}>
            <Container className='nav-container'>

                <div className='logo-container' style={visible ? {...reverseLogo} : {}}>
                    <LinkContainer to="/" className='logo'>
                        <Navbar.Brand onClick={buttonHandler}>
                            <img src={logo} alt="framecoffee" />
                        </Navbar.Brand>
                    </LinkContainer>

                    <button className='frame-button' 
                    onClick={buttonHandler} 
                    style={visible ? {...rotateLogo}:{...rotateBack}}>
                        FRAME
                    </button>

                </div>

                <Navbar.Toggle aria-controls='navbar-collapse'/>
                <Navbar.Collapse id='navbar-collapse' style={{flexDirection: 'column'}}>

                    <div className='collapsed-content'>
                        <Nav className='navbar-pages'
                        style={visible ? {...showPage} : {...hidePage}}
                        >
                            <LinkContainer to='/about'>
                                <Nav.Link onClick={buttonHandler}>
                                    ABOUT
                                </Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/shop'>
                                <Nav.Link onClick={buttonHandler}>
                                    SHOP
                                </Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/cafe'>
                                <Nav.Link onClick={buttonHandler}>
                                    CAFE
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>

                        

                        <div className='nav-cart-login' style={visible ? {...showSearch} : {...hideSearch}}>
                            <SearchBox isVisible={visible} onVisible={buttonHandler} className='search-box'/>
                            <div className='ncl-1'>
                                <LinkContainer to="/cart">
                                    <Nav.Link onClick={buttonHandler}><FaShoppingCart/>Cart
                                    {
                                        cartItems.length > 0 && (
                                            <Badge pill bg='success' style={{marginleft: '5px'}}>
                                                {cartItems.reduce((a, c) => a + c.qty, 0)}
                                            </Badge>)
                                    }
                                    </Nav.Link>
                                </LinkContainer>

                                {userInfo ? (
                                    <NavDropdown title={userInfo.name} id='username' drop='end'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler && buttonHandler}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                ) : (<LinkContainer to="/login">
                                    <Nav.Link href='/login' onClick={buttonHandler}><FaUser/>Login</Nav.Link>
                                </LinkContainer>)}

                                {userInfo && userInfo.isAdmin && (
                                    <NavDropdown title='Admin' id='adminmenu' drop='end'>
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
                        </div>
                    </div>
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header