import React from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap';
import {
    useUploadMenuImageMutation,
    useGetMenuImagesQuery,
} from '../../slices/uploadApiSlice';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';



const MenuEditScreen = () => {

    const [file, setFile] = useState();
    const [image, setImage] = useState();

    const [uploadMenuImage, {isLoading: loadingUpdate}] = useUploadMenuImageMutation();
    const {data: menus} = useGetMenuImagesQuery();

    const uploadFileHandler = async (e) => {
        const formData = new FormData();

        for (let i = 0; i < file.length; i++) {
          formData.append('images', file[i]);
        }
        // formData.append('image', file);
        try {
            const res = await uploadMenuImage(formData).unwrap();
            toast.success(res.message);
            console.log(res.image);
            setImage(res.image);
        } catch (err) {
            toast.error(err.data.message || err.error);
        }
      }

    // useEffect( () => {
    //     console.log(menu)
    //     setImage(file);
    // }, [menu])

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh'}}>
        <input type='file' onChange={e => setFile(e.target.files)} multiple/>
        {console.log(file)};
        <button onClick={uploadFileHandler}>Upload</button>

        <Row>
          {image?.map((i) => (
            <Col>
              <img style={{height: '300px', width: '250px'}}src={`http://localhost:4000/uploads/` + i} alt="menu"/>
            </Col>
          ))}
          <Col>
          
          </Col>
        </Row>
        {/* <img style={{height: '300px', width: '250px'}}src={`http://localhost:4000/uploads/` + image} alt="menu"/> */}

        {/* {console.log(menus)} */}
    </div>
  )
}

export default MenuEditScreen