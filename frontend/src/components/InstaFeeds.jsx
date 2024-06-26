import React, { useState, useEffect, useRef} from 'react'
import axios from 'axios'

import Feed from './Feed'
import {FaInstagram} from 'react-icons/fa'

import '../assets/styles/instaFeeds.css';

const InstaFeeds = ({token, ...props}) => {
    const [feeds, setFeedsData] = useState([]);
    //use useRef to store the latest value of the prop without firing the effect
    const tokenProp = useRef(token);
    tokenProp.current = token;

    useEffect(() => {
        // this is to avoid memory leaks
        const abortController = new AbortController();

        async function fetchInstagramPost () {  
          try{
            axios
                .get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption,permalink&limit=${props.limit}&access_token=${tokenProp.current}`)
                .then((resp) => {
                    setFeedsData(resp.data.data)
                })
          } catch (err) {
              console.log('error', err)
          }
        }

        // manually call the fecth function 
        fetchInstagramPost();
  
        return () => {
            // cancel pending fetch request on component unmount
            abortController.abort(); 
        };
    }, [props.limit])
    

    const images = require.context('../assets/testImages', true, /\.(png|jpe?g|svg)$/);
    const imagesList = images.keys().map(image => images(image));
    
    return (
        <div className="insta-container">
            
            {/* {imagesList.map((image, index) => (
                <div style={{}}>
                    <img style={{objectFit: 'cover'}} key={index} src={image} alt={`image-${index}`}/>
                </div>
            ))} */}
            {feeds.map((feed, index) => (
                <>
                    <Feed key={feed.id} feed={feed} />
                </>
            ))}            

        </div>
        // {feeds.map((feed, index) => (
        //     <Feed key={feed.id} feed={feed} />
        // ))}
    );
}


export default InstaFeeds;