'use strict';

var openButton = document.querySelector('button.cite-menu__toggle--to-open');
var closeButton = document.querySelector('button.cite-menu__toggle--to-close');
var popup = document.querySelector('.introduction__popup-menu');
var label = document.querySelector('a.cite-menu__label');

var toggleButtonClickHandler = function (evt) {
  evt.preventDefault();
  if (evt.currentTarget.classList.contains('cite-menu__toggle--to-open')) {
    popup.classList.remove('cite-menu--hidden');
  }
  else {
    popup.classList.add('cite-menu--hidden');
  }
};

var labelClickHandler = function(evt){
  evt.preventDefault();
  if(!popup.classList.contains('cite-menu--hidden')) {
      popup.classList.add('cite-menu--hidden');
  }
};

openButton.addEventListener('click', toggleButtonClickHandler);
closeButton.addEventListener('click', toggleButtonClickHandler);
label.addEventListener('click', labelClickHandler);
//openButton и closeButton - нет свойства addEventListener
