'use strict';

(function () {
  var getBrowserName = function () {
    var isChrome = navigator.userAgent.indexOf('Chrome') > -1;
    var isExplorer = navigator.userAgent.indexOf('MSIE') > -1;
    var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
    var isSafari = navigator.userAgent.indexOf("Safari") > -1;
    var isOpera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
    if ((isChrome)&&(isSafari)) {isSafari=false;}
    if ((isChrome)&&(isOpera)) {isChrome=false;}
    if (isChrome) return 'Chrome';
    if (isExplorer) return 'MSIE';
    if (isFirefox) return 'Firefox';
    if (isSafari) return 'Safari';
    if (isOpera) return 'Opera';
  };

  var getMobileOperatingSystem = function () { 
    var userAgent = navigator.userAgent || navigator.vendor || window.opera; 
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) { 
      return 'IOS'; 
    } 
    else if(userAgent.match(/Android/i)) { 
      return 'Android'; 
    } 
    else { 
      return 'unknown'; 
    } 
  }

  $('#container').append('<p>'+ navigator.userAgent +'</p>');
  $('#container').append('<p>'+ getBrowserName() +'</p>');
  $('#container').append('<p>'+ getMobileOperatingSystem() +'</p>');
}())
