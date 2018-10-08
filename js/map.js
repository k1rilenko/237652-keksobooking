'use strict';
(function () {
  var KEY_ESC = 27;
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  function activeFormHandler() {
    map.classList.remove('map--faded');
    window.formModule.form.classList.remove('ad-form--disabled');
    window.backend.download(window.pin.getAllMapPins, onError);
    window.formModule.toogleDisableForm(false);
    window.formModule.toogleDisableFilters(false);
    window.formModule.getStartLocate(window.pin.HEIGHT_ACTIVE_MAIN_PIN);
    window.formModule.changeTypeSelect();
    window.formModule.numberOfGuestsHandler();
  }
     function onError(message) {
    console.error(message);
  }
  window.mapModule = {
    map: map,
    mapPin: mapPin,
    mapPinMain: mapPinMain,
    activeFormHandler: activeFormHandler,
    KEY_ESC: KEY_ESC,
    onError: onError
  };
})();
