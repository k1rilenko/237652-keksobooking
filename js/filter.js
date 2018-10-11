'use strict';
(function () {
  var filterType = window.formModule.mapFilters.querySelector('#housing-type');

  function filterTypeValue () {
    var filterValue = filterType.value;
    var apartType = window.downloadApart.filter(function (type) {
    return type.offer.type === filterValue;
  });
    window.pin.deletePin();
    console.log(apartType);
    window.pin.getAllMapPins(apartType);
  }

filterType.addEventListener('change', filterTypeValue);


  window.filter = {
    filterType: filterType,
    filterTypeValue: filterTypeValue
  };
})();
