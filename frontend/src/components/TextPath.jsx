/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import '../assets/styles/textPath.css';

const TextPath = () => {

    
  return (
    <div className='svg-container' style={{borderBottom: "solid #303030", borderTop:'solid #303030'}}>
        <a href='https://apps.apple.com/us/app/frame-coffee-roasters/id6448272834' rel='noreferrer' target='_blank'>
            <svg className="svgwave"  viewBox="0 0 1000 40">
                <path id="wavepath" d="M0 25h1000" style={{fill: "transparent", stroke: "transparent", strokeWidth: "1px"}}></path>
                <text className='svg-text' text-anchor="middle">
                    <textPath className='text' href='#wavepath' startOffset='0%' textLength="3500">
                        <animate attributeName="startOffset" from="0%" to="100%" begin="0s" dur="25s" repeatCount="indefinite"></animate>
                        <tspan>DOWNLOAD-OUR-APP</tspan>  
                        &nbsp;|| FRAME COFFEE ROASTERS ||&nbsp; 
                        <tspan> DOWNLOAD-OUR-APP </tspan>  
                        &nbsp;|| FRAME COFFEE ROASTERS ||&nbsp;
                        <tspan>DOWNLOAD-OUR-APP</tspan>                   
                        &nbsp;|| FRAME COFFEE ROASTERS ||&nbsp;
                        <tspan>DOWNLOAD-OUR-APP</tspan>                     
                        &nbsp;|| FRAME COFFEE ROASTERS ||&nbsp;
                        <tspan>DOWNLOAD-OUR-APP</tspan>                    
                        &nbsp;|| FRAME COFFEE ROASTERS ||&nbsp;
                        <tspan>DOWNLOAD-OUR-APP</tspan>                     
                        &nbsp;|| FRAME COFFEE ROASTERS ||&nbsp;
                    </textPath>
                </text>
            </svg>
        </a>        
    </div>
  )
}

export default TextPath
