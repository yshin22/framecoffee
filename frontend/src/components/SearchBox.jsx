import { useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

const SearchBox = ({onVisible}) => {

    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || '');

    const submitHandler = async (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            setKeyword('');
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    }

  return (
    <Form onSubmit={submitHandler} className='d-flex mb-4'>
        <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
        style={{backgroundColor: 'transparent',
         border: 'none', borderBottom: 'solid #303030', borderRadius: '0', width: '300px', color: '#303030', fontWeight: '500'}}
        >
        </Form.Control>
        <Button type='submit' variant='dark' onClick={() => onVisible()} style={{border: 'none', borderRadius: '0',
    backgroundColor: 'transparent'}}>
            <FaChevronLeft/>
        </Button>
    </Form>
  )
}

export default SearchBox