import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Container} from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { 
    useGetProductsQuery, 
    useCreateProductMutation, 
    useDeleteProductMutation
} from '../../slices/productsApiSlice';
import {toast} from 'react-toastify';
import '../../assets/styles/screens/productlistscreen.css';


const ProductListScreen = () => {

    const {pageNumber} = useParams();

    const {data, isLoading, error, refetch} = useGetProductsQuery({pageNumber});

    const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation();

    const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation();

const deleteHandler = async (id) => {

    if (window.confirm('Are you sure?')) {
        try {
            await deleteProduct(id);
            toast.success('Product deleted')
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
}

const createProductHandler = async () => {
    if (window.confirm('are you sure you want to create a new product')) {
        try {
            console.log('here')
            await createProduct();
            refetch()
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }
    }
}

  return (
    <Container className='productList-container'>
        <Row>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-end'>
                <Button className='btn-sm m-3' onClick={createProductHandler}>
                    <FaEdit/> Create Product
                </Button>
            </Col>
        </Row>

        {loadingCreate && <Loader/>}
        {loadingDelete && <Loader/>}
        {isLoading ? <Loader/> : error ? <Message variant='danger'>
        {error}</Message> : (
            <Container >
                <Table striped hover responseive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(data)}
                        {data.products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm mx-2'>
                                            <FaEdit/>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                        <FaTrash style={{color: 'white'}}/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={data.pages} page={data.page} isAdmin={true}/>
            </Container>
        )}
  </Container>
  )
}

export default ProductListScreen