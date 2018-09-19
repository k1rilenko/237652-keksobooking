'use strict';
var MAX_FEATURES_COUNT = 5;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 20;
var OBJECTS_COUNT = 8;
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var imageNumbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
var randomImageNumber = shuffleArray(imageNumbers);

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var randomTitles = shuffleArray(titles);

var types = ['palace', 'flat', 'house', 'bungalo'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var times = ['12:00', '13:00', '14:00'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
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
  return features.slice(getRandomInt(0, MAX_FEATURES_COUNT));
};
var getTypeValue = function () {
  var typeValue = getRandomValue(types);
  switch (typeValue) {
    case 'flat' :
      return 'Квартира';
    case 'bungalo' :
      return 'Бунгало';
    case 'house' :
      return 'Дом';
    default :
      return 'Дом';
  }
};
var mapsWidth = map.offsetWidth;
var zoneCard = map.querySelector('.map__filters-container');
var mapPin = document.querySelector('.map__pins');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var apartments = [];
var getSingleApartment = function (index) {
  var posX = getRandomInt(0, mapsWidth);
  var posY = getRandomInt(130, 630);
  var randomFeatures = getFeatureValue();
  return {
    autor: {
      avatar: 'img/avatars/user' + '0' + randomImageNumber[index] + '.png'
    },
    offer: {
      title: randomTitles[index],
      adress: posX + ', ' + posY,
      price: getRandomInt(MIN_PRICE, MAX_PRICE),
      type: getTypeValue(),
      rooms: getRandomInt(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomInt(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomValue(times),
      checkout: getRandomValue(times),
      features: randomFeatures,
      description: '',
      photos: shuffleArray(photos)
    },
    location: {
      x: posX,
      y: posY
    }
  };
};
var getAllApartments = function () {
  for (var i = 0; i < OBJECTS_COUNT; i++) {
    apartments.push(getSingleApartment(i));
  }
  return apartments;
};
var getSingleMapPin = function (apart) {
  var pinElement = pin.cloneNode(true);
  pinElement.style = 'left:' + apart.location.x + 'px; top:' + apart.location.y + 'px;';
  pinElement.querySelector('img').src = apart.autor.avatar;
  pinElement.querySelector('img').alt = apart.offer.title;
  return pinElement;
};
var getAllMapPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 8; i++) {
    fragment.appendChild(getSingleMapPin(getSingleApartment(i)));
  }
  mapPin.appendChild(fragment);
};
getAllMapPins();

var card = document.querySelector('#card').content.querySelector('.map__card');
var adCard = card.cloneNode(true);
var editCard = function (searchClass, editText) {
  adCard.querySelector(searchClass).textContent = editText;
};
var getCard = function (apartment) {
  editCard('.popup__title', apartment.offer.title);
  editCard('.popup__text--address', apartment.offer.adress);
  editCard('.popup__text--price', apartment.offer.price + ' ₽/ночь');
  editCard('.popup__type', apartment.offer.type);
  editCard('.popup__text--capacity', apartment.offer.rooms + ' комнаты для ' + apartment.offer.guests + ' гостей');
  editCard('.popup__text--time', 'Заезд после' + apartment.offer.checkin + ', выезд до ' + apartment.offer.checkout);
  editCard('.popup__description', apartment.offer.description);
  adCard.querySelector('.popup__avatar').src = apartment.autor.avatar;
  return adCard;
};
map.insertBefore(getCard(getSingleApartment(1)), zoneCard);
var photosWrapper = document.querySelector('.popup__photos');
function getImageToPopup(path) {
  var img = photosWrapper.querySelector('img').cloneNode(true);
  img.src = path;
  return img;
}
var getPhotos = function (apartment) {
  var firstImage = photosWrapper.querySelector('img');
  apartment.offer.photos.forEach(function (el) {
    photosWrapper.appendChild(getImageToPopup(el));
  });
  photosWrapper.removeChild(firstImage);
};
getPhotos(getSingleApartment(0));

var fragmentFeatures = document.createDocumentFragment(); 
var featuresWrapper = document.querySelector('.popup__features');
var getFeature = function () {
  while (featuresWrapper.firstChild) {
    featuresWrapper.removeChild(featuresWrapper.firstChild);
  }
  for (var i = 0; i < getSingleApartment(0).offer.features.length; i++) {
    var featuresElement = document.createElement('li');
    featuresElement.classList.add('popup__feature', 'popup__feature--' +       getSingleApartment(0).offer.features[i]);
    fragmentFeatures.appendChild(featuresElement);
  }
  featuresWrapper.appendChild(fragmentFeatures);
};
getFeature();
