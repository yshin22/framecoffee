import { Container, Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { useState, useEffect } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {
  useUpdateArtShowMutation,
  useGetArtShowDetailsQuery,
  useUploadArtShowImageMutation,
  useUpdateFeatMutation,
} from '../../slices/artshowApiSlice';

const ArtShowEditScreen = () => {
  const {id: artshowId} = useParams();

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [script, setScript] = useState('');
  const [main_images, setImage] = useState('');
  const [other_images, setOtherImage] = useState('');
  const [quote, setQuote] = useState('');
  const [instagram, setInstagram] = useState('');
  const [website, setWebsite] = useState('');
  const [isFeat, setIsFeat] = useState(false);

  const {data: artshow, isLoading, error, refetch} = useGetArtShowDetailsQuery(artshowId);

  const [updateArtshow, {isLoading: loadingUpdate}] = useUpdateArtShowMutation();

  const [uploadProductImage, {isLoading: loadingUpload}] = useUploadArtShowImageMutation();

  const [updateFeat] = useUpdateFeatMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if(artshow) {
      setName(artshow.name);
      setTitle(artshow.title);
      setScript(artshow.script);
      setImage(artshow.main_images);
      setOtherImage(artshow.other_images);
      setQuote(artshow.quote);
      setInstagram(artshow.instagram);
      setWebsite(artshow.website);
      setIsFeat(artshow.isFeat);
    }
  }, [artshow]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateArtshow({
        artshowId,
        name,
        title,
        script,
        main_images,
        other_images,
        quote,
        instagram,
        website,
        isFeat,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Artshow updated');
      refetch();
      navigate('/admin/artshowlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    console.log(e.target.files)
    const formData = new FormData();
    // formData.append('image', e.target.files);
    for (let i = 0; i < e.target.files.length; i++) {
      console.log(e.target.files[i]);
      formData.append('images', e.target.files[i]);
    }
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      console.log(res.images);
      setImage(res.images);
    } catch (err) {
      toast.error(err.data.message || err.error);
    }
  }

  const uploadFileHandler1 = async (e) => {
    console.log(e.target.files)
    const formData = new FormData();
    // formData.append('image', e.target.files);
    for (let i = 0; i < e.target.files.length; i++) {
      console.log(e.target.files[i]);
      formData.append('images', e.target.files[i]);
    }
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      console.log(res.images);
      setOtherImage(res.images);
    } catch (err) {
        toast.error(err.data.message || err.error);
    }
  }

  const featHandler = async (e) => {
    try {
      if (isFeat === false) {
        const res = await updateFeat();
        toast.success(res.message);
        setIsFeat(true);
      } else {
        setIsFeat(false);
      }
    } catch (err) { 
      console.log(err)
    }
  };

  //Upload file handler for images
  return (
    <Container className='artShowEdit-container'>
      <Link to='/admin/artshowlist' className='btn btn-light my-2'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit {artshow?.name}'s Screen</h1>
        {loadingUpdate && <Loader/>}

        {isLoading ? <Loader/> : error ? <Message variant='danger'>
            {error.data.message}</Message> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='my-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}> 
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='title' className='my-2'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}> 
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='title' className='my-2'>
                        <Form.Label>Quote</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter Quote'
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}> 
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='title' className='my-2'>
                        <Form.Label>Instagram</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Instagram Link'
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}> 
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='title' className='my-2'>
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Website Link'
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}> 
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image' className='my-2'>
                        <Form.Label>Main Images</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter image url'
                        value={main_images}
                        onChange={(e) => setImage}
                        >
                        </Form.Control>
                        <Form.Control
                        type='file'
                        label='Choose file'
                        onChange={uploadFileHandler}
                        multiple
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='other_image' className='my-2'>
                        <Form.Label>Other Images</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter image url'
                        value={other_images}
                        onChange={(e) => setOtherImage}
                        >
                        </Form.Control>
                        <Form.Control
                        type='file'
                        label='Choose file'
                        onChange={uploadFileHandler1}
                        multiple
                        ></Form.Control>
                    </Form.Group>
                    {loadingUpload && <Loader/>}

                    <Form.Group controlId='script' className='my-2'>
                        <Form.Label>Script</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter description'
                        value={script}
                        onChange={(e) => setScript(e.target.value)}> 
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='isFeat' className='my-2'>
                            <Form.Check
                            type='checkbox'
                            label='Is Featured'
                            checked={isFeat}
                            onChange={featHandler}>                        
                            </Form.Check>
                    </Form.Group>

                    <Button
                    type='submit'
                    variant='primary'
                    className='my-2'
                    >
                        Update
                    </Button>

                </Form>
            )}
      </FormContainer>
    </Container>
  )
}

export default ArtShowEditScreen