import React from 'react'
import '../assets/styles/screens/musicscreen.css'
import {Helmet} from 'react-helmet';
import { useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import Footer from '../components/Footer';

const MusicScreen = () => {
  
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

        <Col md={6}>
        <iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="450" style={{
            width:"100%", maxWidth: "660px", overflow: "hidden", background:"transparent"}}
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation 
            6allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/album/jannabis-small-pieces-i-ep/1539127949"></iframe>
        </Col>

        <Col md={6} style={{}}>
          <Row>
            <iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style={{
            width:"100%", maxWidth: "660px", overflow: "hidden", background:"transparent"}} 
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation
            allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/album/regret/1040965893?i=1040966395"></iframe>
          </Row>
          <Row className='mt-3'>
            <iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style={{
              width:"100%", maxWidth: "660px", overflow: "hidden", background:"transparent"
            }} sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation
            allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/album/still-fighting-it/190084442?i=190084514"></iframe> 
          </Row>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
    
  )
}

export default MusicScreen