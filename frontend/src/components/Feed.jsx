import React from 'react'
import {FaInstagram} from 'react-icons/fa'

const Feed = (props) => {
    const { id, caption, media_type, media_url, permalink} = props.feed
    let post;

    switch (media_type) {
        case "VIDEO":
            post = (
                <a href={permalink}>
                    <video
                        width='100%'
                        height='auto' 
                        src={media_url} 
                        type="video/mp4" 
                        controls playsinline>
                    </video>
                </a>

            )
            break;
        case "CAROUSEL_ALBUM":
            post = (
                <a href={permalink}>
                    <img 
                        width='100%'
                        height='auto'
                        id={id} 
                        src={media_url} 
                        alt={caption} 
                    />                   
                </a>
            );
            break;
        default:
            post = (
                <a href={permalink}>
                    <img 
                        width='100%'
                        height='auto'
                        id={id} 
                        src={media_url} 
                        alt={caption} 
                    />
                    <div className='insta-overlay'>
                        <FaInstagram/>
                    </div>
                </a>
            );
    }       

    return (
        <React.Fragment>
            {post}
        </React.Fragment>
    );
}

export default Feed;