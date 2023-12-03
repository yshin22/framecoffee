import React, { useEffect, useState } from 'react'
import '../assets/styles/header.css'
import {Row, Col, Stack, NavbarToggle, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {Badge, Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {FaLaptopHouse, FaShoppingCart, FaUser} from 'react-icons/fa'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import logo from "../assets/logo.png"
import {LinkContainer} from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import {useSelector, useDispatch} from 'react-redux'
import { showNav, 
    hideNav, 
    rotateLogo, 
    rotateBack, 
    reverseLogo,
    showPage,
    hidePage,
    showSearch,
    hideSearch,
 } from '../utils/headerUtils'

const Header = () => {

    const {cartItems} = useSelector((state) => state.cart);
    const {userInfo} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const [visible, setVisible] = useState(false);

    const logoutHandler = async () => {
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');

        }catch (error) {
            console.log(error);
        }
    }

    function buttonHandler() {
        setVisible(current => !current);
    }
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }

    function callFunctions() {
        buttonHandler();
        topFunction();
    }

  return (
    <header>
        <Navbar bg='dark' variant='light' expand='lg' className='navbar-main' collapseOnSelect
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={visible ? {...showNav} : {...hideNav}}>
            <Container className='nav-container'>

                <div className='logo-container' style={visible ? {...reverseLogo} : {}}>
                    <LinkContainer to="/" className='logo'>
                        <Nav.Link onClick={!visible ? {} : callFunctions}>
                            <img src={logo} alt="framecoffee" />
                        </Nav.Link>
                    </LinkContainer>

                    <button className='frame-button' 
                    /*onClick={buttonHandler}*/
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
                                <Nav.Link onClick={callFunctions}>
                                    ABOUT
                                </Nav.Link>
                            </LinkContainer>

                            <NavDropdown title='COFFEE'>
                                <NavDropdown.Item>
                                    <LinkContainer to='/shop'>
                                        <Nav.Link onClick={callFunctions} className='dropdown-item-title'>
                                            SHOP
                                        </Nav.Link>
                                    </LinkContainer>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <LinkContainer to='/menu'>
                                        <Nav.Link onClick={callFunctions} className='dropdown-item-title'>
                                            MENU    
                                        </Nav.Link>
                                    </LinkContainer>
                                </NavDropdown.Item>
                                {/* <NavDropdown.Item>
                                    <LinkContainer to='/wholesale'>
                                        <Nav.Link onClick={callFunctions} className='dropdown-item-title'>
                                            WHOLESALE
                                        </Nav.Link>
                                    </LinkContainer>
                                </NavDropdown.Item> */}
                            </NavDropdown>

                            <NavDropdown title='PHOTO'>
                                <NavDropdown.Item>
                                    <LinkContainer to='/gallery'>
                                        <Nav.Link onClick={callFunctions} className='dropdown-item-title'>
                                            GALLERY
                                        </Nav.Link>
                                    </LinkContainer>
                                </NavDropdown.Item>
                                <NavDropdown.Item >
                                    <LinkContainer to='/shop'>
                                        <Nav.Link onClick={callFunctions} className='dropdown-item-title'>
                                            ARTSHOW    
                                        </Nav.Link>
                                    </LinkContainer>
                                </NavDropdown.Item>

                            </NavDropdown>

                            <LinkContainer to='/music'>
                                <Nav.Link onClick={callFunctions}>
                                     MUSIC
                                </Nav.Link>
                            </LinkContainer>

                        </Nav>

                        <div className='nav-cart-login' style={visible ? {...showSearch} : {...hideSearch}}>
                            
                            {/* <SearchBox isVisible={visible} onVisible={callFunctions} className='search-box'/> */}

                            <div className='ncl-1'>
                                <LinkContainer to="/cart">
                                    <Nav.Link onClick={callFunctions}><FaShoppingCart/>Cart
                                    {
                                        cartItems.length > 0 && (
                                            <Badge pill bg='success' style={{marginleft: '5px'}}>
                                                {cartItems.reduce((a, c) => a + c.qty, 0)}
                                            </Badge>)
                                    }
                                    </Nav.Link>
                                </LinkContainer>

                                {userInfo ? (
                                    <NavDropdown title={userInfo.name} id='username' drop='up'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item onClick={callFunctions}>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={() => {logoutHandler(); callFunctions()}}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                ) : (<LinkContainer to="/login">
                                    <Nav.Link href='/login' onClick={callFunctions}><FaUser/>Login</Nav.Link>
                                </LinkContainer>)}

                                {userInfo && userInfo.isAdmin && (
                                    <NavDropdown title='Admin' id='adminmenu' drop='up'>
                                        <LinkContainer to='/admin/productlist'>
                                            <NavDropdown.Item onClick={callFunctions}>Products</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item onClick={callFunctions}>Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/orderlist'>
                                            <NavDropdown.Item onClick={callFunctions}>Orders</NavDropdown.Item>
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