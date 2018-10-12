'use strict';
(function () {
  var cardTpl = document.querySelector('#card').content.querySelector('.map__card');
  function getCard(apartment) {
    var newCard = cardTpl.cloneNode(true);
    editCard('.popup__title', apartment.offer.title);
    editCard('.popup__text--address', apartment.offer.address);
    editCard('.popup__text--price', apartment.offer.price + ' ₽/ночь');
    editCard('.popup__type', window.apartment.getTypeValue(apartment.offer.type));
    editCard('.popup__text--capacity', apartment.offer.rooms + ' комнаты для ' + apartment.offer.guests + ' гостей');
    editCard('.popup__text--time', 'Заезд после' + apartment.offer.checkin + ', выезд до ' + apartment.offer.checkout);
    editCard('.popup__description', apartment.offer.description);
    newCard.querySelector('.popup__avatar').src = apartment.author.avatar;
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

  function closePopup(elem) {
    window.mapModule.map.removeChild(elem);
  }
  function showApartPopup(apartItem) {
    var card = document.querySelector('.map__card');
    var newCard = window.card.getCard(apartItem);
    var closePopupButton = newCard.querySelector('.popup__close');

    if (card) {
      window.mapModule.map.removeChild(card);
    }

    closePopupButton.addEventListener('click', function () {
      closePopup(newCard);
    });
    closePopupButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.mapModule.KEY_ESC) {
        closePopup(newCard);
      }
    });

    window.mapModule.map.appendChild(newCard);
  }
  window.card = {
    getCard: getCard,
    closePopup: closePopup,
    showApartPopup: showApartPopup,
  };
})();
