(function($){"use strict";$.ajaxChimp={responses:{"We have sent you a confirmation email":0,"Please enter a value":1,"An email address must contain a single @":2,"The domain portion of the email address is invalid (the portion after the @: )":3,"The username portion of the email address is invalid (the portion before the @: )":4,"This email address looks fake or invalid. Please enter a real email address":5},translations:{en:null},init:function(selector,options){$(selector).ajaxChimp(options)}};$.fn.ajaxChimp=function(options){$(this).each(function(i,elem){var form=$(elem);var email=form.find("input[type=email]");var label=form.find("label[for="+email.attr("id")+"]");var settings=$.extend({url:form.attr("action"),language:"en"},options);var url=settings.url.replace("/post?","/post-json?").concat("&c=?");form.attr("novalidate","true");email.attr("name","EMAIL");form.submit(function(){var msg;function successCallback(resp){if(resp.result==="success"){msg="We have sent you a confirmation email";label.removeClass("error").addClass("valid");email.removeClass("error").addClass("valid")}else{email.removeClass("valid").addClass("error");label.removeClass("valid").addClass("error");var index=-1;try{var parts=resp.msg.split(" - ",2);if(parts[1]===undefined){msg=resp.msg}else{var i=parseInt(parts[0],10);if(i.toString()===parts[0]){index=parts[0];msg=parts[1]}else{index=-1;msg=resp.msg}}}catch(e){index=-1;msg=resp.msg}}if(settings.language!=="en"&&$.ajaxChimp.responses[msg]!==undefined&&$.ajaxChimp.translations&&$.ajaxChimp.translations[settings.language]&&$.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]){msg=$.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]}label.html(msg);label.show(2e3);if(settings.callback){settings.callback(resp)}}var data={};var dataArray=form.serializeArray();$.each(dataArray,function(index,item){data[item.name]=item.value});$.ajax({url:url,data:data,success:successCallback,dataType:"jsonp",error:function(resp,text){console.log("mailchimp ajax submit error: "+text)}});var submitMsg="Submitting...";if(settings.language!=="en"&&$.ajaxChimp.translations&&$.ajaxChimp.translations[settings.language]&&$.ajaxChimp.translations[settings.language]["submit"]){submitMsg=$.ajaxChimp.translations[settings.language]["submit"]}label.html(submitMsg).show(2e3);return false})});return this}})(jQuery);
/*!
 * The Final Countdown for jQuery v2.0.4 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2014 Edson Hilios
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(a){if(a instanceof Date)return a;if(String(a).match(g))return String(a).match(/^[0-9]*$/)&&(a=Number(a)),String(a).match(/\-/)&&(a=String(a).replace(/\-/g,"/")),new Date(a);throw new Error("Couldn't cast `"+a+"` to a date object.")}function c(a){return function(b){var c=b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(c)for(var e=0,f=c.length;f>e;++e){var g=c[e].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),i=new RegExp(g[0]),j=g[1]||"",k=g[3]||"",l=null;g=g[2],h.hasOwnProperty(g)&&(l=h[g],l=Number(a[l])),null!==l&&("!"===j&&(l=d(k,l)),""===j&&10>l&&(l="0"+l.toString()),b=b.replace(i,l.toString()))}return b=b.replace(/%%/,"%")}}function d(a,b){var c="s",d="";return a&&(a=a.replace(/(:|;|\s)/gi,"").split(/\,/),1===a.length?c=a[0]:(d=a[0],c=a[1])),1===Math.abs(b)?d:c}var e=100,f=[],g=[];g.push(/^[0-9]*$/.source),g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g=new RegExp(g.join("|"));var h={Y:"years",m:"months",w:"weeks",d:"days",D:"totalDays",H:"hours",M:"minutes",S:"seconds"},i=function(b,c,d){this.el=b,this.$el=a(b),this.interval=null,this.offset={},this.instanceNumber=f.length,f.push(this),this.$el.data("countdown-instance",this.instanceNumber),d&&(this.$el.on("update.countdown",d),this.$el.on("stoped.countdown",d),this.$el.on("finish.countdown",d)),this.setFinalDate(c),this.start()};a.extend(i.prototype,{start:function(){null!==this.interval&&clearInterval(this.interval);var a=this;this.update(),this.interval=setInterval(function(){a.update.call(a)},e)},stop:function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},pause:function(){this.stop.call(this)},resume:function(){this.start.call(this)},remove:function(){this.stop(),f[this.instanceNumber]=null,delete this.$el.data().countdownInstance},setFinalDate:function(a){this.finalDate=b(a)},update:function(){return 0===this.$el.closest("html").length?void this.remove():(this.totalSecsLeft=this.finalDate.getTime()-(new Date).getTime(),this.totalSecsLeft=Math.ceil(this.totalSecsLeft/1e3),this.totalSecsLeft=this.totalSecsLeft<0?0:this.totalSecsLeft,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,totalDays:Math.floor(this.totalSecsLeft/60/60/24),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),months:Math.floor(this.totalSecsLeft/60/60/24/30),years:Math.floor(this.totalSecsLeft/60/60/24/365)},void(0===this.totalSecsLeft?(this.stop(),this.dispatchEvent("finish")):this.dispatchEvent("update")))},dispatchEvent:function(b){var d=a.Event(b+".countdown");d.finalDate=this.finalDate,d.offset=a.extend({},this.offset),d.strftime=c(this.offset),this.$el.trigger(d)}}),a.fn.countdown=function(){var b=Array.prototype.slice.call(arguments,0);return this.each(function(){var c=a(this).data("countdown-instance");if(void 0!==c){var d=f[c],e=b[0];i.prototype.hasOwnProperty(e)?d[e].apply(d,b.slice(1)):null===String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i)?(d.setFinalDate.call(d,e),d.start()):a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,e))}else new i(this,b[0],b[1])})}});
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.omnivore=e()}}(function(){var e;return function r(e,n,t){function o(u,a){if(!n[u]){if(!e[u]){var s="function"==typeof require&&require;if(!a&&s)return s(u,!0);if(i)return i(u,!0);var f=new Error("Cannot find module '"+u+"'");throw f.code="MODULE_NOT_FOUND",f}var c=n[u]={exports:{}};e[u][0].call(c.exports,function(n){var r=e[u][1][n];return o(r?r:n)},c,c.exports,r,e,n,t)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<t.length;u++)o(t[u]);return o}({1:[function(e,n){function r(e,n){"addData"in e&&e.addData(n),"setGeoJSON"in e&&e.setGeoJSON(n)}function t(e,n,t){var o=t||L.geoJson();return m(e,function(e,n){return e?o.fire("error",{error:e}):(r(o,JSON.parse(n.responseText)),void o.fire("ready"))}),o}function o(e,n,r){function t(e,r){return e?o.fire("error",{error:e}):(c(r.responseText,n,o),void o.fire("ready"))}var o=r||L.geoJson();return m(e,t),o}function i(e,n,r){function t(e,r){function t(){i=!0}var i;return e?o.fire("error",{error:e}):(o.on("error",t),l(r.responseText,n,o),o.off("error",t),void(i||o.fire("ready")))}var o=r||L.geoJson();return m(e,t),o}function u(e,n,r){function t(e,r){function t(){i=!0}var i;return e?o.fire("error",{error:e}):(o.on("error",t),p(r.responseXML||r.responseText,n,o),o.off("error",t),void(i||o.fire("ready")))}var o=r||L.geoJson();return m(e,t),o}function a(e,n,r){function t(e,r){function t(){i=!0}var i;return e?o.fire("error",{error:e}):(o.on("error",t),d(r.responseXML||r.responseText,n,o),o.off("error",t),void(i||o.fire("ready")))}var o=r||L.geoJson();return m(e,t),o}function s(e,n,r){function t(e,r){return e?o.fire("error",{error:e}):(h(r.responseText,n,o),void o.fire("ready"))}var o=r||L.geoJson();return m(e,t),o}function f(e,n,r){function t(e,r){return e?o.fire("error",{error:e}):(g(r.responseText,n,o),void o.fire("ready"))}var o=r||L.geoJson();return m(e,t),o}function c(e,n,t){var o="string"==typeof e?JSON.parse(e):e;t=t||L.geoJson();for(var i in o.objects){var u=E.feature(o,o.objects[i]);u.features?r(t,u.features):r(t,u)}return t}function l(e,n,t){function o(e,n){return e?t.fire("error",{error:e}):void r(t,n)}return t=t||L.geoJson(),n=n||{},y.csv2geojson(e,n,o),t}function p(e,n,t){var o=v(e);if(!o)return t.fire("error",{error:"Could not parse GPX"});t=t||L.geoJson();var i=S.gpx(o);return r(t,i),t}function d(e,n,t){var o=v(e);if(!o)return t.fire("error",{error:"Could not parse KML"});t=t||L.geoJson();var i=S.kml(o);return r(t,i),t}function g(e,n,t){t=t||L.geoJson(),n=n||{};for(var o=x.decode(e,n.precision),i={type:"LineString",coordinates:[]},u=0;u<o.length;u++)i.coordinates[u]=[o[u][1],o[u][0]];return r(t,i),t}function h(e,n,t){t=t||L.geoJson();var o=w(e);return r(t,o),t}function v(e){return"string"==typeof e?(new DOMParser).parseFromString(e,"text/xml"):e}var m=e("corslite"),y=e("csv2geojson"),w=e("wellknown"),x=e("polyline"),E=e("topojson/topojson.js"),S=e("togeojson");n.exports.polyline=f,n.exports.polyline.parse=g,n.exports.geojson=t,n.exports.topojson=o,n.exports.topojson.parse=c,n.exports.csv=i,n.exports.csv.parse=l,n.exports.gpx=u,n.exports.gpx.parse=p,n.exports.kml=a,n.exports.kml.parse=d,n.exports.wkt=s,n.exports.wkt.parse=h},{corslite:5,csv2geojson:6,polyline:9,togeojson:10,"topojson/topojson.js":11,wellknown:12}],2:[function(){},{}],3:[function(e,n){n.exports=e(2)},{"/Users/tmcw/src/leaflet-omnivore/node_modules/browserify/lib/_empty.js":2}],4:[function(e,n){function r(){}var t=n.exports={};t.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,n="undefined"!=typeof window&&window.MutationObserver,r="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};var t=[];if(n){var o=document.createElement("div"),i=new MutationObserver(function(){var e=t.slice();t.length=0,e.forEach(function(e){e()})});return i.observe(o,{attributes:!0}),function(e){t.length||o.setAttribute("yes","no"),t.push(e)}}return r?(window.addEventListener("message",function(e){var n=e.source;if((n===window||null===n)&&"process-tick"===e.data&&(e.stopPropagation(),t.length>0)){var r=t.shift();r()}},!0),function(e){t.push(e),window.postMessage("process-tick","*")}):function(e){setTimeout(e,0)}}(),t.title="browser",t.browser=!0,t.env={},t.argv=[],t.on=r,t.addListener=r,t.once=r,t.off=r,t.removeListener=r,t.removeAllListeners=r,t.emit=r,t.binding=function(){throw new Error("process.binding is not supported")},t.cwd=function(){return"/"},t.chdir=function(){throw new Error("process.chdir is not supported")}},{}],5:[function(e,n){function r(e,n,r){function t(e){return e>=200&&300>e||304===e}function o(){void 0===a.status||t(a.status)?n.call(a,null,a):n.call(a,a,null)}var i=!1;if("undefined"==typeof window.XMLHttpRequest)return n(Error("Browser not supported"));if("undefined"==typeof r){var u=e.match(/^\s*https?:\/\/[^\/]*/);r=u&&u[0]!==location.protocol+"//"+location.domain+(location.port?":"+location.port:"")}var a=new window.XMLHttpRequest;if(r&&!("withCredentials"in a)){a=new window.XDomainRequest;var s=n;n=function(){if(i)s.apply(this,arguments);else{var e=this,n=arguments;setTimeout(function(){s.apply(e,n)},0)}}}return"onload"in a?a.onload=o:a.onreadystatechange=function(){4===a.readyState&&o()},a.onerror=function(e){n.call(this,e||!0,null),n=function(){}},a.onprogress=function(){},a.ontimeout=function(e){n.call(this,e,null),n=function(){}},a.onabort=function(e){n.call(this,e,null),n=function(){}},a.open("GET",e,!0),a.send(null),i=!0,a}"undefined"!=typeof n&&(n.exports=r)},{}],6:[function(e,n){function r(e){return!!e.match(/(Lat)(itude)?/gi)}function t(e){return!!e.match(/(L)(on|ng)(gitude)?/i)}function o(e){return"object"==typeof e?Object.keys(e).length:0}function i(e){var n=[",",";","	","|"],r=[];return n.forEach(function(n){var t=c(n).parse(e);if(t.length>=1){for(var i=o(t[0]),u=0;u<t.length;u++)if(o(t[u])!==i)return;r.push({delimiter:n,arity:Object.keys(t[0]).length})}}),r.length?r.sort(function(e,n){return n.arity-e.arity})[0].delimiter:null}function u(e){var n=i(e);return n?c(n).parse(e):null}function a(e,n,o){o||(o=n,n={}),n.delimiter=n.delimiter||",";var u=n.latfield||"",a=n.lonfield||"",s=[],f={type:"FeatureCollection",features:s};if("auto"===n.delimiter&&"string"==typeof e&&(n.delimiter=i(e),!n.delimiter))return o({type:"Error",message:"Could not autodetect delimiter"});var p="string"==typeof e?c(n.delimiter).parse(e):e;if(!p.length)return o(null,f);if(!u||!a){for(var d in p[0])!u&&r(d)&&(u=d),!a&&t(d)&&(a=d);if(!u||!a){var g=[];for(var h in p[0])g.push(h);return o({type:"Error",message:"Latitude and longitude fields not present",data:p,fields:g})}}for(var v=[],m=0;m<p.length;m++)if(void 0!==p[m][a]&&void 0!==p[m][a]){var y,w,x,L=p[m][a],E=p[m][u];x=l(L,"EW"),x&&(L=x),x=l(E,"NS"),x&&(E=x),y=parseFloat(L),w=parseFloat(E),isNaN(y)||isNaN(w)?v.push({message:"A row contained an invalid value for latitude or longitude",row:p[m]}):(n.includeLatLon||(delete p[m][a],delete p[m][u]),s.push({type:"Feature",properties:p[m],geometry:{type:"Point",coordinates:[parseFloat(y),parseFloat(w)]}}))}o(v.length?v:null,f)}function s(e){for(var n=e.features,r={type:"Feature",geometry:{type:"LineString",coordinates:[]}},t=0;t<n.length;t++)r.geometry.coordinates.push(n[t].geometry.coordinates);return r.properties=n[0].properties,{type:"FeatureCollection",features:[r]}}function f(e){for(var n=e.features,r={type:"Feature",geometry:{type:"Polygon",coordinates:[[]]}},t=0;t<n.length;t++)r.geometry.coordinates[0].push(n[t].geometry.coordinates);return r.properties=n[0].properties,{type:"FeatureCollection",features:[r]}}var c=e("dsv"),l=e("sexagesimal");n.exports={isLon:t,isLat:r,csv:c.csv.parse,tsv:c.tsv.parse,dsv:c,auto:u,csv2geojson:a,toLine:s,toPolygon:f}},{dsv:7,sexagesimal:8}],7:[function(e,n){e("fs");n.exports=new Function('dsv.version = "0.0.3";\n\ndsv.tsv = dsv("\\t");\ndsv.csv = dsv(",");\n\nfunction dsv(delimiter) {\n  var dsv = {},\n      reFormat = new RegExp("[\\"" + delimiter + "\\n]"),\n      delimiterCode = delimiter.charCodeAt(0);\n\n  dsv.parse = function(text, f) {\n    var o;\n    return dsv.parseRows(text, function(row, i) {\n      if (o) return o(row, i - 1);\n      var a = new Function("d", "return {" + row.map(function(name, i) {\n        return JSON.stringify(name) + ": d[" + i + "]";\n      }).join(",") + "}");\n      o = f ? function(row, i) { return f(a(row), i); } : a;\n    });\n  };\n\n  dsv.parseRows = function(text, f) {\n    var EOL = {}, // sentinel value for end-of-line\n        EOF = {}, // sentinel value for end-of-file\n        rows = [], // output rows\n        N = text.length,\n        I = 0, // current character index\n        n = 0, // the current line number\n        t, // the current token\n        eol; // is the current token followed by EOL?\n\n    function token() {\n      if (I >= N) return EOF; // special case: end of file\n      if (eol) return eol = false, EOL; // special case: end of line\n\n      // special case: quotes\n      var j = I;\n      if (text.charCodeAt(j) === 34) {\n        var i = j;\n        while (i++ < N) {\n          if (text.charCodeAt(i) === 34) {\n            if (text.charCodeAt(i + 1) !== 34) break;\n            ++i;\n          }\n        }\n        I = i + 2;\n        var c = text.charCodeAt(i + 1);\n        if (c === 13) {\n          eol = true;\n          if (text.charCodeAt(i + 2) === 10) ++I;\n        } else if (c === 10) {\n          eol = true;\n        }\n        return text.substring(j + 1, i).replace(/""/g, "\\"");\n      }\n\n      // common case: find next delimiter or newline\n      while (I < N) {\n        var c = text.charCodeAt(I++), k = 1;\n        if (c === 10) eol = true; // \\n\n        else if (c === 13) { eol = true; if (text.charCodeAt(I) === 10) ++I, ++k; } // \\r|\\r\\n\n        else if (c !== delimiterCode) continue;\n        return text.substring(j, I - k);\n      }\n\n      // special case: last token before EOF\n      return text.substring(j);\n    }\n\n    while ((t = token()) !== EOF) {\n      var a = [];\n      while (t !== EOL && t !== EOF) {\n        a.push(t);\n        t = token();\n      }\n      if (f && !(a = f(a, n++))) continue;\n      rows.push(a);\n    }\n\n    return rows;\n  };\n\n  dsv.format = function(rows) {\n    if (Array.isArray(rows[0])) return dsv.formatRows(rows); // deprecated; use formatRows\n    var fieldSet = {}, fields = [];\n\n    // Compute unique fields in order of discovery.\n    rows.forEach(function(row) {\n      for (var field in row) {\n        if (!(field in fieldSet)) {\n          fields.push(fieldSet[field] = field);\n        }\n      }\n    });\n\n    return [fields.map(formatValue).join(delimiter)].concat(rows.map(function(row) {\n      return fields.map(function(field) {\n        return formatValue(row[field]);\n      }).join(delimiter);\n    })).join("\\n");\n  };\n\n  dsv.formatRows = function(rows) {\n    return rows.map(formatRow).join("\\n");\n  };\n\n  function formatRow(row) {\n    return row.map(formatValue).join(delimiter);\n  }\n\n  function formatValue(text) {\n    return reFormat.test(text) ? "\\"" + text.replace(/\\"/g, "\\"\\"") + "\\"" : text;\n  }\n\n  return dsv;\n}\n;return dsv')()},{fs:2}],8:[function(e,n){n.exports=function(e,n){if(n||(n="NSEW"),"string"!=typeof e)return null;var r=/^([0-9.]+)°? *(?:([0-9.]+)['’′‘] *)?(?:([0-9.]+)(?:''|"|”|″) *)?([NSEW])?/,t=e.match(r);return t?t[4]&&-1===n.indexOf(t[4])?null:((t[1]?parseFloat(t[1]):0)+(t[2]?parseFloat(t[2])/60:0)+(t[3]?parseFloat(t[3])/3600:0))*(t[4]&&"S"===t[4]||"W"===t[4]?-1:1):null}},{}],9:[function(e,n){function r(e,n){e=Math.round(e*n),e<<=1,0>e&&(e=~e);for(var r="";e>=32;)r+=String.fromCharCode((32|31&e)+63),e>>=5;return r+=String.fromCharCode(e+63)}var t={};t.decode=function(e,n){for(var r,t,o=0,i=0,u=0,a=[],s=0,f=0,c=null,l=Math.pow(10,n||5);o<e.length;){c=null,s=0,f=0;do c=e.charCodeAt(o++)-63,f|=(31&c)<<s,s+=5;while(c>=32);r=1&f?~(f>>1):f>>1,s=f=0;do c=e.charCodeAt(o++)-63,f|=(31&c)<<s,s+=5;while(c>=32);t=1&f?~(f>>1):f>>1,i+=r,u+=t,a.push([i/l,u/l])}return a},t.encode=function(e,n){if(!e.length)return"";for(var t=Math.pow(10,n||5),o=r(e[0][0],t)+r(e[0][1],t),i=1;i<e.length;i++){var u=e[i],a=e[i-1];o+=r(u[0]-a[0],t),o+=r(u[1]-a[1],t)}return o},void 0!==typeof n&&(n.exports=t)},{}],10:[function(e,n,r){(function(t){toGeoJSON=function(){"use strict";function n(e){if(!e||!e.length)return 0;for(var n=0,r=0;n<e.length;n++)r=(r<<5)-r+e.charCodeAt(n)|0;return r}function o(e,n){return e.getElementsByTagName(n)}function i(e,n){return e.getAttribute(n)}function u(e,n){return parseFloat(i(e,n))}function a(e,n){var r=o(e,n);return r.length?r[0]:null}function s(e){return e.normalize&&e.normalize(),e}function f(e){for(var n=0,r=[];n<e.length;n++)r[n]=parseFloat(e[n]);return r}function c(e){var n={};for(var r in e)e[r]&&(n[r]=e[r]);return n}function l(e){return e&&s(e),e&&e.firstChild&&e.firstChild.nodeValue||""}function p(e){return f(e.replace(y,"").split(","))}function d(e){for(var n=e.replace(w,"").split(x),r=[],t=0;t<n.length;t++)r.push(p(n[t]));return r}function g(e){var n=[u(e,"lon"),u(e,"lat")],r=a(e,"ele"),t=a(e,"time");return r&&n.push(parseFloat(l(r))),{coordinates:n,time:t?l(t):null}}function h(){return{type:"FeatureCollection",features:[]}}function v(e){return void 0!==e.xml?e.xml:m.serializeToString(e)}var m,y=/\s*/g,w=/^\s*|\s*$/g,x=/\s+/;"undefined"!=typeof XMLSerializer?m=new XMLSerializer:"object"!=typeof r||"object"!=typeof t||t.browser||(m=new(e("xmldom").XMLSerializer));var L={kml:function(e){function r(e){var n,r;return e=e||"","#"===e.substr(0,1)&&(e=e.substr(1)),(6===e.length||3===e.length)&&(n=e),8===e.length&&(r=parseInt(e.substr(0,2),16)/255,n=e.substr(2)),[n,isNaN(r)?void 0:r]}function t(e){return f(e.split(" "))}function u(e){var n=o(e,"coord","gx"),r=[],i=[];0===n.length&&(n=o(e,"gx:coord"));for(var u=0;u<n.length;u++)r.push(t(l(n[u])));for(var a=o(e,"when"),u=0;u<a.length;u++)i.push(l(a[u]));return{coords:r,times:i}}function s(e){var n,r,t,i,f,c=[],g=[];if(a(e,"MultiGeometry"))return s(a(e,"MultiGeometry"));if(a(e,"MultiTrack"))return s(a(e,"MultiTrack"));if(a(e,"gx:MultiTrack"))return s(a(e,"gx:MultiTrack"));for(t=0;t<y.length;t++)if(r=o(e,y[t]))for(i=0;i<r.length;i++)if(n=r[i],"Point"==y[t])c.push({type:"Point",coordinates:p(l(a(n,"coordinates")))});else if("LineString"==y[t])c.push({type:"LineString",coordinates:d(l(a(n,"coordinates")))});else if("Polygon"==y[t]){var h=o(n,"LinearRing"),v=[];for(f=0;f<h.length;f++)v.push(d(l(a(h[f],"coordinates"))));c.push({type:"Polygon",coordinates:v})}else if("Track"==y[t]||"gx:Track"==y[t]){var m=u(n);c.push({type:"LineString",coordinates:m.coords}),m.times.length&&g.push(m.times)}return{geoms:c,coordTimes:g}}function c(e){var n,t=s(e),u={},f=l(a(e,"name")),c=l(a(e,"styleUrl")),p=l(a(e,"description")),d=a(e,"TimeSpan"),g=a(e,"ExtendedData"),h=a(e,"LineStyle"),v=a(e,"PolyStyle");if(!t.geoms.length)return[];if(f&&(u.name=f),c&&m[c]&&(u.styleUrl=c,u.styleHash=m[c]),p&&(u.description=p),d){var y=l(a(d,"begin")),w=l(a(d,"end"));u.timespan={begin:y,end:w}}if(h){var x=r(l(a(h,"color"))),L=x[0],E=x[1],S=parseFloat(l(a(h,"width")));L&&(u.stroke=L),isNaN(E)||(u["stroke-opacity"]=E),isNaN(S)||(u["stroke-width"]=S)}if(v){var b=r(l(a(v,"color"))),k=b[0],M=b[1],j=l(a(v,"fill")),N=l(a(v,"outline"));k&&(u.fill=k),isNaN(M)||(u["fill-opacity"]=M),j&&(u["fill-opacity"]="1"===j?1:0),N&&(u["stroke-opacity"]="1"===N?1:0)}if(g){var F=o(g,"Data"),P=o(g,"SimpleData");for(n=0;n<F.length;n++)u[F[n].getAttribute("name")]=l(a(F[n],"value"));for(n=0;n<P.length;n++)u[P[n].getAttribute("name")]=l(P[n])}t.coordTimes.length&&(u.coordTimes=1===t.coordTimes.length?t.coordTimes[0]:t.coordTimes);var C={type:"Feature",geometry:1===t.geoms.length?t.geoms[0]:{type:"GeometryCollection",geometries:t.geoms},properties:u};return i(e,"id")&&(C.id=i(e,"id")),[C]}for(var g=h(),m={},y=["Polygon","LineString","Point","Track","gx:Track"],w=o(e,"Placemark"),x=o(e,"Style"),L=0;L<x.length;L++)m["#"+i(x[L],"id")]=n(v(x[L])).toString(16);for(var E=0;E<w.length;E++)g.features=g.features.concat(c(w[E]));return g},gpx:function(e){function n(e,n){var r=o(e,n),t=[],i=[],u=r.length;if(!(2>u)){for(var a=0;u>a;a++){var s=g(r[a]);t.push(s.coordinates),s.time&&i.push(s.time)}return{line:t,times:i}}}function r(e){for(var r,t=o(e,"trkseg"),i=[],a=[],s=0;s<t.length;s++)r=n(t[s],"trkpt"),r.line&&i.push(r.line),r.times.length&&a.push(r.times);if(0!==i.length){var f=u(e);return a.length&&(f.coordTimes=1===i.length?a[0]:a),{type:"Feature",properties:f,geometry:{type:1===i.length?"LineString":"MultiLineString",coordinates:1===i.length?i[0]:i}}}}function t(e){var r=n(e,"rtept");if(r){var t={type:"Feature",properties:u(e),geometry:{type:"LineString",coordinates:r}};return r.times.length&&(t.geometry.times=r.times),t}}function i(e){var n=u(e);return n.sym=l(a(e,"sym")),{type:"Feature",properties:n,geometry:{type:"Point",coordinates:g(e).coordinates}}}function u(e){var n,r=["name","desc","author","copyright","link","time","keywords"],t={};for(n=0;n<r.length;n++)t[r[n]]=l(a(e,r[n]));return c(t)}var s,f,p=o(e,"trk"),d=o(e,"rte"),v=o(e,"wpt"),m=h();for(s=0;s<p.length;s++)f=r(p[s]),f&&m.features.push(f);for(s=0;s<d.length;s++)f=t(d[s]),f&&m.features.push(f);for(s=0;s<v.length;s++)m.features.push(i(v[s]));return m}};return L}(),"undefined"!=typeof n&&(n.exports=toGeoJSON)}).call(this,e("_process"))},{_process:4,xmldom:3}],11:[function(r,t){!function(){function r(e,n){function r(n){var r,t=e.arcs[0>n?~n:n],o=t[0];return e.transform?(r=[0,0],t.forEach(function(e){r[0]+=e[0],r[1]+=e[1]})):r=t[t.length-1],0>n?[r,o]:[o,r]}function t(e,n){for(var r in e){var t=e[r];delete n[t.start],delete t.start,delete t.end,t.forEach(function(e){o[0>e?~e:e]=1}),a.push(t)}}var o={},i={},u={},a=[],s=-1;return n.forEach(function(r,t){var o,i=e.arcs[0>r?~r:r];i.length<3&&!i[1][0]&&!i[1][1]&&(o=n[++s],n[s]=r,n[t]=o)}),n.forEach(function(e){var n,t,o=r(e),a=o[0],s=o[1];if(n=u[a])if(delete u[n.end],n.push(e),n.end=s,t=i[s]){delete i[t.start];var f=t===n?n:n.concat(t);i[f.start=n.start]=u[f.end=t.end]=f}else i[n.start]=u[n.end]=n;else if(n=i[s])if(delete i[n.start],n.unshift(e),n.start=a,t=u[a]){delete u[t.end];var c=t===n?n:t.concat(n);i[c.start=t.start]=u[c.end=n.end]=c}else i[n.start]=u[n.end]=n;else n=[e],i[n.start=a]=u[n.end=s]=n}),t(u,i),t(i,u),n.forEach(function(e){o[0>e?~e:e]||a.push([e])}),a}function o(e,n,t){function o(e){var n=0>e?~e:e;(c[n]||(c[n]=[])).push({i:e,g:f})}function i(e){e.forEach(o)}function u(e){e.forEach(i)}function a(e){"GeometryCollection"===e.type?e.geometries.forEach(a):e.type in l&&(f=e,l[e.type](e.arcs))}var s=[];if(arguments.length>1){var f,c=[],l={LineString:i,MultiLineString:u,Polygon:u,MultiPolygon:function(e){e.forEach(u)}};a(n),c.forEach(arguments.length<3?function(e){s.push(e[0].i)}:function(e){t(e[0].g,e[e.length-1].g)&&s.push(e[0].i)})}else for(var p=0,d=e.arcs.length;d>p;++p)s.push(p);return{type:"MultiLineString",arcs:r(e,s)}}function i(e,t){function o(e){e.forEach(function(n){n.forEach(function(n){(u[n=0>n?~n:n]||(u[n]=[])).push(e)})}),a.push(e)}function i(n){return d(s(e,{type:"Polygon",arcs:[n]}).coordinates[0])>0}var u={},a=[],f=[];return t.forEach(function(e){"Polygon"===e.type?o(e.arcs):"MultiPolygon"===e.type&&e.arcs.forEach(o)}),a.forEach(function(e){if(!e._){var n=[],r=[e];for(e._=1,f.push(n);e=r.pop();)n.push(e),e.forEach(function(e){e.forEach(function(e){u[0>e?~e:e].forEach(function(e){e._||(e._=1,r.push(e))})})})}}),a.forEach(function(e){delete e._}),{type:"MultiPolygon",arcs:f.map(function(t){var o=[];if(t.forEach(function(e){e.forEach(function(e){e.forEach(function(e){u[0>e?~e:e].length<2&&o.push(e)})})}),o=r(e,o),(n=o.length)>1)for(var a,s=i(t[0][0]),f=0;f<n;++f)if(s===i(o[f])){a=o[0],o[0]=o[f],o[f]=a;break}return o})}}function u(e,n){return"GeometryCollection"===n.type?{type:"FeatureCollection",features:n.geometries.map(function(n){return a(e,n)})}:a(e,n)}function a(e,n){var r={type:"Feature",id:n.id,properties:n.properties||{},geometry:s(e,n)};return null==n.id&&delete r.id,r}function s(e,n){function r(e,n){n.length&&n.pop();for(var r,t=c[0>e?~e:e],o=0,i=t.length;i>o;++o)n.push(r=t[o].slice()),s(r,o);0>e&&f(n,i)}function t(e){return e=e.slice(),s(e,0),e}function o(e){for(var n=[],t=0,o=e.length;o>t;++t)r(e[t],n);return n.length<2&&n.push(n[0].slice()),n}function i(e){for(var n=o(e);n.length<4;)n.push(n[0].slice());return n}function u(e){return e.map(i)}function a(e){var n=e.type;return"GeometryCollection"===n?{type:n,geometries:e.geometries.map(a)}:n in l?{type:n,coordinates:l[n](e)}:null}var s=m(e.transform),c=e.arcs,l={Point:function(e){return t(e.coordinates)},MultiPoint:function(e){return e.coordinates.map(t)},LineString:function(e){return o(e.arcs)},MultiLineString:function(e){return e.arcs.map(o)},Polygon:function(e){return u(e.arcs)},MultiPolygon:function(e){return e.arcs.map(u)}};return a(n)}function f(e,n){for(var r,t=e.length,o=t-n;o<--t;)r=e[o],e[o++]=e[t],e[t]=r}function c(e,n){for(var r=0,t=e.length;t>r;){var o=r+t>>>1;e[o]<n?r=o+1:t=o}return r}function l(e){function n(e,n){e.forEach(function(e){0>e&&(e=~e);var r=o[e];r?r.push(n):o[e]=[n]})}function r(e,r){e.forEach(function(e){n(e,r)})}function t(e,n){"GeometryCollection"===e.type?e.geometries.forEach(function(e){t(e,n)}):e.type in u&&u[e.type](e.arcs,n)}var o={},i=e.map(function(){return[]}),u={LineString:n,MultiLineString:r,Polygon:r,MultiPolygon:function(e,n){e.forEach(function(e){r(e,n)})}};e.forEach(t);for(var a in o)for(var s=o[a],f=s.length,l=0;f>l;++l)for(var p=l+1;f>p;++p){var d,g=s[l],h=s[p];(d=i[g])[a=c(d,h)]!==h&&d.splice(a,0,h),(d=i[h])[a=c(d,g)]!==g&&d.splice(a,0,g)}return i}function p(e,n){function r(e){u.remove(e),e[1][2]=n(e),u.push(e)}var t,o=m(e.transform),i=y(e.transform),u=v(),a=0;for(n||(n=g),e.arcs.forEach(function(e){var r=[];e.forEach(o);for(var i=1,a=e.length-1;a>i;++i)t=e.slice(i-1,i+2),t[1][2]=n(t),r.push(t),u.push(t);e[0][2]=e[a][2]=1/0;for(var i=0,a=r.length;a>i;++i)t=r[i],t.previous=r[i-1],t.next=r[i+1]});t=u.pop();){var s=t.previous,f=t.next;t[1][2]<a?t[1][2]=a:a=t[1][2],s&&(s.next=f,s[2]=t[2],r(s)),f&&(f.previous=s,f[0]=t[0],r(f))}return e.arcs.forEach(function(e){e.forEach(i)}),e}function d(e){for(var n,r=-1,t=e.length,o=e[t-1],i=0;++r<t;)n=o,o=e[r],i+=n[0]*o[1]-n[1]*o[0];return.5*i}function g(e){var n=e[0],r=e[1],t=e[2];return Math.abs((n[0]-t[0])*(r[1]-n[1])-(n[0]-r[0])*(t[1]-n[1]))}function h(e,n){return e[1][2]-n[1][2]}function v(){function e(e,n){for(;n>0;){var r=(n+1>>1)-1,o=t[r];if(h(e,o)>=0)break;t[o._=n]=o,t[e._=n=r]=e}}function n(e,n){for(;;){var r=n+1<<1,i=r-1,u=n,a=t[u];if(o>i&&h(t[i],a)<0&&(a=t[u=i]),o>r&&h(t[r],a)<0&&(a=t[u=r]),u===n)break;t[a._=n]=a,t[e._=n=u]=e}}var r={},t=[],o=0;return r.push=function(n){return e(t[n._=o]=n,o++),o},r.pop=function(){if(!(0>=o)){var e,r=t[0];return--o>0&&(e=t[o],n(t[e._=0]=e,0)),r}},r.remove=function(r){var i,u=r._;if(t[u]===r)return u!==--o&&(i=t[o],(h(i,r)<0?e:n)(t[i._=u]=i,u)),u},r}function m(e){if(!e)return w;var n,r,t=e.scale[0],o=e.scale[1],i=e.translate[0],u=e.translate[1];return function(e,a){a||(n=r=0),e[0]=(n+=e[0])*t+i,e[1]=(r+=e[1])*o+u}}function y(e){if(!e)return w;var n,r,t=e.scale[0],o=e.scale[1],i=e.translate[0],u=e.translate[1];return function(e,a){a||(n=r=0);var s=(e[0]-i)/t|0,f=(e[1]-u)/o|0;e[0]=s-n,e[1]=f-r,n=s,r=f}}function w(){}var x={version:"1.6.8",mesh:function(e){return s(e,o.apply(this,arguments))},meshArcs:o,merge:function(e){return s(e,i.apply(this,arguments))},mergeArcs:i,feature:u,neighbors:l,presimplify:p};"function"==typeof e&&e.amd?e(x):"object"==typeof t&&t.exports?t.exports=x:this.topojson=x}()},{}],12:[function(e,n){function r(e){function n(n){var r=e.substring(m).match(n);return r?(m+=r[0].length,r[0]):null}function r(e){return e&&v.match(/\d+/)&&(e.crs={type:"name",properties:{name:"urn:ogc:def:crs:EPSG::"+v}}),e}function t(){n(/^\s*/)}function i(){t();for(var e,r=0,i=[],u=[i],a=i;e=n(/^(\()/)||n(/^(\))/)||n(/^(\,)/)||n(o);){if("("==e)u.push(a),a=[],u[u.length-1].push(a),r++;else if(")"==e){if(a=u.pop(),!a)return;if(r--,0===r)break}else if(","===e)a=[],u[u.length-1].push(a);else{if(isNaN(parseFloat(e)))return null;a.push(parseFloat(e))}t()}return 0!==r?null:i}function u(){for(var e,r,i=[];r=n(o)||n(/^(\,)/);)","==r?(i.push(e),e=[]):(e||(e=[]),e.push(parseFloat(r))),t();return e&&i.push(e),i.length?i:null}function a(){if(!n(/^(point)/i))return null;if(t(),!n(/^(\()/))return null;var e=u();return e?(t(),n(/^(\))/)?{type:"Point",coordinates:e[0]}:null):null}function s(){if(!n(/^(multipoint)/i))return null;t();var e=i();return e?(t(),{type:"MultiPoint",coordinates:e}):null}function f(){if(!n(/^(multilinestring)/i))return null;t();var e=i();return e?(t(),{type:"MultiLineString",coordinates:e}):null}function c(){if(!n(/^(linestring)/i))return null;if(t(),!n(/^(\()/))return null;var e=u();return e&&n(/^(\))/)?{type:"LineString",coordinates:e}:null}function l(){return n(/^(polygon)/i)?(t(),{type:"Polygon",coordinates:i()}):null}function p(){return n(/^(multipolygon)/i)?(t(),{type:"MultiPolygon",coordinates:i()}):null}function d(){var e,r=[];if(!n(/^(geometrycollection)/i))return null;if(t(),!n(/^(\()/))return null;for(;e=g();)r.push(e),t(),n(/^(\,)/),t();return n(/^(\))/)?{type:"GeometryCollection",geometries:r}:null}function g(){return a()||c()||l()||s()||f()||p()||d()}var h=e.split(";"),e=h.pop(),v=(h.shift()||"").split("=").pop(),m=0;return r(g())}function t(e){function n(e){return 2===e.length?e[0]+" "+e[1]:3===e.length?e[0]+" "+e[1]+" "+e[2]:void 0}function r(e){return e.map(n).join(", ")}function o(e){return e.map(r).map(u).join(", ")}function i(e){return e.map(o).map(u).join(", ")}function u(e){return"("+e+")"}switch("Feature"===e.type&&(e=e.geometry),e.type){case"Point":return"POINT ("+n(e.coordinates)+")";case"LineString":return"LINESTRING ("+r(e.coordinates)+")";case"Polygon":return"POLYGON ("+o(e.coordinates)+")";case"MultiPoint":return"MULTIPOINT ("+r(e.coordinates)+")";case"MultiPolygon":return"MULTIPOLYGON ("+i(e.coordinates)+")";case"MultiLineString":return"MULTILINESTRING ("+o(e.coordinates)+")";case"GeometryCollection":return"GEOMETRYCOLLECTION ("+e.geometries.map(t).join(", ")+")";default:throw new Error("stringify requires a valid GeoJSON Feature or geometry object as input")}}n.exports=r,n.exports.parse=r,n.exports.stringify=t;var o=/^[-+]?([0-9]*\.[0-9]+|[0-9]+)([eE][-+]?[0-9]+)?/},{}]},{},[1])(1)});
/*
 Leaflet.markercluster, Provides Beautiful Animated Marker Clustering functionality for Leaflet, a JS library for interactive maps.
 https://github.com/Leaflet/Leaflet.markercluster
 (c) 2012-2013, Dave Leaver, smartrak
*/
!function(t,e){L.MarkerClusterGroup=L.FeatureGroup.extend({options:{maxClusterRadius:80,iconCreateFunction:null,spiderfyOnMaxZoom:!0,showCoverageOnHover:!0,zoomToBoundsOnClick:!0,singleMarkerMode:!1,disableClusteringAtZoom:null,removeOutsideVisibleBounds:!0,animateAddingMarkers:!1,spiderfyDistanceMultiplier:1,polygonOptions:{}},initialize:function(t){L.Util.setOptions(this,t),this.options.iconCreateFunction||(this.options.iconCreateFunction=this._defaultIconCreateFunction),this._featureGroup=L.featureGroup(),this._featureGroup.on(L.FeatureGroup.EVENTS,this._propagateEvent,this),this._nonPointGroup=L.featureGroup(),this._nonPointGroup.on(L.FeatureGroup.EVENTS,this._propagateEvent,this),this._inZoomAnimation=0,this._needsClustering=[],this._needsRemoving=[],this._currentShownBounds=null,this._queue=[]},addLayer:function(t){if(t instanceof L.LayerGroup){var e=[];for(var i in t._layers)e.push(t._layers[i]);return this.addLayers(e)}if(!t.getLatLng)return this._nonPointGroup.addLayer(t),this;if(!this._map)return this._needsClustering.push(t),this;if(this.hasLayer(t))return this;this._unspiderfy&&this._unspiderfy(),this._addLayer(t,this._maxZoom);var n=t,s=this._map.getZoom();if(t.__parent)for(;n.__parent._zoom>=s;)n=n.__parent;return this._currentShownBounds.contains(n.getLatLng())&&(this.options.animateAddingMarkers?this._animationAddLayer(t,n):this._animationAddLayerNonAnimated(t,n)),this},removeLayer:function(t){if(t instanceof L.LayerGroup){var e=[];for(var i in t._layers)e.push(t._layers[i]);return this.removeLayers(e)}return t.getLatLng?this._map?t.__parent?(this._unspiderfy&&(this._unspiderfy(),this._unspiderfyLayer(t)),this._removeLayer(t,!0),this._featureGroup.hasLayer(t)&&(this._featureGroup.removeLayer(t),t.setOpacity&&t.setOpacity(1)),this):this:(!this._arraySplice(this._needsClustering,t)&&this.hasLayer(t)&&this._needsRemoving.push(t),this):(this._nonPointGroup.removeLayer(t),this)},addLayers:function(t){var e,i,n,s=this._map,r=this._featureGroup,o=this._nonPointGroup;for(e=0,i=t.length;i>e;e++)if(n=t[e],n.getLatLng){if(!this.hasLayer(n))if(s){if(this._addLayer(n,this._maxZoom),n.__parent&&2===n.__parent.getChildCount()){var a=n.__parent.getAllChildMarkers(),h=a[0]===n?a[1]:a[0];r.removeLayer(h)}}else this._needsClustering.push(n)}else o.addLayer(n);return s&&(r.eachLayer(function(t){t instanceof L.MarkerCluster&&t._iconNeedsUpdate&&t._updateIcon()}),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds)),this},removeLayers:function(t){var e,i,n,s=this._featureGroup,r=this._nonPointGroup;if(!this._map){for(e=0,i=t.length;i>e;e++)n=t[e],this._arraySplice(this._needsClustering,n),r.removeLayer(n);return this}for(e=0,i=t.length;i>e;e++)n=t[e],n.__parent?(this._removeLayer(n,!0,!0),s.hasLayer(n)&&(s.removeLayer(n),n.setOpacity&&n.setOpacity(1))):r.removeLayer(n);return this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds),s.eachLayer(function(t){t instanceof L.MarkerCluster&&t._updateIcon()}),this},clearLayers:function(){return this._map||(this._needsClustering=[],delete this._gridClusters,delete this._gridUnclustered),this._noanimationUnspiderfy&&this._noanimationUnspiderfy(),this._featureGroup.clearLayers(),this._nonPointGroup.clearLayers(),this.eachLayer(function(t){delete t.__parent}),this._map&&this._generateInitialClusters(),this},getBounds:function(){var t=new L.LatLngBounds;if(this._topClusterLevel)t.extend(this._topClusterLevel._bounds);else for(var e=this._needsClustering.length-1;e>=0;e--)t.extend(this._needsClustering[e].getLatLng());return t.extend(this._nonPointGroup.getBounds()),t},eachLayer:function(t,e){var i,n=this._needsClustering.slice();for(this._topClusterLevel&&this._topClusterLevel.getAllChildMarkers(n),i=n.length-1;i>=0;i--)t.call(e,n[i]);this._nonPointGroup.eachLayer(t,e)},getLayers:function(){var t=[];return this.eachLayer(function(e){t.push(e)}),t},getLayer:function(t){var e=null;return this.eachLayer(function(i){L.stamp(i)===t&&(e=i)}),e},hasLayer:function(t){if(!t)return!1;var e,i=this._needsClustering;for(e=i.length-1;e>=0;e--)if(i[e]===t)return!0;for(i=this._needsRemoving,e=i.length-1;e>=0;e--)if(i[e]===t)return!1;return!(!t.__parent||t.__parent._group!==this)||this._nonPointGroup.hasLayer(t)},zoomToShowLayer:function(t,e){var i=function(){if((t._icon||t.__parent._icon)&&!this._inZoomAnimation)if(this._map.off("moveend",i,this),this.off("animationend",i,this),t._icon)e();else if(t.__parent._icon){var n=function(){this.off("spiderfied",n,this),e()};this.on("spiderfied",n,this),t.__parent.spiderfy()}};t._icon&&this._map.getBounds().contains(t.getLatLng())?e():t.__parent._zoom<this._map.getZoom()?(this._map.on("moveend",i,this),this._map.panTo(t.getLatLng())):(this._map.on("moveend",i,this),this.on("animationend",i,this),this._map.setView(t.getLatLng(),t.__parent._zoom+1),t.__parent.zoomToBounds())},onAdd:function(t){this._map=t;var e,i,n;if(!isFinite(this._map.getMaxZoom()))throw"Map has no maxZoom specified";for(this._featureGroup.onAdd(t),this._nonPointGroup.onAdd(t),this._gridClusters||this._generateInitialClusters(),e=0,i=this._needsRemoving.length;i>e;e++)n=this._needsRemoving[e],this._removeLayer(n,!0);for(this._needsRemoving=[],e=0,i=this._needsClustering.length;i>e;e++)n=this._needsClustering[e],n.getLatLng?n.__parent||this._addLayer(n,this._maxZoom):this._featureGroup.addLayer(n);this._needsClustering=[],this._map.on("zoomend",this._zoomEnd,this),this._map.on("moveend",this._moveEnd,this),this._spiderfierOnAdd&&this._spiderfierOnAdd(),this._bindEvents(),this._zoom=this._map.getZoom(),this._currentShownBounds=this._getExpandedVisibleBounds(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds)},onRemove:function(t){t.off("zoomend",this._zoomEnd,this),t.off("moveend",this._moveEnd,this),this._unbindEvents(),this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim",""),this._spiderfierOnRemove&&this._spiderfierOnRemove(),this._hideCoverage(),this._featureGroup.onRemove(t),this._nonPointGroup.onRemove(t),this._featureGroup.clearLayers(),this._map=null},getVisibleParent:function(t){for(var e=t;e&&!e._icon;)e=e.__parent;return e||null},_arraySplice:function(t,e){for(var i=t.length-1;i>=0;i--)if(t[i]===e)return t.splice(i,1),!0},_removeLayer:function(t,e,i){var n=this._gridClusters,s=this._gridUnclustered,r=this._featureGroup,o=this._map;if(e)for(var a=this._maxZoom;a>=0&&s[a].removeObject(t,o.project(t.getLatLng(),a));a--);var h,_=t.__parent,u=_._markers;for(this._arraySplice(u,t);_&&(_._childCount--,!(_._zoom<0));)e&&_._childCount<=1?(h=_._markers[0]===t?_._markers[1]:_._markers[0],n[_._zoom].removeObject(_,o.project(_._cLatLng,_._zoom)),s[_._zoom].addObject(h,o.project(h.getLatLng(),_._zoom)),this._arraySplice(_.__parent._childClusters,_),_.__parent._markers.push(h),h.__parent=_.__parent,_._icon&&(r.removeLayer(_),i||r.addLayer(h))):(_._recalculateBounds(),i&&_._icon||_._updateIcon()),_=_.__parent;delete t.__parent},_isOrIsParent:function(t,e){for(;e;){if(t===e)return!0;e=e.parentNode}return!1},_propagateEvent:function(t){if(t.layer instanceof L.MarkerCluster){if(t.originalEvent&&this._isOrIsParent(t.layer._icon,t.originalEvent.relatedTarget))return;t.type="cluster"+t.type}this.fire(t.type,t)},_defaultIconCreateFunction:function(t){var e=t.getChildCount(),i=" marker-cluster-";return i+=10>e?"small":100>e?"medium":"large",new L.DivIcon({html:"<div><span>"+e+"</span></div>",className:"marker-cluster"+i,iconSize:new L.Point(40,40)})},_bindEvents:function(){var t=this._map,e=this.options.spiderfyOnMaxZoom,i=this.options.showCoverageOnHover,n=this.options.zoomToBoundsOnClick;(e||n)&&this.on("clusterclick",this._zoomOrSpiderfy,this),i&&(this.on("clustermouseover",this._showCoverage,this),this.on("clustermouseout",this._hideCoverage,this),t.on("zoomend",this._hideCoverage,this))},_zoomOrSpiderfy:function(t){var e=this._map;e.getMaxZoom()===e.getZoom()?this.options.spiderfyOnMaxZoom&&t.layer.spiderfy():this.options.zoomToBoundsOnClick&&t.layer.zoomToBounds(),t.originalEvent&&13===t.originalEvent.keyCode&&e._container.focus()},_showCoverage:function(t){var e=this._map;this._inZoomAnimation||(this._shownPolygon&&e.removeLayer(this._shownPolygon),t.layer.getChildCount()>2&&t.layer!==this._spiderfied&&(this._shownPolygon=new L.Polygon(t.layer.getConvexHull(),this.options.polygonOptions),e.addLayer(this._shownPolygon)))},_hideCoverage:function(){this._shownPolygon&&(this._map.removeLayer(this._shownPolygon),this._shownPolygon=null)},_unbindEvents:function(){var t=this.options.spiderfyOnMaxZoom,e=this.options.showCoverageOnHover,i=this.options.zoomToBoundsOnClick,n=this._map;(t||i)&&this.off("clusterclick",this._zoomOrSpiderfy,this),e&&(this.off("clustermouseover",this._showCoverage,this),this.off("clustermouseout",this._hideCoverage,this),n.off("zoomend",this._hideCoverage,this))},_zoomEnd:function(){this._map&&(this._mergeSplitClusters(),this._zoom=this._map._zoom,this._currentShownBounds=this._getExpandedVisibleBounds())},_moveEnd:function(){if(!this._inZoomAnimation){var t=this._getExpandedVisibleBounds();this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,this._zoom,t),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._map._zoom,t),this._currentShownBounds=t}},_generateInitialClusters:function(){var t=this._map.getMaxZoom(),e=this.options.maxClusterRadius;this.options.disableClusteringAtZoom&&(t=this.options.disableClusteringAtZoom-1),this._maxZoom=t,this._gridClusters={},this._gridUnclustered={};for(var i=t;i>=0;i--)this._gridClusters[i]=new L.DistanceGrid(e),this._gridUnclustered[i]=new L.DistanceGrid(e);this._topClusterLevel=new L.MarkerCluster(this,-1)},_addLayer:function(t,e){var i,n,s=this._gridClusters,r=this._gridUnclustered;for(this.options.singleMarkerMode&&(t.options.icon=this.options.iconCreateFunction({getChildCount:function(){return 1},getAllChildMarkers:function(){return[t]}}));e>=0;e--){i=this._map.project(t.getLatLng(),e);var o=s[e].getNearObject(i);if(o)return o._addChild(t),t.__parent=o,void 0;if(o=r[e].getNearObject(i)){var a=o.__parent;a&&this._removeLayer(o,!1);var h=new L.MarkerCluster(this,e,o,t);s[e].addObject(h,this._map.project(h._cLatLng,e)),o.__parent=h,t.__parent=h;var _=h;for(n=e-1;n>a._zoom;n--)_=new L.MarkerCluster(this,n,_),s[n].addObject(_,this._map.project(o.getLatLng(),n));for(a._addChild(_),n=e;n>=0&&r[n].removeObject(o,this._map.project(o.getLatLng(),n));n--);return}r[e].addObject(t,i)}this._topClusterLevel._addChild(t),t.__parent=this._topClusterLevel},_enqueue:function(t){this._queue.push(t),this._queueTimeout||(this._queueTimeout=setTimeout(L.bind(this._processQueue,this),300))},_processQueue:function(){for(var t=0;t<this._queue.length;t++)this._queue[t].call(this);this._queue.length=0,clearTimeout(this._queueTimeout),this._queueTimeout=null},_mergeSplitClusters:function(){this._processQueue(),this._zoom<this._map._zoom&&this._currentShownBounds.contains(this._getExpandedVisibleBounds())?(this._animationStart(),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,this._zoom,this._getExpandedVisibleBounds()),this._animationZoomIn(this._zoom,this._map._zoom)):this._zoom>this._map._zoom?(this._animationStart(),this._animationZoomOut(this._zoom,this._map._zoom)):this._moveEnd()},_getExpandedVisibleBounds:function(){if(!this.options.removeOutsideVisibleBounds)return this.getBounds();var t=this._map,e=t.getBounds(),i=e._southWest,n=e._northEast,s=L.Browser.mobile?0:Math.abs(i.lat-n.lat),r=L.Browser.mobile?0:Math.abs(i.lng-n.lng);return new L.LatLngBounds(new L.LatLng(i.lat-s,i.lng-r,!0),new L.LatLng(n.lat+s,n.lng+r,!0))},_animationAddLayerNonAnimated:function(t,e){if(e===t)this._featureGroup.addLayer(t);else if(2===e._childCount){e._addToMap();var i=e.getAllChildMarkers();this._featureGroup.removeLayer(i[0]),this._featureGroup.removeLayer(i[1])}else e._updateIcon()}}),L.MarkerClusterGroup.include(L.DomUtil.TRANSITION?{_animationStart:function(){this._map._mapPane.className+=" leaflet-cluster-anim",this._inZoomAnimation++},_animationEnd:function(){this._map&&(this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim","")),this._inZoomAnimation--,this.fire("animationend")},_animationZoomIn:function(t,e){var i,n=this._getExpandedVisibleBounds(),s=this._featureGroup;this._topClusterLevel._recursively(n,t,0,function(r){var o,a=r._latlng,h=r._markers;for(n.contains(a)||(a=null),r._isSingleParent()&&t+1===e?(s.removeLayer(r),r._recursivelyAddChildrenToMap(null,e,n)):(r.setOpacity(0),r._recursivelyAddChildrenToMap(a,e,n)),i=h.length-1;i>=0;i--)o=h[i],n.contains(o._latlng)||s.removeLayer(o)}),this._forceLayout(),this._topClusterLevel._recursivelyBecomeVisible(n,e),s.eachLayer(function(t){t instanceof L.MarkerCluster||!t._icon||t.setOpacity(1)}),this._topClusterLevel._recursively(n,t,e,function(t){t._recursivelyRestoreChildPositions(e)}),this._enqueue(function(){this._topClusterLevel._recursively(n,t,0,function(t){s.removeLayer(t),t.setOpacity(1)}),this._animationEnd()})},_animationZoomOut:function(t,e){this._animationZoomOutSingle(this._topClusterLevel,t-1,e),this._topClusterLevel._recursivelyAddChildrenToMap(null,e,this._getExpandedVisibleBounds()),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,t,this._getExpandedVisibleBounds())},_animationZoomOutSingle:function(t,e,i){var n=this._getExpandedVisibleBounds();t._recursivelyAnimateChildrenInAndAddSelfToMap(n,e+1,i);var s=this;this._forceLayout(),t._recursivelyBecomeVisible(n,i),this._enqueue(function(){if(1===t._childCount){var r=t._markers[0];r.setLatLng(r.getLatLng()),r.setOpacity(1)}else t._recursively(n,i,0,function(t){t._recursivelyRemoveChildrenFromMap(n,e+1)});s._animationEnd()})},_animationAddLayer:function(t,e){var i=this,n=this._featureGroup;n.addLayer(t),e!==t&&(e._childCount>2?(e._updateIcon(),this._forceLayout(),this._animationStart(),t._setPos(this._map.latLngToLayerPoint(e.getLatLng())),t.setOpacity(0),this._enqueue(function(){n.removeLayer(t),t.setOpacity(1),i._animationEnd()})):(this._forceLayout(),i._animationStart(),i._animationZoomOutSingle(e,this._map.getMaxZoom(),this._map.getZoom())))},_forceLayout:function(){L.Util.falseFn(e.body.offsetWidth)}}:{_animationStart:function(){},_animationZoomIn:function(t,e){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,t),this._topClusterLevel._recursivelyAddChildrenToMap(null,e,this._getExpandedVisibleBounds())},_animationZoomOut:function(t,e){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,t),this._topClusterLevel._recursivelyAddChildrenToMap(null,e,this._getExpandedVisibleBounds())},_animationAddLayer:function(t,e){this._animationAddLayerNonAnimated(t,e)}}),L.markerClusterGroup=function(t){return new L.MarkerClusterGroup(t)},L.MarkerCluster=L.Marker.extend({initialize:function(t,e,i,n){L.Marker.prototype.initialize.call(this,i?i._cLatLng||i.getLatLng():new L.LatLng(0,0),{icon:this}),this._group=t,this._zoom=e,this._markers=[],this._childClusters=[],this._childCount=0,this._iconNeedsUpdate=!0,this._bounds=new L.LatLngBounds,i&&this._addChild(i),n&&this._addChild(n)},getAllChildMarkers:function(t){t=t||[];for(var e=this._childClusters.length-1;e>=0;e--)this._childClusters[e].getAllChildMarkers(t);for(var i=this._markers.length-1;i>=0;i--)t.push(this._markers[i]);return t},getChildCount:function(){return this._childCount},zoomToBounds:function(){for(var t,e=this._childClusters.slice(),i=this._group._map,n=i.getBoundsZoom(this._bounds),s=this._zoom+1,r=i.getZoom();e.length>0&&n>s;){s++;var o=[];for(t=0;t<e.length;t++)o=o.concat(e[t]._childClusters);e=o}n>s?this._group._map.setView(this._latlng,s):r>=n?this._group._map.setView(this._latlng,r+1):this._group._map.fitBounds(this._bounds)},getBounds:function(){var t=new L.LatLngBounds;return t.extend(this._bounds),t},_updateIcon:function(){this._iconNeedsUpdate=!0,this._icon&&this.setIcon(this)},createIcon:function(){return this._iconNeedsUpdate&&(this._iconObj=this._group.options.iconCreateFunction(this),this._iconNeedsUpdate=!1),this._iconObj.createIcon()},createShadow:function(){return this._iconObj.createShadow()},_addChild:function(t,e){this._iconNeedsUpdate=!0,this._expandBounds(t),t instanceof L.MarkerCluster?(e||(this._childClusters.push(t),t.__parent=this),this._childCount+=t._childCount):(e||this._markers.push(t),this._childCount++),this.__parent&&this.__parent._addChild(t,!0)},_expandBounds:function(t){var e,i=t._wLatLng||t._latlng;t instanceof L.MarkerCluster?(this._bounds.extend(t._bounds),e=t._childCount):(this._bounds.extend(i),e=1),this._cLatLng||(this._cLatLng=t._cLatLng||i);var n=this._childCount+e;this._wLatLng?(this._wLatLng.lat=(i.lat*e+this._wLatLng.lat*this._childCount)/n,this._wLatLng.lng=(i.lng*e+this._wLatLng.lng*this._childCount)/n):this._latlng=this._wLatLng=new L.LatLng(i.lat,i.lng)},_addToMap:function(t){t&&(this._backupLatlng=this._latlng,this.setLatLng(t)),this._group._featureGroup.addLayer(this)},_recursivelyAnimateChildrenIn:function(t,e,i){this._recursively(t,0,i-1,function(t){var i,n,s=t._markers;for(i=s.length-1;i>=0;i--)n=s[i],n._icon&&(n._setPos(e),n.setOpacity(0))},function(t){var i,n,s=t._childClusters;for(i=s.length-1;i>=0;i--)n=s[i],n._icon&&(n._setPos(e),n.setOpacity(0))})},_recursivelyAnimateChildrenInAndAddSelfToMap:function(t,e,i){this._recursively(t,i,0,function(n){n._recursivelyAnimateChildrenIn(t,n._group._map.latLngToLayerPoint(n.getLatLng()).round(),e),n._isSingleParent()&&e-1===i?(n.setOpacity(1),n._recursivelyRemoveChildrenFromMap(t,e)):n.setOpacity(0),n._addToMap()})},_recursivelyBecomeVisible:function(t,e){this._recursively(t,0,e,null,function(t){t.setOpacity(1)})},_recursivelyAddChildrenToMap:function(t,e,i){this._recursively(i,-1,e,function(n){if(e!==n._zoom)for(var s=n._markers.length-1;s>=0;s--){var r=n._markers[s];i.contains(r._latlng)&&(t&&(r._backupLatlng=r.getLatLng(),r.setLatLng(t),r.setOpacity&&r.setOpacity(0)),n._group._featureGroup.addLayer(r))}},function(e){e._addToMap(t)})},_recursivelyRestoreChildPositions:function(t){for(var e=this._markers.length-1;e>=0;e--){var i=this._markers[e];i._backupLatlng&&(i.setLatLng(i._backupLatlng),delete i._backupLatlng)}if(t-1===this._zoom)for(var n=this._childClusters.length-1;n>=0;n--)this._childClusters[n]._restorePosition();else for(var s=this._childClusters.length-1;s>=0;s--)this._childClusters[s]._recursivelyRestoreChildPositions(t)},_restorePosition:function(){this._backupLatlng&&(this.setLatLng(this._backupLatlng),delete this._backupLatlng)},_recursivelyRemoveChildrenFromMap:function(t,e,i){var n,s;this._recursively(t,-1,e-1,function(t){for(s=t._markers.length-1;s>=0;s--)n=t._markers[s],i&&i.contains(n._latlng)||(t._group._featureGroup.removeLayer(n),n.setOpacity&&n.setOpacity(1))},function(t){for(s=t._childClusters.length-1;s>=0;s--)n=t._childClusters[s],i&&i.contains(n._latlng)||(t._group._featureGroup.removeLayer(n),n.setOpacity&&n.setOpacity(1))})},_recursively:function(t,e,i,n,s){var r,o,a=this._childClusters,h=this._zoom;if(e>h)for(r=a.length-1;r>=0;r--)o=a[r],t.intersects(o._bounds)&&o._recursively(t,e,i,n,s);else if(n&&n(this),s&&this._zoom===i&&s(this),i>h)for(r=a.length-1;r>=0;r--)o=a[r],t.intersects(o._bounds)&&o._recursively(t,e,i,n,s)},_recalculateBounds:function(){var t,e=this._markers,i=this._childClusters;for(this._bounds=new L.LatLngBounds,delete this._wLatLng,t=e.length-1;t>=0;t--)this._expandBounds(e[t]);for(t=i.length-1;t>=0;t--)this._expandBounds(i[t])},_isSingleParent:function(){return this._childClusters.length>0&&this._childClusters[0]._childCount===this._childCount}}),L.DistanceGrid=function(t){this._cellSize=t,this._sqCellSize=t*t,this._grid={},this._objectPoint={}},L.DistanceGrid.prototype={addObject:function(t,e){var i=this._getCoord(e.x),n=this._getCoord(e.y),s=this._grid,r=s[n]=s[n]||{},o=r[i]=r[i]||[],a=L.Util.stamp(t);this._objectPoint[a]=e,o.push(t)},updateObject:function(t,e){this.removeObject(t),this.addObject(t,e)},removeObject:function(t,e){var i,n,s=this._getCoord(e.x),r=this._getCoord(e.y),o=this._grid,a=o[r]=o[r]||{},h=a[s]=a[s]||[];for(delete this._objectPoint[L.Util.stamp(t)],i=0,n=h.length;n>i;i++)if(h[i]===t)return h.splice(i,1),1===n&&delete a[s],!0},eachObject:function(t,e){var i,n,s,r,o,a,h,_=this._grid;for(i in _){o=_[i];for(n in o)for(a=o[n],s=0,r=a.length;r>s;s++)h=t.call(e,a[s]),h&&(s--,r--)}},getNearObject:function(t){var e,i,n,s,r,o,a,h,_=this._getCoord(t.x),u=this._getCoord(t.y),l=this._objectPoint,d=this._sqCellSize,p=null;for(e=u-1;u+1>=e;e++)if(s=this._grid[e])for(i=_-1;_+1>=i;i++)if(r=s[i])for(n=0,o=r.length;o>n;n++)a=r[n],h=this._sqDist(l[L.Util.stamp(a)],t),d>h&&(d=h,p=a);return p},_getCoord:function(t){return Math.floor(t/this._cellSize)},_sqDist:function(t,e){var i=e.x-t.x,n=e.y-t.y;return i*i+n*n}},function(){L.QuickHull={getDistant:function(t,e){var i=e[1].lat-e[0].lat,n=e[0].lng-e[1].lng;return n*(t.lat-e[0].lat)+i*(t.lng-e[0].lng)},findMostDistantPointFromBaseLine:function(t,e){var i,n,s,r=0,o=null,a=[];for(i=e.length-1;i>=0;i--)n=e[i],s=this.getDistant(n,t),s>0&&(a.push(n),s>r&&(r=s,o=n));return{maxPoint:o,newPoints:a}},buildConvexHull:function(t,e){var i=[],n=this.findMostDistantPointFromBaseLine(t,e);return n.maxPoint?(i=i.concat(this.buildConvexHull([t[0],n.maxPoint],n.newPoints)),i=i.concat(this.buildConvexHull([n.maxPoint,t[1]],n.newPoints))):[t[0]]},getConvexHull:function(t){var e,i=!1,n=!1,s=null,r=null;for(e=t.length-1;e>=0;e--){var o=t[e];(i===!1||o.lat>i)&&(s=o,i=o.lat),(n===!1||o.lat<n)&&(r=o,n=o.lat)}var a=[].concat(this.buildConvexHull([r,s],t),this.buildConvexHull([s,r],t));return a}}}(),L.MarkerCluster.include({getConvexHull:function(){var t,e,i=this.getAllChildMarkers(),n=[];for(e=i.length-1;e>=0;e--)t=i[e].getLatLng(),n.push(t);return L.QuickHull.getConvexHull(n)}}),L.MarkerCluster.include({_2PI:2*Math.PI,_circleFootSeparation:25,_circleStartAngle:Math.PI/6,_spiralFootSeparation:28,_spiralLengthStart:11,_spiralLengthFactor:5,_circleSpiralSwitchover:9,spiderfy:function(){if(this._group._spiderfied!==this&&!this._group._inZoomAnimation){var t,e=this.getAllChildMarkers(),i=this._group,n=i._map,s=n.latLngToLayerPoint(this._latlng);this._group._unspiderfy(),this._group._spiderfied=this,e.length>=this._circleSpiralSwitchover?t=this._generatePointsSpiral(e.length,s):(s.y+=10,t=this._generatePointsCircle(e.length,s)),this._animationSpiderfy(e,t)}},unspiderfy:function(t){this._group._inZoomAnimation||(this._animationUnspiderfy(t),this._group._spiderfied=null)},_generatePointsCircle:function(t,e){var i,n,s=this._group.options.spiderfyDistanceMultiplier*this._circleFootSeparation*(2+t),r=s/this._2PI,o=this._2PI/t,a=[];for(a.length=t,i=t-1;i>=0;i--)n=this._circleStartAngle+i*o,a[i]=new L.Point(e.x+r*Math.cos(n),e.y+r*Math.sin(n))._round();return a},_generatePointsSpiral:function(t,e){var i,n=this._group.options.spiderfyDistanceMultiplier*this._spiralLengthStart,s=this._group.options.spiderfyDistanceMultiplier*this._spiralFootSeparation,r=this._group.options.spiderfyDistanceMultiplier*this._spiralLengthFactor,o=0,a=[];for(a.length=t,i=t-1;i>=0;i--)o+=s/n+5e-4*i,a[i]=new L.Point(e.x+n*Math.cos(o),e.y+n*Math.sin(o))._round(),n+=this._2PI*r/o;return a},_noanimationUnspiderfy:function(){var t,e,i=this._group,n=i._map,s=i._featureGroup,r=this.getAllChildMarkers();for(this.setOpacity(1),e=r.length-1;e>=0;e--)t=r[e],s.removeLayer(t),t._preSpiderfyLatlng&&(t.setLatLng(t._preSpiderfyLatlng),delete t._preSpiderfyLatlng),t.setZIndexOffset&&t.setZIndexOffset(0),t._spiderLeg&&(n.removeLayer(t._spiderLeg),delete t._spiderLeg);i._spiderfied=null}}),L.MarkerCluster.include(L.DomUtil.TRANSITION?{SVG_ANIMATION:function(){return e.createElementNS("http://www.w3.org/2000/svg","animate").toString().indexOf("SVGAnimate")>-1}(),_animationSpiderfy:function(t,i){var n,s,r,o,a=this,h=this._group,_=h._map,u=h._featureGroup,l=_.latLngToLayerPoint(this._latlng);for(n=t.length-1;n>=0;n--)s=t[n],s.setOpacity?(s.setZIndexOffset(1e6),s.setOpacity(0),u.addLayer(s),s._setPos(l)):u.addLayer(s);h._forceLayout(),h._animationStart();var d=L.Path.SVG?0:.3,p=L.Path.SVG_NS;for(n=t.length-1;n>=0;n--)if(o=_.layerPointToLatLng(i[n]),s=t[n],s._preSpiderfyLatlng=s._latlng,s.setLatLng(o),s.setOpacity&&s.setOpacity(1),r=new L.Polyline([a._latlng,o],{weight:1.5,color:"#222",opacity:d}),_.addLayer(r),s._spiderLeg=r,L.Path.SVG&&this.SVG_ANIMATION){var c=r._path.getTotalLength();r._path.setAttribute("stroke-dasharray",c+","+c);var m=e.createElementNS(p,"animate");m.setAttribute("attributeName","stroke-dashoffset"),m.setAttribute("begin","indefinite"),m.setAttribute("from",c),m.setAttribute("to",0),m.setAttribute("dur",.25),r._path.appendChild(m),m.beginElement(),m=e.createElementNS(p,"animate"),m.setAttribute("attributeName","stroke-opacity"),m.setAttribute("attributeName","stroke-opacity"),m.setAttribute("begin","indefinite"),m.setAttribute("from",0),m.setAttribute("to",.5),m.setAttribute("dur",.25),r._path.appendChild(m),m.beginElement()}if(a.setOpacity(.3),L.Path.SVG)for(this._group._forceLayout(),n=t.length-1;n>=0;n--)s=t[n]._spiderLeg,s.options.opacity=.5,s._path.setAttribute("stroke-opacity",.5);setTimeout(function(){h._animationEnd(),h.fire("spiderfied")},200)},_animationUnspiderfy:function(t){var e,i,n,s=this._group,r=s._map,o=s._featureGroup,a=t?r._latLngToNewLayerPoint(this._latlng,t.zoom,t.center):r.latLngToLayerPoint(this._latlng),h=this.getAllChildMarkers(),_=L.Path.SVG&&this.SVG_ANIMATION;for(s._animationStart(),this.setOpacity(1),i=h.length-1;i>=0;i--)e=h[i],e._preSpiderfyLatlng&&(e.setLatLng(e._preSpiderfyLatlng),delete e._preSpiderfyLatlng,e.setOpacity?(e._setPos(a),e.setOpacity(0)):o.removeLayer(e),_&&(n=e._spiderLeg._path.childNodes[0],n.setAttribute("to",n.getAttribute("from")),n.setAttribute("from",0),n.beginElement(),n=e._spiderLeg._path.childNodes[1],n.setAttribute("from",.5),n.setAttribute("to",0),n.setAttribute("stroke-opacity",0),n.beginElement(),e._spiderLeg._path.setAttribute("stroke-opacity",0)));setTimeout(function(){var t=0;for(i=h.length-1;i>=0;i--)e=h[i],e._spiderLeg&&t++;for(i=h.length-1;i>=0;i--)e=h[i],e._spiderLeg&&(e.setOpacity&&(e.setOpacity(1),e.setZIndexOffset(0)),t>1&&o.removeLayer(e),r.removeLayer(e._spiderLeg),delete e._spiderLeg);s._animationEnd()},200)}}:{_animationSpiderfy:function(t,e){var i,n,s,r,o=this._group,a=o._map,h=o._featureGroup;for(i=t.length-1;i>=0;i--)r=a.layerPointToLatLng(e[i]),n=t[i],n._preSpiderfyLatlng=n._latlng,n.setLatLng(r),n.setZIndexOffset&&n.setZIndexOffset(1e6),h.addLayer(n),s=new L.Polyline([this._latlng,r],{weight:1.5,color:"#222"}),a.addLayer(s),n._spiderLeg=s;this.setOpacity(.3),o.fire("spiderfied")},_animationUnspiderfy:function(){this._noanimationUnspiderfy()}}),L.MarkerClusterGroup.include({_spiderfied:null,_spiderfierOnAdd:function(){this._map.on("click",this._unspiderfyWrapper,this),this._map.options.zoomAnimation&&this._map.on("zoomstart",this._unspiderfyZoomStart,this),this._map.on("zoomend",this._noanimationUnspiderfy,this),L.Path.SVG&&!L.Browser.touch&&this._map._initPathRoot()},_spiderfierOnRemove:function(){this._map.off("click",this._unspiderfyWrapper,this),this._map.off("zoomstart",this._unspiderfyZoomStart,this),this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._unspiderfy()},_unspiderfyZoomStart:function(){this._map&&this._map.on("zoomanim",this._unspiderfyZoomAnim,this)},_unspiderfyZoomAnim:function(t){L.DomUtil.hasClass(this._map._mapPane,"leaflet-touching")||(this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._unspiderfy(t))},_unspiderfyWrapper:function(){this._unspiderfy()},_unspiderfy:function(t){this._spiderfied&&this._spiderfied.unspiderfy(t)},_noanimationUnspiderfy:function(){this._spiderfied&&this._spiderfied._noanimationUnspiderfy()},_unspiderfyLayer:function(t){t._spiderLeg&&(this._featureGroup.removeLayer(t),t.setOpacity(1),t.setZIndexOffset(0),this._map.removeLayer(t._spiderLeg),delete t._spiderLeg)}})}(window,document);
/*
	Leaflet.label, a plugin that adds labels to markers and vectors for Leaflet powered maps.
	(c) 2012-2013, Jacob Toye, Smartrak

	https://github.com/Leaflet/Leaflet.label
	http://leafletjs.com
	https://github.com/jacobtoye
*/
(function(){L.labelVersion="0.2.1",L.Label=L.Class.extend({includes:L.Mixin.Events,options:{className:"",clickable:!1,direction:"right",noHide:!1,offset:[12,-15],opacity:1,zoomAnimation:!0},initialize:function(t,e){L.setOptions(this,t),this._source=e,this._animated=L.Browser.any3d&&this.options.zoomAnimation,this._isOpen=!1},onAdd:function(t){this._map=t,this._pane=this._source instanceof L.Marker?t._panes.markerPane:t._panes.popupPane,this._container||this._initLayout(),this._pane.appendChild(this._container),this._initInteraction(),this._update(),this.setOpacity(this.options.opacity),t.on("moveend",this._onMoveEnd,this).on("viewreset",this._onViewReset,this),this._animated&&t.on("zoomanim",this._zoomAnimation,this),L.Browser.touch&&!this.options.noHide&&L.DomEvent.on(this._container,"click",this.close,this)},onRemove:function(t){this._pane.removeChild(this._container),t.off({zoomanim:this._zoomAnimation,moveend:this._onMoveEnd,viewreset:this._onViewReset},this),this._removeInteraction(),this._map=null},setLatLng:function(t){return this._latlng=L.latLng(t),this._map&&this._updatePosition(),this},setContent:function(t){return this._previousContent=this._content,this._content=t,this._updateContent(),this},close:function(){var t=this._map;t&&(L.Browser.touch&&!this.options.noHide&&L.DomEvent.off(this._container,"click",this.close),t.removeLayer(this))},updateZIndex:function(t){this._zIndex=t,this._container&&this._zIndex&&(this._container.style.zIndex=t)},setOpacity:function(t){this.options.opacity=t,this._container&&L.DomUtil.setOpacity(this._container,t)},_initLayout:function(){this._container=L.DomUtil.create("div","leaflet-label "+this.options.className+" leaflet-zoom-animated"),this.updateZIndex(this._zIndex)},_update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updatePosition(),this._container.style.visibility="")},_updateContent:function(){this._content&&this._map&&this._prevContent!==this._content&&"string"==typeof this._content&&(this._container.innerHTML=this._content,this._prevContent=this._content,this._labelWidth=this._container.offsetWidth)},_updatePosition:function(){var t=this._map.latLngToLayerPoint(this._latlng);this._setPosition(t)},_setPosition:function(t){var e=this._map,i=this._container,n=e.latLngToContainerPoint(e.getCenter()),o=e.layerPointToContainerPoint(t),s=this.options.direction,a=this._labelWidth,l=L.point(this.options.offset);"right"===s||"auto"===s&&o.x<n.x?(L.DomUtil.addClass(i,"leaflet-label-right"),L.DomUtil.removeClass(i,"leaflet-label-left"),t=t.add(l)):(L.DomUtil.addClass(i,"leaflet-label-left"),L.DomUtil.removeClass(i,"leaflet-label-right"),t=t.add(L.point(-l.x-a,l.y))),L.DomUtil.setPosition(i,t)},_zoomAnimation:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round();this._setPosition(e)},_onMoveEnd:function(){this._animated&&"auto"!==this.options.direction||this._updatePosition()},_onViewReset:function(t){t&&t.hard&&this._update()},_initInteraction:function(){if(this.options.clickable){var t=this._container,e=["dblclick","mousedown","mouseover","mouseout","contextmenu"];L.DomUtil.addClass(t,"leaflet-clickable"),L.DomEvent.on(t,"click",this._onMouseClick,this);for(var i=0;e.length>i;i++)L.DomEvent.on(t,e[i],this._fireMouseEvent,this)}},_removeInteraction:function(){if(this.options.clickable){var t=this._container,e=["dblclick","mousedown","mouseover","mouseout","contextmenu"];L.DomUtil.removeClass(t,"leaflet-clickable"),L.DomEvent.off(t,"click",this._onMouseClick,this);for(var i=0;e.length>i;i++)L.DomEvent.off(t,e[i],this._fireMouseEvent,this)}},_onMouseClick:function(t){this.hasEventListeners(t.type)&&L.DomEvent.stopPropagation(t),this.fire(t.type,{originalEvent:t})},_fireMouseEvent:function(t){this.fire(t.type,{originalEvent:t}),"contextmenu"===t.type&&this.hasEventListeners(t.type)&&L.DomEvent.preventDefault(t),"mousedown"!==t.type?L.DomEvent.stopPropagation(t):L.DomEvent.preventDefault(t)}}),L.BaseMarkerMethods={showLabel:function(){return this.label&&this._map&&(this.label.setLatLng(this._latlng),this._map.showLabel(this.label)),this},hideLabel:function(){return this.label&&this.label.close(),this},setLabelNoHide:function(t){this._labelNoHide!==t&&(this._labelNoHide=t,t?(this._removeLabelRevealHandlers(),this.showLabel()):(this._addLabelRevealHandlers(),this.hideLabel()))},bindLabel:function(t,e){var i=this.options.icon?this.options.icon.options.labelAnchor:this.options.labelAnchor,n=L.point(i)||L.point(0,0);return n=n.add(L.Label.prototype.options.offset),e&&e.offset&&(n=n.add(e.offset)),e=L.Util.extend({offset:n},e),this._labelNoHide=e.noHide,this.label||(this._labelNoHide||this._addLabelRevealHandlers(),this.on("remove",this.hideLabel,this).on("move",this._moveLabel,this).on("add",this._onMarkerAdd,this),this._hasLabelHandlers=!0),this.label=new L.Label(e,this).setContent(t),this},unbindLabel:function(){return this.label&&(this.hideLabel(),this.label=null,this._hasLabelHandlers&&(this._labelNoHide||this._removeLabelRevealHandlers(),this.off("remove",this.hideLabel,this).off("move",this._moveLabel,this).off("add",this._onMarkerAdd,this)),this._hasLabelHandlers=!1),this},updateLabelContent:function(t){this.label&&this.label.setContent(t)},getLabel:function(){return this.label},_onMarkerAdd:function(){this._labelNoHide&&this.showLabel()},_addLabelRevealHandlers:function(){this.on("mouseover",this.showLabel,this).on("mouseout",this.hideLabel,this),L.Browser.touch&&this.on("click",this.showLabel,this)},_removeLabelRevealHandlers:function(){this.off("mouseover",this.showLabel,this).off("mouseout",this.hideLabel,this),L.Browser.touch&&this.off("click",this.showLabel,this)},_moveLabel:function(t){this.label.setLatLng(t.latlng)}},L.Icon.Default.mergeOptions({labelAnchor:new L.Point(9,-20)}),L.Marker.mergeOptions({icon:new L.Icon.Default}),L.Marker.include(L.BaseMarkerMethods),L.Marker.include({_originalUpdateZIndex:L.Marker.prototype._updateZIndex,_updateZIndex:function(t){var e=this._zIndex+t;this._originalUpdateZIndex(t),this.label&&this.label.updateZIndex(e)},_originalSetOpacity:L.Marker.prototype.setOpacity,setOpacity:function(t,e){this.options.labelHasSemiTransparency=e,this._originalSetOpacity(t)},_originalUpdateOpacity:L.Marker.prototype._updateOpacity,_updateOpacity:function(){var t=0===this.options.opacity?0:1;this._originalUpdateOpacity(),this.label&&this.label.setOpacity(this.options.labelHasSemiTransparency?this.options.opacity:t)},_originalSetLatLng:L.Marker.prototype.setLatLng,setLatLng:function(t){return this.label&&!this._labelNoHide&&this.hideLabel(),this._originalSetLatLng(t)}}),L.CircleMarker.mergeOptions({labelAnchor:new L.Point(0,0)}),L.CircleMarker.include(L.BaseMarkerMethods),L.Path.include({bindLabel:function(t,e){return this.label&&this.label.options===e||(this.label=new L.Label(e,this)),this.label.setContent(t),this._showLabelAdded||(this.on("mouseover",this._showLabel,this).on("mousemove",this._moveLabel,this).on("mouseout remove",this._hideLabel,this),L.Browser.touch&&this.on("click",this._showLabel,this),this._showLabelAdded=!0),this},unbindLabel:function(){return this.label&&(this._hideLabel(),this.label=null,this._showLabelAdded=!1,this.off("mouseover",this._showLabel,this).off("mousemove",this._moveLabel,this).off("mouseout remove",this._hideLabel,this)),this},updateLabelContent:function(t){this.label&&this.label.setContent(t)},_showLabel:function(t){this.label.setLatLng(t.latlng),this._map.showLabel(this.label)},_moveLabel:function(t){this.label.setLatLng(t.latlng)},_hideLabel:function(){this.label.close()}}),L.Map.include({showLabel:function(t){return this.addLayer(t)}}),L.FeatureGroup.include({clearLayers:function(){return this.unbindLabel(),this.eachLayer(this.removeLayer,this),this},bindLabel:function(t,e){return this.invoke("bindLabel",t,e)},unbindLabel:function(){return this.invoke("unbindLabel")},updateLabelContent:function(t){this.invoke("updateLabelContent",t)}})})(this,document);
/**
 * bxSlider v4.2.5
 * Copyright 2013-2015 Steven Wanderski
 * Written while drinking Belgian ales and listening to jazz

 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

!function(a){var b={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,slideZIndex:50,wrapperClass:"bx-wrapper",touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,ariaLive:!0,ariaHidden:!0,keyboardEnabled:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",stopAutoOnClick:!1,autoHover:!1,autoDelay:0,autoSlideForOnePage:!1,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,shrinkItems:!1,onSliderLoad:function(){return!0},onSlideBefore:function(){return!0},onSlideAfter:function(){return!0},onSlideNext:function(){return!0},onSlidePrev:function(){return!0},onSliderResize:function(){return!0}};a.fn.bxSlider=function(c){if(0===this.length)return this;if(this.length>1)return this.each(function(){a(this).bxSlider(c)}),this;var d={},e=this,f=a(window).width(),g=a(window).height();if(!a(e).data("bxSlider")){var h=function(){a(e).data("bxSlider")||(d.settings=a.extend({},b,c),d.settings.slideWidth=parseInt(d.settings.slideWidth),d.children=e.children(d.settings.slideSelector),d.children.length<d.settings.minSlides&&(d.settings.minSlides=d.children.length),d.children.length<d.settings.maxSlides&&(d.settings.maxSlides=d.children.length),d.settings.randomStart&&(d.settings.startSlide=Math.floor(Math.random()*d.children.length)),d.active={index:d.settings.startSlide},d.carousel=d.settings.minSlides>1||d.settings.maxSlides>1?!0:!1,d.carousel&&(d.settings.preloadImages="all"),d.minThreshold=d.settings.minSlides*d.settings.slideWidth+(d.settings.minSlides-1)*d.settings.slideMargin,d.maxThreshold=d.settings.maxSlides*d.settings.slideWidth+(d.settings.maxSlides-1)*d.settings.slideMargin,d.working=!1,d.controls={},d.interval=null,d.animProp="vertical"===d.settings.mode?"top":"left",d.usingCSS=d.settings.useCSS&&"fade"!==d.settings.mode&&function(){for(var a=document.createElement("div"),b=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"],c=0;c<b.length;c++)if(void 0!==a.style[b[c]])return d.cssPrefix=b[c].replace("Perspective","").toLowerCase(),d.animProp="-"+d.cssPrefix+"-transform",!0;return!1}(),"vertical"===d.settings.mode&&(d.settings.maxSlides=d.settings.minSlides),e.data("origStyle",e.attr("style")),e.children(d.settings.slideSelector).each(function(){a(this).data("origStyle",a(this).attr("style"))}),j())},j=function(){var b=d.children.eq(d.settings.startSlide);e.wrap('<div class="'+d.settings.wrapperClass+'"><div class="bx-viewport"></div></div>'),d.viewport=e.parent(),d.settings.ariaLive&&!d.settings.ticker&&d.viewport.attr("aria-live","polite"),d.loader=a('<div class="bx-loading" />'),d.viewport.prepend(d.loader),e.css({width:"horizontal"===d.settings.mode?1e3*d.children.length+215+"%":"auto",position:"relative"}),d.usingCSS&&d.settings.easing?e.css("-"+d.cssPrefix+"-transition-timing-function",d.settings.easing):d.settings.easing||(d.settings.easing="swing"),d.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),d.viewport.parent().css({maxWidth:n()}),d.settings.pager||d.settings.controls||d.viewport.parent().css({margin:"0 auto 0px"}),d.children.css({"float":"horizontal"===d.settings.mode?"left":"none",listStyle:"none",position:"relative"}),d.children.css("width",o()),"horizontal"===d.settings.mode&&d.settings.slideMargin>0&&d.children.css("marginRight",d.settings.slideMargin),"vertical"===d.settings.mode&&d.settings.slideMargin>0&&d.children.css("marginBottom",d.settings.slideMargin),"fade"===d.settings.mode&&(d.children.css({position:"absolute",zIndex:0,display:"none"}),d.children.eq(d.settings.startSlide).css({zIndex:d.settings.slideZIndex,display:"block"})),d.controls.el=a('<div class="bx-controls" />'),d.settings.captions&&y(),d.active.last=d.settings.startSlide===q()-1,d.settings.video&&e.fitVids(),("all"===d.settings.preloadImages||d.settings.ticker)&&(b=d.children),d.settings.ticker?d.settings.pager=!1:(d.settings.controls&&w(),d.settings.auto&&d.settings.autoControls&&x(),d.settings.pager&&v(),(d.settings.controls||d.settings.autoControls||d.settings.pager)&&d.viewport.after(d.controls.el)),k(b,l)},k=function(b,c){var d=b.find('img:not([src=""]), iframe').length,e=0;return 0===d?void c():void b.find('img:not([src=""]), iframe').each(function(){a(this).one("load error",function(){++e===d&&c()}).each(function(){this.complete&&a(this).load()})})},l=function(){if(d.settings.infiniteLoop&&"fade"!==d.settings.mode&&!d.settings.ticker){var b="vertical"===d.settings.mode?d.settings.minSlides:d.settings.maxSlides,c=d.children.slice(0,b).clone(!0).addClass("bx-clone"),f=d.children.slice(-b).clone(!0).addClass("bx-clone");d.settings.ariaHidden&&(c.attr("aria-hidden",!0),f.attr("aria-hidden",!0)),e.append(c).prepend(f)}d.loader.remove(),s(),"vertical"===d.settings.mode&&(d.settings.adaptiveHeight=!0),d.viewport.height(m()),e.redrawSlider(),d.settings.onSliderLoad.call(e,d.active.index),d.initialized=!0,d.settings.responsive&&a(window).bind("resize",S),d.settings.auto&&d.settings.autoStart&&(q()>1||d.settings.autoSlideForOnePage)&&I(),d.settings.ticker&&J(),d.settings.pager&&E(d.settings.startSlide),d.settings.controls&&H(),d.settings.touchEnabled&&!d.settings.ticker&&N(),d.settings.keyboardEnabled&&!d.settings.ticker&&a(document).keydown(M)},m=function(){var b=0,c=a();if("vertical"===d.settings.mode||d.settings.adaptiveHeight)if(d.carousel){var e=1===d.settings.moveSlides?d.active.index:d.active.index*r();for(c=d.children.eq(e),i=1;i<=d.settings.maxSlides-1;i++)c=e+i>=d.children.length?c.add(d.children.eq(i-1)):c.add(d.children.eq(e+i))}else c=d.children.eq(d.active.index);else c=d.children;return"vertical"===d.settings.mode?(c.each(function(c){b+=a(this).outerHeight()}),d.settings.slideMargin>0&&(b+=d.settings.slideMargin*(d.settings.minSlides-1))):b=Math.max.apply(Math,c.map(function(){return a(this).outerHeight(!1)}).get()),"border-box"===d.viewport.css("box-sizing")?b+=parseFloat(d.viewport.css("padding-top"))+parseFloat(d.viewport.css("padding-bottom"))+parseFloat(d.viewport.css("border-top-width"))+parseFloat(d.viewport.css("border-bottom-width")):"padding-box"===d.viewport.css("box-sizing")&&(b+=parseFloat(d.viewport.css("padding-top"))+parseFloat(d.viewport.css("padding-bottom"))),b},n=function(){var a="100%";return d.settings.slideWidth>0&&(a="horizontal"===d.settings.mode?d.settings.maxSlides*d.settings.slideWidth+(d.settings.maxSlides-1)*d.settings.slideMargin:d.settings.slideWidth),a},o=function(){var a=d.settings.slideWidth,b=d.viewport.width();if(0===d.settings.slideWidth||d.settings.slideWidth>b&&!d.carousel||"vertical"===d.settings.mode)a=b;else if(d.settings.maxSlides>1&&"horizontal"===d.settings.mode){if(b>d.maxThreshold)return a;b<d.minThreshold?a=(b-d.settings.slideMargin*(d.settings.minSlides-1))/d.settings.minSlides:d.settings.shrinkItems&&(a=Math.floor((b+d.settings.slideMargin)/Math.ceil((b+d.settings.slideMargin)/(a+d.settings.slideMargin))-d.settings.slideMargin))}return a},p=function(){var a=1,b=null;return"horizontal"===d.settings.mode&&d.settings.slideWidth>0?d.viewport.width()<d.minThreshold?a=d.settings.minSlides:d.viewport.width()>d.maxThreshold?a=d.settings.maxSlides:(b=d.children.first().width()+d.settings.slideMargin,a=Math.floor((d.viewport.width()+d.settings.slideMargin)/b)):"vertical"===d.settings.mode&&(a=d.settings.minSlides),a},q=function(){var a=0,b=0,c=0;if(d.settings.moveSlides>0)if(d.settings.infiniteLoop)a=Math.ceil(d.children.length/r());else for(;b<d.children.length;)++a,b=c+p(),c+=d.settings.moveSlides<=p()?d.settings.moveSlides:p();else a=Math.ceil(d.children.length/p());return a},r=function(){return d.settings.moveSlides>0&&d.settings.moveSlides<=p()?d.settings.moveSlides:p()},s=function(){var a,b,c;d.children.length>d.settings.maxSlides&&d.active.last&&!d.settings.infiniteLoop?"horizontal"===d.settings.mode?(b=d.children.last(),a=b.position(),t(-(a.left-(d.viewport.width()-b.outerWidth())),"reset",0)):"vertical"===d.settings.mode&&(c=d.children.length-d.settings.minSlides,a=d.children.eq(c).position(),t(-a.top,"reset",0)):(a=d.children.eq(d.active.index*r()).position(),d.active.index===q()-1&&(d.active.last=!0),void 0!==a&&("horizontal"===d.settings.mode?t(-a.left,"reset",0):"vertical"===d.settings.mode&&t(-a.top,"reset",0)))},t=function(b,c,f,g){var h,i;d.usingCSS?(i="vertical"===d.settings.mode?"translate3d(0, "+b+"px, 0)":"translate3d("+b+"px, 0, 0)",e.css("-"+d.cssPrefix+"-transition-duration",f/1e3+"s"),"slide"===c?(e.css(d.animProp,i),0!==f?e.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(b){a(b.target).is(e)&&(e.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),F())}):F()):"reset"===c?e.css(d.animProp,i):"ticker"===c&&(e.css("-"+d.cssPrefix+"-transition-timing-function","linear"),e.css(d.animProp,i),0!==f?e.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(b){a(b.target).is(e)&&(e.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),t(g.resetValue,"reset",0),K())}):(t(g.resetValue,"reset",0),K()))):(h={},h[d.animProp]=b,"slide"===c?e.animate(h,f,d.settings.easing,function(){F()}):"reset"===c?e.css(d.animProp,b):"ticker"===c&&e.animate(h,f,"linear",function(){t(g.resetValue,"reset",0),K()}))},u=function(){for(var b="",c="",e=q(),f=0;e>f;f++)c="",d.settings.buildPager&&a.isFunction(d.settings.buildPager)||d.settings.pagerCustom?(c=d.settings.buildPager(f),d.pagerEl.addClass("bx-custom-pager")):(c=f+1,d.pagerEl.addClass("bx-default-pager")),b+='<div class="bx-pager-item"><a href="" data-slide-index="'+f+'" class="bx-pager-link">'+c+"</a></div>";d.pagerEl.html(b)},v=function(){d.settings.pagerCustom?d.pagerEl=a(d.settings.pagerCustom):(d.pagerEl=a('<div class="bx-pager" />'),d.settings.pagerSelector?a(d.settings.pagerSelector).html(d.pagerEl):d.controls.el.addClass("bx-has-pager").append(d.pagerEl),u()),d.pagerEl.on("click touchend","a",D)},w=function(){d.controls.next=a('<a class="bx-next" href="">'+d.settings.nextText+"</a>"),d.controls.prev=a('<a class="bx-prev" href="">'+d.settings.prevText+"</a>"),d.controls.next.bind("click touchend",z),d.controls.prev.bind("click touchend",A),d.settings.nextSelector&&a(d.settings.nextSelector).append(d.controls.next),d.settings.prevSelector&&a(d.settings.prevSelector).append(d.controls.prev),d.settings.nextSelector||d.settings.prevSelector||(d.controls.directionEl=a('<div class="bx-controls-direction" />'),d.controls.directionEl.append(d.controls.prev).append(d.controls.next),d.controls.el.addClass("bx-has-controls-direction").append(d.controls.directionEl))},x=function(){d.controls.start=a('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+d.settings.startText+"</a></div>"),d.controls.stop=a('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+d.settings.stopText+"</a></div>"),d.controls.autoEl=a('<div class="bx-controls-auto" />'),d.controls.autoEl.on("click",".bx-start",B),d.controls.autoEl.on("click",".bx-stop",C),d.settings.autoControlsCombine?d.controls.autoEl.append(d.controls.start):d.controls.autoEl.append(d.controls.start).append(d.controls.stop),d.settings.autoControlsSelector?a(d.settings.autoControlsSelector).html(d.controls.autoEl):d.controls.el.addClass("bx-has-controls-auto").append(d.controls.autoEl),G(d.settings.autoStart?"stop":"start")},y=function(){d.children.each(function(b){var c=a(this).find("img:first").attr("title");void 0!==c&&(""+c).length&&a(this).append('<div class="bx-caption"><span>'+c+"</span></div>")})},z=function(a){a.preventDefault(),d.controls.el.hasClass("disabled")||(d.settings.auto&&d.settings.stopAutoOnClick&&e.stopAuto(),e.goToNextSlide())},A=function(a){a.preventDefault(),d.controls.el.hasClass("disabled")||(d.settings.auto&&d.settings.stopAutoOnClick&&e.stopAuto(),e.goToPrevSlide())},B=function(a){e.startAuto(),a.preventDefault()},C=function(a){e.stopAuto(),a.preventDefault()},D=function(b){var c,f;b.preventDefault(),d.controls.el.hasClass("disabled")||(d.settings.auto&&d.settings.stopAutoOnClick&&e.stopAuto(),c=a(b.currentTarget),void 0!==c.attr("data-slide-index")&&(f=parseInt(c.attr("data-slide-index")),f!==d.active.index&&e.goToSlide(f)))},E=function(b){var c=d.children.length;return"short"===d.settings.pagerType?(d.settings.maxSlides>1&&(c=Math.ceil(d.children.length/d.settings.maxSlides)),void d.pagerEl.html(b+1+d.settings.pagerShortSeparator+c)):(d.pagerEl.find("a").removeClass("active"),void d.pagerEl.each(function(c,d){a(d).find("a").eq(b).addClass("active")}))},F=function(){if(d.settings.infiniteLoop){var a="";0===d.active.index?a=d.children.eq(0).position():d.active.index===q()-1&&d.carousel?a=d.children.eq((q()-1)*r()).position():d.active.index===d.children.length-1&&(a=d.children.eq(d.children.length-1).position()),a&&("horizontal"===d.settings.mode?t(-a.left,"reset",0):"vertical"===d.settings.mode&&t(-a.top,"reset",0))}d.working=!1,d.settings.onSlideAfter.call(e,d.children.eq(d.active.index),d.oldIndex,d.active.index)},G=function(a){d.settings.autoControlsCombine?d.controls.autoEl.html(d.controls[a]):(d.controls.autoEl.find("a").removeClass("active"),d.controls.autoEl.find("a:not(.bx-"+a+")").addClass("active"))},H=function(){1===q()?(d.controls.prev.addClass("disabled"),d.controls.next.addClass("disabled")):!d.settings.infiniteLoop&&d.settings.hideControlOnEnd&&(0===d.active.index?(d.controls.prev.addClass("disabled"),d.controls.next.removeClass("disabled")):d.active.index===q()-1?(d.controls.next.addClass("disabled"),d.controls.prev.removeClass("disabled")):(d.controls.prev.removeClass("disabled"),d.controls.next.removeClass("disabled")))},I=function(){if(d.settings.autoDelay>0){setTimeout(e.startAuto,d.settings.autoDelay)}else e.startAuto(),a(window).focus(function(){e.startAuto()}).blur(function(){e.stopAuto()});d.settings.autoHover&&e.hover(function(){d.interval&&(e.stopAuto(!0),d.autoPaused=!0)},function(){d.autoPaused&&(e.startAuto(!0),d.autoPaused=null)})},J=function(){var b,c,f,g,h,i,j,k,l=0;"next"===d.settings.autoDirection?e.append(d.children.clone().addClass("bx-clone")):(e.prepend(d.children.clone().addClass("bx-clone")),b=d.children.first().position(),l="horizontal"===d.settings.mode?-b.left:-b.top),t(l,"reset",0),d.settings.pager=!1,d.settings.controls=!1,d.settings.autoControls=!1,d.settings.tickerHover&&(d.usingCSS?(g="horizontal"===d.settings.mode?4:5,d.viewport.hover(function(){c=e.css("-"+d.cssPrefix+"-transform"),f=parseFloat(c.split(",")[g]),t(f,"reset",0)},function(){k=0,d.children.each(function(b){k+="horizontal"===d.settings.mode?a(this).outerWidth(!0):a(this).outerHeight(!0)}),h=d.settings.speed/k,i="horizontal"===d.settings.mode?"left":"top",j=h*(k-Math.abs(parseInt(f))),K(j)})):d.viewport.hover(function(){e.stop()},function(){k=0,d.children.each(function(b){k+="horizontal"===d.settings.mode?a(this).outerWidth(!0):a(this).outerHeight(!0)}),h=d.settings.speed/k,i="horizontal"===d.settings.mode?"left":"top",j=h*(k-Math.abs(parseInt(e.css(i)))),K(j)})),K()},K=function(a){var b,c,f,g=a?a:d.settings.speed,h={left:0,top:0},i={left:0,top:0};"next"===d.settings.autoDirection?h=e.find(".bx-clone").first().position():i=d.children.first().position(),b="horizontal"===d.settings.mode?-h.left:-h.top,c="horizontal"===d.settings.mode?-i.left:-i.top,f={resetValue:c},t(b,"ticker",g,f)},L=function(b){var c=a(window),d={top:c.scrollTop(),left:c.scrollLeft()},e=b.offset();return d.right=d.left+c.width(),d.bottom=d.top+c.height(),e.right=e.left+b.outerWidth(),e.bottom=e.top+b.outerHeight(),!(d.right<e.left||d.left>e.right||d.bottom<e.top||d.top>e.bottom)},M=function(a){var b=document.activeElement.tagName.toLowerCase(),c="input|textarea",d=new RegExp(b,["i"]),f=d.exec(c);if(null==f&&L(e)){if(39===a.keyCode)return z(a),!1;if(37===a.keyCode)return A(a),!1}},N=function(){d.touch={start:{x:0,y:0},end:{x:0,y:0}},d.viewport.bind("touchstart MSPointerDown pointerdown",O),d.viewport.on("click",".bxslider a",function(a){d.viewport.hasClass("click-disabled")&&(a.preventDefault(),d.viewport.removeClass("click-disabled"))})},O=function(a){if(d.controls.el.addClass("disabled"),d.working)a.preventDefault(),d.controls.el.removeClass("disabled");else{d.touch.originalPos=e.position();var b=a.originalEvent,c="undefined"!=typeof b.changedTouches?b.changedTouches:[b];d.touch.start.x=c[0].pageX,d.touch.start.y=c[0].pageY,d.viewport.get(0).setPointerCapture&&(d.pointerId=b.pointerId,d.viewport.get(0).setPointerCapture(d.pointerId)),d.viewport.bind("touchmove MSPointerMove pointermove",Q),d.viewport.bind("touchend MSPointerUp pointerup",R),d.viewport.bind("MSPointerCancel pointercancel",P)}},P=function(a){t(d.touch.originalPos.left,"reset",0),d.controls.el.removeClass("disabled"),d.viewport.unbind("MSPointerCancel pointercancel",P),d.viewport.unbind("touchmove MSPointerMove pointermove",Q),d.viewport.unbind("touchend MSPointerUp pointerup",R),d.viewport.get(0).releasePointerCapture&&d.viewport.get(0).releasePointerCapture(d.pointerId)},Q=function(a){var b=a.originalEvent,c="undefined"!=typeof b.changedTouches?b.changedTouches:[b],e=Math.abs(c[0].pageX-d.touch.start.x),f=Math.abs(c[0].pageY-d.touch.start.y),g=0,h=0;3*e>f&&d.settings.preventDefaultSwipeX?a.preventDefault():3*f>e&&d.settings.preventDefaultSwipeY&&a.preventDefault(),"fade"!==d.settings.mode&&d.settings.oneToOneTouch&&("horizontal"===d.settings.mode?(h=c[0].pageX-d.touch.start.x,g=d.touch.originalPos.left+h):(h=c[0].pageY-d.touch.start.y,g=d.touch.originalPos.top+h),t(g,"reset",0))},R=function(a){d.viewport.unbind("touchmove MSPointerMove pointermove",Q),d.controls.el.removeClass("disabled");var b=a.originalEvent,c="undefined"!=typeof b.changedTouches?b.changedTouches:[b],f=0,g=0;d.touch.end.x=c[0].pageX,d.touch.end.y=c[0].pageY,"fade"===d.settings.mode?(g=Math.abs(d.touch.start.x-d.touch.end.x),g>=d.settings.swipeThreshold&&(d.touch.start.x>d.touch.end.x?e.goToNextSlide():e.goToPrevSlide(),e.stopAuto())):("horizontal"===d.settings.mode?(g=d.touch.end.x-d.touch.start.x,f=d.touch.originalPos.left):(g=d.touch.end.y-d.touch.start.y,f=d.touch.originalPos.top),!d.settings.infiniteLoop&&(0===d.active.index&&g>0||d.active.last&&0>g)?t(f,"reset",200):Math.abs(g)>=d.settings.swipeThreshold?(0>g?e.goToNextSlide():e.goToPrevSlide(),e.stopAuto()):t(f,"reset",200)),d.viewport.unbind("touchend MSPointerUp pointerup",R),d.viewport.get(0).releasePointerCapture&&d.viewport.get(0).releasePointerCapture(d.pointerId)},S=function(b){if(d.initialized)if(d.working)window.setTimeout(S,10);else{var c=a(window).width(),h=a(window).height();(f!==c||g!==h)&&(f=c,g=h,e.redrawSlider(),d.settings.onSliderResize.call(e,d.active.index))}},T=function(a){var b=p();d.settings.ariaHidden&&!d.settings.ticker&&(d.children.attr("aria-hidden","true"),d.children.slice(a,a+b).attr("aria-hidden","false"))},U=function(a){return 0>a?d.settings.infiniteLoop?q()-1:d.active.index:a>=q()?d.settings.infiniteLoop?0:d.active.index:a};return e.goToSlide=function(b,c){var f,g,h,i,j=!0,k=0,l={left:0,top:0},n=null;if(d.oldIndex=d.active.index,d.active.index=U(b),!d.working&&d.active.index!==d.oldIndex){if(d.working=!0,j=d.settings.onSlideBefore.call(e,d.children.eq(d.active.index),d.oldIndex,d.active.index),"undefined"!=typeof j&&!j)return d.active.index=d.oldIndex,void(d.working=!1);"next"===c?d.settings.onSlideNext.call(e,d.children.eq(d.active.index),d.oldIndex,d.active.index)||(j=!1):"prev"===c&&(d.settings.onSlidePrev.call(e,d.children.eq(d.active.index),d.oldIndex,d.active.index)||(j=!1)),d.active.last=d.active.index>=q()-1,(d.settings.pager||d.settings.pagerCustom)&&E(d.active.index),d.settings.controls&&H(),"fade"===d.settings.mode?(d.settings.adaptiveHeight&&d.viewport.height()!==m()&&d.viewport.animate({height:m()},d.settings.adaptiveHeightSpeed),d.children.filter(":visible").fadeOut(d.settings.speed).css({zIndex:0}),d.children.eq(d.active.index).css("zIndex",d.settings.slideZIndex+1).fadeIn(d.settings.speed,function(){a(this).css("zIndex",d.settings.slideZIndex),F()})):(d.settings.adaptiveHeight&&d.viewport.height()!==m()&&d.viewport.animate({height:m()},d.settings.adaptiveHeightSpeed),!d.settings.infiniteLoop&&d.carousel&&d.active.last?"horizontal"===d.settings.mode?(n=d.children.eq(d.children.length-1),l=n.position(),k=d.viewport.width()-n.outerWidth()):(f=d.children.length-d.settings.minSlides,l=d.children.eq(f).position()):d.carousel&&d.active.last&&"prev"===c?(g=1===d.settings.moveSlides?d.settings.maxSlides-r():(q()-1)*r()-(d.children.length-d.settings.maxSlides),n=e.children(".bx-clone").eq(g),l=n.position()):"next"===c&&0===d.active.index?(l=e.find("> .bx-clone").eq(d.settings.maxSlides).position(),d.active.last=!1):b>=0&&(i=b*parseInt(r()),l=d.children.eq(i).position()),"undefined"!=typeof l?(h="horizontal"===d.settings.mode?-(l.left-k):-l.top,t(h,"slide",d.settings.speed)):d.working=!1),d.settings.ariaHidden&&T(d.active.index*r())}},e.goToNextSlide=function(){if(d.settings.infiniteLoop||!d.active.last){var a=parseInt(d.active.index)+1;e.goToSlide(a,"next")}},e.goToPrevSlide=function(){if(d.settings.infiniteLoop||0!==d.active.index){var a=parseInt(d.active.index)-1;e.goToSlide(a,"prev")}},e.startAuto=function(a){d.interval||(d.interval=setInterval(function(){"next"===d.settings.autoDirection?e.goToNextSlide():e.goToPrevSlide()},d.settings.pause),d.settings.autoControls&&a!==!0&&G("stop"))},e.stopAuto=function(a){d.interval&&(clearInterval(d.interval),d.interval=null,d.settings.autoControls&&a!==!0&&G("start"))},e.getCurrentSlide=function(){return d.active.index},e.getCurrentSlideElement=function(){return d.children.eq(d.active.index)},e.getSlideElement=function(a){return d.children.eq(a)},e.getSlideCount=function(){return d.children.length},e.isWorking=function(){return d.working},e.redrawSlider=function(){d.children.add(e.find(".bx-clone")).outerWidth(o()),d.viewport.css("height",m()),d.settings.ticker||s(),d.active.last&&(d.active.index=q()-1),d.active.index>=q()&&(d.active.last=!0),d.settings.pager&&!d.settings.pagerCustom&&(u(),E(d.active.index)),d.settings.ariaHidden&&T(d.active.index*r())},e.destroySlider=function(){d.initialized&&(d.initialized=!1,a(".bx-clone",this).remove(),d.children.each(function(){void 0!==a(this).data("origStyle")?a(this).attr("style",a(this).data("origStyle")):a(this).removeAttr("style")}),void 0!==a(this).data("origStyle")?this.attr("style",a(this).data("origStyle")):a(this).removeAttr("style"),a(this).unwrap().unwrap(),d.controls.el&&d.controls.el.remove(),d.controls.next&&d.controls.next.remove(),d.controls.prev&&d.controls.prev.remove(),d.pagerEl&&d.settings.controls&&!d.settings.pagerCustom&&d.pagerEl.remove(),a(".bx-caption",this).remove(),d.controls.autoEl&&d.controls.autoEl.remove(),clearInterval(d.interval),d.settings.responsive&&a(window).unbind("resize",S),d.settings.keyboardEnabled&&a(document).unbind("keydown",M),a(this).removeData("bxSlider"))},e.reloadSlider=function(b){void 0!==b&&(c=b),e.destroySlider(),h(),a(e).data("bxSlider",this)},h(),a(e).data("bxSlider",this),this}}}(jQuery);
L.Control.EasyButtons = L.Control.extend({
    options: {
        position: 'topright',
        title: '',
        intendedIcon: 'fa-circle-o'
    },

    onAdd: function () {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');

        this.link = L.DomUtil.create('a', 'leaflet-bar-part', container);
        this._addImage()
        this.link.href = '#';

        L.DomEvent.on(this.link, 'click', this._click, this);
        this.link.title = this.options.title;

        return container;
    },

    intendedFunction: function(){ alert('no function selected');},

    _click: function (e) {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);
        this.intendedFunction();
        this.link.blur();
    },

    _addImage: function () {
        var extraClasses = this.options.intendedIcon.lastIndexOf('fa', 0) === 0 ? ' fa fa-lg' : ' glyphicon';

        var icon = L.DomUtil.create('i', this.options.intendedIcon + extraClasses, this.link);
        icon.id = this.options.id;
    }
});

L.easyButton = function( btnIcon , btnFunction , btnTitle , btnMap , btnId) {
  var newControl = new L.Control.EasyButtons();

  if (btnIcon) newControl.options.intendedIcon = btnIcon;
  if (btnId) newControl.options.id = btnId;

  if ( typeof btnFunction === 'function'){
    newControl.intendedFunction = btnFunction;
  }

  if (btnTitle) newControl.options.title = btnTitle;

  if ( btnMap === '' ){
    // skip auto addition
  } else if ( btnMap ) {
    btnMap.addControl(newControl);
  } else {
    map.addControl(newControl);
  }
  return newControl;
};
(function(exports) {

/*
 * tile.stamen.js v1.3.0
 */

var SUBDOMAINS = "a. b. c. d.".split(" "),
    MAKE_PROVIDER = function(layer, type, minZoom, maxZoom) {
        return {
            "url":          ["http://{S}tile.stamen.com/", layer, "/{Z}/{X}/{Y}.", type].join(""),
            "type":         type,
            "subdomains":   SUBDOMAINS.slice(),
            "minZoom":      minZoom,
            "maxZoom":      maxZoom,
            "attribution":  [
                'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ',
                'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ',
                'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ',
                'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
            ].join("")
        };
    },
    PROVIDERS =  {
        "toner":        MAKE_PROVIDER("toner", "png", 0, 20),
        "terrain":      MAKE_PROVIDER("terrain", "jpg", 4, 18),
        "watercolor":   MAKE_PROVIDER("watercolor", "jpg", 1, 20),
        "trees-cabs-crime": {
            "url": "http://{S}.tiles.mapbox.com/v3/stamen.trees-cabs-crime/{Z}/{X}/{Y}.png",
            "type": "png",
            "subdomains": "a b c d".split(" "),
            "minZoom": 11,
            "maxZoom": 18,
            "extent": [
                {"lat": 37.853, "lon": -122.577},
                {"lat": 37.684, "lon": -122.313}
            ],
            "attribution": [
                'Design by Shawn Allen at <a href="http://stamen.com/">Stamen</a>.',
                'Data courtesy of <a href="http://fuf.net/">FuF</a>,',
                '<a href="http://www.yellowcabsf.com/">Yellow Cab</a>',
                '&amp; <a href="http://sf-police.org/">SFPD</a>.'
            ].join(" ")
        }
    };

// set up toner and terrain flavors
setupFlavors("toner", ["hybrid", "labels", "lines", "background", "lite"]);
setupFlavors("terrain", ["background"]);
setupFlavors("terrain", ["labels", "lines"], "png");

// toner 2010
deprecate("toner", ["2010"]);

// toner 2011 flavors
deprecate("toner", ["2011", "2011-lines", "2011-labels", "2011-lite"]);

var odbl = [
    "toner",
    "toner-hybrid",
    "toner-labels",
    "toner-lines",
    "toner-background",
    "toner-lite"
];

for (var i = 0; i < odbl.length; i++) {
    var key = odbl[i];

    PROVIDERS[key].retina = true;
    PROVIDERS[key].attribution = [
        'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ',
        'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ',
        'Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, ',
        'under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    ].join("");
}

/*
 * Export stamen.tile to the provided namespace.
 */
exports.stamen = exports.stamen || {};
exports.stamen.tile = exports.stamen.tile || {};
exports.stamen.tile.providers = PROVIDERS;
exports.stamen.tile.getProvider = getProvider;

function deprecate(base, flavors) {
    var provider = getProvider(base);

    for (var i = 0; i < flavors.length; i++) {
        var flavor = [base, flavors[i]].join("-");
        PROVIDERS[flavor] = MAKE_PROVIDER(flavor, provider.type, provider.minZoom, provider.maxZoom);
        PROVIDERS[flavor].deprecated = true;
    }
};

/*
 * A shortcut for specifying "flavors" of a style, which are assumed to have the
 * same type and zoom range.
 */
function setupFlavors(base, flavors, type) {
    var provider = getProvider(base);
    for (var i = 0; i < flavors.length; i++) {
        var flavor = [base, flavors[i]].join("-");
        PROVIDERS[flavor] = MAKE_PROVIDER(flavor, type || provider.type, provider.minZoom, provider.maxZoom);
    }
}

/*
 * Get the named provider, or throw an exception if it doesn't exist.
 */
function getProvider(name) {
    if (name in PROVIDERS) {
        var provider = PROVIDERS[name];

        if (provider.deprecated && console && console.warn) {
            console.warn(name + " is a deprecated style; it will be redirected to its replacement. For performance improvements, please change your reference.");
        }

        return provider;
    } else {
        throw 'No such provider (' + name + ')';
    }
}

/*
 * StamenTileLayer for modestmaps-js
 * <https://github.com/modestmaps/modestmaps-js/>
 *
 * Works with both 1.x and 2.x by checking for the existence of MM.Template.
 */
if (typeof MM === "object") {
    var ModestTemplate = (typeof MM.Template === "function")
        ? MM.Template
        : MM.TemplatedMapProvider;
    MM.StamenTileLayer = function(name) {
        var provider = getProvider(name);
        this._provider = provider;
        MM.Layer.call(this, new ModestTemplate(provider.url, provider.subdomains));
        this.provider.setZoomRange(provider.minZoom, provider.maxZoom);
        this.attribution = provider.attribution;
    };

    MM.StamenTileLayer.prototype = {
        setCoordLimits: function(map) {
            var provider = this._provider;
            if (provider.extent) {
                map.coordLimits = [
                    map.locationCoordinate(provider.extent[0]).zoomTo(provider.minZoom),
                    map.locationCoordinate(provider.extent[1]).zoomTo(provider.maxZoom)
                ];
                return true;
            } else {
                return false;
            }
        }
    };

    MM.extend(MM.StamenTileLayer, MM.Layer);
}

/*
 * StamenTileLayer for Leaflet
 * <http://leaflet.cloudmade.com/>
 *
 * Tested with version 0.3 and 0.4, but should work on all 0.x releases.
 */
if (typeof L === "object") {
    L.StamenTileLayer = L.TileLayer.extend({
        initialize: function(name, options) {
            var provider = getProvider(name),
                url = provider.url.replace(/({[A-Z]})/g, function(s) {
                    return s.toLowerCase();
                }),
                opts = L.Util.extend({}, options, {
                    "minZoom":      provider.minZoom,
                    "maxZoom":      provider.maxZoom,
                    "maxNativeZoom": 17,
                    "subdomains":   provider.subdomains,
                    "scheme":       "xyz",
                    "attribution":  provider.attribution,
                    sa_id:          name
                });
            L.TileLayer.prototype.initialize.call(this, url, opts);
        }
    });

    /*
     * Factory function for consistency with Leaflet conventions
     */
    L.stamenTileLayer = function (options, source) {
        return new L.StamenTileLayer(options, source);
    };
}

/*
 * StamenTileLayer for OpenLayers
 * <http://openlayers.org/>
 *
 * Tested with v2.1x.
 */
if (typeof OpenLayers === "object") {
    // make a tile URL template OpenLayers-compatible
    function openlayerize(url) {
        return url.replace(/({.})/g, function(v) {
            return "$" + v.toLowerCase();
        });
    }

    // based on http://www.bostongis.com/PrinterFriendly.aspx?content_name=using_custom_osm_tiles
    OpenLayers.Layer.Stamen = OpenLayers.Class(OpenLayers.Layer.OSM, {
        initialize: function(name, options) {
            var provider = getProvider(name),
                url = provider.url,
                subdomains = provider.subdomains,
                hosts = [];
            if (url.indexOf("{S}") > -1) {
                for (var i = 0; i < subdomains.length; i++) {
                    hosts.push(openlayerize(url.replace("{S}", subdomains[i])));
                }
            } else {
                hosts.push(openlayerize(url));
            }
            options = OpenLayers.Util.extend({
                "numZoomLevels":        provider.maxZoom,
                "buffer":               0,
                "transitionEffect":     "resize",
                // see: <http://dev.openlayers.org/apidocs/files/OpenLayers/Layer/OSM-js.html#OpenLayers.Layer.OSM.tileOptions>
                // and: <http://dev.openlayers.org/apidocs/files/OpenLayers/Tile/Image-js.html#OpenLayers.Tile.Image.crossOriginKeyword>
                "tileOptions": {
                    "crossOriginKeyword": null
                },
                "attribution": provider.attribution
            }, options);
            return OpenLayers.Layer.OSM.prototype.initialize.call(this, name, hosts, options);
        }
    });
}

/*
 * StamenMapType for Google Maps API V3
 * <https://developers.google.com/maps/documentation/javascript/>
 */
if (typeof google === "object" && typeof google.maps === "object") {
    google.maps.StamenMapType = function(name) {
        var provider = getProvider(name),
            subdomains = provider.subdomains;
        return google.maps.ImageMapType.call(this, {
            "getTileUrl": function(coord, zoom) {
                var numTiles = 1 << zoom,
                    wx = coord.x % numTiles,
                    x = (wx < 0) ? wx + numTiles : wx,
                    y = coord.y,
                    index = (zoom + x + y) % subdomains.length;
                return provider.url
                    .replace("{S}", subdomains[index])
                    .replace("{Z}", zoom)
                    .replace("{X}", x)
                    .replace("{Y}", y);
            },
            "tileSize": new google.maps.Size(256, 256),
            "name":     name,
            "minZoom":  provider.minZoom,
            "maxZoom":  provider.maxZoom
        });
    };
    // FIXME: is there a better way to extend classes in Google land?
    google.maps.StamenMapType.prototype = new google.maps.ImageMapType("_");
}

})(typeof exports === "undefined" ? this : exports);
/**
 * Copyright (C) 2015 OSM Buildings, Jan Marsch
 * A JavaScript library for visualizing building geometry on interactive maps.
 * @osmbuildings, http://osmbuildings.org
 */
//****** file: prefix.js ******

(function(global) {

  'use strict';


//****** file: shortcuts.js ******

// object access shortcuts
var
  m = Math,
  exp = m.exp,
  log = m.log,
  sin = m.sin,
  cos = m.cos,
  tan = m.tan,
  atan = m.atan,
  atan2 = m.atan2,
  min = m.min,
  max = m.max,
  sqrt = m.sqrt,
  ceil = m.ceil,
  floor = m.floor,
  round = m.round,
  pow = m.pow,
  doc = document;


// polyfills

var
  Int32Array = Int32Array || Array,
  Uint8Array = Uint8Array || Array;

var IS_IOS = /iP(ad|hone|od)/g.test(navigator.userAgent);
var IS_MSIE = !!~navigator.userAgent.indexOf('Trident');

var requestAnimFrame = (global.requestAnimationFrame && !IS_IOS && !IS_MSIE) ?
  global.requestAnimationFrame : function(callback) {
    callback();
  };



//****** file: Color.debug.js ******

var Color = (function(window) {


var w3cColors = {
  aqua:'#00ffff',
  black:'#000000',
  blue:'#0000ff',
  fuchsia:'#ff00ff',
  gray:'#808080',
  grey:'#808080',
  green:'#008000',
  lime:'#00ff00',
  maroon:'#800000',
  navy:'#000080',
  olive:'#808000',
  orange:'#ffa500',
  purple:'#800080',
  red:'#ff0000',
  silver:'#c0c0c0',
  teal:'#008080',
  white:'#ffffff',
  yellow:'#ffff00'
};

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1/6) return p + (q-p) * 6 * t;
  if (t < 1/2) return q;
  if (t < 2/3) return p + (q-p) * (2/3 - t) * 6;
  return p;
}

function limit(v, max) {
  return Math.min(max, Math.max(0, v));
}

var Color = function(h, s, l, a) {
  this.H = h;
  this.S = s;
  this.L = l;
  this.A = a;
};

/*
 * str can be in any of these:
 * #0099ff rgb(64, 128, 255) rgba(64, 128, 255, 0.5)
 */
Color.parse = function(str) {
  var
    r = 0, g = 0, b = 0, a = 1,
    m;

  str = (''+ str).toLowerCase();
  str = w3cColors[str] || str;

  if ((m = str.match(/^#(\w{2})(\w{2})(\w{2})$/))) {
    r = parseInt(m[1], 16);
    g = parseInt(m[2], 16);
    b = parseInt(m[3], 16);
} else if ((m = str.match(/rgba?\((\d+)\D+(\d+)\D+(\d+)(\D+([\d.]+))?\)/))) {
    r = parseInt(m[1], 10);
    g = parseInt(m[2], 10);
    b = parseInt(m[3], 10);
    a = m[4] ? parseFloat(m[5]) : 1;
} else {
  return;
  }

  r /= 255;
  g /= 255;
  b /= 255;

  var
    max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    h, s, l = (max+min) / 2,
    d = max-min;

  if (!d) {
    h = s = 0; // achromatic
  } else {
    s = l > 0.5 ? d / (2-max-min) : d / (max+min);
    switch (max) {
      case r: h = (g-b) / d + (g < b ? 6 : 0); break;
      case g: h = (b-r) / d + 2; break;
      case b: h = (r-g) / d + 4; break;
    }
    h *= 60;
  }

  return new Color(h, s, l, a);
};

Color.prototype = {

  toRGBA: function() {
    var
      h = limit(this.H, 360),
      s = limit(this.S, 1),
      l = limit(this.L, 1),
      rgba = { a: limit(this.A, 1) };

    // achromatic
    if (s === 0) {
      rgba.r = l;
      rgba.g = l;
      rgba.b = l;
    } else {
      var
        q = l < 0.5 ? l * (1+s) : l + s - l*s,
        p = 2 * l-q;
        h /= 360;

      rgba.r = hue2rgb(p, q, h + 1/3);
      rgba.g = hue2rgb(p, q, h);
      rgba.b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(rgba.r*255),
      g: Math.round(rgba.g*255),
      b: Math.round(rgba.b*255),
      a: rgba.a
    };
  },

  toString: function() {
    var rgba = this.toRGBA();

    if (rgba.a === 1) {
      return '#' + ((1 <<24) + (rgba.r <<16) + (rgba.g <<8) + rgba.b).toString(16).slice(1, 7);
    }
    return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a.toFixed(2)].join(',') + ')';
  },

  hue: function(h) {
    return new Color(this.H*h, this.S, this.L, this.A);
  },

  saturation: function(s) {
    return new Color(this.H, this.S*s, this.L, this.A);
  },

  lightness: function(l) {
    return new Color(this.H, this.S, this.L*l, this.A);
  },

  alpha: function(a) {
    return new Color(this.H, this.S, this.L, this.A*a);
  }
};

return Color; }(this));

//****** file: SunPosition.js ******

// calculations are based on http://aa.quae.nl/en/reken/zonpositie.html
// code credits to Vladimir Agafonkin (@mourner)

var getSunPosition = (function() {

    var m = Math,
      PI = m.PI,
      sin = m.sin,
      cos = m.cos,
      tan = m.tan,
      asin = m.asin,
      atan = m.atan2;

    var rad = PI/180,
      dayMs = 1000*60*60*24,
      J1970 = 2440588,
      J2000 = 2451545,
      e = rad*23.4397; // obliquity of the Earth

    function toJulian(date) {
      return date.valueOf()/dayMs - 0.5+J1970;
    }
    function toDays(date) {
      return toJulian(date)-J2000;
    }
    function getRightAscension(l, b) {
      return atan(sin(l)*cos(e) - tan(b)*sin(e), cos(l));
    }
    function getDeclination(l, b) {
      return asin(sin(b)*cos(e) + cos(b)*sin(e)*sin(l));
    }
    function getAzimuth(H, phi, dec) {
      return atan(sin(H), cos(H)*sin(phi) - tan(dec)*cos(phi));
    }
    function getAltitude(H, phi, dec) {
      return asin(sin(phi)*sin(dec) + cos(phi)*cos(dec)*cos(H));
    }
    function getSiderealTime(d, lw) {
      return rad * (280.16 + 360.9856235*d) - lw;
    }
    function getSolarMeanAnomaly(d) {
      return rad * (357.5291 + 0.98560028*d);
    }
    function getEquationOfCenter(M) {
      return rad * (1.9148*sin(M) + 0.0200 * sin(2*M) + 0.0003 * sin(3*M));
    }
    function getEclipticLongitude(M, C) {
      var P = rad*102.9372; // perihelion of the Earth
      return M+C+P+PI;
    }

    return function getSunPosition(date, lat, lon) {
      var lw = rad*-lon,
        phi = rad*lat,
        d = toDays(date),
        M = getSolarMeanAnomaly(d),
        C = getEquationOfCenter(M),
        L = getEclipticLongitude(M, C),
        D = getDeclination(L, 0),
        A = getRightAscension(L, 0),
        t = getSiderealTime(d, lw),
        H = t-A;

      return {
        altitude: getAltitude(H, phi, D),
        azimuth: getAzimuth(H, phi, D) - PI/2 // origin: north
      };
    };

}());


//****** file: GeoJSON.js ******


var GeoJSON = (function() {

  var METERS_PER_LEVEL = 3;

  var materialColors = {
    brick:'#cc7755',
    bronze:'#ffeecc',
    canvas:'#fff8f0',
    concrete:'#999999',
    copper:'#a0e0d0',
    glass:'#e8f8f8',
    gold:'#ffcc00',
    plants:'#009933',
    metal:'#aaaaaa',
    panel:'#fff8f0',
    plaster:'#999999',
    roof_tiles:'#f08060',
    silver:'#cccccc',
    slate:'#666666',
    stone:'#996666',
    tar_paper:'#333333',
    wood:'#deb887'
  };

  var baseMaterials = {
    asphalt:'tar_paper',
    bitumen:'tar_paper',
    block:'stone',
    bricks:'brick',
    glas:'glass',
    glassfront:'glass',
    grass:'plants',
    masonry:'stone',
    granite:'stone',
    panels:'panel',
    paving_stones:'stone',
    plastered:'plaster',
    rooftiles:'roof_tiles',
    roofingfelt:'tar_paper',
    sandstone:'stone',
    sheet:'canvas',
    sheets:'canvas',
    shingle:'tar_paper',
    shingles:'tar_paper',
    slates:'slate',
    steel:'metal',
    tar:'tar_paper',
    tent:'canvas',
    thatch:'plants',
    tile:'roof_tiles',
    tiles:'roof_tiles'
  };
  // cardboard
  // eternit
  // limestone
  // straw

  function getMaterialColor(str) {
    str = str.toLowerCase();
    if (str[0] === '#') {
      return str;
    }
    return materialColors[baseMaterials[str] || str] || null;
  }

  function alignProperties(prop) {
    var item = {};

    prop = prop || {};

    item.height    = prop.height    || (prop.levels   ? prop.levels  *METERS_PER_LEVEL : DEFAULT_HEIGHT);
    item.minHeight = prop.minHeight || (prop.minLevel ? prop.minLevel*METERS_PER_LEVEL : 0);

    var wallColor = prop.material ? getMaterialColor(prop.material) : (prop.wallColor || prop.color);
    if (wallColor) {
      item.wallColor = wallColor;
    }

    var roofColor = prop.roofMaterial ? getMaterialColor(prop.roofMaterial) : prop.roofColor;
    if (roofColor) {
      item.roofColor = roofColor;
    }

    switch (prop.shape) {
      case 'cylinder':
      case 'cone':
      case 'dome':
      case 'sphere':
        item.shape = prop.shape;
        item.isRotational = true;
      break;

      case 'pyramid':
        item.shape = prop.shape;
      break;
    }

    switch (prop.roofShape) {
      case 'cone':
      case 'dome':
        item.roofShape = prop.roofShape;
        item.isRotational = true;
      break;

      case 'pyramid':
        item.roofShape = prop.roofShape;
      break;
    }

    if (item.roofShape && prop.roofHeight) {
      item.roofHeight = prop.roofHeight;
      item.height = max(0, item.height-item.roofHeight);
    } else {
      item.roofHeight = 0;
    }

    return item;
  }

  function getGeometries(geometry) {
    var
      i, il, polygon,
      geometries = [], sub;

    switch (geometry.type) {
      case 'GeometryCollection':
        geometries = [];
        for (i = 0, il = geometry.geometries.length; i < il; i++) {
          if ((sub = getGeometries(geometry.geometries[i]))) {
            geometries.push.apply(geometries, sub);
          }
        }
        return geometries;

      case 'MultiPolygon':
        geometries = [];
        for (i = 0, il = geometry.coordinates.length; i < il; i++) {
          if ((sub = getGeometries({ type: 'Polygon', coordinates: geometry.coordinates[i] }))) {
            geometries.push.apply(geometries, sub);
          }
        }
        return geometries;

      case 'Polygon':
        polygon = geometry.coordinates;
      break;

      default: return [];
    }

    var
      j, jl,
      p, lat = 1, lon = 0,
      outer = [], inner = [];

    p = polygon[0];
    for (i = 0, il = p.length; i < il; i++) {
      outer.push(p[i][lat], p[i][lon]);
    }

    for (i = 0, il = polygon.length-1; i < il; i++) {
      p = polygon[i+1];
      inner[i] = [];
      for (j = 0, jl = p.length; j < jl; j++) {
        inner[i].push(p[j][lat], p[j][lon]);
      }
    }

    return [{
      outer: outer,
      inner: inner.length ? inner : null
    }];
  }

  function clone(obj) {
    var res = {};
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        res[p] = obj[p];
      }
    }
    return res;
  }

  return {
    read: function(geojson) {
      if (!geojson || geojson.type !== 'FeatureCollection') {
        return [];
      }

      var
        collection = geojson.features,
        i, il, j, jl,
        res = [],
        feature,
        geometries,
        baseItem, item;

      for (i = 0, il = collection.length; i < il; i++) {
        feature = collection[i];

        if (feature.type !== 'Feature' || onEach(feature) === false) {
          continue;
        }

        baseItem = alignProperties(feature.properties);
        geometries = getGeometries(feature.geometry);

        for (j = 0, jl = geometries.length; j < jl; j++) {
          item = clone(baseItem);
          item.footprint = geometries[j].outer;
          if (item.isRotational) {
            item.radius = getLonDelta(item.footprint);
          }

          if (geometries[j].inner) {
            item.holes = geometries[j].inner;
          }
          if (feature.id || feature.properties.id) {
            item.id = feature.id || feature.properties.id;
          }

          if (feature.properties.relationId) {
            item.relationId = feature.properties.relationId;
          }

          res.push(item); // TODO: clone base properties!
        }
      }

      return res;
    }
  };
}());


//****** file: variables.js ******

var
  VERSION      = '0.2.2b',
  ATTRIBUTION  = '&copy; <a href="http://osmbuildings.org">OSM Buildings</a>',

  DATA_KEY = 'rkc8ywdl',

  PI         = Math.PI,
  HALF_PI    = PI/2,
  QUARTER_PI = PI/4,

  MAP_TILE_SIZE  = 256,    // map tile size in pixels
  DATA_TILE_SIZE = 0.0075, // data tile size in geo coordinates, smaller: less data to load but more requests
  ZOOM, MAP_SIZE,

  MIN_ZOOM = 15,

  LAT = 'latitude', LON = 'longitude',

  TRUE = true, FALSE = false,

  WIDTH = 0, HEIGHT = 0,
  CENTER_X = 0, CENTER_Y = 0,
  ORIGIN_X = 0, ORIGIN_Y = 0,

  WALL_COLOR = Color.parse('rgba(200, 190, 180)'),
  ALT_COLOR  = WALL_COLOR.lightness(0.8),
  ROOF_COLOR = WALL_COLOR.lightness(1.2),

  WALL_COLOR_STR = ''+ WALL_COLOR,
  ALT_COLOR_STR  = ''+ ALT_COLOR,
  ROOF_COLOR_STR = ''+ ROOF_COLOR,

  PIXEL_PER_DEG = 0,
  ZOOM_FACTOR = 1,

  MAX_HEIGHT, // taller buildings will be cut to this
  DEFAULT_HEIGHT = 5,

  CAM_X, CAM_Y, CAM_Z = 450,

  isZooming;


//****** file: geometry.js ******


function getDistance(p1, p2) {
  var
    dx = p1.x-p2.x,
    dy = p1.y-p2.y;
  return dx*dx + dy*dy;
}

function isRotational(polygon) {
  var length = polygon.length;
  if (length < 16) {
    return false;
  }

  var i;

  var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (i = 0; i < length-1; i+=2) {
    minX = Math.min(minX, polygon[i]);
    maxX = Math.max(maxX, polygon[i]);
    minY = Math.min(minY, polygon[i+1]);
    maxY = Math.max(maxY, polygon[i+1]);
  }

  var
    width = maxX-minX,
    height = (maxY-minY),
    ratio = width/height;

  if (ratio < 0.85 || ratio > 1.15) {
    return false;
  }

  var
    center = { x:minX+width/2, y:minY+height/2 },
    radius = (width+height)/4,
    sqRadius = radius*radius;

  for (i = 0; i < length-1; i+=2) {
    var dist = getDistance({ x:polygon[i], y:polygon[i+1] }, center);
    if (dist/sqRadius < 0.8 || dist/sqRadius > 1.2) {
      return false;
    }
  }

  return true;
}

function getSquareSegmentDistance(px, py, p1x, p1y, p2x, p2y) {
  var
    dx = p2x-p1x,
    dy = p2y-p1y,
    t;
  if (dx !== 0 || dy !== 0) {
    t = ((px-p1x) * dx + (py-p1y) * dy) / (dx*dx + dy*dy);
    if (t > 1) {
      p1x = p2x;
      p1y = p2y;
    } else if (t > 0) {
      p1x += dx*t;
      p1y += dy*t;
    }
  }
  dx = px-p1x;
  dy = py-p1y;
  return dx*dx + dy*dy;
}

function simplifyPolygon(buffer) {
  var
    sqTolerance = 2,
    len = buffer.length/2,
    markers = new Uint8Array(len),

    first = 0, last = len-1,

    i,
    maxSqDist,
    sqDist,
    index,
    firstStack = [], lastStack  = [],
    newBuffer  = [];

  markers[first] = markers[last] = 1;

  while (last) {
    maxSqDist = 0;
    for (i = first+1; i < last; i++) {
      sqDist = getSquareSegmentDistance(
        buffer[i    *2], buffer[i    *2 + 1],
        buffer[first*2], buffer[first*2 + 1],
        buffer[last *2], buffer[last *2 + 1]
      );
      if (sqDist > maxSqDist) {
        index = i;
        maxSqDist = sqDist;
      }
    }

    if (maxSqDist > sqTolerance) {
      markers[index] = 1;

      firstStack.push(first);
      lastStack.push(index);

      firstStack.push(index);
      lastStack.push(last);
    }

    first = firstStack.pop();
    last = lastStack.pop();
  }

  for (i = 0; i < len; i++) {
    if (markers[i]) {
      newBuffer.push(buffer[i*2], buffer[i*2 + 1]);
    }
  }

  return newBuffer;
}

function getCenter(footprint) {
  var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (var i = 0, il = footprint.length-3; i < il; i += 2) {
    minX = min(minX, footprint[i]);
    maxX = max(maxX, footprint[i]);
    minY = min(minY, footprint[i+1]);
    maxY = max(maxY, footprint[i+1]);
  }
  return { x:minX+(maxX-minX)/2 <<0, y:minY+(maxY-minY)/2 <<0 };
}

var EARTH_RADIUS = 6378137;

function getLonDelta(footprint) {
  var minLon = 180, maxLon = -180;
  for (var i = 0, il = footprint.length; i < il; i += 2) {
    minLon = min(minLon, footprint[i+1]);
    maxLon = max(maxLon, footprint[i+1]);
  }
  return (maxLon-minLon)/2;
}


//****** file: functions.js ******


function rad(deg) {
  return deg * PI / 180;
}

function deg(rad) {
  return rad / PI * 180;
}

function pixelToGeo(x, y) {
  var res = {};
  x /= MAP_SIZE;
  y /= MAP_SIZE;
  res[LAT] = y <= 0  ? 90 : y >= 1 ? -90 : deg(2 * atan(exp(PI * (1 - 2*y))) - HALF_PI),
  res[LON] = (x === 1 ?  1 : (x%1 + 1) % 1) * 360 - 180;
  return res;
}

function geoToPixel(lat, lon) {
  var latitude  = min(1, max(0, 0.5 - (log(tan(QUARTER_PI + HALF_PI * lat / 180)) / PI) / 2)),
    longitude = lon/360 + 0.5;
  return {
    x: longitude*MAP_SIZE <<0,
    y: latitude *MAP_SIZE <<0
  };
}

function fromRange(sVal, sMin, sMax, dMin, dMax) {
  sVal = min(max(sVal, sMin), sMax);
  var rel = (sVal-sMin) / (sMax-sMin),
    range = dMax-dMin;
  return min(max(dMin + rel*range, dMin), dMax);
}

function isVisible(polygon) {
   var
    maxX = WIDTH+ORIGIN_X,
    maxY = HEIGHT+ORIGIN_Y;

  // TODO: checking footprint is sufficient for visibility - NOT VALID FOR SHADOWS!
  for (var i = 0, il = polygon.length-3; i < il; i+=2) {
    if (polygon[i] > ORIGIN_X && polygon[i] < maxX && polygon[i+1] > ORIGIN_Y && polygon[i+1] < maxY) {
      return true;
    }
  }
  return false;
}


//****** file: BLDGS.js ******


var BLDGS = (function() {

  var baseURL = 'http://data.osmbuildings.org/0.2/';

  var cacheData = {};
  var cacheIndex = [];
  var cacheSize = 0;
  var maxCacheSize = 0;

//  // http://mathiasbynens.be/notes/localstorage-pattern#comment-9
//  var storage;
//  try {
//    storage = localStorage;
//  } catch (ex) {
//    storage = (function() {
//      return {
//        getItem: function() {},
//        setItem: function() {}
//      };
//    }());
//  }
//
//  var cacheData = JSON.parse(storage.getItem('BLDGS') || '{}');

  function xhr(url, callback) {
    if (cacheData[url]) {
      if (callback) {
        callback(cacheData[url]);
      }
      return;
    }

    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
      if (req.readyState !== 4) {
        return;
      }
      if (!req.status || req.status < 200 || req.status > 299) {
        return;
      }
      if (callback && req.responseText) {
        var json;
        try {
          json = JSON.parse(req.responseText);
        } catch(ex) {}

        cacheData[url] = json;
        cacheIndex.push({ url: url, size: req.responseText.length });
        cacheSize += req.responseText.length;

        while (cacheSize > maxCacheSize) {
          var item = cacheIndex.shift();
          cacheSize -= item.size;
          delete cacheData[item.url];
        }

//  try {
//    storage.setItem('BLDGS', JSON.stringify(cacheData));
//  } catch(ex) {}

        callback(json);
      }
    };

    req.open('GET', url);
    req.send(null);

    return req;
  }

  function getDistance(a, b) {
    var dx = a.x-b.x, dy = a.y-b.y;
    return dx*dx + dy*dy;
  }

  function BLDGS(options) {
    options = options || {};
    baseURL += (options.key || 'anonymous');
    maxCacheSize = options.cacheSize || 1024*1024; // 1MB
  }

  BLDGS.TILE_SIZE = 256;
  BLDGS.ATTRIBUTION = 'Data Service &copy; <a href="http://bld.gs">BLD.GS</a>';

  var proto = BLDGS.prototype;

  proto.getTile = function(x, y, zoom, callback) {
    var url = baseURL +'/tile/'+ zoom +'/'+ x +'/'+ y +'.json';
    return xhr(url, callback);
  };

  proto.getFeature = function(id, callback) {
    var url = baseURL +'/feature/'+ id +'.json';
    return xhr(url, callback);
  };

  proto.getBBox = function(bbox, callback) {
    var url = baseURL +'/bbox.json?bbox='+ [bbox.n.toFixed(5),bbox.e.toFixed(5),bbox.s.toFixed(5),bbox.w.toFixed(5)].join(',');
    return xhr(url, callback);
  };

  proto.getAllTiles = function(x, y, w, h, zoom, callback) {
    var
      tileSize = BLDGS.TILE_SIZE,
      fixedZoom = 16,
      realTileSize = zoom > fixedZoom ? tileSize <<(zoom-fixedZoom) : tileSize >>(fixedZoom-zoom),
      minX = x/realTileSize <<0,
      minY = y/realTileSize <<0,
      maxX = Math.ceil((x+w)/realTileSize),
      maxY = Math.ceil((y+h)/realTileSize),
      tx, ty,
      queue = [];

    for (ty = minY; ty <= maxY; ty++) {
      for (tx = minX; tx <= maxX; tx++) {
        queue.push({ x:tx, y:ty, z:fixedZoom });
      }
    }

    var center = { x: x+(w-tileSize)/2, y: y+(h-tileSize)/2 };
		queue.sort(function(a, b) {
			return getDistance(a, center) - getDistance(b, center);
		});

		for (var i = 0, il = queue.length; i < il; i++) {
      this.getTile(queue[i].x, queue[i].y, queue[i].z, callback);
		}

    return {
      abort: function() {
        for (var i = 0; i < queue.length; i++) {
          queue[i].abort();
        }
      }
    };
  };

  return BLDGS;

}());


//****** file: Data.js ******


var Data = {

  loadedItems: {}, // maintain a list of cached items in order to avoid duplicates on tile borders
  items: [],

  getPixelFootprint: function(buffer) {
    var footprint = new Int32Array(buffer.length),
      px;

    for (var i = 0, il = buffer.length-1; i < il; i+=2) {
      px = geoToPixel(buffer[i], buffer[i+1]);
      footprint[i]   = px.x;
      footprint[i+1] = px.y;
    }

    footprint = simplifyPolygon(footprint);
    if (footprint.length < 8) { // 3 points & end==start (*2)
      return;
    }

    return footprint;
  },

  resetItems: function() {
    this.items = [];
    this.loadedItems = {};
    HitAreas.reset();
  },

  addRenderItems: function(data, allAreNew) {
    var item, scaledItem, id;
    var geojson = GeoJSON.read(data);
    for (var i = 0, il = geojson.length; i < il; i++) {
      item = geojson[i];
      id = item.id || [item.footprint[0], item.footprint[1], item.height, item.minHeight].join(',');
      if (!this.loadedItems[id]) {
        if ((scaledItem = this.scale(item))) {
          scaledItem.scale = allAreNew ? 0 : 1;
          this.items.push(scaledItem);
          this.loadedItems[id] = 1;
        }
      }
    }
    fadeIn();
  },

  scale: function(item) {
    var
      res = {},
      // TODO: calculate this on zoom change only
      zoomScale = 6 / pow(2, ZOOM-MIN_ZOOM); // TODO: consider using HEIGHT / (global.devicePixelRatio || 1)

    if (item.id) {
      res.id = item.id;
    }

    res.height = min(item.height/zoomScale, MAX_HEIGHT);

    res.minHeight = isNaN(item.minHeight) ? 0 : item.minHeight / zoomScale;
    if (res.minHeight > MAX_HEIGHT) {
      return;
    }

    res.footprint = this.getPixelFootprint(item.footprint);
    if (!res.footprint) {
      return;
    }
    res.center = getCenter(res.footprint);

    if (item.radius) {
      res.radius = item.radius*PIXEL_PER_DEG;
    }
    if (item.shape) {
      res.shape = item.shape;
    }
    if (item.roofShape) {
      res.roofShape = item.roofShape;
    }
    if ((res.roofShape === 'cone' || res.roofShape === 'dome') && !res.shape && isRotational(res.footprint)) {
      res.shape = 'cylinder';
    }

    if (item.holes) {
      res.holes = [];
      var innerFootprint;
      for (var i = 0, il = item.holes.length; i < il; i++) {
        // TODO: simplify
        if ((innerFootprint = this.getPixelFootprint(item.holes[i]))) {
          res.holes.push(innerFootprint);
        }
      }
    }

    var color;

    if (item.wallColor) {
      if ((color = Color.parse(item.wallColor))) {
        color = color.alpha(ZOOM_FACTOR);
        res.altColor  = ''+ color.lightness(0.8);
        res.wallColor = ''+ color;
      }
    }

    if (item.roofColor) {
      if ((color = Color.parse(item.roofColor))) {
        res.roofColor = ''+ color.alpha(ZOOM_FACTOR);
      }
    }

    if (item.relationId) {
      res.relationId = item.relationId;
    }
    res.hitColor = HitAreas.idToColor(item.relationId || item.id);

    res.roofHeight = isNaN(item.roofHeight) ? 0 : item.roofHeight/zoomScale;

    if (res.height+res.roofHeight <= res.minHeight) {
      return;
    }

    return res;
  },

  set: function(data) {
    this.isStatic = true;
    this.resetItems();
    this._staticData = data;
    this.addRenderItems(this._staticData, true);
  },

  load: function(provider) {
    this.provider = provider || new BLDGS({ key: DATA_KEY });
    this.update();
  },

  update: function() {
    this.resetItems();

    if (ZOOM < MIN_ZOOM) {
      return;
    }

    if (this.isStatic && this._staticData) {
      this.addRenderItems(this._staticData);
      return;
    }

    if (!this.provider) {
      return;
    }

    var
      tileZoom = 16,
      tileSize = 256,
      zoomedTileSize = ZOOM > tileZoom ? tileSize <<(ZOOM-tileZoom) : tileSize >>(tileZoom-ZOOM),
      minX = ORIGIN_X/zoomedTileSize <<0,
      minY = ORIGIN_Y/zoomedTileSize <<0,
      maxX = ceil((ORIGIN_X+WIDTH) /zoomedTileSize),
      maxY = ceil((ORIGIN_Y+HEIGHT)/zoomedTileSize),
      x, y;

    var scope = this;
    function callback(json) {
      scope.addRenderItems(json);
    }

    for (y = minY; y <= maxY; y++) {
      for (x = minX; x <= maxX; x++) {
        this.provider.getTile(x, y, tileZoom, callback);
      }
    }
  }
};


//****** file: Block.js ******

var Block = {

  draw: function(context, polygon, innerPolygons, height, minHeight, color, altColor, roofColor) {
    var
      i, il,
      roof = this._extrude(context, polygon, height, minHeight, color, altColor),
      innerRoofs = [];

    if (innerPolygons) {
      for (i = 0, il = innerPolygons.length; i < il; i++) {
        innerRoofs[i] = this._extrude(context, innerPolygons[i], height, minHeight, color, altColor);
      }
    }

    context.fillStyle = roofColor;

    context.beginPath();
    this._ring(context, roof);
    if (innerPolygons) {
      for (i = 0, il = innerRoofs.length; i < il; i++) {
        this._ring(context, innerRoofs[i]);
      }
    }
    context.closePath();
    context.stroke();
    context.fill();
  },

  _extrude: function(context, polygon, height, minHeight, color, altColor) {
    var
      scale = CAM_Z / (CAM_Z-height),
      minScale = CAM_Z / (CAM_Z-minHeight),
      a = { x:0, y:0 },
      b = { x:0, y:0 },
      _a, _b,
      roof = [];

    for (var i = 0, il = polygon.length-3; i < il; i += 2) {
      a.x = polygon[i  ]-ORIGIN_X;
      a.y = polygon[i+1]-ORIGIN_Y;
      b.x = polygon[i+2]-ORIGIN_X;
      b.y = polygon[i+3]-ORIGIN_Y;

      _a = Buildings.project(a, scale);
      _b = Buildings.project(b, scale);

      if (minHeight) {
        a = Buildings.project(a, minScale);
        b = Buildings.project(b, minScale);
      }

      // backface culling check
      if ((b.x-a.x) * (_a.y-a.y) > (_a.x-a.x) * (b.y-a.y)) {
        // depending on direction, set wall shading
        if ((a.x < b.x && a.y < b.y) || (a.x > b.x && a.y > b.y)) {
          context.fillStyle = altColor;
        } else {
          context.fillStyle = color;
        }

        context.beginPath();
        this._ring(context, [
           b.x,  b.y,
           a.x,  a.y,
          _a.x, _a.y,
          _b.x, _b.y
        ]);
        context.closePath();
        context.fill();
      }

      roof[i]   = _a.x;
      roof[i+1] = _a.y;
    }

    return roof;
  },

  _ring: function(context, polygon) {
    context.moveTo(polygon[0], polygon[1]);
    for (var i = 2, il = polygon.length-1; i < il; i += 2) {
      context.lineTo(polygon[i], polygon[i+1]);
    }
  },

  simplified: function(context, polygon, innerPolygons) {
    context.beginPath();
    this._ringAbs(context, polygon);
    if (innerPolygons) {
      for (var i = 0, il = innerPolygons.length; i < il; i++) {
        this._ringAbs(context, innerPolygons[i]);
      }
    }
    context.closePath();
    context.stroke();
    context.fill();
  },

  _ringAbs: function(context, polygon) {
    context.moveTo(polygon[0]-ORIGIN_X, polygon[1]-ORIGIN_Y);
    for (var i = 2, il = polygon.length-1; i < il; i += 2) {
      context.lineTo(polygon[i]-ORIGIN_X, polygon[i+1]-ORIGIN_Y);
    }
  },

  shadow: function(context, polygon, innerPolygons, height, minHeight) {
    var
      mode = null,
      a = { x:0, y:0 },
      b = { x:0, y:0 },
      _a, _b;

    for (var i = 0, il = polygon.length-3; i < il; i += 2) {
      a.x = polygon[i  ]-ORIGIN_X;
      a.y = polygon[i+1]-ORIGIN_Y;
      b.x = polygon[i+2]-ORIGIN_X;
      b.y = polygon[i+3]-ORIGIN_Y;

      _a = Shadows.project(a, height);
      _b = Shadows.project(b, height);

      if (minHeight) {
        a = Shadows.project(a, minHeight);
        b = Shadows.project(b, minHeight);
      }

      // mode 0: floor edges, mode 1: roof edges
      if ((b.x-a.x) * (_a.y-a.y) > (_a.x-a.x) * (b.y-a.y)) {
        if (mode === 1) {
          context.lineTo(a.x, a.y);
        }
        mode = 0;
        if (!i) {
          context.moveTo(a.x, a.y);
        }
        context.lineTo(b.x, b.y);
      } else {
        if (mode === 0) {
          context.lineTo(_a.x, _a.y);
        }
        mode = 1;
        if (!i) {
          context.moveTo(_a.x, _a.y);
        }
        context.lineTo(_b.x, _b.y);
      }
    }

    if (innerPolygons) {
      for (i = 0, il = innerPolygons.length; i < il; i++) {
        this._ringAbs(context, innerPolygons[i]);
      }
    }
  },

  shadowMask: function(context, polygon, innerPolygons) {
    this._ringAbs(context, polygon);
    if (innerPolygons) {
      for (var i = 0, il = innerPolygons.length; i < il; i++) {
        this._ringAbs(context, innerPolygons[i]);
      }
    }
  },

  hitArea: function(context, polygon, innerPolygons, height, minHeight, color) {
    var
      mode = null,
      a = { x:0, y:0 },
      b = { x:0, y:0 },
      scale = CAM_Z / (CAM_Z-height),
      minScale = CAM_Z / (CAM_Z-minHeight),
      _a, _b;

    context.fillStyle = color;
    context.beginPath();

    for (var i = 0, il = polygon.length-3; i < il; i += 2) {
      a.x = polygon[i  ]-ORIGIN_X;
      a.y = polygon[i+1]-ORIGIN_Y;
      b.x = polygon[i+2]-ORIGIN_X;
      b.y = polygon[i+3]-ORIGIN_Y;

      _a = Buildings.project(a, scale);
      _b = Buildings.project(b, scale);

      if (minHeight) {
        a = Buildings.project(a, minScale);
        b = Buildings.project(b, minScale);
      }

      // mode 0: floor edges, mode 1: roof edges
      if ((b.x-a.x) * (_a.y-a.y) > (_a.x-a.x) * (b.y-a.y)) {
        if (mode === 1) { // mode is initially undefined
          context.lineTo(a.x, a.y);
        }
        mode = 0;
        if (!i) {
          context.moveTo(a.x, a.y);
        }
        context.lineTo(b.x, b.y);
      } else {
        if (mode === 0) { // mode is initially undefined
          context.lineTo(_a.x, _a.y);
        }
        mode = 1;
        if (!i) {
          context.moveTo(_a.x, _a.y);
        }
        context.lineTo(_b.x, _b.y);
      }
    }

    context.closePath();
    context.fill();
  }

};


//****** file: Cylinder.js ******

var Cylinder = {

  draw: function(context, center, radius, topRadius, height, minHeight, color, altColor, roofColor) {
    var
      c = { x:center.x-ORIGIN_X, y:center.y-ORIGIN_Y },
      scale = CAM_Z / (CAM_Z-height),
      minScale = CAM_Z / (CAM_Z-minHeight),
      apex = Buildings.project(c, scale),
      a1, a2;

    topRadius *= scale;

    if (minHeight) {
      c = Buildings.project(c, minScale);
      radius = radius*minScale;
    }

    // common tangents for ground and roof circle
    var tangents = this._tangents(c, radius, apex, topRadius);

    // no tangents? top circle is inside bottom circle
    if (!tangents) {
      a1 = 1.5*PI;
      a2 = 1.5*PI;
    } else {
      a1 = atan2(tangents[0].y1-c.y, tangents[0].x1-c.x);
      a2 = atan2(tangents[1].y1-c.y, tangents[1].x1-c.x);
    }

    context.fillStyle = color;
    context.beginPath();
    context.arc(apex.x, apex.y, topRadius, HALF_PI, a1, true);
    context.arc(c.x, c.y, radius, a1, HALF_PI);
    context.closePath();
    context.fill();

    context.fillStyle = altColor;
    context.beginPath();
    context.arc(apex.x, apex.y, topRadius, a2, HALF_PI, true);
    context.arc(c.x, c.y, radius, HALF_PI, a2);
    context.closePath();
    context.fill();

    context.fillStyle = roofColor;
    this._circle(context, apex, topRadius);
  },

  simplified: function(context, center, radius) {
    this._circle(context, { x:center.x-ORIGIN_X, y:center.y-ORIGIN_Y }, radius);
  },

  shadow: function(context, center, radius, topRadius, height, minHeight) {
    var
      c = { x:center.x-ORIGIN_X, y:center.y-ORIGIN_Y },
      apex = Shadows.project(c, height),
      p1, p2;

    if (minHeight) {
      c = Shadows.project(c, minHeight);
    }

    // common tangents for ground and roof circle
    var tangents = this._tangents(c, radius, apex, topRadius);

    // TODO: no tangents? roof overlaps everything near cam position
    if (tangents) {
      p1 = atan2(tangents[0].y1-c.y, tangents[0].x1-c.x);
      p2 = atan2(tangents[1].y1-c.y, tangents[1].x1-c.x);
      context.moveTo(tangents[1].x2, tangents[1].y2);
      context.arc(apex.x, apex.y, topRadius, p2, p1);
      context.arc(c.x, c.y, radius, p1, p2);
    } else {
      context.moveTo(c.x+radius, c.y);
      context.arc(c.x, c.y, radius, 0, 2*PI);
    }
  },

  shadowMask: function(context, center, radius) {
    var c = { x:center.x-ORIGIN_X, y:center.y-ORIGIN_Y };
    context.moveTo(c.x+radius, c.y);
    context.arc(c.x, c.y, radius, 0, PI*2);
  },

  hitArea: function(context, center, radius, topRadius, height, minHeight, color) {
    var
      c = { x:center.x-ORIGIN_X, y:center.y-ORIGIN_Y },
      scale = CAM_Z / (CAM_Z-height),
      minScale = CAM_Z / (CAM_Z-minHeight),
      apex = Buildings.project(c, scale),
      p1, p2;

    topRadius *= scale;

    if (minHeight) {
      c = Buildings.project(c, minScale);
      radius = radius*minScale;
    }

    // common tangents for ground and roof circle
    var tangents = this._tangents(c, radius, apex, topRadius);

    context.fillStyle = color;
    context.beginPath();

    // TODO: no tangents? roof overlaps everything near cam position
    if (tangents) {
      p1 = atan2(tangents[0].y1-c.y, tangents[0].x1-c.x);
      p2 = atan2(tangents[1].y1-c.y, tangents[1].x1-c.x);
      context.moveTo(tangents[1].x2, tangents[1].y2);
      context.arc(apex.x, apex.y, topRadius, p2, p1);
      context.arc(c.x, c.y, radius, p1, p2);
    } else {
      context.moveTo(c.x+radius, c.y);
      context.arc(c.x, c.y, radius, 0, 2*PI);
    }

    context.closePath();
    context.fill();
  },

  _circle: function(context, center, radius) {
    context.beginPath();
    context.arc(center.x, center.y, radius, 0, PI*2);
    context.stroke();
    context.fill();
  },

    // http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Tangents_between_two_circles
  _tangents: function(c1, r1, c2, r2) {
    var
      dx = c1.x-c2.x,
      dy = c1.y-c2.y,
      dr = r1-r2,
      sqdist = (dx*dx) + (dy*dy);

    if (sqdist <= dr*dr) {
      return;
    }

    var dist = sqrt(sqdist),
      vx = -dx/dist,
      vy = -dy/dist,
      c  =  dr/dist,
      res = [],
      h, nx, ny;

    // Let A, B be the centers, and C, D be points at which the tangent
    // touches first and second circle, and n be the normal vector to it.
    //
    // We have the system:
    //   n * n = 1    (n is a unit vector)
    //   C = A + r1 * n
    //   D = B + r2 * n
    //   n * CD = 0   (common orthogonality)
    //
    // n * CD = n * (AB + r2*n - r1*n) = AB*n - (r1 -/+ r2) = 0,  <=>
    // AB * n = (r1 -/+ r2), <=>
    // v * n = (r1 -/+ r2) / d,  where v = AB/|AB| = AB/d
    // This is a linear equation in unknown vector n.
    // Now we're just intersecting a line with a circle: v*n=c, n*n=1

    h = sqrt(max(0, 1 - c*c));
    for (var sign = 1; sign >= -1; sign -= 2) {
      nx = vx*c - sign*h*vy;
      ny = vy*c + sign*h*vx;
      res.push({
        x1: c1.x + r1*nx <<0,
        y1: c1.y + r1*ny <<0,
        x2: c2.x + r2*nx <<0,
        y2: c2.y + r2*ny <<0
      });
    }

    return res;
  }
};


//****** file: Pyramid.js ******

var Pyramid = {

  draw: function(context, polygon, center, height, minHeight, color, altColor) {
    var
      c = { x:center.x-ORIGIN_X, y:center.y-ORIGIN_Y },
      scale = CAM_Z / (CAM_Z-height),
      minScale = CAM_Z / (CAM_Z-minHeight),
      apex = Buildings.project(c, scale),
      a = { x:0, y:0 },
      b = { x:0, y:0 };

    for (var i = 0, il = polygon.length-3; i < il; i += 2) {
      a.x = polygon[i  ]-ORIGIN_X;
      a.y = polygon[i+1]-ORIGIN_Y;
      b.x = polygon[i+2]-ORIGIN_X;
      b.y = polygon[i+3]-ORIGIN_Y;

      if (minHeight) {
        a = Buildings.project(a, minScale);
        b = Buildings.project(b, minScale);
      }

      // backface culling check
      if ((b.x-a.x) * (apex.y-a.y) > (apex.x-a.x) * (b.y-a.y)) {
        // depending on direction, set shading
        if ((a.x < b.x && a.y < b.y) || (a.x > b.x && a.y > b.y)) {
          context.fillStyle = altColor;
        } else {
          context.fillStyle = color;
        }

        context.beginPath();
        this._triangle(context, a, b, apex);
        context.closePath();
        context.fill();
      }
    }
  },

  _triangle: function(context, a, b, c) {
    context.moveTo(a.x, a.y);
    context.lineTo(b.x, b.y);
    context.lineTo(c.x, c.y);
  },

  _ring: function(context, polygon) {
    context.moveTo(polygon[0]-ORIGIN_X, polygon[1]-ORIGIN_Y);
    for (var i = 2, il = polygon.length-1; i < il; i += 2) {
      context.lineTo(polygon[i]-ORIGIN_X, polygon[i+1]-ORIGIN_Y);
    }
  },

  shadow: function(context, polygon, center, height, minHeight) {
    var
      a = { x:0, y:0 },
      b = { x:0, y:0 },
      c = { x:center.x-ORIGIN_X, y:center.y-ORIGIN_Y },
      apex = Shadows.project(c, height);

    for (var i = 0, il = polygon.length-3; i < il; i += 2) {
      a.x = polygon[i  ]-ORIGIN_X;
      a.y = polygon[i+1]-ORIGIN_Y;
      b.x = polygon[i+2]-ORIGIN_X;
      b.y = polygon[i+3]-ORIGIN_Y;

      if (minHeight) {
        a = Shadows.project(a, minHeight);
        b = Shadows.project(b, minHeight);
      }

      // backface culling check
      if ((b.x-a.x) * (apex.y-a.y) > (apex.x-a.x) * (b.y-a.y)) {
        // depending on direction, set shading
        this._triangle(context, a, b, apex);
      }
    }
  },

  shadowMask: function(context, polygon) {
    this._ring(context, polygon);
  },

  hitArea: function(context, polygon, center, height, minHeight, color) {
    var
      c = { x:center.x-ORIGIN_X, y:center.y-ORIGIN_Y },
      scale = CAM_Z / (CAM_Z-height),
      minScale = CAM_Z / (CAM_Z-minHeight),
      apex = Buildings.project(c, scale),
      a = { x:0, y:0 },
      b = { x:0, y:0 };

    context.fillStyle = color;
    context.beginPath();

    for (var i = 0, il = polygon.length-3; i < il; i += 2) {
      a.x = polygon[i  ]-ORIGIN_X;
      a.y = polygon[i+1]-ORIGIN_Y;
      b.x = polygon[i+2]-ORIGIN_X;
      b.y = polygon[i+3]-ORIGIN_Y;

      if (minHeight) {
        a = Buildings.project(a, minScale);
        b = Buildings.project(b, minScale);
      }

      // backface culling check
      if ((b.x-a.x) * (apex.y-a.y) > (apex.x-a.x) * (b.y-a.y)) {
        this._triangle(context, a, b, apex);
      }
    }

    context.closePath();
    context.fill();
  }
};


//****** file: Buildings.js ******

var Buildings = {

  project: function(p, m) {
    return {
      x: (p.x-CAM_X) * m + CAM_X <<0,
      y: (p.y-CAM_Y) * m + CAM_Y <<0
    };
  },

  render: function() {
    var context = this.context;
    context.clearRect(0, 0, WIDTH, HEIGHT);

    // show on high zoom levels only and avoid rendering during zoom
    if (ZOOM < MIN_ZOOM || isZooming) {
      return;
    }

    var
      item,
      h, mh,
      sortCam = { x:CAM_X+ORIGIN_X, y:CAM_Y+ORIGIN_Y },
      footprint,
      wallColor, altColor, roofColor,
      dataItems = Data.items;

    dataItems.sort(function(a, b) {
      return (a.minHeight-b.minHeight) || getDistance(b.center, sortCam) - getDistance(a.center, sortCam) || (b.height-a.height);
    });

    for (var i = 0, il = dataItems.length; i < il; i++) {
      item = dataItems[i];

      if (Simplified.isSimple(item)) {
        continue;
      }

      footprint = item.footprint;

      if (!isVisible(footprint)) {
        continue;
      }

      // when fading in, use a dynamic height
      h = item.scale < 1 ? item.height*item.scale : item.height;

      mh = 0;
      if (item.minHeight) {
        mh = item.scale < 1 ? item.minHeight*item.scale : item.minHeight;
      }

      wallColor = item.wallColor || WALL_COLOR_STR;
      altColor  = item.altColor  || ALT_COLOR_STR;
      roofColor = item.roofColor || ROOF_COLOR_STR;
      context.strokeStyle = altColor;

      switch (item.shape) {
        case 'cylinder': Cylinder.draw(context, item.center, item.radius, item.radius, h, mh, wallColor, altColor, roofColor); break;
        case 'cone':     Cylinder.draw(context, item.center, item.radius, 0, h, mh, wallColor, altColor);                      break;
        case 'dome':     Cylinder.draw(context, item.center, item.radius, item.radius/2, h, mh, wallColor, altColor);          break;
        case 'sphere':   Cylinder.draw(context, item.center, item.radius, item.radius, h, mh, wallColor, altColor, roofColor); break;
        case 'pyramid':  Pyramid.draw(context, footprint, item.center, h, mh, wallColor, altColor);                            break;
        default:         Block.draw(context, footprint, item.holes, h, mh, wallColor, altColor, roofColor);
      }

      switch (item.roofShape) {
        case 'cone':    Cylinder.draw(context, item.center, item.radius, 0, h+item.roofHeight, h, roofColor, ''+ Color.parse(roofColor).lightness(0.9));             break;
        case 'dome':    Cylinder.draw(context, item.center, item.radius, item.radius/2, h+item.roofHeight, h, roofColor, ''+ Color.parse(roofColor).lightness(0.9)); break;
        case 'pyramid': Pyramid.draw(context, footprint, item.center, h+item.roofHeight, h, roofColor, Color.parse(roofColor).lightness(0.9));                       break;
      }
    }
  }
};


//****** file: Simplified.js ******

var Simplified = {

  maxZoom: MIN_ZOOM+2,
  maxHeight: 5,

  isSimple: function(item) {
    return (ZOOM <= this.maxZoom && item.height+item.roofHeight < this.maxHeight);
  },

  render: function() {
    var context = this.context;
    context.clearRect(0, 0, WIDTH, HEIGHT);

    // show on high zoom levels only and avoid rendering during zoom
    if (ZOOM < MIN_ZOOM || isZooming || ZOOM > this.maxZoom) {
      return;
    }

    var
      item,
      footprint,
      dataItems = Data.items;

    for (var i = 0, il = dataItems.length; i < il; i++) {
      item = dataItems[i];

      if (item.height >= this.maxHeight) {
        continue;
      }

      footprint = item.footprint;

      if (!isVisible(footprint)) {
        continue;
      }

      context.strokeStyle = item.altColor  || ALT_COLOR_STR;
      context.fillStyle   = item.roofColor || ROOF_COLOR_STR;

      switch (item.shape) {
        case 'cylinder':
        case 'cone':
        case 'dome':
        case 'sphere': Cylinder.simplified(context, item.center, item.radius);  break;
        default: Block.simplified(context, footprint, item.holes);
      }
    }
  }
};


//****** file: Shadows.js ******

var Shadows = {

  enabled: true,
  color: '#666666',
  blurColor: '#000000',
  blurSize: 15,
  date: new Date(),
  direction: { x:0, y:0 },

  project: function(p, h) {
    return {
      x: p.x + this.direction.x*h,
      y: p.y + this.direction.y*h
    };
  },

  render: function() {
    var
      context = this.context,
      screenCenter, sun, length, alpha;

    context.clearRect(0, 0, WIDTH, HEIGHT);

    // show on high zoom levels only and avoid rendering during zoom
    if (!this.enabled || ZOOM < MIN_ZOOM || isZooming) {
      return;
    }

    // TODO: calculate this just on demand
    screenCenter = pixelToGeo(CENTER_X+ORIGIN_X, CENTER_Y+ORIGIN_Y);
    sun = getSunPosition(this.date, screenCenter.latitude, screenCenter.longitude);

    if (sun.altitude <= 0) {
      return;
    }

    length = 1 / tan(sun.altitude);
    alpha = length < 5 ? 0.75 : 1/length*5;

    this.direction.x = cos(sun.azimuth) * length;
    this.direction.y = sin(sun.azimuth) * length;

    var
      i, il,
      item,
      h, mh,
      footprint,
      dataItems = Data.items;

    context.canvas.style.opacity = alpha / (ZOOM_FACTOR * 2);
    context.shadowColor = this.blurColor;
    context.shadowBlur = this.blurSize * (ZOOM_FACTOR / 2);
    context.fillStyle = this.color;
    context.beginPath();

    for (i = 0, il = dataItems.length; i < il; i++) {
      item = dataItems[i];

      footprint = item.footprint;

      if (!isVisible(footprint)) {
        continue;
      }

      // when fading in, use a dynamic height
      h = item.scale < 1 ? item.height*item.scale : item.height;

      mh = 0;
      if (item.minHeight) {
        mh = item.scale < 1 ? item.minHeight*item.scale : item.minHeight;
      }

      switch (item.shape) {
        case 'cylinder': Cylinder.shadow(context, item.center, item.radius, item.radius, h, mh);   break;
        case 'cone':     Cylinder.shadow(context, item.center, item.radius, 0, h, mh);             break;
        case 'dome':     Cylinder.shadow(context, item.center, item.radius, item.radius/2, h, mh); break;
        case 'sphere':   Cylinder.shadow(context, item.center, item.radius, item.radius, h, mh);   break;
        case 'pyramid':  Pyramid.shadow(context, footprint, item.center, h, mh);                   break;
        default:         Block.shadow(context, footprint, item.holes, h, mh);
      }

      switch (item.roofShape) {
        case 'cone':    Cylinder.shadow(context, item.center, item.radius, 0, h+item.roofHeight, h);             break;
        case 'dome':    Cylinder.shadow(context, item.center, item.radius, item.radius/2, h+item.roofHeight, h); break;
        case 'pyramid': Pyramid.shadow(context, footprint, item.center, h+item.roofHeight, h);                   break;
      }
    }

    context.closePath();
    context.fill();

    context.shadowBlur = null;

    // now draw all the footprints as negative clipping mask
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();

    for (i = 0, il = dataItems.length; i < il; i++) {
      item = dataItems[i];

      footprint = item.footprint;

      if (!isVisible(footprint)) {
        continue;
      }

      // if object is hovered, there is no need to clip it's footprint
      if (item.minHeight) {
        continue;
      }

      switch (item.shape) {
        case 'cylinder':
        case 'cone':
        case 'dome':
          Cylinder.shadowMask(context, item.center, item.radius);
        break;
        default:
          Block.shadowMask(context, footprint, item.holes);
      }
    }

    context.fillStyle = '#00ff00';
    context.fill();
    context.globalCompositeOperation = 'source-over';
  }
};


//****** file: HitAreas.js ******


var HitAreas = {

  _idMapping: [null],

  reset: function() {
    this._idMapping = [null];
  },

  render: function() {
    if (this._timer) {
      return;
    }
    var self = this;
    this._timer = setTimeout(function() {
      self._timer = null;
      self._render();
    }, 500);
  },

  _render: function() {
    var context = this.context;

    context.clearRect(0, 0, WIDTH, HEIGHT);

    // show on high zoom levels only and avoid rendering during zoom
    if (ZOOM < MIN_ZOOM || isZooming) {
      return;
    }

    var
      item,
      h, mh,
      sortCam = { x:CAM_X+ORIGIN_X, y:CAM_Y+ORIGIN_Y },
      footprint,
      color,
      dataItems = Data.items;

    dataItems.sort(function(a, b) {
      return (a.minHeight-b.minHeight) || getDistance(b.center, sortCam) - getDistance(a.center, sortCam) || (b.height-a.height);
    });

    for (var i = 0, il = dataItems.length; i < il; i++) {
      item = dataItems[i];

      if (!(color = item.hitColor)) {
        continue;
      }

      footprint = item.footprint;

      if (!isVisible(footprint)) {
        continue;
      }

      h = item.height;

      mh = 0;
      if (item.minHeight) {
        mh = item.minHeight;
      }

      switch (item.shape) {
        case 'cylinder': Cylinder.hitArea(context, item.center, item.radius, item.radius, h, mh, color);   break;
        case 'cone':     Cylinder.hitArea(context, item.center, item.radius, 0, h, mh, color);             break;
        case 'dome':     Cylinder.hitArea(context, item.center, item.radius, item.radius/2, h, mh, color); break;
        case 'sphere':   Cylinder.hitArea(context, item.center, item.radius, item.radius, h, mh, color);   break;
        case 'pyramid':  Pyramid.hitArea(context, footprint, item.center, h, mh, color);                   break;
        default:         Block.hitArea(context, footprint, item.holes, h, mh, color);
      }

      switch (item.roofShape) {
        case 'cone':    Cylinder.hitArea(context, item.center, item.radius, 0, h+item.roofHeight, h, color);             break;
        case 'dome':    Cylinder.hitArea(context, item.center, item.radius, item.radius/2, h+item.roofHeight, h, color); break;
        case 'pyramid': Pyramid.hitArea(context, footprint, item.center, h+item.roofHeight, h, color);                   break;
      }
    }

    this._imageData = this.context.getImageData(0, 0, WIDTH, HEIGHT).data;
  },

  getIdFromXY: function(x, y) {
    var imageData = this._imageData;
    if (!imageData) {
      return;
    }
    var pos = 4*((y|0) * WIDTH + (x|0));
    var index = imageData[pos] | (imageData[pos+1]<<8) | (imageData[pos+2]<<16);
    return this._idMapping[index];
  },

  idToColor: function(id) {
    var index = this._idMapping.indexOf(id);
    if (index === -1) {
      this._idMapping.push(id);
      index = this._idMapping.length-1;
    }
    var r =  index       & 0xff;
    var g = (index >>8)  & 0xff;
    var b = (index >>16) & 0xff;
    return 'rgb('+ [r, g, b].join(',') +')';
  }
};


//****** file: Debug.js ******

var Debug = {

  point: function(x, y, color, size) {
    var context = this.context;
    context.fillStyle = color || '#ffcc00';
    context.beginPath();
    context.arc(x, y, size || 3, 0, 2*PI);
    context.closePath();
    context.fill();
  },

  line: function(ax, ay, bx, by, color) {
    var context = this.context;
    context.strokeStyle = color || '#ffcc00';
    context.beginPath();
    context.moveTo(ax, ay);
    context.lineTo(bx, by);
    context.closePath();
    context.stroke();
  }
};


//****** file: Layers.js ******

var animTimer;

function fadeIn() {
  if (animTimer) {
    return;
  }

  animTimer = setInterval(function() {
    var dataItems = Data.items,
      isNeeded = false;

    for (var i = 0, il = dataItems.length; i < il; i++) {
      if (dataItems[i].scale < 1) {
        dataItems[i].scale += 0.5*0.2; // amount*easing
        if (dataItems[i].scale > 1) {
          dataItems[i].scale = 1;
        }
        isNeeded = true;
      }
    }

    Layers.render();

    if (!isNeeded) {
      clearInterval(animTimer);
      animTimer = null;
    }
  }, 33);
}

var Layers = {

  container: doc.createElement('DIV'),
  items: [],

  init: function() {
    this.container.style.pointerEvents = 'none';
    this.container.style.position = 'absolute';
    this.container.style.left = 0;
    this.container.style.top  = 0;

    // TODO: improve this to .setContext(context)
    Shadows.context    = this.createContext(this.container);
    Simplified.context = this.createContext(this.container);
    Buildings.context  = this.createContext(this.container);
    HitAreas.context   = this.createContext();
//    Debug.context      = this.createContext(this.container);
  },

  render: function(quick) {
    requestAnimFrame(function() {
      if (!quick) {
        Shadows.render();
        Simplified.render();
        HitAreas.render();
      }
      Buildings.render();
    });
  },

  createContext: function(container) {
    var canvas = doc.createElement('CANVAS');
    canvas.style.webkitTransform = 'translate3d(0,0,0)'; // turn on hw acceleration
    canvas.style.imageRendering  = 'optimizeSpeed';
    canvas.style.position = 'absolute';
    canvas.style.left = 0;
    canvas.style.top  = 0;

    var context = canvas.getContext('2d');
    context.lineCap   = 'round';
    context.lineJoin  = 'round';
    context.lineWidth = 1;

    context.imageSmoothingEnabled    = true;

    this.items.push(canvas);
    if (container) {
      container.appendChild(canvas);
    }

    return context;
  },

  appendTo: function(parentNode) {
    parentNode.appendChild(this.container);
  },

  remove: function() {
    this.container.parentNode.removeChild(this.container);
  },

  setSize: function(width, height) {
    for (var i = 0, il = this.items.length; i < il; i++) {
      this.items[i].width  = width;
      this.items[i].height = height;
    }
  },

  screenshot: function() {
    var
      canvas = doc.createElement('CANVAS'),
      context = canvas.getContext('2d'),
      i, il,
      item;

    canvas.width  = WIDTH;
    canvas.height = HEIGHT;

    // end fade in
    clearInterval(animTimer);
    animTimer = null;

    var dataItems = Data.items;
    for (i = 0, il = dataItems.length; i < il; i++) {
      dataItems[i].scale = 1;
    }

    this.render(true);

    for (i = 0, il = this.items.length; i < il; i++) {
      item = this.items[i];
      if (item.style.opacity !== '') {
        context.globalAlpha = parseFloat(item.style.opacity);
      }
      context.drawImage(item, 0, 0);
      context.globalAlpha = 1;
    }

    return canvas.toDataURL('image/png');
  },

  // usually called after move: container jumps by move delta, cam is reset
  setPosition: function(x, y) {
    this.container.style.left = x +'px';
    this.container.style.top  = y +'px';
  }
};

Layers.init();


//****** file: adapter.js ******


function setOrigin(origin) {
  ORIGIN_X = origin.x;
  ORIGIN_Y = origin.y;
}

function moveCam(offset) {
  CAM_X = CENTER_X + offset.x;
  CAM_Y = HEIGHT   + offset.y;
  Layers.render(true);
}

function setSize(size) {
  WIDTH  = size.width;
  HEIGHT = size.height;
  CENTER_X = WIDTH /2 <<0;
  CENTER_Y = HEIGHT/2 <<0;

  CAM_X = CENTER_X;
  CAM_Y = HEIGHT;

  Layers.setSize(WIDTH, HEIGHT);
  MAX_HEIGHT = CAM_Z-50;
}

function setZoom(z) {
  ZOOM = z;
  MAP_SIZE = MAP_TILE_SIZE <<ZOOM;

  var center = pixelToGeo(ORIGIN_X+CENTER_X, ORIGIN_Y+CENTER_Y);
  var a = geoToPixel(center.latitude, 0);
  var b = geoToPixel(center.latitude, 1);
  PIXEL_PER_DEG = b.x-a.x;

  ZOOM_FACTOR = pow(0.95, ZOOM-MIN_ZOOM);

  WALL_COLOR_STR = ''+ WALL_COLOR.alpha(ZOOM_FACTOR);
  ALT_COLOR_STR  = ''+ ALT_COLOR.alpha( ZOOM_FACTOR);
  ROOF_COLOR_STR = ''+ ROOF_COLOR.alpha(ZOOM_FACTOR);
}

function onResize(e) {
  setSize(e);
  Layers.render();
  Data.update();
}

function onMoveEnd(e) {
  Layers.render();
  Data.update(); // => fadeIn() => Layers.render()
}

function onZoomStart() {
  isZooming = true;
// effectively clears because of isZooming flag
// TODO: introduce explicit clear()
  Layers.render();
}

function onZoomEnd(e) {
  isZooming = false;
  setZoom(e.zoom);
  Data.update(); // => fadeIn()
  Layers.render();
}


//****** file: Leaflet.js ******


var osmb = function(map) {
  this.offset = { x:0, y:0 };
	map.addLayer(this);
};

var proto = osmb.prototype = L.Layer ? new L.Layer() : {};

proto.onAdd = function(map) {
  this.map = map;
  Layers.appendTo(map._panes.overlayPane);

  var
    off = this.getOffset(),
    po = map.getPixelOrigin();
  setSize({ width:map._size.x, height:map._size.y });
  setOrigin({ x:po.x-off.x, y:po.y-off.y });
  setZoom(map._zoom);

  Layers.setPosition(-off.x, -off.y);

  map.on({
    move:      this.onMove,
    moveend:   this.onMoveEnd,
    zoomstart: this.onZoomStart,
    zoomend:   this.onZoomEnd,
    resize:    this.onResize,
    viewreset: this.onViewReset,
    click:     this.onClick
  }, this);

  if (map.options.zoomAnimation) {
    map.on('zoomanim', this.onZoom, this);
  }

  if (map.attributionControl) {
    map.attributionControl.addAttribution(ATTRIBUTION);
  }

  Data.update();
};

proto.onRemove = function() {
  var map = this.map;
  if (map.attributionControl) {
    map.attributionControl.removeAttribution(ATTRIBUTION);
  }

  map.off({
    move:      this.onMove,
    moveend:   this.onMoveEnd,
    zoomstart: this.onZoomStart,
    zoomend:   this.onZoomEnd,
    resize:    this.onResize,
    viewreset: this.onViewReset,
    click:     this.onClick
  }, this);

  if (map.options.zoomAnimation) {
    map.off('zoomanim', this.onZoom, this);
  }
  Layers.remove();
  map = null;
};

proto.onMove = function(e) {
  var off = this.getOffset();
  moveCam({ x:this.offset.x-off.x, y:this.offset.y-off.y });
};

proto.onMoveEnd = function(e) {
  if (this.noMoveEnd) { // moveend is also fired after zoom
    this.noMoveEnd = false;
    return;
  }

  var
    map = this.map,
    off = this.getOffset(),
    po = map.getPixelOrigin();

  this.offset = off;
  Layers.setPosition(-off.x, -off.y);
  moveCam({ x:0, y:0 });

  setSize({ width:map._size.x, height:map._size.y }); // in case this is triggered by resize
  setOrigin({ x:po.x-off.x, y:po.y-off.y });
  onMoveEnd(e);
};

proto.onZoomStart = function(e) {
  onZoomStart(e);
};

proto.onZoom = function(e) {
//    var map = this.map,
//        scale = map.getZoomScale(e.zoom),
//        offset = map._getCenterOffset(e.center).divideBy(1 - 1/scale),
//        viewportPos = map.containerPointToLayerPoint(map.getSize().multiplyBy(-1)),
//        origin = viewportPos.add(offset).round();
//
//    this.container.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString((origin.multiplyBy(-1).add(this.getOffset().multiplyBy(-1)).multiplyBy(scale).add(origin))) + ' scale(' + scale + ') ';
//    isZooming = true;
};

proto.onZoomEnd = function(e) {
  var
    map = this.map,
    off = this.getOffset(),
    po = map.getPixelOrigin();

  setOrigin({ x:po.x-off.x, y:po.y-off.y });
  onZoomEnd({ zoom:map._zoom });
  this.noMoveEnd = true;
};

proto.onResize = function() {};

proto.onViewReset = function() {
  var off = this.getOffset();

  this.offset = off;
  Layers.setPosition(-off.x, -off.y);
  moveCam({ x:0, y:0 });
};

proto.onClick = function(e) {
  var id = HitAreas.getIdFromXY(e.containerPoint.x, e.containerPoint.y);
  if (id) {
    onClick({ feature:id, lat:e.latlng.lat, lon:e.latlng.lng });
  }
};

proto.getOffset = function() {
  return L.DomUtil.getPosition(this.map._mapPane);
};


//****** file: public.js ******


proto.style = function(style) {
  style = style || {};
  var color;
  if ((color = style.color || style.wallColor)) {
    WALL_COLOR = Color.parse(color);
    WALL_COLOR_STR = ''+ WALL_COLOR.alpha(ZOOM_FACTOR);

    ALT_COLOR = WALL_COLOR.lightness(0.8);
    ALT_COLOR_STR  = ''+ ALT_COLOR.alpha(ZOOM_FACTOR);

    ROOF_COLOR = WALL_COLOR.lightness(1.2);
    ROOF_COLOR_STR = ''+ ROOF_COLOR.alpha(ZOOM_FACTOR);
  }

  if (style.roofColor) {
    ROOF_COLOR = Color.parse(style.roofColor);
    ROOF_COLOR_STR = ''+ ROOF_COLOR.alpha(ZOOM_FACTOR);
  }

  if (style.shadows !== undefined) {
    Shadows.enabled = !!style.shadows;
  }

  Layers.render();

  return this;
};

proto.date = function(date) {
  Shadows.date = date;
  Shadows.render();
  return this;
};

proto.load = function(url) {
  Data.load(url);
  return this;
};

proto.set = function(data) {
  Data.set(data);
  return this;
};

proto.screenshot = function(forceDownload) {
  var dataURL = Layers.screenshot();
  if (forceDownload) {
    global.location.href = dataURL.replace('image/png', 'image/octet-stream');
  }
  return dataURL;
};

var onEach = function() {};

proto.each = function(handler) {
  onEach = function(payload) {
    return handler(payload);
  };
  return this;
};

var onClick = function() {};

proto.click = function(handler) {
  onClick = function(payload) {
    return handler(payload);
  };
  return this;
};

proto.getDetails = function(id, handler) {
  if (Data.provider) {
    Data.provider.getFeature(id, handler);
  }
  return this;
};

osmb.VERSION     = VERSION;
osmb.ATTRIBUTION = ATTRIBUTION;


//****** file: suffix.js ******


  global.OSMBuildings = osmb;

}(this));

