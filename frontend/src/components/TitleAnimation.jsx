import { useEffect } from 'react';
import '../assets/styles/titleAnimation.css';
import {Row, Col} from 'react-bootstrap';
import beans from '../assets/coffee-bean.png';
import ProductCarousel from '../components/ProductCarousel';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import coffee from '../assets/productImages/oslo-coffee.webp';
import {Tilt} from 'react-tilt';




const TitleAnimation = () => {

    var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };
    
    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
    
        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
    
        this.el.innerHTML = '<span className="wrap">'+this.txt+'</span>';
    
        var that = this;
        var delta = 200 - Math.random() * 100;
    
        if (this.isDeleting) { delta /= 2; }
    
        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }
    
        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap {}";
        document.body.appendChild(css);
    };


    window.addEventListener('scroll', () => {
        var phrase1 = document.getElementById("phrase1");
        var phrase2 = document.getElementById("phrase2");
        var phrase3 = document.getElementById("phrase3");
        var phrase4 = document.getElementById("phrase4");
        var image1 = document.getElementById("image1");
        // var phrase5 = document.getElementById("phrase5");
        // var bean = document.getElementById("bean")
        // var phrase6 = document.getElementById("phrase6");
        // var phrase7 = document.getElementById("phrase7");
        // && phrase6 && phrase7
        // && bean

        if (phrase1 && phrase2 && phrase3 && phrase4) {
            var scrollPhrase = document.documentElement.scrollTop * 1;
            // var value = window.scrollY * 0.25;
    
            phrase1.style.transform = "translateY(" + scrollPhrase + "px)";
            phrase2.style.transform = "translateX(-" + scrollPhrase + "px)";
            phrase3.style.transform = "translateX(" + scrollPhrase + "px)";
            phrase4.style.transform = "translateY(-" + scrollPhrase + "px)";
            image1.style.transform = "translateY(" + scrollPhrase + "px)";
            // phrase5.style.transform = "translateX(-" + scrollPhrase + "px)";
            // bean.style.transform = `rotate(${value}deg)`;
            // phrase6.style.transform = "translateX(-" + scrollPhrase + "px)";
            // phrase7.style.transform = "translateX(" + scrollPhrase + "px)";
        
            phrase1.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 0.8s";
            phrase2.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 0.8s";
            phrase3.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 0.8s";
            phrase4.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 0.8s";
            image1.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 0.8s";

            // phrase5.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 0.8s";
            // bean.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 0.4s";
            // phrase6.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 1s";
            // phrase7.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 1s";
        };

    });

    const {pageNumber, keyword} = useParams();

    var textPath = document.querySelector('#text-path');

    // function updateTextPathOffset(offset) {
    //     if (textPath) {
    //         textPath.setAttribute('startOffset', offset)
    //     }
    // }
    
    // function onScroll() {
    //     requestAnimationFrame(function() {
    //         updateTextPathOffset(window.scrollY * 0.8)
    //     })
    // }

    // window.addEventListener('scroll', onScroll);



    // function findLength() {
    //     if (textPath) {
    //         textPath.style.setProperty('--total-length', document.querySelector("#our-text").getTotalLength());
    //     }
    // };

    // findLength();

    const defaultOptions = {
        reverse:        true,  // reverse the tilt direction
        max:            35,     // max tilt rotation (degrees)
        perspective:    1100,   // Transform perspective, the lower the more extreme the tilt gets.
        scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
        speed:          800,   // Speed of the enter/exit transition
        transition:     true,   // Set a transition on enter/exit.
        axis:           null,   // What axis should be disabled. Can be X or Y.
        reset:          true,    // If the tilt effect has to be reset on exit.
        easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    }
    

  return (
    <div className='text-animation-wrapper'>
        <div className='text-animation-container'>
            <div className='firstHalf' id='phrase1'>
                <div className='phrase' style={{color: '#F2500'}}>
                    F
                </div>
                <div className='phrase'>
                    R
                </div>
                <div className='phrase'>
                    A
                </div>
                <div className='phrase'>
                    M
                </div>
                <div className='phrase'>
                    E
                </div>
            </div>

            <div className='secondHalf'>
                <div className='between-phrase1' id='phrase2'>
                    <div className='phrase'>
                        R
                    </div>
                    <div className='phrase'>
                        A
                    </div>
                    <div className='phrase'>
                        M
                    </div>
                </div>

                <div className='image-container' id='image1'>
                    <img src={coffee} alt="coffee beans" />
                </div>

                <div className='between-phrase2' id='phrase3'>
                    <div className='phrase'>
                        M
                    </div>
                    <div className='phrase'>
                        A
                    </div>
                    <div className='phrase'>
                        R
                    </div>
                </div>
            </div>

            <div className='thirdHalf' id='phrase4'>
                <div className='phrase'>
                    E
                </div>
                <div className='phrase'>
                    M
                </div>
                <div className='phrase'>
                    A
                </div>
                <div className='phrase'>
                    R
                </div>
                <div className='phrase'>
                    F
                </div>

            </div>
        </div>

    </div>
    
    
    // <div className='text-animation'>

    //     <Tilt options={defaultOptions} className='coffee-image'>
    //         <img src={coffee} alt="oslo coffee" />
    //     </Tilt>

    //      <svg className="svgwave" width='500' height='500' viewBox="0 0 500 500">
    //             <path id="wavepath" d="M62.5,94.39v311.23c0,12.97,10.51,23.48,23.48,23.48h332.39c12.97,0,23.48-10.51,23.48-23.48V94.39 c0-12.97-10.51-23.48-23.48-23.48H85.98C73.01,70.9,62.5,81.42,62.5,94.39z" style={{fill: "transparent", stroke: "transparent", strokeWidth: "1px"}}></path>

    //             <foreignObject x='85' y='90' width='450px' height='450px'>
    //                 <div
    //                         className='text-perimeter'
    //                         style={{width: "335px", height: "320px",
    //                         borderRadius: "8px",
    //                         backgroundSize: "contain",
    //                         border: "4px solid #303030",
    //                         display:"inline-block"}}
    //                 ></div>
    //             </foreignObject>

    //             <foreignObject x='50' y='58' width='450px' height='450px'>
    //                 <div
    //                         className='text-perimeter'
    //                         style={{width: "405px", height: "385px",
    //                         borderRadius: "30px",
    //                         backgroundSize: "contain",
    //                         border: "4px solid #303030",
    //                         display:"inline-block"}}
    //                 ></div>
    //             </foreignObject>

    //         <text className='svg-text' text-anchor="middle">
    //             <textPath className='text' href='#wavepath' startOffset='0%' textLength="2550">
    //                 <animate attributeName="startOffset" from="12.1%" to="42%" begin="0s" dur="7s" repeatCount="indefinite"></animate>
    //                 FRAME <tspan>COFFEE </tspan> 
    //                 FRAME <tspan>COFFEE </tspan> 
    //                 FRAME <tspan>COFFEE </tspan> 
    //                 FRAME <tspan>COFFEE </tspan> 
    //                 FRAME <tspan>COFFEE </tspan> 
    //                 FRAME <tspan>COFFEE </tspan> 
    //                 FRAME <tspan>COFFEE </tspan> 
    //                 FRAME <tspan>COFFEE </tspan> 
    //                 FRAME <tspan>COFFEE </tspan> 
    //                 FRAME <tspan>COFFEE </tspan> 
    //                 FRAME <tspan>COFFEE </tspan> 
    //                 FRAME <tspan>COFFEE </tspan> 
    //             </textPath>
    //         </text>
    //     </svg>

    
    
    // </div>



    // <div className="title-animation">
    //     <div className='first-half'>
    //         <div className="phrase-wrapper-1" id = "phrase1">
    //             <h1 className="phrase">F</h1>
    //         </div>
    //         <div className="phrase-wrapper-2" id = "phrase2">
    //             <h1 className="phrase"></h1>
    //         </div>
    //     </div>

    //     {/* <div className='bean-container' id='bean'>
    //         <img src={beans} alt='coffee beans'/>
    //     </div> */}

    //     <div className='middle-half'>
    //         { !keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light mb-4'>Go Back</Link>}
    //     </div>

    //     <div className='second-half'>
    //         <div className="phrase-wrapper-3" id = "phrase3">
    //             <h1 align='right' className="phrase">WE</h1>
    //         </div>
    //         <div className="phrase-wrapper-4" id = "phrase4">
    //             <h1 align='right' className="phrase">
    //                 <a href="" className="typewrite" data-period="2000" data-type='[ "\"CREATE\"", "\"ROAST\"", "\"BREW\"", "\"DRINK\""]'>
    //                     <span className="wrap"></span>
    //                 </a>
    //             </h1>
    //         </div>
    //         <div className="phrase-wrapper-5" id = "phrase5">
    //             <h1 align='right' className="phrase">EVERYTHING COFFEE</h1>
    //         </div>
    //     </div>
    //     {/* <div className="phrase-wrapper-1" id = "phrase6">
    //         <h1 className="phrase">MADE FOR</h1>
    //     </div>
    //     <div className="phrase-wrapper-2" id = "phrase7">
    //         <h1 className="phrase">HUMANS.</h1>
    //     </div> */}
    // </div>
  )
}

export default TitleAnimation