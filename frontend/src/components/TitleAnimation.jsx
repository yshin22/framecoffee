import { useEffect } from 'react';
import '../assets/styles/titleAnimation.css';
import beans from '../assets/coffee-bean.png';
import ProductCarousel from '../components/ProductCarousel';
import { Link } from 'react-router-dom';
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


    window.addEventListener('scroll', () => {
        var phrase1 = document.getElementById("phrase1");
        var phrase2 = document.getElementById("phrase2");
        var phrase3 = document.getElementById("phrase3");
        var phrase4 = document.getElementById("phrase4");
        var phrase5 = document.getElementById("phrase5");
        // var bean = document.getElementById("bean")
        // var phrase6 = document.getElementById("phrase6");
        // var phrase7 = document.getElementById("phrase7");
        // && phrase6 && phrase7
        // && bean

        if (phrase1 && phrase2 && phrase3 && phrase4 && phrase5) {
            var scrollPhrase = document.documentElement.scrollTop * 1;
            // var value = window.scrollY * 0.25;
    
            phrase1.style.transform = "translateX(" + scrollPhrase + "px)";
            phrase2.style.transform = "translateX(" + scrollPhrase + "px)";
            phrase3.style.transform = "translateX(-" + scrollPhrase + "px)";
            phrase4.style.transform = "translateX(-" + scrollPhrase + "px)";
            phrase5.style.transform = "translateX(-" + scrollPhrase + "px)";
            // bean.style.transform = `rotate(${value}deg)`;
            // phrase6.style.transform = "translateX(-" + scrollPhrase + "px)";
            // phrase7.style.transform = "translateX(" + scrollPhrase + "px)";
        
            phrase1.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 0.8s";
            phrase2.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 0.8s";
            phrase3.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 0.8s";
            phrase4.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 0.8s";
            phrase5.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 0.8s";
            // bean.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 0.4s";
            // phrase6.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 1s";
            // phrase7.style.transition = "transform cubic-bezier( 0.07, 0.19, 0.05, 0.99 ) 1s";
        };

    });
    const {pageNumber, keyword} = useParams();

  return (
    <div className="title-animation">
        <div className='first-half'>
            <div className="phrase-wrapper-1" id = "phrase1">
                <h1 className="phrase">FRAME COFFEE</h1>
            </div>
            <div className="phrase-wrapper-2" id = "phrase2">
                <h1 className="phrase">ROASTERS</h1>
            </div>
        </div>

        {/* <div className='bean-container' id='bean'>
            <img src={beans} alt='coffee beans'/>
        </div> */}

        <div className='middle-half'>
            { !keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light mb-4'>Go Back</Link>}
        </div>

        <div className='second-half'>
            <div className="phrase-wrapper-3" id = "phrase3">
                <h1 align='right' className="phrase">WE</h1>
            </div>
            <div className="phrase-wrapper-4" id = "phrase4">
                <h1 align='right' className="phrase">
                    <a href="" className="typewrite" data-period="2000" data-type='[ "\"CREATE\"", "\"ROAST\"", "\"BREW\"", "\"DRINK\""]'>
                        <span className="wrap"></span>
                    </a>
                </h1>
            </div>
            <div className="phrase-wrapper-5" id = "phrase5">
                <h1 align='right' className="phrase">EVERYTHING COFFEE</h1>
            </div>
        </div>
        {/* <div className="phrase-wrapper-1" id = "phrase6">
            <h1 className="phrase">MADE FOR</h1>
        </div>
        <div className="phrase-wrapper-2" id = "phrase7">
            <h1 className="phrase">HUMANS.</h1>
        </div> */}
    </div>
  )
}

export default TitleAnimation