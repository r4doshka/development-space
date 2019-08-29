import { TweenLite, TweenMax, TimelineLite } from 'gsap';
import './sliders';
import './svgCreate';
import { pwSlider } from './custom-slider';
import { linesAnimate, getBlocks, fromLeft } from './animations';

const scriptName = () => {
  $(document).ready(function() {
    if (document.querySelector('.pw-slider')) {
      pwSlider.init();
    }
    document.body.style.opacity = 1;
  });

  /*========show on scroll to =========*/

  const scrollHandler = function(el, fn) {
    //console.log(el);
    if (document.querySelector('.scrollable')) {
      let elem = getBlocks(el);
      for (let i = 0; i < elem.length; i++) {
        let item = elem[i];
        let $window = $(window);
        let $elem = $(item);
        let oneTimeRepeat = false;
        //console.log($elem);
        function isScrolledIntoView($elem, $window) {
          //console.log($elem);
          let docViewTop =
            $window.pageYOffset || document.documentElement.scrollTop;
          let docViewBottom = docViewTop + $window.height();
          let elemTop = $elem.offset().top;
          let elemBottom = elemTop + $elem.height();

          return elemBottom <= docViewBottom && elemTop >= docViewTop;
        }
        $(document).ready(function() {
          if (!oneTimeRepeat) {
            if (isScrolledIntoView($elem, $window)) {
              fn($elem);
              oneTimeRepeat = true;
            }
          }
        });
        $(document).on('scroll', function() {
          if (!oneTimeRepeat) {
            if (isScrolledIntoView($elem, $window)) {
              fn($elem);
              oneTimeRepeat = true;
            }
          }
        });
      }
    }
  };

  scrollHandler('.purrweb-rate', linesAnimate);
  scrollHandler('.purrweb-step-box .purrweb-card', fromLeft);
};

export default scriptName();
