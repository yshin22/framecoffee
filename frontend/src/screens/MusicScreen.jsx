import React, { useState } from 'react'
import '../assets/styles/screens/musicscreen.css'
import { useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const MusicScreen = () => {

  const [loading, setLoading] = useState(true);
  
  return (
    <>
    <Container className='musicScreen-container'>

      <Row className='page-title'>
        <h1>MUSIC</h1>
      </Row>

      <Row className='sub-title py-2'>
          <h2><span className='selectWord'>MUSIC</span>  IS THE UNIVERSIAL LANGUAGE OF MANKIND</h2>
      </Row>

      <Row className='music-player-container'>
        <Col md={6} className='apple-playlist'>
          {loading ? <Loader/> : <></>}
          <iframe onLoad={() => setLoading(false)} allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="450" style={{
          width:"100%", maxWidth: "700px", overflow: "hidden", background:"transparent"}} sandbox="allow-forms allow-popups allow-same-origin 
          allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/playlist/f-r-a-m-e/pl.u-PDb4zXEtJNMZ3P"></iframe>
        </Col>
      </Row>

    </Container>
    <Footer/>
    </>
    
  )
}

export default MusicScreen