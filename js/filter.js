'use strict';
(function () {
  var filterType = window.formModule.mapFilters.querySelector('#housing-type');
  var filterPrice = window.formModule.mapFilters.querySelector('#housing-price');

  function filterTypeValue() {
    console.log(window.downloadApart);
    var filterValue = filterType.value;
    var apartParam = window.downloadApart.filter(function (el) {
    return el.offer.type === filterValue;
  });
    window.pin.deletePin();
    console.log(apartParam);
    window.pin.getAllMapPins(apartParam);
  }

  function filterPriceValue() {
    var filterValue = filterPrice.value;
    var apartParam = window.downloadApart.filter(function (el) {
      switch(filterValue) {
        case 'low': return el.offer.price <  10000; break;
        case 'middle': return el.offer.price >= 10000 && el.offer.price < 50000; break;
        case 'high': return el.offer.price >= 50000; break;
        default: return el.offer.price;
      }
  });
      console.log(apartParam);
  };

filterType.addEventListener('change', filterTypeValue);
filterPrice.addEventListener('change', filterPriceValue);


  window.filterModule = {
    filterType: filterType,
    filterTypeValue: filterTypeValue,
    filterPriceValue: filterPriceValue
  };
})();
