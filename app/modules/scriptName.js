import $ from 'jquery';
import 'slick-carousel/slick/slick.min.js';
let ProgressBar = require('progressbar.js');

import {TweenLite, TweenMax, TimelineLite} from 'gsap';


const scriptName = () => {

    let slick, skillSlider, bar, slickNav, progressBar, circleAroundImage;

    progressBar = '#purrweb-slider-timer';

    function onLoad() {
         bar = new ProgressBar.Circle(progressBar, {
            duration: 600000,
            trailWidth: 20,
            strokeWidth: 10,
            color: '#fff',
            trailColor: '#000',
        });

        Reset();

        $(progressBar).on({
            mouseenter: function() {
                bar.stop();
                $(this).parent().addClass('purrweb-slider__paused');
            },
            mouseleave: function() {
                Reset();
                $(this).parent().removeClass('purrweb-slider__paused');
            }
        });
    }

    function Reset() {
        bar.animate(1, function(){
            slick.slick('slickNext');
            bar.destroy();
            onLoad();
        });
    }

    $(document).ready(function () {
        document.body.style.opacity = 1;

        /*=============main slider===========*/

        circleAroundImage = new TimelineLite();

        slick = $('.purrweb-slider.purrweb-slider__hero').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows:false,
            asNavFor: '.purrweb-slider.purrweb-slider__nav',
            autoplay:false,
            dots:  true,
            fade: true,
            swipe: false
        });

        slickNav = $('.purrweb-slider.purrweb-slider__nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.purrweb-slider.purrweb-slider__hero',
            focusOnSelect: true,
            variableWidth: true
        });

        slick.on('beforeChange', function(e, slick, currentSlide, nextSlide) {

            let shortTweenState  = circleAroundImage.isActive();
            if(shortTweenState){
                circleAroundImage.kill();
            }

            let sliderCircleImageAfter = $(this).find("[data-slick-index='" +(nextSlide) + "'] .purrweb-image-circle__after");
            let sliderCircleImageBefore = $(this).find("[data-slick-index='" +(nextSlide) + "'] .purrweb-image-circle__before");
            let sliderCircleImage= $(this).find("[data-slick-index='" +(nextSlide) + "'] .purrweb-slider__item-image");

            circleAroundImage.fromTo(sliderCircleImage, 0.5,
                {transformPerspective:0,  rotationY:900, x:0, z:-1500, zIndex:3, opacity:0},
                {transformPerspective:1000, rotationY:0, x:0, z:0, zIndex:3, opacity:1});

            circleAroundImage.fromTo(sliderCircleImageBefore, 0.5,
                {transformPerspective:0,  rotationZ:960, x:0, z:-1500, zIndex:2, opacity:0},
                {transformPerspective:1000, rotationZ:0, x:0, z:0, zIndex:2, opacity:1});

            circleAroundImage.fromTo(sliderCircleImageAfter, 0.5,
                {transformPerspective:0,  rotationZ:960, x:500, z:-1500, zIndex:1, opacity:0},
                {transformPerspective:1000, rotationZ:0, x:0, z:0, zIndex:1, opacity:1});

            bar.destroy();
            onLoad();
        });


        onLoad();
        /*=======main slider end==========*/

        /*=======skillSlider==========*/



       let skillSliderContainer =  $('.skill-slider');
        skillSlider = skillSliderContainer.slick({
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 3,
            swipe: true,
            autoplay:false,
            variableWidth: true,
            centerMode: true,
            arrows: false,
            centerPadding: '0'
        });

        function addClasses(){
            let currentSlide  = skillSlider.find('.slick-current').data('slick-index');
            skillSlider.find('.slick-slide').removeClass('item-small item-big item-large');
            skillSlider.find("[data-slick-index='" +(currentSlide) +"']").addClass('item-large');
            skillSlider.find("[data-slick-index='" +(currentSlide - 2) + "']").addClass('item-small');
            skillSlider.find("[data-slick-index='" +(currentSlide + 1) + "']").addClass('item-big');
            skillSlider.find("[data-slick-index='" +(currentSlide - 1) + "']").addClass('item-big');
            skillSlider.find("[data-slick-index='" +(currentSlide + 2) + "']").addClass('item-small');

        }

        skillSlider.on('click', '.slick-slide', function (e) {
            e.stopPropagation();
            let index = $(this).data("slick-index");
            if (skillSlider.slick('slickCurrentSlide') !== index) {
                skillSlider.slick('slickGoTo', index);
            }
            addClasses();
        });

        skillSlider.on('swipe', function(){
            addClasses();
        });


        let oneTimeRepeat = false;
        if(!oneTimeRepeat) {
            skillSlider.on('beforeChange', function () {
                let currentSlide  = skillSlider.find('.slick-current').data('slick-index');
                skillSlider.find("[data-slick-index='" +(currentSlide + 1) +"']").addClass('item-large');
                skillSlider.find("[data-slick-index='" +(currentSlide + 3) + "']").addClass('item-small');
                skillSlider.find("[data-slick-index='" +(currentSlide +2) + "']").addClass('item-big');
                skillSlider.find("[data-slick-index='" +(currentSlide ) + "']").addClass('item-big');
                skillSlider.find("[data-slick-index='" +(currentSlide - 1) + "']").addClass('item-small');
            });
            oneTimeRepeat = true;
        }
        skillSlider.slick('slickNext');

        /*=======skillSlider end==========*/
    });

    /*===============animation==============*/

    let logo = document.querySelector('.purrweb-header__logo');
    let menuItems = $('.purrweb-header .purrweb-menu-wrap > .purrweb-menu > .purrweb-menu__item');
    //let sliderNav = document.querySelector('.purrweb-slider-nav__item');

    let design = document.querySelector(".purrweb-work-stage__design .purrweb-work-segment__line");
    let planing = document.querySelector(".purrweb-work-stage__planing .purrweb-work-segment__line");
    let development = document.querySelector(".purrweb-work-stage__development .purrweb-work-segment__line");
    let planingItemCount = document.querySelectorAll(".purrweb-list-count.purrweb-list-count__planing .purrweb-list-count__item");
    let developmentItemCount = document.querySelectorAll(".purrweb-list-count.purrweb-list-count__development .purrweb-list-count__item");

    let stepBlocks = document.querySelectorAll(".purrweb-step-box .container");

    TweenMax.from(stepBlocks, 3, {left:1000, margin: 0}, 2);

    TweenLite.from(logo, 2, {opacity:0, y:-100});
    TweenMax.staggerFrom(menuItems, 1, {opacity:0, x:500}, 0.5);


    /*stripes*/
    let tl = new TimelineLite,
    mySplitText = new SplitText(".animate-text", {type:"words,chars"}),
    chars = mySplitText.chars;

    TweenLite.set("#quote", {perspective:400});

    tl.staggerFrom(chars, 1.8, {opacity:0, scale:0, y:180, rotationX:360, transformOrigin:"100% 50% 50",  ease:Back.easeOut}, 0.1, "+=0");
    /*stripes*/



    /*===============animation==============*/


    /*========show on scroll to =========*/

    let $window = $(window);
    let $elem = $(".purrweb-rate, .purrweb-step-box .container");
    let oneTimeRepeat = false;

    function isScrolledIntoView($elem, $window) {
        let docViewTop = $window.scrollTop();
        let docViewBottom = docViewTop + $window.height();
        let elemTop = $elem.offset().top;
        let elemBottom = elemTop + $elem.height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    $(document).on('scroll', function(){
        if(!oneTimeRepeat) {
            if (isScrolledIntoView($elem, $window)) {
               // TweenLite.fromTo(design, 2, {transformPerspective:0, rotationZ:960, rotationY:0, x:400, z:500}, {transformPerspective:1000, rotationY:0, rotationZ:1440, x:0, z:0});
                //TweenLite.fromTo(planing, 2, {transformPerspective:0, rotationY:0, y:400, z:100}, {transformPerspective:1000, rotationY:-1440, y:0, z:0});
                //TweenLite.fromTo(development, 2, {transformPerspective:1000, rotationY:0, y:400}, {transformPerspective:200, rotationY:360, y:0}, 1);



                TweenMax.fromTo(planing, 2, {width: 0, visibility: 'visible'}, {width: '100%'});
                setTimeout(function() {
                    planing.className += " purrweb-work-segment__line_division"

                }, 1900);

                TweenMax.fromTo(design, 2, {width: 0}, {width: '100%', visibility: 'visible'}).delay(0.8);
                setTimeout(function() {
                    design.className += " purrweb-work-segment__line_division";
                }, 2700);

                TweenMax.fromTo(development, 2, {width: 0}, {width: '100%', visibility:'visible'}).delay(1.27);
                setTimeout(function() {
                    development.className += " purrweb-work-segment__line_division"
                }, 3027);

                TweenMax.staggerTo(developmentItemCount,  2, {opacity:1}, 0.8, 1);
                TweenMax.staggerTo(planingItemCount, 2, {opacity:1}, 0.8);



                oneTimeRepeat = true;

            }
        }
    });




};

export default scriptName();