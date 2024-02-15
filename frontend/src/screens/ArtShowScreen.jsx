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
              <h2>This weeks local Artist</h2>
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
                <Row className='artist-wrapper'>
                  <Col className='carousel-container' lg={6}>
                    <Carousel className='artShow-carousel'>
                      <Carousel.Item>
                      </Carousel.Item>
                    </Carousel>
                  </Col>

                  <Col className='artist-container'>
                    <div className='artist-desc'>
                      <h1>{artshow.name} <span>{artshow.title}</span></h1>
                      <p>
                        {artshow.script}
                      </p>
                    </div>
                    <div className='artist-social'>
                      <span>@instagram</span>
                      <br />
                      <span>@twitter</span>
                      <br />
                      <span>@website</span>
                    </div>
                  </Col>
                </Row>
            
                <div className='hr-container'>
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
                </div>

                <Row className='m-2 artist-gallery-container'>
                  {/* <Col className='col-md-4 col-12 mb-4 mb-lg-0'>
                    <img class="w-100 shadow-1-strong  mb-4" src={image1} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image2} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image3} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image4} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image5} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image6} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image7} alt="" />
                  </Col>

                  <Col class="col-md-4 col-12 mb-4 mb-lg-0'">
                    <img class="w-100 shadow-1-strong  mb-4" src={image8} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image9} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image10} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image11} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image12} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image13} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image14} alt="" />
                  </Col>

                  <Col className='col-md-4 col-12 mb-4 mb-lg-0'>
                    <img class="w-100 shadow-1-strong  mb-4" src={image15} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image16} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image17} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image18} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image19} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image20} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image21} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image22} alt="" />
                    <img class="w-100 shadow-1-strong  mb-4" src={image23} alt="" />
                  </Col> */}
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