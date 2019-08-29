import $ from "jquery";
import 'slick-carousel/slick/slick.min.js';
import 'owl.carousel/dist/owl.carousel.min.js';
import { progressBar } from './progressBar';

/*=============main slider start===========*/


const slick = $('.purrweb-slider.purrweb-slider__hero').slick({
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

const slickNav = $('.purrweb-slider.purrweb-slider__nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.purrweb-slider.purrweb-slider__hero',
    focusOnSelect: true,
    variableWidth: true
});


// main slider animation

slick.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
  const circleAroundImage = new TimelineLite();

    let sliderCircleImageAfter = $(this).find("[data-slick-index='" +(nextSlide) + "'] .purrweb-image-circle__after");
    let sliderCircleImageBefore = $(this).find("[data-slick-index='" +(nextSlide) + "'] .purrweb-image-circle__before");
    let sliderCircleImage= $(this).find("[data-slick-index='" +(nextSlide) + "'] .purrweb-slider__item-image");

    circleAroundImage.fromTo(
        sliderCircleImage, 0.5,
        {transformPerspective:0,  rotationY:900, x:0, z:-1500, zIndex:3, opacity:0},
        {transformPerspective:1000, rotationY:0, x:0, z:0, zIndex:3, opacity:1}
    );

    circleAroundImage.fromTo(
        sliderCircleImageBefore, 0.5,
        {transformPerspective:0,  rotationZ:960, x:0, z:-1500, zIndex:2, opacity:0},
        {transformPerspective:1000, rotationZ:0, x:0, z:0, zIndex:2, opacity:1}
    );

    circleAroundImage.fromTo(
        sliderCircleImageAfter, 0.5,
        {transformPerspective:0,  rotationZ:960, x:500, z:-1500, zIndex:1, opacity:0},
        {transformPerspective:1000, rotationZ:0, x:0, z:0, zIndex:1, opacity:1}
    );
  progressBar.start();
});
 progressBar.slick = slick;
 progressBar.init();

/*=============main slider end===========*/

/*=======skill Slider start==========*/


const skillSliderContainer =  $('.skill-slider');

const skillSlider = skillSliderContainer.slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    swipe: true,
    autoplay: false,
    variableWidth: true,
    centerMode: true,
    arrows: false,
    //vertical: true,
    //verticalSwiping: true,
    centerPadding: '0',
    cssEase: 'linear',
    useTransform: false,
});

  function addClasses(){
    let currentSlide  = skillSlider.find('.slick-current').data('slick-index');
    let slides = skillSlider.find('.slick-slide');
    slides.each(function(){
        $(this).removeClass('item-small item-big item-large');
    });

    skillSlider.find("[data-slick-index='" +(currentSlide) +"']").addClass('item-large');
    skillSlider.find("[data-slick-index='" +(currentSlide + 1) + "']").addClass('item-big');
    skillSlider.find("[data-slick-index='" +(currentSlide - 1) + "']").addClass('item-big');
    skillSlider.find("[data-slick-index='" +(currentSlide - 2) + "']").addClass('item-small');
    skillSlider.find("[data-slick-index='" +(currentSlide + 2) + "']").addClass('item-small');
}

skillSlider.on('click', '.slick-slide', function (e) {

    let slides = skillSlider.find('.slick-slide');
    slides.each(function(){
        $(this).removeClass('item-small item-big item-large');
    });


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


/*=======skill Slider end==========*/

export {slick, skillSlider};