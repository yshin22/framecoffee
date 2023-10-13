import React, { useState } from 'react'
import '../assets/styles/header.css'
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


    console.log(cartItems);

    const [visible, setVisible] = useState(false);

  return (
    <header>
        <Navbar  className='navbar-main'bg='dark' variant='dark' expand='lg' collapseOnSelect style={visible ? {...showNav}
        : {...hideNav}}> 
            {/* <Container> */}
                <div className='logo-container'>
                    <LinkContainer to="/" className='logo'>
                        <Navbar.Brand>
                            <img src={logo} alt="framecoffee" />
                        </Navbar.Brand>
                    </LinkContainer>

                    <button className='frame-button' type='button' onClick={() => {visible === false ? (
                        setVisible(true)) : (setVisible(false))}} style={visible ? {...rotateLogo} :
                        {...rotateBack}}>FRAME</button> 
                </div>
                
                    
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Nav className='ms-auto' style={{display:'flex', flexDirection:'column'}}>
                        <SearchBox/>
                        <LinkContainer to="/cart">
                            <Nav.Link><FaShoppingCart/>Cart
                            {
                                cartItems.length > 0 && (
                                    <Badge pill bg='success' style={{marginleft: '5px'}}>
                                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                                    </Badge>
                                )
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
                        
                    </Nav>
            {/* </Container> */}

        </Navbar>
    </header>
  )
}

export default Header