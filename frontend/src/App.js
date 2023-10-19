import React from 'react'
import './assets/styles/App.css'
import {Outlet} from 'react-router-dom'
import { Container  } from 'react-bootstrap'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Footer from './components/Footer'




const App = () => {
  return (
    <>
      <Header/>
      <main className='py-3' style={{display: 'flex'}}>
        <Container className='app-container' style={{marginLeft: '20vw'}}>
          <Outlet/>
        </Container>
      </main>
      <Footer/>
      <ToastContainer/>
    </>
  )
}

export default App