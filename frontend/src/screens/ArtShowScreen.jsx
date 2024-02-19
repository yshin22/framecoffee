import React, { useEffect, useState } from 'react';
import '../assets/styles/screens/artshowscreen.css';
import {Container, Row, Col, Carousel} from 'react-bootstrap';
import Footer from '../components/Footer';
import {
  useGetArtShowDetailsQuery,
  useGetArtShowFeatQuery,
} from '../slices/artshowApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ArtShowScreen = () => {

  // const {data: artshow, isLoading, error, refetch} = useGetArtShowDetailsQuery();

  const {data: artshow, isLoading, error, refetch} = useGetArtShowFeatQuery();

  return (
    <>
        <Container className='artShow-container'>

            <Row className='page-title'>
              <h1>ART SHOW</h1>
            </Row>
            <Row className='sub-title py-2'>
              <h2>This weeks local Artist {artshow?.name}</h2>
            </Row>

            {/* {console.log(artshow)} */}

            {isLoading ? (
              <Loader/>
            ) : error ? (
              <div>
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
              </div>
            ) : (
              <>
                <Row className='artist-wrapper mt-4'>
                  <Col className='carousel-container m-md-2' lg={6}>
                    <Carousel className='artShow-carousel' interval={null}>
                      {artshow.main_images?.map((i) => (
                        <Carousel.Item>
                          <img src={`/uploads/` + i} alt="art show img"/>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </Col>

                  <Col className='artist-container'>
                    <Row className='artist-desc'>
                      <h1>{artshow.name} <span>{artshow.title}</span></h1>
                      <p>
                        {artshow.script}
                      </p>
                    </Row>
                    <Row className='artist-social'>
                      <span>@instagram</span>
                      <br />
                      <span>@twitter</span>
                      <br />
                      <span>@website</span>
                    </Row>
                  </Col>
                </Row>
            
                <Row className='hr-container'>
                  <div className='top-hr'>
                    <div className='hr-phrase'>
                      F
                    </div>
                    <div className='hr-phrase'>
                      E
                    </div>
                    <div className='hr-phrase'>
                      A
                    </div>
                    <div className='hr-phrase'>
                      T
                    </div>
                    <div className='hr-phrase'>
                      U
                    </div>
                    <div className='hr-phrase'>
                      R
                    </div>
                    <div className='hr-phrase'>
                      E
                    </div>
                    <div className='hr-phrase'>
                      D
                    </div>
                  </div>
                  <div className='mid-hr'>
                  <div className='hr-phrase'>
                      F
                    </div>
                    <div className='hr-phrase'>
                      E
                    </div>
                    <div className='hr-phrase'>
                      A
                    </div>
                    <div className='hr-phrase'>
                      T
                    </div>
                    <div className='hr-phrase'>
                      U
                    </div>
                    <div className='hr-phrase'>
                      R
                    </div>
                    <div className='hr-phrase'>
                      E
                    </div>
                    <div className='hr-phrase'>
                      D
                    </div>
                  </div>
                  <div className='btm-hr'>
                  <div className='hr-phrase'>
                      F
                    </div>
                    <div className='hr-phrase'>
                      E
                    </div>
                    <div className='hr-phrase'>
                      A
                    </div>
                    <div className='hr-phrase'>
                      T
                    </div>
                    <div className='hr-phrase'>
                      U
                    </div>
                    <div className='hr-phrase'>
                      R
                    </div>
                    <div className='hr-phrase'>
                      E
                    </div>
                    <div className='hr-phrase'>
                      D 
                    </div>
                  </div>
                </Row>
                <Row className='m-2 artist-gallery-container'>
                    {artshow.other_images?.map((i, index) => (
                      // divide the length of images into 3
                      <Col className='col-md-4 col-12 mb-4 mb-lg-4'>
                        <img class="w-100 h-100 shadow-1-strongx" style={{objectFit: 'cover'}}
                        src={`/uploads/` + i} alt="Collage of images"/>
                      </Col>
                    ))}
                </Row>
            </>
            )
          }
        </Container>
        <Footer/>
    </>
  )
}

export default ArtShowScreen