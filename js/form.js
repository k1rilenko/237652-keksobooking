'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var roomsSelect = form.querySelector('#room_number');
  var capacitySelect = form.querySelector('#capacity');
  var timeForm = document.querySelector('.ad-form__element--time');
  var typeSelect = form.querySelector('#type');
  var priceInput = form.querySelector('#price');
  var mapFilters = document.querySelector('.map__filters');
  var mapFilterChild = mapFilters.children;
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
  function setPlaceholderMinPrice(value) {
    priceInput.placeholder = value;
    priceInput.min = value;
  }
  function changeTypeSelect() {
    var min = '0';
    switch (typeSelect.value) {
      case 'flat': min = '1000'; break;
      case 'house': min = '5000'; break;
      case 'palace': min = '10000'; break;
      default: min = '0';
    }
    setPlaceholderMinPrice(min);
  }
  function getStartLocate(heightPin) {
    var addressInput = form.querySelector('#address');
    addressInput.setAttribute('readonly', true);
    var locationMainPin = {
      x: window.mapModule.mapPinMain.offsetLeft + window.mapModule.mapPinMain.offsetWidth / 2,
      y: window.mapModule.mapPinMain.offsetTop + heightPin
    };
    addressInput.value = locationMainPin.x + ', ' + locationMainPin.y;
  }
  function timeSelectChangeHandler(evt) {
    var timeInSelect = document.querySelector('#timein');
    var timeOutSelect = document.querySelector('#timeout');
    timeInSelect.value = evt.target.value;
    timeOutSelect.value = evt.target.value;
  }
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
  toogleDisableForm(true);
  toogleDisableFilters(true);
  typeSelect.addEventListener('change', function () {
    changeTypeSelect();
  });
  timeForm.addEventListener('change', function (evt) {
    timeSelectChangeHandler(evt);
  });
  form.addEventListener('submit', function (evt){
    window.backend.upload(new FormData(form), onLoad , onError);
    evt.preventDefault();
  });
  function onLoad(data) {
    console.log(data);
  }
  function onError(message) {
    console.error(message);
  }
  function successFormHandler() {
    var successMesageTpl = document.querySelector('#success').content.querySelector('.success');
    var mainBlock = document.querySelector('main');
    mainBlock.appendChild(successMesageTpl);
  }
  window.formModule = {
    form: form,
    toogleDisableForm: toogleDisableForm,
    toogleDisableFilters: toogleDisableFilters,
    numberOfGuestsHandler: numberOfGuestsHandler,
    getStartLocate: getStartLocate,
    changeTypeSelect: changeTypeSelect,
    mapFilters: mapFilters
  };
})();
