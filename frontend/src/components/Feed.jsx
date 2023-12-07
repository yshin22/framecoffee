import React from 'react'
import {FaInstagram} from 'react-icons/fa'

const Feed = (props) => {
    const { id, caption, media_type, media_url, permalink} = props.feed
    let post;

    switch (media_type) {
        case "VIDEO":
            post = (
                <a href={permalink} rel='noreferrer' target='_blank'>
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
                <a href={permalink} rel='noreferrer' target='_blank'>
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
                <a href={permalink} rel='noreferrer' target='_blank'>
                    <img 
                        width='100%'
                        height='auto'
                        id={id} 
                        src={media_url} 
                        alt={caption} 
                    />
                    <div className='insta-overlay'>
                        <div><FaInstagram/></div>
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