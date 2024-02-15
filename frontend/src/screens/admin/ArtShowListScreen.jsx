import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Container} from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { 
    useGetArtShowsQuery, 
    useCreateArtShowMutation, 
    useDeleteArtShowMutation
} from '../../slices/artshowApiSlice';
import {toast} from 'react-toastify';
// import '../../assets/styles/screens/productlistscreen.css';

const ArtShowListScreen = () => {

    const {data, isLoading, error, refetch} = useGetArtShowsQuery();

    const [createArtshow, {isLoading: loadingCreate}] = useCreateArtShowMutation();

    const [deleteArtshow, {isLoading: loadingDelete}] = useDeleteArtShowMutation();

    const deleteHandler = async (id) => {

        if (window.confirm('Are you sure?')) {
            try {
                await deleteArtshow(id);
                toast.success('Product deleted')
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    const createArtshowHandler = async () => {
        if (window.confirm('are you sure you want to create a new Artist?')) {
            try {
                console.log('here')
                await createArtshow();
                refetch();
            } catch (err) {
                console.log(err);
                toast.error(err?.data?.message || err.error);
            }
        }
    }
    
  return (
    <Container>
        <Row>
            <Col>
                <h1>Artists</h1>
            </Col>
            <Col>
                <Button className='btn-sm m-3' onClick={createArtshowHandler}>
                    <FaEdit/> Create Artist
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
                            {/* <th>ID</th> */}
                            <th>NAME</th>
                            <th>TITLE</th>
                            <th>FEATURED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {console.log(data)} */}
                        {data?.map((artshow) => (
                            <tr key={artshow._id}>
                                {/* <td>{artshow._id}</td> */}
                                <td>{artshow.name}</td>
                                <td>{artshow.title}</td>
                                <td>
                                    {artshow.isFeat ? (
                                        <FaCheck style={{ color: 'green' }} />
                                        ) : (
                                        <FaTimes style={{ color: 'red' }} />
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/artshow/${artshow._id}/edit`}>
                                        <Button variant='light' className='btn-sm mx-2'>
                                            <FaEdit/>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(artshow._id)}>
                                        <FaTrash style={{color: 'white'}}/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        )}
    </Container>
  )
}

export default ArtShowListScreen