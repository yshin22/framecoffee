import React from 'react'
import {Form, Button, Container, Row, Col, Stack} from 'react-bootstrap';
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
    <>
      <Container className='menuEdit-container'>
        <Stack gap={3} className='mx-5'>
          <div className='file-img-container'>
            {image?.map((i) => (
              <div className='file-img'>
                <img style={{height: '300px', width: '250px'}}src={`/uploads/` + i} alt="menu"/>
                {/* <img style={{height: '300px', width: '250px'}}src={`http://localhost:4000/uploads/` + i} alt="menu"/> */}
              </div>
            ))}
          </div>
          <div className='file-btn-container'>
            <input type='file' placeholder='Upload' onChange={e => setFile(e.target.files)} multiple/>
          </div>
          <div className='file-name-container'>
          <Stack gap={2} className='file-name-wrapper'>
            {filesArray?.map((f) => (
              <div className='file-names'>
                {console.log(f)}
                {f.name}
              </div>
            ))}
          </Stack>
          </div>
          <button className='file-upload-btn'onClick={uploadFileHandler}>Upload</button>
        </Stack>
        
      </Container>
    </>
  )
}

export default MenuEditScreen