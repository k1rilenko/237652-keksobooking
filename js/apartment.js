'use strict';
(function () {
  var MAX_FEATURES_COUNT = 5;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 20;
  var OBJECTS_COUNT = 8;
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var HORIZON_LINE = 130;
  var apartments = [];
  var imageNumbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var randomTitles = window.util.shuffleArray(titles);

  var map = document.querySelector('.map');
  var mapsWidth = map.offsetWidth;
  var randomImageNumber = window.util.shuffleArray(imageNumbers);
  function getFeatureValue() {
    return features.slice(window.util.randomInt(0, MAX_FEATURES_COUNT));
  }
  function getTypeValue() {
    var typeValue = window.util.randomValue(types);
    switch (typeValue) {
      case 'flat' :
        return 'Квартира';
      case 'bungalo' :
        return 'Бунгало';
      case 'house' :
        return 'Дом';
      default :
        return 'Дворец';
    }
  }
  function getSingleApartment(index) {
    var posX = window.util.randomInt(0, mapsWidth);
    var posY = window.util.randomInt(HORIZON_LINE, 630);
    return {
      autor: {
        avatar: 'img/avatars/user' + '0' + randomImageNumber[index] + '.png'
      },
      offer: {
        title: randomTitles[index],
        adress: posX + ', ' + posY,
        price: window.util.randomInt(MIN_PRICE, MAX_PRICE),
        type: getTypeValue(),
        rooms: window.util.randomInt(MIN_ROOMS, MAX_ROOMS),
        guests: window.util.randomInt(MIN_GUESTS, MAX_GUESTS),
        checkin: window.util.randomValue(times),
        checkout: window.util.randomValue(times),
        features: getFeatureValue(),
        description: '',
        photos: window.util.shuffleArray(photos)
      },
      location: {
        x: posX - PIN_WIDTH / 2,
        y: posY - PIN_HEIGHT
      }
    };
  }
  function singleApartmentPush() {
    for (var i = 0; i < OBJECTS_COUNT; i++) {
      apartments.push(getSingleApartment(i));
    }
  }
  singleApartmentPush();
  window.apartment = {
    HORIZON_LINE: HORIZON_LINE,
    apartments: apartments
  };
})();
