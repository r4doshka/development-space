import {TimelineLite, TweenLite, TweenMax} from "gsap";

/*===============animation==============*/

let logo = document.querySelector('.purrweb-header__logo');
let menuItems = document.querySelectorAll('.purrweb-header .purrweb-menu-wrap > .purrweb-menu > .purrweb-menu__item');

TweenLite.from(logo, 2, {opacity:0, y:-100});
TweenMax.staggerFrom(menuItems, 0.5, {opacity:0, x:500}, 0.3);




const linesAnimate = function(){
    let design = document.querySelector(".purrweb-work-stage__design .purrweb-work-segment__line");
    let planing = document.querySelector(".purrweb-work-stage__planing .purrweb-work-segment__line");
    let development = document.querySelector(".purrweb-work-stage__development .purrweb-work-segment__line");
    let ItemCount = document.querySelectorAll(".purrweb-list-count .purrweb-list-count__item");

    TweenMax.fromTo(planing, 2, {width: 0, visibility: 'visible'}, {width: '100%'});
    setTimeout(function() {
        planing.className += " purrweb-work-segment__line_division"
    }, 1900);
    TweenMax.fromTo(design, 2, {width: 0}, {width: '100%', visibility: 'visible'}).delay(0.8);
    setTimeout(function() {
        design.className += " purrweb-work-segment__line_division";
    }, 2700);
    TweenMax.fromTo(development, 4, {width: 0}, {width: '100%', visibility:'visible'}).delay(1.27);
    setTimeout(function() {
        development.className += " purrweb-work-segment__line_division"
    }, 4827);

    TweenMax.staggerTo(ItemCount, 2, {opacity:1}, 0.8);
};


const getBlocks = function (el) {
    let items = document.querySelectorAll(el);
    const arrItems = [];
    for (let i = 0; i < items.length; i++){
        arrItems.push(items[i]);
    }
    return arrItems;
};

const fromLeft = function (el) {
    TweenMax.staggerFromTo(el, 2, {opacity: 0}, {opacity: 1}, 1);
};

/*animateText*/

const animateText = function (elem, type) {

    if(document.querySelector(elem)){
        const tl = new TimelineLite;
        let mySplitText = new SplitText(elem, {type: type});
        //console.log(mySplitText);
        if(type === "chars"){
            tl.staggerFrom(mySplitText.chars, 1.8, {opacity:0, scale:0, y:180, rotationX:360, transformOrigin:"100% 50% 50",  ease:Back.easeOut}, 0.1, "+=0");
            //console.log(type);
        } else if(type === "words"){
            $(mySplitText[type]).each(function(index,el){
                tl.from($(el), .6, {opacity:0, force3D:true}, index * 0.05);
                tl.from($(el), .6, { scale:index % 2 == 0  ? 0 : 2}, index * 0.01)
                    .staggerTo(mySplitText[type], 0.1, {color:"#f8e71e", scale:0.9}, 0.1, "words")
                    .staggerTo(mySplitText[type], 0.2, {color:"#9b9b9b", scale:1}, 0.2, "words+=0.1")
            });
            //console.log(type);
        } else if (type === "lines"){
            tl.staggerFrom(mySplitText[type], 0.5, {opacity:0, rotationX:-120, force3D:true, transformOrigin:"top center -150"}, 0.1);
        } else if (type === "charsBounce"){
           // console.log(type);
            mySplitText.split({type:"words"})
            new Promise(function(resolve, reject) {
                $(mySplitText.words).each(function(index,el){
                    tl.from($(el), 0, {opacity:0}, 0);
                });
                resolve(1);
            }).then(
               new function () {
                    mySplitText.split({type:"chars, words"})
                    tl.staggerFrom(mySplitText.chars, 1.2, {opacity:0, scale:4, autoAlpha:0, force3D:true, rotationX:-360,  transformOrigin:"100% 50% -100", ease:Bounce.easeOut}, 0.2, "+=0");

            })

        } else {
            //console.log(type);
            return;
        }
    }

};

animateText(`.animate-text-charsBounce`, "charsBounce");
animateText(".animate-text-chars", "chars");
animateText(".animate-text-words", "words");
animateText(".animate-text-lines", "lines");
/*animateText*/

/*===============animation==============*/

export {linesAnimate, animateText, getBlocks, fromLeft};