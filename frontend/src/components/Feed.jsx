import React from 'react'
import {FaInstagram} from 'react-icons/fa'

const Feed = (props) => {
    const { id, caption, media_type, media_url, permalink} = props.feed
    let post;

    switch (media_type) {
        case "VIDEO":
            post = (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <a href={permalink} rel='noreferrer' target='_blank'>
                        <video
                            width='100%'
                            height='auto' 
                            src={media_url} 
                            type="video/mp4" 
                            controls playsinline>
                        </video>
                    </a>
                </div>
            )
            break;
        case "CAROUSEL_ALBUM":
            post = (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <a href={permalink} rel='noreferrer' target='_blank'>
                        <img 
                            width='100%'
                            height='auto'
                            id={id} 
                            src={media_url} 
                            alt={caption} 
                        />                   
                    </a>
                </div>
            );
            break;
        default:
            post = (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <a href={permalink} rel='noreferrer' target='_blank'>
                        <img 
                            width='100%'
                            height='auto'
                            id={id} 
                            src={media_url} 
                            alt={caption} 
                        />
                    </a>
                </div>
            );
    }       

    return (
        <React.Fragment>
            {post}
        </React.Fragment>
    );
}

export default Feed;