import '../assets/styles/screens/artshowscreen.css';
import {Container, Row, Col, Carousel} from 'react-bootstrap';
import Footer from '../components/Footer';
import {
  useGetArtShowFeatQuery,
} from '../slices/artshowApiSlice';
import Loader from '../components/Loader';

const ArtShowScreen = () => {

  const {data: artshow, isLoading, error, refetch} = useGetArtShowFeatQuery();

  return (
    <>
        <Container className='artShow-container'>

            <Row className='page-title'>
              <h1>ART SHOW</h1>
            </Row>
            <Row className='sub-title py-2'>
              <h2>{artshow?.quote}</h2>
            </Row>

            {/* {console.log(artshow)} */}

            {isLoading ? (
              <Loader/>
            ) : !artshow ? (
                <Container className='coming-soon-container'>
                  <Row className='hr-container'>
                    <div className='top-hr'>
                      <div className='hr-phrase'>
                        C
                      </div>
                      <div className='hr-phrase'>
                        O
                      </div>
                      <div className='hr-phrase'>
                        M
                      </div>
                      <div className='hr-phrase'>
                        I
                      </div>
                      <div className='hr-phrase'>
                        N
                      </div>
                      <div className='hr-phrase'>
                        G
                      </div>
                      <div className='hr-phrase'>
                        &nbsp;
                      </div>
                      <div className='hr-phrase'>
                        S
                      </div>
                      <div className='hr-phrase'>
                        O
                      </div>
                      <div className='hr-phrase'>
                        O
                      </div>
                      <div className='hr-phrase'>
                        N
                      </div>
                    </div>
                  <div className='mid-hr'>
                    <div className='hr-phrase'>
                      C
                    </div>
                    <div className='hr-phrase'>
                      O
                    </div>
                    <div className='hr-phrase'>
                      M
                    </div>
                    <div className='hr-phrase'>
                      I
                    </div>
                    <div className='hr-phrase'>
                      N
                    </div>
                    <div className='hr-phrase'>
                      G
                    </div>
                    <div className='hr-phrase'>
                      &nbsp;
                    </div>
                    <div className='hr-phrase'>
                      S
                    </div>
                    <div className='hr-phrase'>
                      O
                    </div>
                    <div className='hr-phrase'>
                      O
                    </div>
                    <div className='hr-phrase'>
                      N
                    </div>
                  </div>
                  <div className='btm-hr'>
                    <div className='hr-phrase'>
                        C
                      </div>
                      <div className='hr-phrase'>
                        O
                      </div>
                      <div className='hr-phrase'>
                        M
                      </div>
                      <div className='hr-phrase'>
                        I
                      </div>
                      <div className='hr-phrase'>
                        N
                      </div>
                      <div className='hr-phrase'>
                        G
                      </div>
                      <div className='hr-phrase'>
                        &nbsp;
                      </div>
                      <div className='hr-phrase'>
                        S
                      </div>
                      <div className='hr-phrase'>
                        O
                      </div>
                      <div className='hr-phrase'>
                        O
                      </div>
                      <div className='hr-phrase'>
                        N
                      </div>
                    </div>
                  </Row>  
                </Container>
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
                    <Row className='artist-social m-xs-2' >
                      <Col className='mb-2' lg={12}> 
                        <a href={artshow.instagram} target="_blank">INSTAGRAM</a>
                      </Col>
                      {artshow.website === '@website' ? ({}) : 
                      (
                        <Col> 
                          <a href={artshow.website} target="_blank">WEBSITE</a>
                        </Col>
                      )}
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