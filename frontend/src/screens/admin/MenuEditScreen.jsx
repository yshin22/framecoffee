import React from 'react'
import {Form, Button} from 'react-bootstrap';
import {
    useUploadMenuImageMutation,
    // useGetMenuImageQuery,
} from '../../slices/uploadApiSlice';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';



const MenuEditScreen = () => {

    const [file, setFile] = useState();
    const [image, setImage] = useState();

    const [uploadMenuImage, {isLoading: loadingUpdate}] = useUploadMenuImageMutation();
    // const {data: menu, isLoading, error, refetch} = useGetMenuImageQuery();

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', file);
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
    <div>
        <input type='file' onChange={e => setFile(e.target.files[0])} multiple/>
        <button onClick={uploadFileHandler}>Upload</button>

        <img style={{height: '300px', width: '250px'}}src={`http://localhost:4000/uploads/` + image} alt="menu"/>
    </div>
  )
}

export default MenuEditScreen