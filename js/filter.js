'use strict';
(function () {
  var f = window.formModule.mapFilters;
  var filterType = f.querySelector('#housing-type');
  var filterPrice = f.querySelector('#housing-price');
  var filterRoom = f.querySelector('#housing-rooms');
  var filterGuest = f.querySelector('#housing-guests');
  var filterWifi = f.querySelector('#filter-wifi');
  var filterDishwasher = f.querySelector('#filter-dishwasher');
  var filterParking = f.querySelector('#filter-parking');
  var filterWasher = f.querySelector('#filter-washer');
  var filterElevator = f.querySelector('#filter-elevator');
  var filterConditioner = f.querySelector('#filter-conditioner');

  var filterObj = {};
  function getFilterValues() {
    filterObj.type = filterType.value;
    filterObj.price = filterPrice.value;
    filterObj.rooms = filterRoom.value;
    filterObj.guests = filterGuest.value;
    filterObj.features = getFeaturesArr();
    function getFeaturesArr() {
      var featuresArr = [];
      var featuresList = document.querySelectorAll('.map__checkbox');
      for (var i = 0; i < featuresList.length; i++) {
        if (featuresList[i].checked === true) {
          featuresArr.push(featuresList[i].value);
        };
      };
      return featuresArr;
    }
  }

  function filterObjects() {
    return window.mapModule.mapObjects.filter(function (obj) {
      return syncType(obj) && syncRooms(obj) && syncPrice(obj) && syncGuest(obj) && checkFeatures(filterObj.features, obj.offer.features);
    });

  }
  f.addEventListener('change', function(evt) {
    getFilterValues();
    console.dir(filterObj);
    console.dir(filterObjects());
    window.pin.getAllMapPins(filterObjects);
  });
  function syncType(data) {
    switch(filterObj.type) {
        case 'palace': return data.offer.type === 'palace'; break;
        case 'flat': return data.offer.type === 'flat'; break;
        case 'house': return data.offer.type === 'house'; break;
        case 'bungalo': return data.offer.type === 'bungalo'; break;
        default: return data.offer.type;
      };
  }
  function syncPrice(data) {
   switch(filterObj.price) {
        case 'low': return data.offer.price <  10000; break;
        case 'middle': return data.offer.price >= 10000 && data.offer.price < 50000; break;
        case 'high': return data.offer.price >= 50000; break;
        default: return data.offer.price;
      };
   console.log(data.offer.price);
   console.log(filterObj.price);
 }
  function syncGuest(data) {
    switch (filterObj.guests) {
      case 'any': return data.offer.guests; break;
      case '1': return data.offer.guests === 1; break;
      case '2': return data.offer.guests === 2; break;
      case '0': return data.offer.guests === 0; break;
    };
       console.log(data.offer.guests);
        console.log(filterObj.guests);
  }
  function syncRooms(data) {
    switch(filterObj.rooms) {
        case '1': return data.offer.rooms === 1; break;
        case '2': return data.offer.rooms === 2; break;
        case '3': return data.offer.rooms === 3; break;
        default: return data.offer.rooms;
      };
  }
  function findInArray(array, value) {
    return array.indexOf(value);
  }

  function checkFeatures(filterFeatures, apartFeatures) {
    var result = true;
    filterFeatures.forEach(function(obj) {
      result = result && (findInArray(apartFeatures, obj) > -1);
    });
    return result;
    }

  window.filterModule = {
    filterType: filterType,
    getFilterValues: getFilterValues,
    filterObjects: filterObjects,
    filterObj: filterObj,
    syncPrice: syncPrice,
    syncGuest: syncGuest,
    syncType: syncType,
    checkFeatures: checkFeatures,
    findInArray: findInArray
  };
})();
