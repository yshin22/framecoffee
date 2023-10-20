
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
    
        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
    
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
  return (
    <div class="homepage-wrapper">
        <div class="phrase-wrapper-2" id = "phrase1">
            <h1 class="phrase">I'M AN</h1>
        </div>
        <div class="phrase-wrapper" id = "phrase2">
            <h1 class="phrase">INTERACTIVE </h1>
        </div>
        <div class="phrase-wrapper-1" id = "phrase3">
            <h1 class="phrase">WEB DEVELOPER</h1>
        </div>
        <div class="phrase-wrapper" id = "phrase4">
            <h1 class="phrase">
                CREATING
                <a href="" class="typewrite" data-period="2000" data-type='[ "INTUITIVE", "CREATIVE", "EFFICIENT"]'>
                    <span class="wrap"></span>
                </a>
            </h1>
        </div>
        <div class="phrase-wrapper-1" id = "phrase5">
            <h1 class="phrase">INTERFACES</h1>
        </div>
        <div class="phrase-wrapper-1" id = "phrase6">
            <h1 class="phrase">MADE FOR</h1>
        </div>
        <div class="phrase-wrapper-2" id = "phrase7">
            <h1 class="phrase">HUMANS.</h1>
        </div>
    </div>
  )
}

export default TitleAnimation