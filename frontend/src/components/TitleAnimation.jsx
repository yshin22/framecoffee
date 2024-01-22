import { useEffect } from 'react';
import '../assets/styles/titleAnimation.css';
import { useParams } from 'react-router-dom';





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

    useEffect(() => {
        const handleScroll = () => {
            var phrase1 = document.getElementById("phrase1");
            var phrase2 = document.getElementById("phrase2");
            var phrase3 = document.getElementById("phrase3");
            var phrase4 = document.getElementById("phrase4");
            var phrase5 = document.getElementById("phrase5");

            // var image1 = document.getElementById("image1");

            var scrollPhrase = document.documentElement.scrollTop * 1;

            if (phrase1 && phrase2 && phrase3 && phrase4 &&phrase5) {

                phrase1.style.transform = "translateX(" + scrollPhrase + "px)";
                phrase2.style.transform = "translateX(-" + scrollPhrase + "px)";
                phrase3.style.transform = "translateX(" + scrollPhrase + "px)";
                phrase4.style.transform = "translateX(-" + scrollPhrase + "px)";
                phrase5.style.transform = "translateX(" + scrollPhrase + "px)";

                // image1.style.transform = "translateY(" + scrollPhrase + "px)";
            
                phrase1.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 1s";
                phrase2.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 1s";
                phrase3.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 1s";
                phrase4.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 1s";
                phrase5.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 1s";

                // image1.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 0.8s";
            };
        }
        window.addEventListener('scroll', handleScroll);
        return() => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, );

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
        <div className='phrase-container' id='phrase1'>
            <div className='phrase highlight'>
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

        <div className='phrase-container' id='phrase2'>
            <div className='phrase'>
                F
            </div>
            <div className='phrase highlight'>
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

        <div className='phrase-container' id='phrase3'>
            <div className='phrase'>
                F
            </div>
            <div className='phrase'>
                R
            </div>
            <div className='phrase highlight'>
                A
            </div> 
            <div className='phrase'>
                M
            </div>
            <div className='phrase'>
                E
            </div>
        </div>

        <div className='phrase-container' id='phrase4'>
            <div className='phrase'>
                F
            </div>
            <div className='phrase'>
                R
            </div>
            <div className='phrase'>
                A
            </div> 
            <div className='phrase highlight'>
                M
            </div>
            <div className='phrase'>
                E
            </div>
        </div>

        <div className='phrase-container' id='phrase5'>
            <div className='phrase'>
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
            <div className='phrase highlight'>
                E
            </div>
        </div>

    </div>

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

    // <div className='text-animation-container'>
    //         <div className='firstHalf' id='phrase1'>
    //             <div className='phrase' style={{color: '#F25000'}}>
    //                 F
    //             </div>
    //             <div className='phrase'>
    //                 R
    //             </div>
    //             <div className='phrase'>
    //                 A
    //             </div>
    //             <div className='phrase'>
    //                 M
    //             </div>
    //             <div className='phrase' style={{color: '#F25000'}}>
    //                 E
    //             </div>
    //         </div>

    //         <div className='secondHalf'>
    //             <div className='between-phrase1' id='phrase2'>
    //                 <div className='phrase'>
    //                     R
    //                 </div>
    //                 <div className='phrase'>
    //                     A
    //                 </div>
    //                 <div className='phrase'>
    //                     M
    //                 </div>
    //             </div>

    //             <div className='image-container' id='image1'>

                    
    //                 <img src={coffee} alt="coffee beans" />
    //             </div>

    //             <div className='between-phrase2' id='phrase3'>
    //                 <div className='phrase'>
    //                     M
    //                 </div>
    //                 <div className='phrase'>
    //                     A
    //                 </div>
    //                 <div className='phrase'>
    //                     R
    //                 </div>
    //             </div>
    //         </div>

    //         <div className='thirdHalf' id='phrase4'>
    //             <div className='phrase' style={{color: '#F25000'}}>
    //                 E
    //             </div>
    //             <div className='phrase'>
    //                 M
    //             </div>
    //             <div className='phrase'>
    //                 A
    //             </div>
    //             <div className='phrase'>
    //                 R
    //             </div>
    //             <div className='phrase' style={{color: '#F25000'}}>
    //                 F
    //             </div>

    //         </div>
    //     </div>
  )
}

export default TitleAnimation