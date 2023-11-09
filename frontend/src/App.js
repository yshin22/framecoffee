import React from 'react'
import './assets/styles/App.css'
import './assets/styles/titleAnimation.css'
import {Outlet} from 'react-router-dom'
import { Container  } from 'react-bootstrap'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import InstaFeeds from './components/InstaFeeds'
import Footer from './components/Footer'





const App = () => {
  return (
    <>
        <Header/>
        <main style={{display: 'flex', justifyContent: 'center'}}>
          <div className='nav-blank'></div>
          <Container className='app-container'>
            <Outlet/>
          </Container>
        </main>
        <ToastContainer/>
     
    </>
  )
}

export default App