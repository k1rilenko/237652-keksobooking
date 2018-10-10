'use strict';
(function () {
  var HORIZON_LINE = 130;
  function getTypeValue(el) {
    var typeValue = el;
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
  }
  window.apartment = {
    HORIZON_LINE: HORIZON_LINE,
    getTypeValue: getTypeValue
  };
})();
