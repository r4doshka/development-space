const pwSliderItems = Array.prototype.slice.call(
  document.querySelectorAll('.pw-slider__list-item'),
);
const pwSliderList = document.querySelector('.pw-slider__list');

const pwSlider = {
  shiftSide: ' ',
  currentShift: 0,
  defaultItem: pwSliderItems[2],
  currentItem: pwSliderItems[2],
  beforeItemWidth: 0,
  itemCount: pwSliderItems.length - 1,
  itemsWidth: 0,
  init() {
    pwSlider.setAppearance();
    pwSlider.slideClick();
    pwSlider.getItemsWidth();
  },
  getItemsWidth() {
    pwSliderItems.forEach(function(el) {
      pwSlider.itemsWidth += el.offsetWidth;
    });
  },
  shift(val) {
    pwSliderList.style.cssText = `-webkit-transform: translateX(${val}px); -moz-transform: translateX(${val}px);-o-transform: translateX(${val}px); "transform": translateX(${val}px);`;
  },
  slideClick() {
    pwSliderItems.forEach(function(el) {
      el.addEventListener('click', function(e) {
        if (
          pwSliderItems.indexOf(e.target) >
          pwSliderItems.indexOf(pwSlider.currentItem)
        ) {
          pwSlider.checkLastItem();
        } else {
          pwSlider.checkFirstItem();
        }
      });
    });
  },
  setAppearance(val) {
    pwSliderItems.forEach(function(el) {
      el.classList.remove('current', 'item-big', 'item-small', 'item-large');
    });
    if (val === 'right') {
      pwSlider.currentItem = pwSlider.currentItem.nextElementSibling;
    } else if (val === 'left') {
      pwSlider.currentItem = pwSlider.currentItem.previousElementSibling;
    }
    let currentItemIndex = pwSliderItems.indexOf(pwSlider.currentItem);
    const currentItem = pwSliderItems[currentItemIndex];
    const IndexBigItemLeft = pwSliderItems.indexOf(
      pwSliderItems[currentItemIndex - 1],
    );
    const BigItemLeft = pwSliderItems[IndexBigItemLeft];
    const IndexBigItemRight = pwSliderItems.indexOf(
      pwSliderItems[currentItemIndex + 1],
    );
    const BigItemRight = pwSliderItems[IndexBigItemRight];
    const IndexSmallItemLeft = pwSliderItems.indexOf(
      pwSliderItems[currentItemIndex - 2],
    );
    const SmallItemLeft = pwSliderItems[IndexSmallItemLeft];
    const IndexSmallItemRight = pwSliderItems.indexOf(
      pwSliderItems[currentItemIndex + 2],
    );
    const SmallItemRight = pwSliderItems[IndexSmallItemRight];

    currentItem.classList.add('current', 'item-large');
    BigItemLeft.classList.add('item-big');
    BigItemRight.classList.add('item-big');
    SmallItemLeft.classList.add('item-small');
    SmallItemRight.classList.add('item-small');

    return currentItem;
  },
  checkLastItem() {
    pwSlider.shiftSide = 'right';
    let curItemIndex = pwSliderItems.indexOf(pwSlider.currentItem);
    if (curItemIndex <= pwSlider.itemCount - 3) {
      pwSlider.beforeItemWidth = pwSlider.currentItem.offsetWidth;
      let curItem = pwSlider.setAppearance(pwSlider.shiftSide);
      if (pwSlider.beforeItemWidth < curItem.offsetWidth) {
        let width = (curItem.offsetWidth - pwSlider.beforeItemWidth) / 2;
        let prevItem = curItem.previousElementSibling;
        pwSlider.currentShift =
          pwSlider.currentShift - (prevItem.offsetWidth + width);
      } else if (pwSlider.beforeItemWidth > curItem.offsetWidth) {
        let prevItem = curItem.previousElementSibling;
        // console.log(
        //   prevItem.offsetWidth,
        //   curItem.offsetWidth,
        //   pwSlider.beforeItemWidth,
        //   pwSliderItems,
        // );
        pwSlider.currentShift = pwSlider.currentShift - prevItem.offsetWidth;
      } else {
        pwSlider.currentShift = pwSlider.currentShift - curItem.offsetWidth;
      }
    } else {
      pwSlider.currentItem = pwSlider.defaultItem;
      pwSlider.setAppearance(pwSlider.currentItem);
      pwSlider.currentShift = 0;
    }
    pwSlider.shift(pwSlider.currentShift);
  },
  checkFirstItem() {
    pwSlider.shiftSide = 'left';
    let curItemIndex = pwSliderItems.indexOf(pwSlider.currentItem);
    if (curItemIndex > 2) {
      pwSlider.beforeItemWidth = pwSlider.currentItem.offsetWidth;
      let curItem = pwSlider.setAppearance(pwSlider.shiftSide);
      if (pwSlider.beforeItemWidth < curItem.offsetWidth) {
        let width = (curItem.offsetWidth - pwSlider.beforeItemWidth) / 2;
        let prevItem = curItem.previousElementSibling;
        pwSlider.currentShift =
          pwSlider.currentShift + (prevItem.offsetWidth + width);
      } else {
        pwSlider.currentShift = pwSlider.currentShift + curItem.offsetWidth;
      }
    } else {
      pwSlider.currentItem = pwSliderItems[pwSlider.itemCount - 2];
      pwSlider.setAppearance(pwSlider.currentItem);
      pwSlider.currentShift = -450;
    }
    pwSlider.shift(pwSlider.currentShift);
  },
};

export { pwSlider };
