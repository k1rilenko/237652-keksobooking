'use strict';
(function () {
  function download(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('статус ответа: ' + xhr.status + '' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения. Проверьте подключение к интернету');
    });
    xhr.addEventListener('timeout', function () {
      onError('Превышено время соединения c сервером. Сервер не ответил за ' + xhr.timeout + ' мс');
    });
    xhr.timeout = 10000;
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  }
  function upload(data, onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('статус ответа: ' + xhr.status + '' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения. Проверьте подключение к интернету');
    });
    xhr.addEventListener('timeout', function () {
      onError('Превышено время соединения c сервером. Сервер не ответил за ' + xhr.timeout + ' мс');
    });
    xhr.timeout = 10000;
    xhr.open('POST', URL);
    xhr.send(data);
  }
  window.backend = {
    download: download,
    upload: upload
  };
})();
