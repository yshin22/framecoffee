import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container} from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { 
    useUpdateProductMutation, 
    useGetProductDetailsQuery, 
    useUploadProductImageMutation } 
    from '../../slices/productsApiSlice';
import '../../assets/styles/screens/producteditscreen.css'

const ProductEditScreen = () => {
    const {id: productId} = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [secondImage, setSecondImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [origin, setOrigin] = useState('');
    const [cuppingNote, setCuppingNote] = useState('');
    const [roastingLevel, setRoastingLevel] = useState(0);
    const [size, setSize] = useState(0);

    const {data: product, isLoading, error, refetch} = useGetProductDetailsQuery(productId);

    const [updateProduct, {isLoading: loadingUpdate}] = useUpdateProductMutation();

    const [uploadProductImage, {isLoading: loadingUpload}] = useUploadProductImageMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if(product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setSecondImage(product.secondImage);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
            setOrigin(product.origin);
            setCuppingNote(product.cuppingNote);
            setRoastingLevel(product.roastingLevel);
            setSize(product.size);
        }
    }, [product]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          await updateProduct({
            productId,
            name,
            price,
            image,
            secondImage,
            brand,
            category,
            description,
            countInStock,
            origin,
            cuppingNote,
            roastingLevel,
            size,
          }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
          toast.success('Product updated');
          refetch();
          navigate('/admin/productlist');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };

      const uploadFileHandler = async (e) => {
        console.log(e.target.files[0]);
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            console.log(`File Handler 1. res: ${res.image}`);
            toast.success(res.message);
            setImage(res.image);
        } catch (err) {
            toast.error(err.data.message || err.error);
        }
      }

      const uploadFileHandler1 = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            console.log(`File Handler 2. res: ${res.image}`)
            toast.success(res.message);
            setSecondImage(res.image);
        } catch (err) {
            toast.error(err.data.message || err.error);
        }
      } 

  return ( 
    <Container className='productEdit-container'>
    <Link to='/admin/productlist' className='btn btn-light my-2'>
        Go Back
    </Link>
    <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader/>}

        {isLoading ? <Loader/> : error ? <Message variant='danger'>
            {error.data.message}</Message> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='my-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}> 
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price' className='my-2'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                        type='number'
                        placeholder='Enter price'
                        value={price}
                        step='any'
                        min="0"
                        onChange={(e) => setPrice(e.target.value)}> 
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image' className='my-2'>
                        <Form.Label>First Image</Form.Label>
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

                    <Form.Group controlId='image2' className='my-2'>
                        <Form.Label>Second Image</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter image url'
                        value={secondImage}
                        onChange={(e) => setSecondImage}
                        >
                        </Form.Control>
                        <Form.Control
                        type='file'
                        label='Choose file'
                        onChange={uploadFileHandler1}
                        ></Form.Control>
                    </Form.Group>
                    {loadingUpload && <Loader/>}

                    <Form.Group controlId='brand' className='my-2'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}> 
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock' className='my-2'>
                        <Form.Label>Count in stock</Form.Label>
                        <Form.Control
                        type='number'
                        placeholder='Enter countInStock'
                        value={countInStock}
                        min="0"
                        onChange={(e) => setCountInStock(e.target.value)}> 
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category' className='my-2'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}> 
                        </Form.Control>
                    </Form.Group>

                    {category === 'Coffee Beans' ? (
                        <Form.Group controlId='size' className='my-2'>
                            <Form.Label>Size</Form.Label>
                            <Form.Control
                            type='number'
                            min='0'
                            placeholder='Enter size (grams)'
                            value={size}
                            onChange={(e) => setSize(e.target.value)}> 
                            </Form.Control>
                        </Form.Group>
                    ) : (<></>)}

                    <Form.Group controlId='description' className='my-2'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}> 
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='origin' className='my-2'>
                        <Form.Label>Origin</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter Origin'
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}> 
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='cuppingNote' className='my-2'>
                        <Form.Label>Cupping Note</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter Cupping Note'
                        value={cuppingNote}
                        onChange={(e) => setCuppingNote(e.target.value)}> 
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='roastingLevel' className='my-2'>
                        <Form.Label>Roasting Level</Form.Label>
                        <Form.Control
                        type='number'
                        placeholder='Enter Roasting Level'
                        value={roastingLevel}
                        min="0"
                        onChange={(e) => setRoastingLevel(e.target.value)}> 
                        </Form.Control>
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

export default ProductEditScreen