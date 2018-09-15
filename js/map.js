'use strict';
var map = document.querySelector('.map');
var width = map.offsetWidth;
map.classList.remove('map--faded');
var imageNumbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
var randomImageNumber = shuffleArray(imageNumbers);

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var randomTitles = shuffleArray(titles);

var types = ['palace', 'flat', 'house', 'bungalo'];
var featuresVal = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var checks = ['12:00', '13:00', '14:00'];
var photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var getRandomValue = function (arr) {
  return arr[Math.floor((Math.random() * arr.length))];
};
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

var getFeatureValue = function () {
  var modFeaturesVal = featuresVal.slice(getRandomInt(0, 5));
  return modFeaturesVal;
};

var getTypeValue = function () {
  var typeValue = getRandomValue(types);
  if (typeValue === 'flat') {
    typeValue = 'Квартира';
  } else if (typeValue === 'bungalo') {
    typeValue = 'Бунгало';
  } else if (typeValue === 'house') {
    typeValue = 'Дом';
  } else {
    typeValue = 'Дворец';
  }
  return typeValue;
};

var getRandomAppartaments = function () {
  var posX = getRandomInt(0, width);
  var posY = getRandomInt(130, 630);
  var randomFeatures = getFeatureValue();
  return {
    autor: {
      avatar: 'img/avatars/user' + '0' + randomImageNumber[i] + '.png'
    },
    offer: {
      title: randomTitles[i],
      adress: posX + ', ' + posY,
      price: getRandomInt(1000, 1000000),
      type: getTypeValue(),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 20),
      checkin: getRandomValue(checks),
      checkout: getRandomValue(checks),
      features: randomFeatures,
      description: '',
      photos: shuffleArray(photosArr)
    },
    location: {
      x: posX,
      y: posY
    }
  };
};
var zoneCard = map.querySelector('.map__filters-container');
var mapPin = document.querySelector('.map__pins');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var appartaments = [];
var fragment = document.createDocumentFragment();
for (var i = 0; i < 8; i++) {
  appartaments[i] = getRandomAppartaments();
  var pinElement = pin.cloneNode(true);
  pinElement.style = 'left:' + appartaments[i].location.x + 'px; top:' + appartaments[i].location.y + 'px;';
  pinElement.querySelector('img').src = appartaments[i].autor.avatar;
  pinElement.querySelector('img').alt = appartaments[i].offer.title;
  fragment.appendChild(pinElement);
}
mapPin.appendChild(fragment);

var editCard = function (searchClass, editText) {
  adCard.querySelector(searchClass).textContent = editText;
};
var card = document.querySelector('#card').content.querySelector('.map__card');
var adCard = card.cloneNode(true);
editCard('.popup__title', appartaments[1].offer.title);
editCard('.popup__text--address', appartaments[1].offer.adress);
editCard('.popup__text--price', appartaments[1].offer.price + ' ₽/ночь');
editCard('.popup__type', appartaments[1].offer.type);
editCard('.popup__text--capacity', appartaments[1].offer.rooms + ' комнаты для ' + appartaments[1].offer.guests + ' гостей');
editCard('.popup__text--time', 'Заезд после' + appartaments[1].offer.checkin + ', выезд до ' + appartaments[1].offer.checkout);
editCard('.popup__description', appartaments[1].offer.description);
adCard.querySelector('.popup__photo').src = appartaments[1].offer.photos[0];
adCard.querySelector('.popup__avatar').src = appartaments[1].autor.avatar;
map.insertBefore(adCard, zoneCard);
var block = document.querySelector('.popup__photos');
var firstImage = block.querySelector('img');
appartaments[1].offer.photos.forEach(function (el) {
  block.appendChild(getImageToPopup(el));
});
function getImageToPopup(path) {
  var img = block.querySelector('img').cloneNode(true);
  img.src = path;
  return img;
}
block.removeChild(firstImage);
var featuresWrapper = document.querySelector('.popup__features');
while (featuresWrapper.firstChild) {
  featuresWrapper.removeChild(featuresWrapper.firstChild);
}
for (i = 0; i < appartaments[1].offer.features.length; i++) {
  var featuresElement = document.createElement('li');
  featuresElement.classList.add('popup__feature', 'popup__feature--' + appartaments[1].offer.features[i]);
  featuresWrapper.appendChild(featuresElement);
}
