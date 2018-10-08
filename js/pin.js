'use strict';
(function () {
  var pinTpl = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var HEIGHT_DISABLE_MAIN_PIN = mapPinMain.offsetHeight / 2;
  var HEIGHT_ACTIVE_MAIN_PIN = mapPinMain.offsetHeight + 15;
  function getSingleMapPin(apartItem) {
    var pinElement = pinTpl.cloneNode(true);
    pinElement.style = 'left:' + apartItem.location.x + 'px; top:' + apartItem.location.y + 'px;';
    pinElement.querySelector('img').src = apartItem.author.avatar;
    pinElement.querySelector('img').alt = apartItem.offer.title;
    pinElement.addEventListener('click', function () {
      window.card.showApartPopup(apartItem);
    });
    return pinElement;
  }
  function getAllMapPins(objects) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < objects.length; i++) {
      fragment.appendChild(getSingleMapPin(objects[i]));
    }
    window.mapModule.mapPin.appendChild(fragment);
  }
  var mapLimits = {
    top: map.offsetTop + window.apartment.HORIZON_LINE,
    right: map.offsetWidth + map.offsetLeft - mapPinMain.offsetWidth,
    bottom: map.offsetHeight - mapPinMain.offsetHeight,
    left: map.offsetLeft + mapPinMain.offsetWidth
  };
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };
      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };
      if (startCoords.x > mapLimits.right) {
        mapPinMain.style.left = (map.offsetWidth - mapPinMain.offsetWidth) + 'px';
      } else if (startCoords.x < mapLimits.left) {
        mapPinMain.style.left = 0 + 'px';
      }
      if (startCoords.y > mapLimits.bottom) {
        mapPinMain.style.top = (map.offsetHeight - window.formModule.mapFilters.offsetHeight - HEIGHT_ACTIVE_MAIN_PIN) + 'px';
      } else if (startCoords.y < mapLimits.top) {
        mapPinMain.style.top = (map.offsetTop + window.apartment.HORIZON_LINE - mapPinMain.offsetHeight) + 'px';
      }
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  mapPinMain.addEventListener('mouseup', function () {
    window.mapModule.activeFormHandler();
  });
  window.formModule.getStartLocate(HEIGHT_DISABLE_MAIN_PIN);
  window.pin = {
    getAllMapPins: getAllMapPins,
    HEIGHT_DISABLE_MAIN_PIN: HEIGHT_DISABLE_MAIN_PIN,
    HEIGHT_ACTIVE_MAIN_PIN: HEIGHT_ACTIVE_MAIN_PIN
  };
})();
