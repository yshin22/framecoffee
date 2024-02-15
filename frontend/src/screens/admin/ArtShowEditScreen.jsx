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
} from '../../slices/artshowApiSlice';

const ArtShowEditScreen = () => {
  const {id: artshowId} = useParams();

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [script, setScript] = useState('');
  const [image, setImage] = useState('');
  const [otherImage, setOtherImage] = useState('');
  const [isFeat, setIsFeat] = useState(false);

  const [imageArray, setImageArray] = useState('');

  const {data: artshow, isLoading, error, refetch} = useGetArtShowDetailsQuery(artshowId);

  const [updateArtshow, {isLoading: loadingUpdate}] = useUpdateArtShowMutation();

  const [uploadProductImage, {isLoading: loadingUpload}] = useUploadArtShowImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if(artshow) {
      setName(artshow.name);
      setTitle(artshow.title);
      setScript(artshow.script);
      setImage(artshow.main_image);
      setOtherImage(artshow.other_image);
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
        image,
        otherImage,
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
    console.log(e.target.files[0])
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    // for (let i = 0; i < image?.length; i++) {
    //   formData.append('images', image[i]);
    // }
    try {
      const res = await uploadProductImage(formData).unwrap();
      // toast.success(res.message);
      // console.log(res.images);
      // setImage(res.images);
  } catch (err) {
      toast.error(err.data.message || err.error);
  }

  }
  //Upload file handler for images
  return (
    <Container>
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

                    <Form.Group controlId='image' className='my-2'>
                        <Form.Label>Main Images</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter image url'
                        value={image}
                        onChange={(e) => setImage}
                        >
                        </Form.Control>
                        <Form.Control
                        type='file'
                        label='Choose file'
                        onChange={uploadFileHandler}
                
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='other_image' className='my-2'>
                        <Form.Label>Other Images</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter image url'
                        value={otherImage}
                        onChange={(e) => setOtherImage}
                        >
                        </Form.Control>
                        <Form.Control
                        type='file'
                        label='Choose file'
                        // onChange={uploadFileHandler1}
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
                            onChange={(e) => setIsFeat(e.target.checked)}>                        
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