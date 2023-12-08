import React from 'react'
import '../assets/styles/screens/musicscreen.css'
import {Helmet} from 'react-helmet';
import { useEffect } from 'react';
import { Container, Row} from 'react-bootstrap';
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

      <div className='music-player-container'>

        <iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="450" style={{
          width:"100%", maxWidth: "660px", overflow: "hidden", background:"transparent"
        }} sandbox="allow-forms allow-popups allow-same-origin allow-scripts 
        allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
        src="https://embed.music.apple.com/us/album/this-thing-called-living-ep/1543015873"></iframe>

      </div>
    </Container>
    <Footer/>
    </>
    
  )
}

export default MusicScreen