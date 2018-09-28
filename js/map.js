'use strict';
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
var KEY_ESC = 27;


var imageNumbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var times = ['12:00', '13:00', '14:00'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
var mapPin = document.querySelector('.map__pins');
var mapPinMain = map.querySelector('.map__pin--main');
var mapFilters = document.querySelector('.map__filters');
var mapFilterChild = mapFilters.children;
var form = document.querySelector('.ad-form');
var roomsSelect = form.querySelector('#room_number');
var capacitySelect = form.querySelector('#capacity');
var timeForm = document.querySelector('.ad-form__element--time');
var typeSelect = form.querySelector('#type');
var priceInput = form.querySelector('#price');


var mapsWidth = map.offsetWidth;
var HEIGHT_DISABLE_MAIN_PIN = mapPinMain.offsetHeight / 2;
var HEIGHT_ACTIVE_MAIN_PIN = mapPinMain.offsetHeight + 15;

var pinTpl = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTpl = document.querySelector('#card').content.querySelector('.map__card');

var randomTitles = shuffleArray(titles);
var randomImageNumber = shuffleArray(imageNumbers);
var apartments = [];

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

function toogleDisableForm(bool) {
  var formFieldset = form.querySelectorAll('fieldset');
  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = bool;
  }
}
function toogleDisableFilters(bool) {
  for (var i = 0; i < mapFilterChild.length; i++) {
    mapFilterChild[i].disabled = bool;
  }
}
function startCapacitySelect() {
  capacitySelect.options[2].selected = true;
  capacitySelect.options[0].disabled = true;
  capacitySelect.options[1].disabled = true;
  capacitySelect.options[3].disabled = true;
}

function activeFormHandler() {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  getAllMapPins(apartments);
  toogleDisableForm(false);
  toogleDisableFilters(false);
  getStartLocate(HEIGHT_ACTIVE_MAIN_PIN);
  startCapacitySelect();
}

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
      return 'Дворец';
  }
};

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
      x: posX - PIN_WIDTH / 2,
      y: posY - PIN_HEIGHT
    }
  };
};

function closePopup(elem) {
  map.removeChild(elem);
}

function showApartPopup(apartItem) {
  var card = map.querySelector('.map__card');
  var newCard = getCard(apartItem);
  var closePopupButton = newCard.querySelector('.popup__close');

  if (card) {
    map.removeChild(card);
  }

  closePopupButton.addEventListener('click', function () {
    closePopup(newCard);
  });
  closePopupButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ESC) {
      closePopup(newCard);
    }
  });

  map.appendChild(newCard);
}

function getSingleMapPin(apartItem) {
  var pinElement = pinTpl.cloneNode(true);
  pinElement.style = 'left:' + apartItem.location.x + 'px; top:' + apartItem.location.y + 'px;';
  pinElement.querySelector('img').src = apartItem.autor.avatar;
  pinElement.querySelector('img').alt = apartItem.offer.title;
  pinElement.addEventListener('click', function () {
    showApartPopup(apartItem);
  });
  return pinElement;
}
function getAllMapPins(objects) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < objects.length; i++) {
    fragment.appendChild(getSingleMapPin(objects[i]));
  }
  mapPin.appendChild(fragment);
}

function getCard(apartment) {
  var newCard = cardTpl.cloneNode(true);

  editCard('.popup__title', apartment.offer.title);
  editCard('.popup__text--address', apartment.offer.adress);
  editCard('.popup__text--price', apartment.offer.price + ' ₽/ночь');
  editCard('.popup__type', apartment.offer.type);
  editCard('.popup__text--capacity', apartment.offer.rooms + ' комнаты для ' + apartment.offer.guests + ' гостей');
  editCard('.popup__text--time', 'Заезд после' + apartment.offer.checkin + ', выезд до ' + apartment.offer.checkout);
  editCard('.popup__description', apartment.offer.description);
  newCard.querySelector('.popup__avatar').src = apartment.autor.avatar;

  getPhotos(apartment.offer.photos);
  getFeatures(apartment.offer.features);

  return newCard;

  function editCard(searchClass, editText) {
    newCard.querySelector(searchClass).textContent = editText;
  }

  function getPhotos(arr) {
    var photosWrapper = newCard.querySelector('.popup__photos');
    var firstImage = photosWrapper.querySelector('img');

    arr.forEach(function (el) {
      photosWrapper.appendChild(getImageToPopup(el));
    });
    photosWrapper.removeChild(firstImage);

    function getImageToPopup(path) {
      var img = photosWrapper.querySelector('img').cloneNode(true);
      img.src = path;
      return img;
    }
  }

  function getFeatures(arr) {
    var featuresWrapper = newCard.querySelector('.popup__features');
    var fragmentFeatures = document.createDocumentFragment();

    while (featuresWrapper.firstChild) {
      featuresWrapper.removeChild(featuresWrapper.firstChild);
    }

    for (var i = 0; i < arr.length; i++) {
      var featuresElement = document.createElement('li');
      featuresElement.classList.add('popup__feature', 'popup__feature--' + arr[i]);
      fragmentFeatures.appendChild(featuresElement);
    }
    featuresWrapper.appendChild(fragmentFeatures);
  }
}

function getStartLocate(heightPin) {
  var addressInput = form.querySelector('#address');
  addressInput.setAttribute('readonly', true);
  var locationMainPin = {
    x: mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2,
    y: mapPinMain.offsetTop + heightPin
  };
  addressInput.value = locationMainPin.x + ', ' + locationMainPin.y;
}
function singleApartmentPush() {
  for (var i = 0; i < OBJECTS_COUNT; i++) {
    apartments.push(getSingleApartment(i));
  }
}
singleApartmentPush();


toogleDisableForm(true);
toogleDisableFilters(true);
getStartLocate(HEIGHT_DISABLE_MAIN_PIN);

mapPinMain.addEventListener('mouseup', function () {
  activeFormHandler();
});

function getPlaceholderMinPrice(value) {
  priceInput.placeholder = value;
  priceInput.min = value;
}

function changeTypeSelect() {
  if (typeSelect.options[0].selected) {
    getPlaceholderMinPrice('0');
  } else if (typeSelect.options[1].selected) {
    getPlaceholderMinPrice('1000');
  } else if (typeSelect.options[2].selected) {
    getPlaceholderMinPrice('5000');
  } else {
    getPlaceholderMinPrice('10000');
  }
}
typeSelect.addEventListener('change', function () {
  changeTypeSelect();
});

function timeSelectChangeHandler(evt) {
  var test1 = document.querySelector('#timein');
  var test2 = document.querySelector('#timeout');
  test1.value = evt.target.value;
  test2.value = evt.target.value;
}
timeForm.addEventListener('change', function (evt) {
  timeSelectChangeHandler(evt);
});

var ROOMS_SYNC_CAPACITY = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

function numberOfGuestsHandler() {
  var syncArr = ROOMS_SYNC_CAPACITY[roomsSelect.value];
  for (var i = 0; i < capacitySelect.options.length; i++) {
    var option = capacitySelect.options[i];
    option.disabled = (syncArr.indexOf(+option.value) === -1);
  }
  if (capacitySelect.querySelector('option[value="' + capacitySelect.value + '"]').disabled) {
    capacitySelect.value = syncArr[syncArr.length - 1];
  }
}
roomsSelect.addEventListener('change', numberOfGuestsHandler);
