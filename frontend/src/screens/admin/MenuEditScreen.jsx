import React from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap';
import {
    useUploadMenuImageMutation,
    useGetMenuImagesQuery,
    useDeleteMenuMutation,
} from '../../slices/uploadApiSlice';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import '../../assets/styles/screens/menueditscreen.css'



const MenuEditScreen = () => {

    const [file, setFile] = useState();
    const [filesArray, setFilesArray] = useState();
    const [image, setImage] = useState();

    const [uploadMenuImage, {isLoading: loadingUpdate}] = useUploadMenuImageMutation();

    const [deleteMenu, isLoading] = useDeleteMenuMutation();

    const {data: menus} = useGetMenuImagesQuery();
    
    const uploadFileHandler = async (e) => {
        const formData = new FormData();

        for (let i = 0; i < file.length; i++) {
          formData.append('images', file[i]);
        }
        try {
            await deleteMenu();
            const res = await uploadMenuImage(formData).unwrap();
            toast.success(res.message);
            console.log(res.menu.image);
            setImage(res.menu.image);
        } catch (err) {
            toast.error(err.data.message || err.error);
        }
      }

      useEffect(() => {
        if (file) { 
          setFilesArray(Array.from(file));
        }
      }, [file]);

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh'}}>
        <input type='file' onChange={e => setFile(e.target.files)} multiple/>
        <Row>
          {filesArray?.map((f) => (
            <Row>
              {console.log(f)}
              {f.name}
            </Row>
          ))}
        </Row>
        <button onClick={uploadFileHandler}>Upload</button>

        <Row>
          {image?.map((i) => (
            <Col>
              {/* <img style={{height: '300px', width: '250px'}}src={`/uploads/` + i} alt="menu"/> */}
              <img style={{height: '300px', width: '250px'}}src={`http://localhost:4000/uploads/` + i} alt="menu"/>

            </Col>
          ))}
          <Col>
          
          </Col>
        </Row>
    </div>
  )
}

export default MenuEditScreen