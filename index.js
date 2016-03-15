'use strict';

(function () {

  var UNDEF = "undefined"
    , OBJECT = "object"
    , SHOCKWAVE_FLASH = "Shockwave Flash"
    , SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash"
    , FLASH_MIME_TYPE = "application/x-shockwave-flash"
    , EXPRESS_INSTALL_ID = "SWFObjectExprInst"
    , ON_READY_STATE_CHANGE = "onreadystatechange"

    , win = window
    , doc = document
    , nav = navigator

    , plugin = false;

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

  var ua = function () {
    var w3cdom = typeof doc.getElementById !== UNDEF && typeof doc.getElementsByTagName !== UNDEF && typeof doc.createElement !== UNDEF,
    u = nav.userAgent.toLowerCase(),
    p = nav.platform.toLowerCase(),
    windows = p ? /win/.test(p) : /win/.test(u),
    mac = p ? /mac/.test(p) : /mac/.test(u),
    webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
    ie = nav.appName === "Microsoft Internet Explorer",
    playerVersion = [0, 0, 0],
    d = null;

    console.log(u);
    console.log(p);

    if (typeof nav.plugins !== UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] === OBJECT) {
      d = nav.plugins[SHOCKWAVE_FLASH].description;
      // nav.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
      if (d && (typeof nav.mimeTypes !== UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) {
        plugin = true;
        ie = false; // cascaded feature detection for Internet Explorer
        d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
        playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"));
        playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"));
        playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1")) : 0;
      }
    }
    else if (typeof win.ActiveXObject !== UNDEF) {
      try {
        var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
        if (a) { // a will return null when ActiveX is disabled
          d = a.GetVariable("$version");
          if (d) {
            ie = true; // cascaded feature detection for Internet Explorer
            d = d.split(" ")[1].split(",");
            playerVersion = [parseInt(d[0]), parseInt(d[1]), parseInt(d[2])];
          }
        }
      }
      catch (e) {}
    }
    return {w3: w3cdom, pv: playerVersion, wk: webkit, ie: ie, win: windows, mac: mac};
  };
  console.log(ua());

  $('#container').append('<pre>'+ navigator.userAgent +'</pre>');
  $('#container').append('<pre>'+ getBrowserName() +'</pre>');
  $('#container').append('<pre>'+ getMobileOperatingSystem() +'</pre>');
  $('#container').append('<pre>'+ ua() +'</pre>');
}())
