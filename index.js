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


  var parseVersion = function (key, text) {
    var pattern = '^.*'+ key +'[\\/\\s](\\d+(\\.\\d+)?).*$';
    var regex = new RegExp(pattern, 'i');
    return text.replace(regex, '$1');
  }

  var ua = function () {
    var w3cdom = typeof doc.getElementById !== UNDEF && typeof doc.getElementsByTagName !== UNDEF && typeof doc.createElement !== UNDEF,
    u = nav.userAgent.toLowerCase(),
    p = nav.platform.toLowerCase(),
    windows = p ? /win/.test(p)     : /win/.test(u),
    linux   = p ? /linux/.test(p)   : /linux/.test(u),
    mac     = p ? /mac/.test(p)     : /mac/.test(u),
    iphone  = p ? /iphone/.test(p)  : /iphone/.test(u),
    ipad    = p ? /ipad/.test(p)    : /ipad/.test(u),
    ipod    = p ? /ipod/.test(p)    : /ipod/.test(u),
    android = /android/.test(u) ? parseVersion('android', u) : false,
    chrome  = /chrome/.test(u)  ? parseVersion('chrome', u) : false,
    firefox = /firefox/.test(u) ? parseVersion('firefox', u) : false,
    safari  = /safari/.test(u)  ? parseVersion('safari', u) : false,
    opera   = /op/.test(u)      ? parseVersion('op', u) : false,
    webkit  = /webkit/.test(u) ? parseVersion('webkit', u) : false,
    trident = /trident/.test(u) ? parseVersion('trident', u) : false,
    ie = nav.appName === "Microsoft Internet Explorer" || /msie/.test(u) || /trident/.test(u),
    playerVersion = [0, 0, 0],
    d = null;

    if (chrome && safari)
      safari = false;

    if (chrome && opera)
      chrome = false;

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
 
    var pv = playerVersion;
    var flash = true;
    if (pv[0] == 0 && pv[1] == 0 && pv[2] == 0) {
      flash = false; 
    }
    return {
      w3       : w3cdom, 
      flashVer : pv, 
      flash    : flash, 
      windows  : windows, 
      mac      : mac, 
      linux    : linux,
      iphone   : iphone, 
      ipad     : ipad,
      ipod     : ipod,
      android  : android,
      chrome   : chrome,
      firefox  : firefox,
      safari   : safari,
      opera    : opera,
      ie       : ie, 
      trident  : trident,
      webkit   : webkit, 
    };
  };
  var userAgent = ua();
  var flashVersion = userAgent.flashVer[0] + '.' + userAgent.flashVer[1] + '.' + userAgent.flashVer[2];

  $('.container').append('<pre>'+ navigator.userAgent +'</pre>');
  $('.container').append('<pre>'+ navigator.platform +'</pre>');

  var data = {
    w3c     : userAgent.w3,
    mac     : userAgent.mac,
    linux   : userAgent.linux,
    windows : userAgent.windows,
    ie      : userAgent.ie,
    andorid : userAgent.android,
    iphone  : userAgent.iphone,
    webkit  : userAgent.webkit,
    trident : userAgent.trident,
    chrome  : userAgent.chrome,
    firefox : userAgent.firefox,
    safari  : userAgent.safari,
    opera   : userAgent.opera,
    flash   : userAgent.flash,
    "flash version" : flashVersion,
  }

  for (var key in data) {
    $('.tbody').append('<tr><td>' + key + '</td>' + '<td>' + data[key] +'</td></tr>');
  }
}())
