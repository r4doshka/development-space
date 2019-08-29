import {slick} from "./sliders";
const ProgressBar = require('progressbar.js');

const progressBarId = 'purrweb-slider-timer';
const progressBarContainer = document.getElementById('purrweb-slider-timer');


const createCircle = function() {
    if (progressBarContainer) {
        const Circle = new ProgressBar.Circle('#' + progressBarId, {
            duration: 6000,
            trailWidth: 20,
            strokeWidth: 10,
            color: '#fff',
            trailColor: '#000',
        });
        return Circle;
    }
}
const CircleNew = createCircle();

const progressBar = {
    circle : CircleNew,
    slick: null,
    startFrom: 0,
    duration: CircleNew ? CircleNew._opts.duration : '',
    init () {
        if(progressBar.checkCircleExist()){
            progressBar.start();
            progressBar.blurHandle();
        }
    },
    start (startFrom, duration) {
        progressBar.checkSlickExist();
        if (startFrom == null || duration == null){
            startFrom = progressBar.startFrom;
            duration = progressBar.duration;
        }
        progressBar.circle.set(startFrom);
        progressBar.circle.animate(1, {
            duration: duration,
        }, function() {
            slick.slick('slickNext');
        });
    },
    breakpoint (pastTime) {
        let timePassed = pastTime.toFixed(1)*100;
        let baseDuration = CircleNew._opts.duration;
        let percent = (timePassed  / 100) * baseDuration ;
        let durationRemain = baseDuration - percent;
        progressBar.start(pastTime, durationRemain);
    },
    blurHandle () {
        $(progressBarContainer).on({
            mouseenter: function() {
                progressBar.circle.stop();
                $(this).parent().addClass('purrweb-slider__paused');
            },
            mouseleave: function() {
                $(this).parent().removeClass('purrweb-slider__paused');
                let pastTime = progressBar.circle.value();
                progressBar.breakpoint(pastTime);
            }
        });
    },
    checkSlickExist () {
        if (!this.slick) {
            throw new Error('Please initialize slick first (progressBar.slick = slick)')
        }
    },
    checkCircleExist () {
        if(!progressBar.circle){
          //  throw new Error('Please initialize Circle first')
            return false;
        }else {
            return true;
        }
    }
};





export  { progressBar }