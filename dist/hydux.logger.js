!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.logger=n():(t.hydux=t.hydux||{},t.hydux.logger=n())}("undefined"!=typeof self?self:this,function(){return function(t){function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var e={};return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=18)}({0:function(t,n,e){"use strict";function r(t,n){function e(){this.constructor=t}g(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}function o(t,n){var e={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&n.indexOf(r)<0&&(e[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,r=Object.getOwnPropertySymbols(t);o<r.length;o++)n.indexOf(r[o])<0&&(e[r[o]]=t[r[o]]);return e}function i(t,n,e,r){var o,i=arguments.length,c=i<3?n:null===r?r=Object.getOwnPropertyDescriptor(n,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,n,e,r);else for(var u=t.length-1;u>=0;u--)(o=t[u])&&(c=(i<3?o(c):i>3?o(n,e,c):o(n,e))||c);return i>3&&c&&Object.defineProperty(n,e,c),c}function c(t,n){return function(e,r){n(e,r,t)}}function u(t,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,n)}function a(t,n,e,r){return new(e||(e=Promise))(function(o,i){function c(t){try{a(r.next(t))}catch(t){i(t)}}function u(t){try{a(r.throw(t))}catch(t){i(t)}}function a(t){t.done?o(t.value):new e(function(n){n(t.value)}).then(c,u)}a((r=r.apply(t,n||[])).next())})}function f(t,n){function e(t){return function(n){return r([t,n])}}function r(e){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,i&&(c=i[2&e[0]?"return":e[0]?"throw":"next"])&&!(c=c.call(i,e[1])).done)return c;switch(i=0,c&&(e=[0,c.value]),e[0]){case 0:case 1:c=e;break;case 4:return a.label++,{value:e[1],done:!1};case 5:a.label++,i=e[1],e=[0];continue;case 7:e=a.ops.pop(),a.trys.pop();continue;default:if(c=a.trys,!(c=c.length>0&&c[c.length-1])&&(6===e[0]||2===e[0])){a=0;continue}if(3===e[0]&&(!c||e[1]>c[0]&&e[1]<c[3])){a.label=e[1];break}if(6===e[0]&&a.label<c[1]){a.label=c[1],c=e;break}if(c&&a.label<c[2]){a.label=c[2],a.ops.push(e);break}c[2]&&a.ops.pop(),a.trys.pop();continue}e=n.call(t,a)}catch(t){e=[6,t],i=0}finally{o=c=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}var o,i,c,u,a={label:0,sent:function(){if(1&c[0])throw c[1];return c[1]},trys:[],ops:[]};return u={next:e(0),throw:e(1),return:e(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u}function l(t,n){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}function s(t){var n="function"==typeof Symbol&&t[Symbol.iterator],e=0;return n?n.call(t):{next:function(){return t&&e>=t.length&&(t=void 0),{value:t&&t[e++],done:!t}}}}function p(t,n){var e="function"==typeof Symbol&&t[Symbol.iterator];if(!e)return t;var r,o,i=e.call(t),c=[];try{for(;(void 0===n||n-- >0)&&!(r=i.next()).done;)c.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(e=i.return)&&e.call(i)}finally{if(o)throw o.error}}return c}function y(){for(var t=[],n=0;n<arguments.length;n++)t=t.concat(p(arguments[n]));return t}function d(t){return this instanceof d?(this.v=t,this):new d(t)}function h(t,n,e){function r(t){l[t]&&(f[t]=function(n){return new Promise(function(e,r){s.push([t,n,e,r])>1||o(t,n)})})}function o(t,n){try{i(l[t](n))}catch(t){a(s[0][3],t)}}function i(t){t.value instanceof d?Promise.resolve(t.value.v).then(c,u):a(s[0][2],t)}function c(t){o("next",t)}function u(t){o("throw",t)}function a(t,n){t(n),s.shift(),s.length&&o(s[0][0],s[0][1])}if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var f,l=e.apply(t,n||[]),s=[];return f={},r("next"),r("throw"),r("return"),f[Symbol.asyncIterator]=function(){return this},f}function v(t){function n(n,o){t[n]&&(e[n]=function(e){return(r=!r)?{value:d(t[n](e)),done:"return"===n}:o?o(e):e})}var e,r;return e={},n("next"),n("throw",function(t){throw t}),n("return"),e[Symbol.iterator]=function(){return this},e}function b(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=t[Symbol.asyncIterator];return n?n.call(t):"function"==typeof s?s(t):t[Symbol.iterator]()}function w(t,n){return Object.defineProperty?Object.defineProperty(t,"raw",{value:n}):t.raw=n,t}Object.defineProperty(n,"__esModule",{value:!0}),n.__extends=r,e.d(n,"__assign",function(){return m}),n.__rest=o,n.__decorate=i,n.__param=c,n.__metadata=u,n.__awaiter=a,n.__generator=f,n.__exportStar=l,n.__values=s,n.__read=p,n.__spread=y,n.__await=d,n.__asyncGenerator=h,n.__asyncDelegator=v,n.__asyncValues=b,n.__makeTemplateObject=w;/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var g=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])},m=Object.assign||function(t){for(var n,e=1,r=arguments.length;e<r;e++){n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}},1:function(t,n){var e;e=function(){return this}();try{e=e||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(e=window)}t.exports=e},18:function(t,n,e){"use strict";(function(t){function r(t,n,e,r){console.group("%c action","color: gray; font-weight: lighter;",n.name),console.log("%c prev state","color: #9E9E9E; font-weight: bold;",t),console.log.apply(console,["%c data","color: #03A9F4; font-weight: bold;"].concat(n.data,r)),console.log("%c next state","color: #4CAF50; font-weight: bold;",e),console.groupEnd()}function o(n){void 0===n&&(n={});var e=n.logger,o=void 0===e?r:e,u=n.windowInspectKey,a=void 0===u?"__HYDUX_STATE__":u,f=n.filter,l=void 0===f?function(t){return!0}:f,s=n.logActionTime,p=void 0===s||s,y=n.logRenderTime,d=void 0===y||y,h="undefined"!=typeof window?window:void 0!==t?t:{},v={},b=function(){return(h.performance||Date).now()};return function(t){return function(n){return t(i.__assign({},n,{init:function(){var t=n.init(),e=t;return t instanceof Array&&(e=t[0]),a&&(h[a]={prevAppState:void 0,nextAppState:e,action:"@@hydux/INIT",msgData:void 0}),t},onUpdateStart:function(t){v[t.action]=b()},onUpdate:function(t){n.onUpdate&&n.onUpdate(t);var e=t.action.split(".").slice(0,-1),r=c.get(e,t.prevAppState),i=c.get(e,t.nextAppState);l(t.action)&&o(r,{name:t.action,data:t.msgData},i,p?["time",b()-v[t.action]+"ms"]:[]),a&&(h[a]=t)},onRender:function(t){var e=b(),r=n.onRender&&n.onRender(t),o=b();return d&&console.log("%c render time","color: #fa541c; font-weight: bold;",o-e+"ms"),r}}))}}}Object.defineProperty(n,"__esModule",{value:!0});var i=e(0),c=e(2);n.default=o}).call(n,e(1))},2:function(t,n,e){"use strict";(function(t){function e(t,n){for(var e=Object.keys(n),r=e.length;r--;){var o=e[r];t[o]=n[o]}return t}function r(t,r){return e(e(n.isPojo(t)?{}:new t.constructor,t),r)}function o(t){return e(n.isPojo(t)?{}:new t.constructor,t)}function i(t,e,o){var c=n.isPojo(o)?{}:new o.constructor;return 0===t.length?e:(c[t[0]]=1<t.length?i(t.slice(1),e,o[t[0]]):e,r(o,c))}function c(t,n){for(var e=t.length,r=0;r<e;r++)n=n[t[r]];return n}function u(t){return"function"==typeof t}Object.defineProperty(n,"__esModule",{value:!0});var a=function(t){return void 0!==t&&null!==t};n.isPojo=function(t){return!a(t.constructor)||t.constructor===Object},n.isDev=void 0!==t&&!1,n.debug=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];n.isDev&&console.log.apply(console,["[hydux-"+t+"]"].concat(e))},n.set=e,n.merge=r,n.clone=o,n.setDeep=i,n.get=c,n.isFn=u,n.noop=function(t){return t}}).call(n,e(3))},3:function(t,n){function e(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(t){if(l===setTimeout)return setTimeout(t,0);if((l===e||!l)&&setTimeout)return l=setTimeout,setTimeout(t,0);try{return l(t,0)}catch(n){try{return l.call(null,t,0)}catch(n){return l.call(this,t,0)}}}function i(t){if(s===clearTimeout)return clearTimeout(t);if((s===r||!s)&&clearTimeout)return s=clearTimeout,clearTimeout(t);try{return s(t)}catch(n){try{return s.call(null,t)}catch(n){return s.call(this,t)}}}function c(){h&&y&&(h=!1,y.length?d=y.concat(d):v=-1,d.length&&u())}function u(){if(!h){var t=o(c);h=!0;for(var n=d.length;n;){for(y=d,d=[];++v<n;)y&&y[v].run();v=-1,n=d.length}y=null,h=!1,i(t)}}function a(t,n){this.fun=t,this.array=n}function f(){}var l,s,p=t.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:e}catch(t){l=e}try{s="function"==typeof clearTimeout?clearTimeout:r}catch(t){s=r}}();var y,d=[],h=!1,v=-1;p.nextTick=function(t){var n=new Array(arguments.length-1);if(arguments.length>1)for(var e=1;e<arguments.length;e++)n[e-1]=arguments[e];d.push(new a(t,n)),1!==d.length||h||o(u)},a.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=f,p.addListener=f,p.once=f,p.off=f,p.removeListener=f,p.removeAllListeners=f,p.emit=f,p.prependListener=f,p.prependOnceListener=f,p.listeners=function(t){return[]},p.binding=function(t){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(t){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}}})});
//# sourceMappingURL=hydux.logger.js.map