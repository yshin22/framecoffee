import React from 'react';
import '../assets/styles/textPath.css';

const TextPath = () => {

    
  return (
    <div className='svg-container' style={{borderBottom: "solid #303030", borderTop:'solid #303030'}}>
        <svg className="svgwave"  viewBox="0 0 1000 40">
            <path id="wavepath" d="M0 25h1000" style={{fill: "transparent", stroke: "transparent", strokeWidth: "1px"}}></path>
{/* 
            <foreignObject x='85' y='90' width='450px' height='450px'>
                <div
                    className='text-perimeter'
                    style={{width: "335px", height: "320px",
                    borderRadius: "8px",
                    backgroundSize: "contain",
                    border: "4px solid #303030",
                    display:"inline-block"}}
                ></div>
            </foreignObject> */}

            {/* <foreignObject width='1000px' height='60px'>
                <div
                        className='text-perimeter'
                        style={{width: "1010px", height: "50px",
                        borderRadius: "30px",
                        backgroundSize: "contain",
                        border: "4px solid #303030",
                        display:"inline-block"}}
                ></div>
            </foreignObject> */}

            <text className='svg-text' text-anchor="middle">
                <textPath className='text' href='#wavepath' startOffset='0%' textLength="3500">
                    <animate attributeName="startOffset" from="0%" to="100%" begin="0s" dur="25s" repeatCount="indefinite"></animate>
                    <tspan><a href='https://apps.apple.com/us/app/frame-coffee-roasters/id6448272834' rel='noreferrer' target='_blank'>
                        | DOWNLOAD OUR APP |</a>
                    </tspan>  
                    FRAME COFFEE 
                    <tspan><a href='https://apps.apple.com/us/app/frame-coffee-roasters/id6448272834' rel='noreferrer' target='_blank'>
                        | DOWNLOAD OUR APP |</a>
                    </tspan>                     
                    FRAME COFFEE  
                    <tspan><a href='https://apps.apple.com/us/app/frame-coffee-roasters/id6448272834' rel='noreferrer' target='_blank'>
                        | DOWNLOAD OUR APP |</a>
                    </tspan>                     
                    FRAME <tspan>COFFEE </tspan> 
                    <tspan><a href='https://apps.apple.com/us/app/frame-coffee-roasters/id6448272834' rel='noreferrer' target='_blank'>
                        | DOWNLOAD OUR APP |</a>
                    </tspan>                     
                    FRAME <tspan>COFFEE </tspan> 
                    <tspan><a href='https://apps.apple.com/us/app/frame-coffee-roasters/id6448272834' rel='noreferrer' target='_blank'>
                        | DOWNLOAD OUR APP |</a>
                    </tspan>                     
                    FRAME <tspan>COFFEE </tspan> 
                    <tspan><a href='https://apps.apple.com/us/app/frame-coffee-roasters/id6448272834' rel='noreferrer' target='_blank'>
                        | DOWNLOAD OUR APP |</a>
                    </tspan>                     
                    FRAME <tspan>COFFEE </tspan> 
                </textPath>
            </text>
        </svg>

      
        
    </div>
  )
}

export default TextPath
