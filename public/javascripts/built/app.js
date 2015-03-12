/*! Hammer.JS - v1.0.7dev - 2014-02-18
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

!function(a,b){"use strict";function c(){d.READY||(d.event.determineEventTypes(),d.utils.each(d.gestures,function(a){d.detection.register(a)}),d.event.onTouch(d.DOCUMENT,d.EVENT_MOVE,d.detection.detect),d.event.onTouch(d.DOCUMENT,d.EVENT_END,d.detection.detect),d.READY=!0)}var d=function(a,b){return new d.Instance(a,b||{})};d.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},d.HAS_POINTEREVENTS=a.navigator.pointerEnabled||a.navigator.msPointerEnabled,d.HAS_TOUCHEVENTS="ontouchstart"in a,d.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android|silk/i,d.NO_MOUSEEVENTS=d.HAS_TOUCHEVENTS&&a.navigator.userAgent.match(d.MOBILE_REGEX),d.EVENT_TYPES={},d.DIRECTION_DOWN="down",d.DIRECTION_LEFT="left",d.DIRECTION_UP="up",d.DIRECTION_RIGHT="right",d.POINTER_MOUSE="mouse",d.POINTER_TOUCH="touch",d.POINTER_PEN="pen",d.UPDATE_VELOCITY_INTERVAL=20,d.EVENT_START="start",d.EVENT_MOVE="move",d.EVENT_END="end",d.DOCUMENT=a.document,d.plugins=d.plugins||{},d.gestures=d.gestures||{},d.READY=!1,d.utils={extend:function(a,c,d){for(var e in c)a[e]!==b&&d||(a[e]=c[e]);return a},each:function(a,c,d){var e,f;if("forEach"in a)a.forEach(c,d);else if(a.length!==b){for(e=0,f=a.length;f>e;e++)if(c.call(d,a[e],e,a)===!1)return}else for(e in a)if(a.hasOwnProperty(e)&&c.call(d,a[e],e,a)===!1)return},hasParent:function(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1},getCenter:function(a){var b=[],c=[];return d.utils.each(a,function(a){b.push("undefined"!=typeof a.clientX?a.clientX:a.pageX),c.push("undefined"!=typeof a.clientY?a.clientY:a.pageY)}),{pageX:(Math.min.apply(Math,b)+Math.max.apply(Math,b))/2,pageY:(Math.min.apply(Math,c)+Math.max.apply(Math,c))/2}},getVelocity:function(a,b,c){return{x:Math.abs(b/a)||0,y:Math.abs(c/a)||0}},getAngle:function(a,b){var c=b.pageY-a.pageY,d=b.pageX-a.pageX;return 180*Math.atan2(c,d)/Math.PI},getDirection:function(a,b){var c=Math.abs(a.pageX-b.pageX),e=Math.abs(a.pageY-b.pageY);return c>=e?a.pageX-b.pageX>0?d.DIRECTION_LEFT:d.DIRECTION_RIGHT:a.pageY-b.pageY>0?d.DIRECTION_UP:d.DIRECTION_DOWN},getDistance:function(a,b){var c=b.pageX-a.pageX,d=b.pageY-a.pageY;return Math.sqrt(c*c+d*d)},getScale:function(a,b){return a.length>=2&&b.length>=2?this.getDistance(b[0],b[1])/this.getDistance(a[0],a[1]):1},getRotation:function(a,b){return a.length>=2&&b.length>=2?this.getAngle(b[1],b[0])-this.getAngle(a[1],a[0]):0},isVertical:function(a){return a==d.DIRECTION_UP||a==d.DIRECTION_DOWN},stopDefaultBrowserBehavior:function(a,b){b&&a&&a.style&&(d.utils.each(["webkit","khtml","moz","Moz","ms","o",""],function(c){d.utils.each(b,function(b,d){c&&(d=c+d.substring(0,1).toUpperCase()+d.substring(1)),d in a.style&&(a.style[d]=b)})}),"none"==b.userSelect&&(a.onselectstart=function(){return!1}),"none"==b.userDrag&&(a.ondragstart=function(){return!1}))},startDefaultBrowserBehavior:function(a,b){b&&a&&a.style&&(d.utils.each(["webkit","khtml","moz","Moz","ms","o",""],function(c){d.utils.each(b,function(b,d){c&&(d=c+d.substring(0,1).toUpperCase()+d.substring(1)),d in a.style&&(a.style[d]="")})}),"none"==b.userSelect&&(a.onselectstart=null),"none"==b.userDrag&&(a.ondragstart=null))}},d.Instance=function(a,b){var e=this;return c(),this.element=a,this.enabled=!0,this.options=d.utils.extend(d.utils.extend({},d.defaults),b||{}),this.options.stop_browser_behavior&&d.utils.stopDefaultBrowserBehavior(this.element,this.options.stop_browser_behavior),this._eventStartHandler=d.event.onTouch(a,d.EVENT_START,function(a){e.enabled&&d.detection.startDetect(e,a)}),this._eventHandler=[],this},d.Instance.prototype={on:function(a,b){var c=a.split(" ");return d.utils.each(c,function(a){this.element.addEventListener(a,b,!1),this._eventHandler.push({gesture:a,handler:b})},this),this},off:function(a,b){var c=a.split(" ");return d.utils.each(c,function(a){this.element.removeEventListener(a,b,!1);var c=-1;d.utils.each(this._eventHandler,function(d,e){-1===c&&d.gesture===a&&d.handler===b&&(c=e)},this),c>-1&&this._eventHandler.splice(c,1)},this),this},trigger:function(a,b){b||(b={});var c=d.DOCUMENT.createEvent("Event");c.initEvent(a,!0,!0),c.gesture=b;var e=this.element;return d.utils.hasParent(b.target,e)&&(e=b.target),e.dispatchEvent(c),this},enable:function(a){return this.enabled=a,this},dispose:function(){return this.options.stop_browser_behavior&&d.utils.startDefaultBrowserBehavior(this.element,this.options.stop_browser_behavior),d.utils.each(this._eventHandler,function(a){this.element.removeEventListener(a.gesture,a.handler,!1)},this),this._eventHandler.length=0,d.event.unbindDom(this.element,d.EVENT_TYPES[d.EVENT_START],this._eventStartHandler),this}};var e=null,f=!1,g=!1;d.event={bindDom:function(a,b,c){var e=b.split(" ");d.utils.each(e,function(b){a.addEventListener(b,c,!1)})},unbindDom:function(a,b,c){var e=b.split(" ");d.utils.each(e,function(b){a.removeEventListener(b,c,!1)})},onTouch:function(a,b,c){var h=this,i=function(i){var j=i.type.toLowerCase();if(!j.match(/mouse/)||!g){j.match(/touch/)||j.match(/pointerdown/)||j.match(/mouse/)&&1===i.which?f=!0:j.match(/mouse/)&&!i.which&&(f=!1),j.match(/touch|pointer/)&&(g=!0);var k=0;f&&(d.HAS_POINTEREVENTS&&b!=d.EVENT_END?k=d.PointerEvent.updatePointer(b,i):j.match(/touch/)?k=i.touches.length:g||(k=j.match(/up/)?0:1),k>0&&b==d.EVENT_END?b=d.EVENT_MOVE:k||(b=d.EVENT_END),(k||null===e)&&(e=i),c.call(d.detection,h.collectEventData(a,b,h.getTouchList(e,b),i)),d.HAS_POINTEREVENTS&&b==d.EVENT_END&&(k=d.PointerEvent.updatePointer(b,i))),k||(e=null,f=!1,g=!1,d.PointerEvent.reset())}};return this.bindDom(a,d.EVENT_TYPES[b],i),i},determineEventTypes:function(){var a;a=d.HAS_POINTEREVENTS?d.PointerEvent.getEvents():d.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],d.EVENT_TYPES[d.EVENT_START]=a[0],d.EVENT_TYPES[d.EVENT_MOVE]=a[1],d.EVENT_TYPES[d.EVENT_END]=a[2]},getTouchList:function(a){return d.HAS_POINTEREVENTS?d.PointerEvent.getTouchList():a.touches?a.touches:(a.identifier=1,[a])},collectEventData:function(a,b,c,e){var f=d.POINTER_TOUCH;return(e.type.match(/mouse/)||d.PointerEvent.matchType(d.POINTER_MOUSE,e))&&(f=d.POINTER_MOUSE),{center:d.utils.getCenter(c),timeStamp:(new Date).getTime(),target:e.target,touches:c,eventType:b,pointerType:f,srcEvent:e,preventDefault:function(){this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation(),this.srcEvent.preventDefault&&this.srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return d.detection.stopDetect()}}}},d.PointerEvent={pointers:{},getTouchList:function(){var a=this,b=[];return d.utils.each(a.pointers,function(a){b.push(a)}),b},updatePointer:function(a,b){return a==d.EVENT_END?delete this.pointers[b.pointerId]:(b.identifier=b.pointerId,this.pointers[b.pointerId]=b),Object.keys(this.pointers).length},matchType:function(a,b){if(!b.pointerType)return!1;var c=b.pointerType,e={};return e[d.POINTER_MOUSE]=c===b.MSPOINTER_TYPE_MOUSE||c===d.POINTER_MOUSE,e[d.POINTER_TOUCH]=c===b.MSPOINTER_TYPE_TOUCH||c===d.POINTER_TOUCH,e[d.POINTER_PEN]=c===b.MSPOINTER_TYPE_PEN||c===d.POINTER_PEN,e[a]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}},d.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(a,b){this.current||(this.stopped=!1,this.current={inst:a,startEvent:d.utils.extend({},b),lastEvent:!1,lastVEvent:!1,velocity:!1,name:""},this.detect(b))},detect:function(a){if(this.current&&!this.stopped){a=this.extendEventData(a);var b=this.current.inst.options;return d.utils.each(this.gestures,function(c){return this.stopped||b[c.name]===!1||c.handler.call(c,a,this.current.inst)!==!1?void 0:(this.stopDetect(),!1)},this),this.current&&(this.current.lastEvent=a),a.eventType==d.EVENT_END&&!a.touches.length-1&&this.stopDetect(),a}},stopDetect:function(){this.previous=d.utils.extend({},this.current),this.current=null,this.stopped=!0},extendEventData:function(a){var b=this.current.startEvent,c=this.current.lastVEvent;!b||a.touches.length==b.touches.length&&a.touches!==b.touches||(b.touches=[],d.utils.each(a.touches,function(a){b.touches.push(d.utils.extend({},a))}));var e,f,g=a.timeStamp-b.timeStamp,h=a.center.pageX-b.center.pageX,i=a.center.pageY-b.center.pageY,j=this.current.velocity;return c!==!1&&a.timeStamp-c.timeStamp>d.UPDATE_VELOCITY_INTERVAL?(j=d.utils.getVelocity(a.timeStamp-c.timeStamp,a.center.pageX-c.center.pageX,a.center.pageY-c.center.pageY),this.current.lastVEvent=a,j.x>0&&j.y>0&&(this.current.velocity=j)):this.current.velocity===!1&&(j=d.utils.getVelocity(g,h,i),this.current.velocity=j,this.current.lastVEvent=a),"end"===a.eventType?(e=this.current.lastEvent&&this.current.lastEvent.interimAngle,f=this.current.lastEvent&&this.current.lastEvent.interimDirection):(e=this.current.lastEvent&&d.utils.getAngle(this.current.lastEvent.center,a.center),f=this.current.lastEvent&&d.utils.getDirection(this.current.lastEvent.center,a.center)),d.utils.extend(a,{deltaTime:g,deltaX:h,deltaY:i,velocityX:j.x,velocityY:j.y,distance:d.utils.getDistance(b.center,a.center),angle:d.utils.getAngle(b.center,a.center),interimAngle:e,direction:d.utils.getDirection(b.center,a.center),interimDirection:f,scale:d.utils.getScale(b.touches,a.touches),rotation:d.utils.getRotation(b.touches,a.touches),startEvent:b}),a},register:function(a){var c=a.defaults||{};return c[a.name]===b&&(c[a.name]=!0),d.utils.extend(d.defaults,c,!0),a.index=a.index||1e3,this.gestures.push(a),this.gestures.sort(function(a,b){return a.index<b.index?-1:a.index>b.index?1:0}),this.gestures}},d.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,correct_for_drag_min_distance:!0,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1,drag_lock_min_distance:25},triggered:!1,handler:function(a,b){if(d.detection.current.name!=this.name&&this.triggered)return b.trigger(this.name+"end",a),this.triggered=!1,void 0;if(!(b.options.drag_max_touches>0&&a.touches.length>b.options.drag_max_touches))switch(a.eventType){case d.EVENT_START:this.triggered=!1;break;case d.EVENT_MOVE:if(a.distance<b.options.drag_min_distance&&d.detection.current.name!=this.name)return;if(d.detection.current.name!=this.name&&(d.detection.current.name=this.name,b.options.correct_for_drag_min_distance&&a.distance>0)){var c=Math.abs(b.options.drag_min_distance/a.distance);d.detection.current.startEvent.center.pageX+=a.deltaX*c,d.detection.current.startEvent.center.pageY+=a.deltaY*c,a=d.detection.extendEventData(a)}(d.detection.current.lastEvent.drag_locked_to_axis||b.options.drag_lock_to_axis&&b.options.drag_lock_min_distance<=a.distance)&&(a.drag_locked_to_axis=!0);var e=d.detection.current.lastEvent.direction;a.drag_locked_to_axis&&e!==a.direction&&(a.direction=d.utils.isVertical(e)?a.deltaY<0?d.DIRECTION_UP:d.DIRECTION_DOWN:a.deltaX<0?d.DIRECTION_LEFT:d.DIRECTION_RIGHT),this.triggered||(b.trigger(this.name+"start",a),this.triggered=!0),b.trigger(this.name,a),b.trigger(this.name+a.direction,a),(b.options.drag_block_vertical&&d.utils.isVertical(a.direction)||b.options.drag_block_horizontal&&!d.utils.isVertical(a.direction))&&a.preventDefault();break;case d.EVENT_END:this.triggered&&b.trigger(this.name+"end",a),this.triggered=!1}}},d.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(a,b){switch(a.eventType){case d.EVENT_START:clearTimeout(this.timer),d.detection.current.name=this.name,this.timer=setTimeout(function(){"hold"==d.detection.current.name&&b.trigger("hold",a)},b.options.hold_timeout);break;case d.EVENT_MOVE:a.distance>b.options.hold_threshold&&clearTimeout(this.timer);break;case d.EVENT_END:clearTimeout(this.timer)}}},d.gestures.Release={name:"release",index:1/0,handler:function(a,b){a.eventType==d.EVENT_END&&b.trigger(this.name,a)}},d.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_min_touches:1,swipe_max_touches:1,swipe_velocity:.7},handler:function(a,b){if(a.eventType==d.EVENT_END){if(b.options.swipe_max_touches>0&&a.touches.length<b.options.swipe_min_touches&&a.touches.length>b.options.swipe_max_touches)return;(a.velocityX>b.options.swipe_velocity||a.velocityY>b.options.swipe_velocity)&&(b.trigger(this.name,a),b.trigger(this.name+a.direction,a))}}},d.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300},handler:function(a,b){if(a.eventType!=d.EVENT_MOVE||d.detection.current.reachedTapMaxDistance){if(a.eventType==d.EVENT_END&&"touchcancel"!=a.srcEvent.type){var c=d.detection.previous,e=!1;if(d.detection.current.reachedTapMaxDistance||a.deltaTime>b.options.tap_max_touchtime)return;c&&"tap"==c.name&&a.timeStamp-c.lastEvent.timeStamp<b.options.doubletap_interval&&a.distance<b.options.doubletap_distance&&(b.trigger("doubletap",a),e=!0),(!e||b.options.tap_always)&&(d.detection.current.name="tap",b.trigger(d.detection.current.name,a))}}else d.detection.current.reachedTapMaxDistance=a.distance>b.options.tap_max_distance}},d.gestures.Touch={name:"touch",index:-1/0,defaults:{prevent_default:!1,prevent_mouseevents:!1},handler:function(a,b){return b.options.prevent_mouseevents&&a.pointerType==d.POINTER_MOUSE?(a.stopDetect(),void 0):(b.options.prevent_default&&a.preventDefault(),a.eventType==d.EVENT_START&&b.trigger(this.name,a),void 0)}},d.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1},triggered:!1,handler:function(a,b){if(d.detection.current.name!=this.name&&this.triggered)return b.trigger(this.name+"end",a),this.triggered=!1,void 0;if(!(a.touches.length<2))switch(b.options.transform_always_block&&a.preventDefault(),a.eventType){case d.EVENT_START:this.triggered=!1;break;case d.EVENT_MOVE:var c=Math.abs(1-a.scale),e=Math.abs(a.rotation);if(c<b.options.transform_min_scale&&e<b.options.transform_min_rotation)return;d.detection.current.name=this.name,this.triggered||(b.trigger(this.name+"start",a),this.triggered=!0),b.trigger(this.name,a),e>b.options.transform_min_rotation&&b.trigger("rotate",a),c>b.options.transform_min_scale&&(b.trigger("pinch",a),b.trigger("pinch"+(a.scale<1?"in":"out"),a));break;case d.EVENT_END:this.triggered&&b.trigger(this.name+"end",a),this.triggered=!1}}},"function"==typeof define&&define.amd?define(function(){return d}):"object"==typeof module&&module.exports?module.exports=d:a.Hammer=d}(window);
/*!

 handlebars v1.3.0

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
var Handlebars=function(){var a=function(){"use strict";function b(a){this.string=a}var a;return b.prototype.toString=function(){return""+this.string},a=b}(),b=function(a){"use strict";function g(a){return d[a]||"&amp;"}function h(a,b){for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c])}function l(a){return a instanceof c?a.toString():a||0===a?(a=""+a,f.test(a)?a.replace(e,g):a):""}function m(a){return a||0===a?k(a)&&0===a.length?!0:!1:!0}var b={},c=a,d={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},e=/[&<>"'`]/g,f=/[&<>"'`]/;b.extend=h;var i=Object.prototype.toString;b.toString=i;var j=function(a){return"function"==typeof a};j(/x/)&&(j=function(a){return"function"==typeof a&&"[object Function]"===i.call(a)});var j;b.isFunction=j;var k=Array.isArray||function(a){return a&&"object"==typeof a?"[object Array]"===i.call(a):!1};return b.isArray=k,b.escapeExpression=l,b.isEmpty=m,b}(a),c=function(){"use strict";function c(a,c){var d;c&&c.firstLine&&(d=c.firstLine,a+=" - "+d+":"+c.firstColumn);for(var e=Error.prototype.constructor.call(this,a),f=0;f<b.length;f++)this[b[f]]=e[b[f]];d&&(this.lineNumber=d,this.column=c.firstColumn)}var a,b=["description","fileName","lineNumber","message","name","number","stack"];return c.prototype=new Error,a=c}(),d=function(a,b){"use strict";function m(a,b){this.helpers=a||{},this.partials=b||{},n(this)}function n(a){a.registerHelper("helperMissing",function(a){if(2===arguments.length)return void 0;throw new e("Missing helper: '"+a+"'")}),a.registerHelper("blockHelperMissing",function(b,c){var d=c.inverse||function(){},e=c.fn;return j(b)&&(b=b.call(this)),b===!0?e(this):b===!1||null==b?d(this):i(b)?b.length>0?a.helpers.each(b,c):d(this):e(b)}),a.registerHelper("each",function(a,b){var g,c=b.fn,d=b.inverse,e=0,f="";if(j(a)&&(a=a.call(this)),b.data&&(g=q(b.data)),a&&"object"==typeof a)if(i(a))for(var h=a.length;h>e;e++)g&&(g.index=e,g.first=0===e,g.last=e===a.length-1),f+=c(a[e],{data:g});else for(var k in a)a.hasOwnProperty(k)&&(g&&(g.key=k,g.index=e,g.first=0===e),f+=c(a[k],{data:g}),e++);return 0===e&&(f=d(this)),f}),a.registerHelper("if",function(a,b){return j(a)&&(a=a.call(this)),!b.hash.includeZero&&!a||d.isEmpty(a)?b.inverse(this):b.fn(this)}),a.registerHelper("unless",function(b,c){return a.helpers["if"].call(this,b,{fn:c.inverse,inverse:c.fn,hash:c.hash})}),a.registerHelper("with",function(a,b){return j(a)&&(a=a.call(this)),d.isEmpty(a)?void 0:b.fn(a)}),a.registerHelper("log",function(b,c){var d=c.data&&null!=c.data.level?parseInt(c.data.level,10):1;a.log(d,b)})}function p(a,b){o.log(a,b)}var c={},d=a,e=b,f="1.3.0";c.VERSION=f;var g=4;c.COMPILER_REVISION=g;var h={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:">= 1.0.0"};c.REVISION_CHANGES=h;var i=d.isArray,j=d.isFunction,k=d.toString,l="[object Object]";c.HandlebarsEnvironment=m,m.prototype={constructor:m,logger:o,log:p,registerHelper:function(a,b,c){if(k.call(a)===l){if(c||b)throw new e("Arg not supported with multiple helpers");d.extend(this.helpers,a)}else c&&(b.not=c),this.helpers[a]=b},registerPartial:function(a,b){k.call(a)===l?d.extend(this.partials,a):this.partials[a]=b}};var o={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(a,b){if(o.level<=a){var c=o.methodMap[a];"undefined"!=typeof console&&console[c]&&console[c].call(console,b)}}};c.logger=o,c.log=p;var q=function(a){var b={};return d.extend(b,a),b};return c.createFrame=q,c}(b,c),e=function(a,b,c){"use strict";function i(a){var b=a&&a[0]||1,c=g;if(b!==c){if(c>b){var d=h[c],e=h[b];throw new f("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+d+") or downgrade your runtime to an older version ("+e+").")}throw new f("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+a[1]+").")}}function j(a,b){if(!b)throw new f("No environment passed to template");var c=function(a,c,d,e,g,h){var i=b.VM.invokePartial.apply(this,arguments);if(null!=i)return i;if(b.compile){var j={helpers:e,partials:g,data:h};return g[c]=b.compile(a,{data:void 0!==h},b),g[c](d,j)}throw new f("The partial "+c+" could not be compiled when running in runtime-only mode")},d={escapeExpression:e.escapeExpression,invokePartial:c,programs:[],program:function(a,b,c){var d=this.programs[a];return c?d=l(a,b,c):d||(d=this.programs[a]=l(a,b)),d},merge:function(a,b){var c=a||b;return a&&b&&a!==b&&(c={},e.extend(c,b),e.extend(c,a)),c},programWithDepth:b.VM.programWithDepth,noop:b.VM.noop,compilerInfo:null};return function(c,e){e=e||{};var g,h,f=e.partial?e:b;e.partial||(g=e.helpers,h=e.partials);var i=a.call(d,f,c,g,h,e.data);return e.partial||b.VM.checkRevision(d.compilerInfo),i}}function k(a,b,c){var d=Array.prototype.slice.call(arguments,3),e=function(a,e){return e=e||{},b.apply(this,[a,e.data||c].concat(d))};return e.program=a,e.depth=d.length,e}function l(a,b,c){var d=function(a,d){return d=d||{},b(a,d.data||c)};return d.program=a,d.depth=0,d}function m(a,b,c,d,e,g){var h={partial:!0,helpers:d,partials:e,data:g};if(void 0===a)throw new f("The partial "+b+" could not be found");return a instanceof Function?a(c,h):void 0}function n(){return""}var d={},e=a,f=b,g=c.COMPILER_REVISION,h=c.REVISION_CHANGES;return d.checkRevision=i,d.template=j,d.programWithDepth=k,d.program=l,d.invokePartial=m,d.noop=n,d}(b,c,d),f=function(a,b,c,d,e){"use strict";var f,g=a,h=b,i=c,j=d,k=e,l=function(){var a=new g.HandlebarsEnvironment;return j.extend(a,g),a.SafeString=h,a.Exception=i,a.Utils=j,a.VM=k,a.template=function(b){return k.template(b,a)},a},m=l();return m.create=l,f=m}(d,a,c,b,e);return f}();

/*!
    localForage -- Offline Storage, Improved
    Version 0.8.0
    http://mozilla.github.io/localForage
    (c) 2013-2014 Mozilla, Apache License 2.0
*/
(function() {
var define, requireModule, require, requirejs;

(function() {
  var registry = {}, seen = {};

  define = function(name, deps, callback) {
    registry[name] = { deps: deps, callback: callback };
  };

  requirejs = require = requireModule = function(name) {
  requirejs._eak_seen = registry;

    if (seen[name]) { return seen[name]; }
    seen[name] = {};

    if (!registry[name]) {
      throw new Error("Could not find module " + name);
    }

    var mod = registry[name],
        deps = mod.deps,
        callback = mod.callback,
        reified = [],
        exports;

    for (var i=0, l=deps.length; i<l; i++) {
      if (deps[i] === 'exports') {
        reified.push(exports = {});
      } else {
        reified.push(requireModule(resolve(deps[i])));
      }
    }

    var value = callback.apply(this, reified);
    return seen[name] = exports || value;

    function resolve(child) {
      if (child.charAt(0) !== '.') { return child; }
      var parts = child.split("/");
      var parentBase = name.split("/").slice(0, -1);

      for (var i=0, l=parts.length; i<l; i++) {
        var part = parts[i];

        if (part === '..') { parentBase.pop(); }
        else if (part === '.') { continue; }
        else { parentBase.push(part); }
      }

      return parentBase.join("/");
    }
  };
})();

define("promise/all", 
  ["./utils","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    /* global toString */

    var isArray = __dependency1__.isArray;
    var isFunction = __dependency1__.isFunction;

    /**
      Returns a promise that is fulfilled when all the given promises have been
      fulfilled, or rejected if any of them become rejected. The return promise
      is fulfilled with an array that gives all the values in the order they were
      passed in the `promises` array argument.

      Example:

      ```javascript
      var promise1 = RSVP.resolve(1);
      var promise2 = RSVP.resolve(2);
      var promise3 = RSVP.resolve(3);
      var promises = [ promise1, promise2, promise3 ];

      RSVP.all(promises).then(function(array){
        // The array here would be [ 1, 2, 3 ];
      });
      ```

      If any of the `promises` given to `RSVP.all` are rejected, the first promise
      that is rejected will be given as an argument to the returned promises's
      rejection handler. For example:

      Example:

      ```javascript
      var promise1 = RSVP.resolve(1);
      var promise2 = RSVP.reject(new Error("2"));
      var promise3 = RSVP.reject(new Error("3"));
      var promises = [ promise1, promise2, promise3 ];

      RSVP.all(promises).then(function(array){
        // Code here never runs because there are rejected promises!
      }, function(error) {
        // error.message === "2"
      });
      ```

      @method all
      @for RSVP
      @param {Array} promises
      @param {String} label
      @return {Promise} promise that is fulfilled when all `promises` have been
      fulfilled, or rejected if any of them become rejected.
    */
    function all(promises) {
      /*jshint validthis:true */
      var Promise = this;

      if (!isArray(promises)) {
        throw new TypeError('You must pass an array to all.');
      }

      return new Promise(function(resolve, reject) {
        var results = [], remaining = promises.length,
        promise;

        if (remaining === 0) {
          resolve([]);
        }

        function resolver(index) {
          return function(value) {
            resolveAll(index, value);
          };
        }

        function resolveAll(index, value) {
          results[index] = value;
          if (--remaining === 0) {
            resolve(results);
          }
        }

        for (var i = 0; i < promises.length; i++) {
          promise = promises[i];

          if (promise && isFunction(promise.then)) {
            promise.then(resolver(i), reject);
          } else {
            resolveAll(i, promise);
          }
        }
      });
    }

    __exports__.all = all;
  });
define("promise/asap", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var browserGlobal = (typeof window !== 'undefined') ? window : {};
    var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
    var local = (typeof global !== 'undefined') ? global : (this === undefined? window:this);

    // node
    function useNextTick() {
      return function() {
        process.nextTick(flush);
      };
    }

    function useMutationObserver() {
      var iterations = 0;
      var observer = new BrowserMutationObserver(flush);
      var node = document.createTextNode('');
      observer.observe(node, { characterData: true });

      return function() {
        node.data = (iterations = ++iterations % 2);
      };
    }

    function useSetTimeout() {
      return function() {
        local.setTimeout(flush, 1);
      };
    }

    var queue = [];
    function flush() {
      for (var i = 0; i < queue.length; i++) {
        var tuple = queue[i];
        var callback = tuple[0], arg = tuple[1];
        callback(arg);
      }
      queue = [];
    }

    var scheduleFlush;

    // Decide what async method to use to triggering processing of queued callbacks:
    if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
      scheduleFlush = useNextTick();
    } else if (BrowserMutationObserver) {
      scheduleFlush = useMutationObserver();
    } else {
      scheduleFlush = useSetTimeout();
    }

    function asap(callback, arg) {
      var length = queue.push([callback, arg]);
      if (length === 1) {
        // If length is 1, that means that we need to schedule an async flush.
        // If additional callbacks are queued before the queue is flushed, they
        // will be processed by this flush that we are scheduling.
        scheduleFlush();
      }
    }

    __exports__.asap = asap;
  });
define("promise/config", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var config = {
      instrument: false
    };

    function configure(name, value) {
      if (arguments.length === 2) {
        config[name] = value;
      } else {
        return config[name];
      }
    }

    __exports__.config = config;
    __exports__.configure = configure;
  });
define("promise/polyfill", 
  ["./promise","./utils","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    /*global self*/
    var RSVPPromise = __dependency1__.Promise;
    var isFunction = __dependency2__.isFunction;

    function polyfill() {
      var local;

      if (typeof global !== 'undefined') {
        local = global;
      } else if (typeof window !== 'undefined' && window.document) {
        local = window;
      } else {
        local = self;
      }

      var es6PromiseSupport = 
        "Promise" in local &&
        // Some of these methods are missing from
        // Firefox/Chrome experimental implementations
        "resolve" in local.Promise &&
        "reject" in local.Promise &&
        "all" in local.Promise &&
        "race" in local.Promise &&
        // Older version of the spec had a resolver object
        // as the arg rather than a function
        (function() {
          var resolve;
          new local.Promise(function(r) { resolve = r; });
          return isFunction(resolve);
        }());

      if (!es6PromiseSupport) {
        local.Promise = RSVPPromise;
      }
    }

    __exports__.polyfill = polyfill;
  });
define("promise/promise", 
  ["./config","./utils","./all","./race","./resolve","./reject","./asap","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __exports__) {
    "use strict";
    var config = __dependency1__.config;
    var configure = __dependency1__.configure;
    var objectOrFunction = __dependency2__.objectOrFunction;
    var isFunction = __dependency2__.isFunction;
    var now = __dependency2__.now;
    var all = __dependency3__.all;
    var race = __dependency4__.race;
    var staticResolve = __dependency5__.resolve;
    var staticReject = __dependency6__.reject;
    var asap = __dependency7__.asap;

    var counter = 0;

    config.async = asap; // default async is asap;

    function Promise(resolver) {
      if (!isFunction(resolver)) {
        throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
      }

      if (!(this instanceof Promise)) {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
      }

      this._subscribers = [];

      invokeResolver(resolver, this);
    }

    function invokeResolver(resolver, promise) {
      function resolvePromise(value) {
        resolve(promise, value);
      }

      function rejectPromise(reason) {
        reject(promise, reason);
      }

      try {
        resolver(resolvePromise, rejectPromise);
      } catch(e) {
        rejectPromise(e);
      }
    }

    function invokeCallback(settled, promise, callback, detail) {
      var hasCallback = isFunction(callback),
          value, error, succeeded, failed;

      if (hasCallback) {
        try {
          value = callback(detail);
          succeeded = true;
        } catch(e) {
          failed = true;
          error = e;
        }
      } else {
        value = detail;
        succeeded = true;
      }

      if (handleThenable(promise, value)) {
        return;
      } else if (hasCallback && succeeded) {
        resolve(promise, value);
      } else if (failed) {
        reject(promise, error);
      } else if (settled === FULFILLED) {
        resolve(promise, value);
      } else if (settled === REJECTED) {
        reject(promise, value);
      }
    }

    var PENDING   = void 0;
    var SEALED    = 0;
    var FULFILLED = 1;
    var REJECTED  = 2;

    function subscribe(parent, child, onFulfillment, onRejection) {
      var subscribers = parent._subscribers;
      var length = subscribers.length;

      subscribers[length] = child;
      subscribers[length + FULFILLED] = onFulfillment;
      subscribers[length + REJECTED]  = onRejection;
    }

    function publish(promise, settled) {
      var child, callback, subscribers = promise._subscribers, detail = promise._detail;

      for (var i = 0; i < subscribers.length; i += 3) {
        child = subscribers[i];
        callback = subscribers[i + settled];

        invokeCallback(settled, child, callback, detail);
      }

      promise._subscribers = null;
    }

    Promise.prototype = {
      constructor: Promise,

      _state: undefined,
      _detail: undefined,
      _subscribers: undefined,

      then: function(onFulfillment, onRejection) {
        var promise = this;

        var thenPromise = new this.constructor(function() {});

        if (this._state) {
          var callbacks = arguments;
          config.async(function invokePromiseCallback() {
            invokeCallback(promise._state, thenPromise, callbacks[promise._state - 1], promise._detail);
          });
        } else {
          subscribe(this, thenPromise, onFulfillment, onRejection);
        }

        return thenPromise;
      },

      'catch': function(onRejection) {
        return this.then(null, onRejection);
      }
    };

    Promise.all = all;
    Promise.race = race;
    Promise.resolve = staticResolve;
    Promise.reject = staticReject;

    function handleThenable(promise, value) {
      var then = null,
      resolved;

      try {
        if (promise === value) {
          throw new TypeError("A promises callback cannot return that same promise.");
        }

        if (objectOrFunction(value)) {
          then = value.then;

          if (isFunction(then)) {
            then.call(value, function(val) {
              if (resolved) { return true; }
              resolved = true;

              if (value !== val) {
                resolve(promise, val);
              } else {
                fulfill(promise, val);
              }
            }, function(val) {
              if (resolved) { return true; }
              resolved = true;

              reject(promise, val);
            });

            return true;
          }
        }
      } catch (error) {
        if (resolved) { return true; }
        reject(promise, error);
        return true;
      }

      return false;
    }

    function resolve(promise, value) {
      if (promise === value) {
        fulfill(promise, value);
      } else if (!handleThenable(promise, value)) {
        fulfill(promise, value);
      }
    }

    function fulfill(promise, value) {
      if (promise._state !== PENDING) { return; }
      promise._state = SEALED;
      promise._detail = value;

      config.async(publishFulfillment, promise);
    }

    function reject(promise, reason) {
      if (promise._state !== PENDING) { return; }
      promise._state = SEALED;
      promise._detail = reason;

      config.async(publishRejection, promise);
    }

    function publishFulfillment(promise) {
      publish(promise, promise._state = FULFILLED);
    }

    function publishRejection(promise) {
      publish(promise, promise._state = REJECTED);
    }

    __exports__.Promise = Promise;
  });
define("promise/race", 
  ["./utils","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    /* global toString */
    var isArray = __dependency1__.isArray;

    /**
      `RSVP.race` allows you to watch a series of promises and act as soon as the
      first promise given to the `promises` argument fulfills or rejects.

      Example:

      ```javascript
      var promise1 = new RSVP.Promise(function(resolve, reject){
        setTimeout(function(){
          resolve("promise 1");
        }, 200);
      });

      var promise2 = new RSVP.Promise(function(resolve, reject){
        setTimeout(function(){
          resolve("promise 2");
        }, 100);
      });

      RSVP.race([promise1, promise2]).then(function(result){
        // result === "promise 2" because it was resolved before promise1
        // was resolved.
      });
      ```

      `RSVP.race` is deterministic in that only the state of the first completed
      promise matters. For example, even if other promises given to the `promises`
      array argument are resolved, but the first completed promise has become
      rejected before the other promises became fulfilled, the returned promise
      will become rejected:

      ```javascript
      var promise1 = new RSVP.Promise(function(resolve, reject){
        setTimeout(function(){
          resolve("promise 1");
        }, 200);
      });

      var promise2 = new RSVP.Promise(function(resolve, reject){
        setTimeout(function(){
          reject(new Error("promise 2"));
        }, 100);
      });

      RSVP.race([promise1, promise2]).then(function(result){
        // Code here never runs because there are rejected promises!
      }, function(reason){
        // reason.message === "promise2" because promise 2 became rejected before
        // promise 1 became fulfilled
      });
      ```

      @method race
      @for RSVP
      @param {Array} promises array of promises to observe
      @param {String} label optional string for describing the promise returned.
      Useful for tooling.
      @return {Promise} a promise that becomes fulfilled with the value the first
      completed promises is resolved with if the first completed promise was
      fulfilled, or rejected with the reason that the first completed promise
      was rejected with.
    */
    function race(promises) {
      /*jshint validthis:true */
      var Promise = this;

      if (!isArray(promises)) {
        throw new TypeError('You must pass an array to race.');
      }
      return new Promise(function(resolve, reject) {
        var results = [], promise;

        for (var i = 0; i < promises.length; i++) {
          promise = promises[i];

          if (promise && typeof promise.then === 'function') {
            promise.then(resolve, reject);
          } else {
            resolve(promise);
          }
        }
      });
    }

    __exports__.race = race;
  });
define("promise/reject", 
  ["exports"],
  function(__exports__) {
    "use strict";
    /**
      `RSVP.reject` returns a promise that will become rejected with the passed
      `reason`. `RSVP.reject` is essentially shorthand for the following:

      ```javascript
      var promise = new RSVP.Promise(function(resolve, reject){
        reject(new Error('WHOOPS'));
      });

      promise.then(function(value){
        // Code here doesn't run because the promise is rejected!
      }, function(reason){
        // reason.message === 'WHOOPS'
      });
      ```

      Instead of writing the above, your code now simply becomes the following:

      ```javascript
      var promise = RSVP.reject(new Error('WHOOPS'));

      promise.then(function(value){
        // Code here doesn't run because the promise is rejected!
      }, function(reason){
        // reason.message === 'WHOOPS'
      });
      ```

      @method reject
      @for RSVP
      @param {Any} reason value that the returned promise will be rejected with.
      @param {String} label optional string for identifying the returned promise.
      Useful for tooling.
      @return {Promise} a promise that will become rejected with the given
      `reason`.
    */
    function reject(reason) {
      /*jshint validthis:true */
      var Promise = this;

      return new Promise(function (resolve, reject) {
        reject(reason);
      });
    }

    __exports__.reject = reject;
  });
define("promise/resolve", 
  ["exports"],
  function(__exports__) {
    "use strict";
    function resolve(value) {
      /*jshint validthis:true */
      if (value && typeof value === 'object' && value.constructor === this) {
        return value;
      }

      var Promise = this;

      return new Promise(function(resolve) {
        resolve(value);
      });
    }

    __exports__.resolve = resolve;
  });
define("promise/utils", 
  ["exports"],
  function(__exports__) {
    "use strict";
    function objectOrFunction(x) {
      return isFunction(x) || (typeof x === "object" && x !== null);
    }

    function isFunction(x) {
      return typeof x === "function";
    }

    function isArray(x) {
      return Object.prototype.toString.call(x) === "[object Array]";
    }

    // Date.now is not available in browsers < IE9
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now#Compatibility
    var now = Date.now || function() { return new Date().getTime(); };


    __exports__.objectOrFunction = objectOrFunction;
    __exports__.isFunction = isFunction;
    __exports__.isArray = isArray;
    __exports__.now = now;
  });
requireModule('promise/polyfill').polyfill();
}());// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).
(function() {
    'use strict';

    // Originally found in https://github.com/mozilla-b2g/gaia/blob/e8f624e4cc9ea945727278039b3bc9bcb9f8667a/shared/js/async_storage.js

    // Promises!
    var Promise = (typeof module !== 'undefined' && module.exports) ?
                  require('promise') : this.Promise;

    var db = null;
    var dbInfo = {};

    // Initialize IndexedDB; fall back to vendor-prefixed versions if needed.
    var indexedDB = indexedDB || this.indexedDB || this.webkitIndexedDB ||
                    this.mozIndexedDB || this.OIndexedDB ||
                    this.msIndexedDB;

    // If IndexedDB isn't available, we get outta here!
    if (!indexedDB) {
        return;
    }

    // Open the IndexedDB database (automatically creates one if one didn't
    // previously exist), using any options set in the config.
    function _initStorage(options) {
        if (options) {
            for (var i in options) {
                dbInfo[i] = options[i];
            }
        }

        return new Promise(function(resolve, reject) {
            var openreq = indexedDB.open(dbInfo.name, dbInfo.version);
            openreq.onerror = function withStoreOnError() {
                reject(openreq.error.name);
            };
            openreq.onupgradeneeded = function withStoreOnUpgradeNeeded() {
                // First time setup: create an empty object store
                openreq.result.createObjectStore(dbInfo.storeName);
            };
            openreq.onsuccess = function withStoreOnSuccess() {
                db = openreq.result;
                resolve();
            };
        });
    }

    function getItem(key, callback) {
        var _this = this;
        return new Promise(function(resolve, reject) {
            _this.ready().then(function() {
                var store = db.transaction(dbInfo.storeName, 'readonly')
                              .objectStore(dbInfo.storeName);
                var req = store.get(key);

                req.onsuccess = function() {
                    var value = req.result;
                    if (value === undefined) {
                        value = null;
                    }

                    if (callback) {
                        callback(value);
                    }

                    resolve(value);
                };

                req.onerror = function() {
                    if (callback) {
                        callback(null, req.error.name);
                    }

                    reject(req.error.name);
                };
            });
        });
    }

    function setItem(key, value, callback) {
        var _this = this;
        return new Promise(function(resolve, reject) {
            _this.ready().then(function() {
                var store = db.transaction(dbInfo.storeName, 'readwrite')
                              .objectStore(dbInfo.storeName);

                // Cast to undefined so the value passed to callback/promise is
                // the same as what one would get out of `getItem()` later.
                // This leads to some weirdness (setItem('foo', undefined) will
                // return "null"), but it's not my fault localStorage is our
                // baseline and that it's weird.
                if (value === undefined) {
                    value = null;
                }

                var req = store.put(value, key);
                req.onsuccess = function() {
                    if (callback) {
                        callback(value);
                    }

                    resolve(value);
                };
                req.onerror = function() {
                    if (callback) {
                        callback(null, req.error.name);
                    }

                    reject(req.error.name);
                };
            });
        });
    }

    function removeItem(key, callback) {
        var _this = this;
        return new Promise(function(resolve, reject) {
            _this.ready().then(function() {
                var store = db.transaction(dbInfo.storeName, 'readwrite')
                              .objectStore(dbInfo.storeName);

                // We use `['delete']` instead of `.delete` because IE 8 will
                // throw a fit if it sees the reserved word "delete" in this
                // scenario. See: https://github.com/mozilla/localForage/pull/67
                //
                // This can be removed once we no longer care about IE 8, for
                // what that's worth.
                // TODO: Write a test against this? Maybe IE in general? Also,
                // make sure the minify step doesn't optimise this to `.delete`,
                // though it currently doesn't.
                var req = store['delete'](key);
                req.onsuccess = function() {
                    if (callback) {
                        callback();
                    }

                    resolve();
                };

                req.onerror = function() {
                    if (callback) {
                        callback(req.error.name);
                    }

                    reject(req.error.name);
                };

                // The request will be aborted if we've exceeded our storage
                // space. In this case, we will reject with a specific
                // "QuotaExceededError".
                req.onabort = function(event) {
                    var error = event.target.error;
                    if (error.name === 'QuotaExceededError') {
                        if (callback) {
                            callback(error.name);
                        }

                        reject(error.name);
                    }
                };
            });
        });
    }

    function clear(callback) {
        var _this = this;
        return new Promise(function(resolve, reject) {
            _this.ready().then(function() {
                var store = db.transaction(dbInfo.storeName, 'readwrite')
                              .objectStore(dbInfo.storeName);
                var req = store.clear();

                req.onsuccess = function() {
                    if (callback) {
                        callback();
                    }

                    resolve();
                };

                req.onerror = function() {
                    if (callback) {
                        callback(null, req.error.name);
                    }

                    reject(req.error.name);
                };
            });
        });
    }

    function length(callback) {
        var _this = this;
        return new Promise(function(resolve, reject) {
            _this.ready().then(function() {
                var store = db.transaction(dbInfo.storeName, 'readonly')
                              .objectStore(dbInfo.storeName);
                var req = store.count();

                req.onsuccess = function() {
                    if (callback) {
                        callback(req.result);
                    }

                    resolve(req.result);
                };

                req.onerror = function() {
                    if (callback) {
                        callback(null, req.error.name);
                    }

                    reject(req.error.name);
                };
            });
        });
    }

    function key(n, callback) {
        var _this = this;
        return new Promise(function(resolve, reject) {
            if (n < 0) {
                if (callback) {
                    callback(null);
                }

                resolve(null);

                return;
            }

            _this.ready().then(function() {
                var store = db.transaction(dbInfo.storeName, 'readonly')
                              .objectStore(dbInfo.storeName);

                var advanced = false;
                var req = store.openCursor();
                req.onsuccess = function() {
                    var cursor = req.result;
                    if (!cursor) {
                        // this means there weren't enough keys
                        if (callback) {
                            callback(null);
                        }

                        resolve(null);

                        return;
                    }

                    if (n === 0) {
                        // We have the first key, return it if that's what they
                        // wanted.
                        if (callback) {
                            callback(cursor.key);
                        }

                        resolve(cursor.key);
                    } else {
                        if (!advanced) {
                            // Otherwise, ask the cursor to skip ahead n
                            // records.
                            advanced = true;
                            cursor.advance(n);
                        } else {
                            // When we get here, we've got the nth key.
                            if (callback) {
                                callback(cursor.key);
                            }

                            resolve(cursor.key);
                        }
                    }
                };

                req.onerror = function() {
                    if (callback) {
                        callback(null, req.error.name);
                    }

                    reject(req.error.name);
                };
            });
        });
    }

    var asyncStorage = {
        _driver: 'asyncStorage',
        _initStorage: _initStorage,
        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem,
        clear: clear,
        length: length,
        key: key
    };

    if (typeof define === 'function' && define.amd) {
        define('asyncStorage', function() {
            return asyncStorage;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = asyncStorage;
    } else {
        this.asyncStorage = asyncStorage;
    }
}).call(this);
// If IndexedDB isn't available, we'll fall back to localStorage.
// Note that this will have considerable performance and storage
// side-effects (all data will be serialized on save and only data that
// can be converted to a string via `JSON.stringify()` will be saved).
(function() {
    'use strict';

    var keyPrefix = '';
    var dbInfo = {};
    // Promises!
    var Promise = (typeof module !== 'undefined' && module.exports) ?
                  require('promise') : this.Promise;
    var localStorage = null;

    // If the app is running inside a Google Chrome packaged webapp, or some
    // other context where localStorage isn't available, we don't use
    // localStorage. This feature detection is preferred over the old
    // `if (window.chrome && window.chrome.runtime)` code.
    // See: https://github.com/mozilla/localForage/issues/68
    try {
        // Initialize localStorage and create a variable to use throughout
        // the code.
        localStorage = this.localStorage;
    } catch (e) {
        return;
    }

    // Config the localStorage backend, using options set in the config.
    function _initStorage(options) {
        if (options) {
            for (var i in options) {
                dbInfo[i] = options[i];
            }
        }

        keyPrefix = dbInfo.name + '/';

        return Promise.resolve();
    }

    var SERIALIZED_MARKER = '__lfsc__:';
    var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

    // OMG the serializations!
    var TYPE_ARRAYBUFFER = 'arbf';
    var TYPE_BLOB = 'blob';
    var TYPE_INT8ARRAY = 'si08';
    var TYPE_UINT8ARRAY = 'ui08';
    var TYPE_UINT8CLAMPEDARRAY = 'uic8';
    var TYPE_INT16ARRAY = 'si16';
    var TYPE_INT32ARRAY = 'si32';
    var TYPE_UINT16ARRAY = 'ur16';
    var TYPE_UINT32ARRAY = 'ui32';
    var TYPE_FLOAT32ARRAY = 'fl32';
    var TYPE_FLOAT64ARRAY = 'fl64';
    var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

    // Remove all keys from the datastore, effectively destroying all data in
    // the app's key/value store!
    function clear(callback) {
        var _this = this;
        return new Promise(function(resolve) {
            _this.ready().then(function() {
                localStorage.clear();

                if (callback) {
                    callback();
                }

                resolve();
            });
        });
    }

    // Retrieve an item from the store. Unlike the original async_storage
    // library in Gaia, we don't modify return values at all. If a key's value
    // is `undefined`, we pass that value to the callback function.
    function getItem(key, callback) {
        var _this = this;
        return new Promise(function(resolve, reject) {
            _this.ready().then(function() {
                try {
                    var result = localStorage.getItem(keyPrefix + key);

                    // If a result was found, parse it from the serialized
                    // string into a JS object. If result isn't truthy, the key
                    // is likely undefined and we'll pass it straight to the
                    // callback.
                    if (result) {
                        result = _deserialize(result);
                    }

                    if (callback) {
                        callback(result, null);
                    }

                    resolve(result);
                } catch (e) {
                    if (callback) {
                        callback(null, e);
                    }

                    reject(e);
                }
            });
        });
    }

    // Same as localStorage's key() method, except takes a callback.
    function key(n, callback) {
        var _this = this;
        return new Promise(function(resolve) {
            _this.ready().then(function() {
                var result = localStorage.key(n);

                // Remove the prefix from the key, if a key is found.
                if (result) {
                    result = result.substring(keyPrefix.length);
                }

                if (callback) {
                    callback(result);
                }
                resolve(result);
            });
        });
    }

    // Supply the number of keys in the datastore to the callback function.
    function length(callback) {
        var _this = this;
        return new Promise(function(resolve) {
            _this.ready().then(function() {
                var result = localStorage.length;

                if (callback) {
                    callback(result);
                }

                resolve(result);
            });
        });
    }

    // Remove an item from the store, nice and simple.
    function removeItem(key, callback) {
        var _this = this;
        return new Promise(function(resolve) {
            _this.ready().then(function() {
                localStorage.removeItem(keyPrefix + key);

                if (callback) {
                    callback();
                }

                resolve();
            });
        });
    }

    // Deserialize data we've inserted into a value column/field. We place
    // special markers into our strings to mark them as encoded; this isn't
    // as nice as a meta field, but it's the only sane thing we can do whilst
    // keeping localStorage support intact.
    //
    // Oftentimes this will just deserialize JSON content, but if we have a
    // special marker (SERIALIZED_MARKER, defined above), we will extract
    // some kind of arraybuffer/binary data/typed array out of the string.
    function _deserialize(value) {
        // If we haven't marked this string as being specially serialized (i.e.
        // something other than serialized JSON), we can just return it and be
        // done with it.
        if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
            return JSON.parse(value);
        }

        // The following code deals with deserializing some kind of Blob or
        // TypedArray. First we separate out the type of data we're dealing
        // with from the data itself.
        var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
        var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

        // Fill the string into a ArrayBuffer.
        var buffer = new ArrayBuffer(serializedString.length * 2); // 2 bytes for each char
        var bufferView = new Uint16Array(buffer);
        for (var i = serializedString.length - 1; i >= 0; i--) {
            bufferView[i] = serializedString.charCodeAt(i);
        }

        // Return the right type based on the code/type set during
        // serialization.
        switch (type) {
            case TYPE_ARRAYBUFFER:
                return buffer;
            case TYPE_BLOB:
                return new Blob([buffer]);
            case TYPE_INT8ARRAY:
                return new Int8Array(buffer);
            case TYPE_UINT8ARRAY:
                return new Uint8Array(buffer);
            case TYPE_UINT8CLAMPEDARRAY:
                return new Uint8ClampedArray(buffer);
            case TYPE_INT16ARRAY:
                return new Int16Array(buffer);
            case TYPE_UINT16ARRAY:
                return new Uint16Array(buffer);
            case TYPE_INT32ARRAY:
                return new Int32Array(buffer);
            case TYPE_UINT32ARRAY:
                return new Uint32Array(buffer);
            case TYPE_FLOAT32ARRAY:
                return new Float32Array(buffer);
            case TYPE_FLOAT64ARRAY:
                return new Float64Array(buffer);
            default:
                throw new Error('Unkown type: ' + type);
        }
    }

    // Converts a buffer to a string to store, serialized, in the backend
    // storage library.
    function _bufferToString(buffer) {
        var str = '';
        var uint16Array = new Uint16Array(buffer);

        try {
            str = String.fromCharCode.apply(null, uint16Array);
        } catch (e) {
            // This is a fallback implementation in case the first one does
            // not work. This is required to get the phantomjs passing...
            for (var i = 0; i < uint16Array.length; i++) {
                str += String.fromCharCode(uint16Array[i]);
            }
        }

        return str;
    }

    // Serialize a value, afterwards executing a callback (which usually
    // instructs the `setItem()` callback/promise to be executed). This is how
    // we store binary data with localStorage.
    function _serialize(value, callback) {
        var valueString = '';
        if (value) {
            valueString = value.toString();
        }

        // Cannot use `value instanceof ArrayBuffer` or such here, as these
        // checks fail when running the tests using casper.js...
        //
        // TODO: See why those tests fail and use a better solution.
        if (value && (value.toString() === '[object ArrayBuffer]' ||
                      value.buffer && value.buffer.toString() === '[object ArrayBuffer]')) {
            // Convert binary arrays to a string and prefix the string with
            // a special marker.
            var buffer;
            var marker = SERIALIZED_MARKER;

            if (value instanceof ArrayBuffer) {
                buffer = value;
                marker += TYPE_ARRAYBUFFER;
            } else {
                buffer = value.buffer;

                if (valueString === '[object Int8Array]') {
                    marker += TYPE_INT8ARRAY;
                } else if (valueString === '[object Uint8Array]') {
                    marker += TYPE_UINT8ARRAY;
                } else if (valueString === '[object Uint8ClampedArray]') {
                    marker += TYPE_UINT8CLAMPEDARRAY;
                } else if (valueString === '[object Int16Array]') {
                    marker += TYPE_INT16ARRAY;
                } else if (valueString === '[object Uint16Array]') {
                    marker += TYPE_UINT16ARRAY;
                } else if (valueString === '[object Int32Array]') {
                    marker += TYPE_INT32ARRAY;
                } else if (valueString === '[object Uint32Array]') {
                    marker += TYPE_UINT32ARRAY;
                } else if (valueString === '[object Float32Array]') {
                    marker += TYPE_FLOAT32ARRAY;
                } else if (valueString === '[object Float64Array]') {
                    marker += TYPE_FLOAT64ARRAY;
                } else {
                    callback(new Error("Failed to get type for BinaryArray"));
                }
            }

            callback(marker + _bufferToString(buffer));
        } else if (valueString === "[object Blob]") {
            // Conver the blob to a binaryArray and then to a string.
            var fileReader = new FileReader();

            fileReader.onload = function() {
                var str = _bufferToString(this.result);

                callback(SERIALIZED_MARKER + TYPE_BLOB + str);
            };

            fileReader.readAsArrayBuffer(value);
        } else {
            try {
                callback(JSON.stringify(value));
            } catch (e) {
                if (this.console && this.console.error) {
                    this.console.error("Couldn't convert value into a JSON string: ", value);
                }

                callback(null, e);
            }
        }
    }

    // Set a key's value and run an optional callback once the value is set.
    // Unlike Gaia's implementation, the callback function is passed the value,
    // in case you want to operate on that value only after you're sure it
    // saved, or something like that.
    function setItem(key, value, callback) {
        var _this = this;
        return new Promise(function(resolve, reject) {
            _this.ready().then(function() {
                // Convert undefined values to null.
                // https://github.com/mozilla/localForage/pull/42
                if (value === undefined) {
                    value = null;
                }

                // Save the original value to pass to the callback.
                var originalValue = value;

                _serialize(value, function(value, error) {
                    if (error) {
                        if (callback) {
                            callback(null, error);
                        }

                        reject(error);
                    } else {
                        try {
                            localStorage.setItem(keyPrefix + key, value);
                        } catch (e) {
                            // localStorage capacity exceeded.
                            // TODO: Make this a specific error/event.
                            if (e.name === 'QuotaExceededError' ||
                                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                                if (callback) {
                                    callback(null, e);
                                }

                                reject(e);
                            }
                        }

                        if (callback) {
                            callback(originalValue);
                        }

                        resolve(originalValue);
                    }
                });
            });
        });
    }

    var localStorageWrapper = {
        _driver: 'localStorageWrapper',
        _initStorage: _initStorage,
        // Default API, from Gaia/localStorage.
        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem,
        clear: clear,
        length: length,
        key: key
    };

    if (typeof define === 'function' && define.amd) {
        define('localStorageWrapper', function() {
            return localStorageWrapper;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = localStorageWrapper;
    } else {
        this.localStorageWrapper = localStorageWrapper;
    }
}).call(this);
/*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function() {
    'use strict';

    // Sadly, the best way to save binary data in WebSQL is Base64 serializing
    // it, so this is how we store it to prevent very strange errors with less
    // verbose ways of binary <-> string data storage.
    var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    // Promises!
    var Promise = (typeof module !== 'undefined' && module.exports) ?
                  require('promise') : this.Promise;

    var openDatabase = this.openDatabase;
    var db = null;
    var dbInfo = {};

    var SERIALIZED_MARKER = '__lfsc__:';
    var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

    // OMG the serializations!
    var TYPE_ARRAYBUFFER = 'arbf';
    var TYPE_BLOB = 'blob';
    var TYPE_INT8ARRAY = 'si08';
    var TYPE_UINT8ARRAY = 'ui08';
    var TYPE_UINT8CLAMPEDARRAY = 'uic8';
    var TYPE_INT16ARRAY = 'si16';
    var TYPE_INT32ARRAY = 'si32';
    var TYPE_UINT16ARRAY = 'ur16';
    var TYPE_UINT32ARRAY = 'ui32';
    var TYPE_FLOAT32ARRAY = 'fl32';
    var TYPE_FLOAT64ARRAY = 'fl64';
    var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

    // If WebSQL methods aren't available, we can stop now.
    if (!openDatabase) {
        return;
    }

    // Open the WebSQL database (automatically creates one if one didn't
    // previously exist), using any options set in the config.
    function _initStorage(options) {
        var _this = this;

        if (options) {
            for (var i in dbInfo) {
                dbInfo[i] = typeof(options[i]) !== 'string' ? options[i].toString() : options[i];
            }
        }

        return new Promise(function(resolve) {
            // Open the database; the openDatabase API will automatically
            // create it for us if it doesn't exist.
            try {
                db = openDatabase(dbInfo.name, dbInfo.version,
                                  dbInfo.description, dbInfo.size);
            } catch (e) {
                return _this.setDriver('localStorageWrapper').then(resolve);
            }

            // Create our key/value table if it doesn't exist.
            db.transaction(function (t) {
                t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + 
                             ' (id INTEGER PRIMARY KEY, key unique, value)', [], function() {
                    resolve();
                }, null);
            });
        });
    }

    function getItem(key, callback) {
        var _this = this;
        return new Promise(function(resolve, reject) {
            _this.ready().then(function() {
                db.transaction(function (t) {
                    t.executeSql('SELECT * FROM ' + dbInfo.storeName + 
                                 ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                        var result = results.rows.length ? results.rows.item(0).value : null;

                        // Check to see if this is serialized content we need to
                        // unpack.
                        if (result) {
                            result = _deserialize(result);
                        }

                        if (callback) {
                            callback(result);
                        }

                        resolve(result);
                    }, function(t, error) {
                        if (callback) {
                            callback(null, error);
                        }

                        reject(error);
                    });
                });
            });
        });
    }

    function setItem(key, value, callback) {
        var _this = this;
        return new Promise(function(resolve, reject) {
            _this.ready().then(function() {
                // The localStorage API doesn't return undefined values in an
                // "expected" way, so undefined is always cast to null in all
                // drivers. See: https://github.com/mozilla/localForage/pull/42
                if (value === undefined) {
                    value = null;
                }

                // Save the original value to pass to the callback.
                var originalValue = value;

                _serialize(value, function(value, error) {
                    if (error) {
                        reject(error);
                    } else {
                        db.transaction(function (t) {
                            t.executeSql('INSERT OR REPLACE INTO ' + dbInfo.storeName + 
                                         ' (key, value) VALUES (?, ?)', [key, value], function() {
                                if (callback) {
                                    callback(originalValue);
                                }

                                resolve(originalValue);
                            }, function(t, error) {
                                if (callback) {
                                    callback(null, error);
                                }

                                reject(error);
                            });
                        }, function(sqlError) { // The transaction failed; check
                                                // to see if it's a quota error.
                            if (sqlError.code === sqlError.QUOTA_ERR) {
                                // We reject the callback outright for now, but
                                // it's worth trying to re-run the transaction.
                                // Even if the user accepts the prompt to use
                                // more storage on Safari, this error will
                                // be called.
                                //
                                // TODO: Try to re-run the transaction.
                                if (callback) {
                                    callback(null, sqlError);
                                }

                                reject(sqlError);
                            }
                        });
                    }
                });
            });
        });
    }

    function removeItem(key, callback) {
        var _this = this;
        return new Promise(function(resolve, reject) {
            _this.ready().then(function() {
                db.transaction(function (t) {
                    t.executeSql('DELETE FROM ' + dbInfo.storeName + 
                                 ' WHERE key = ?', [key], function() {
                        if (callback) {
                            callback();
                        }

                        resolve();
                    }, function(t, error) {
                        if (callback) {
                            callback(error);
                        }

                        reject(error);
                    });
                });
            });
        });
    }

    // Deletes every item in the table.
    // TODO: Find out if this resets the AUTO_INCREMENT number.
    function clear(callback) {
        var _this = this;
        return new Promise(function(resolve, reject) {
            _this.ready().then(function() {
                db.transaction(function (t) {
                    t.executeSql('DELETE FROM ' + dbInfo.storeName, [], function() {
                        if (callback) {
                            callback();
                        }

                        resolve();
                    }, function(t, error) {
                        if (callback) {
                            callback(error);
                        }

                        reject(error);
                    });
                });
            });
        });
    }

    // Does a simple `COUNT(key)` to get the number of items stored in
    // localForage.
    function length(callback) {
        var _this = this;
        return new Promise(function(resolve, reject) {
            _this.ready().then(function() {
                db.transaction(function (t) {
                    // Ahhh, SQL makes this one soooooo easy.
                    t.executeSql('SELECT COUNT(key) as c FROM ' + 
                                 dbInfo.storeName, [], function (t, results) {
                        var result = results.rows.item(0).c;

                        if (callback) {
                            callback(result);
                        }

                        resolve(result);
                    }, function(t, error) {
                        if (callback) {
                            callback(null, error);
                        }

                        reject(error);
                    });
                });
            });
        });
    }

    // Return the key located at key index X; essentially gets the key from a
    // `WHERE id = ?`. This is the most efficient way I can think to implement
    // this rarely-used (in my experience) part of the API, but it can seem
    // inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
    // the ID of each key will change every time it's updated. Perhaps a stored
    // procedure for the `setItem()` SQL would solve this problem?
    // TODO: Don't change ID on `setItem()`.
    function key(n, callback) {
        var _this = this;
        return new Promise(function(resolve, reject) {
            _this.ready().then(function() {
                db.transaction(function (t) {
                    t.executeSql('SELECT key FROM ' + dbInfo.storeName +
                                 ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                        var result = results.rows.length ? results.rows.item(0).key : null;

                        if (callback) {
                            callback(result);
                        }

                        resolve(result);
                    }, function(t, error) {
                        if (callback) {
                            callback(null, error);
                        }

                        reject(error);
                    });
                });
            });
        });
    }

    // Converts a buffer to a string to store, serialized, in the backend
    // storage library.
    function _bufferToString(buffer) {
        // base64-arraybuffer
        var bytes = new Uint8Array(buffer);
        var i;
        var base64String = '';

        for (i = 0; i < bytes.length; i += 3) {
            /*jslint bitwise: true */
            base64String += BASE_CHARS[bytes[i] >> 2];
            base64String += BASE_CHARS[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
            base64String += BASE_CHARS[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
            base64String += BASE_CHARS[bytes[i + 2] & 63];
        }

        if ((bytes.length % 3) === 2) {
            base64String = base64String.substring(0, base64String.length - 1) + "=";
        } else if (bytes.length % 3 === 1) {
            base64String = base64String.substring(0, base64String.length - 2) + "==";
        }

        return base64String;
    }

    // Deserialize data we've inserted into a value column/field. We place
    // special markers into our strings to mark them as encoded; this isn't
    // as nice as a meta field, but it's the only sane thing we can do whilst
    // keeping localStorage support intact.
    //
    // Oftentimes this will just deserialize JSON content, but if we have a
    // special marker (SERIALIZED_MARKER, defined above), we will extract
    // some kind of arraybuffer/binary data/typed array out of the string.
    function _deserialize(value) {
        // If we haven't marked this string as being specially serialized (i.e.
        // something other than serialized JSON), we can just return it and be
        // done with it.
        if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
            return JSON.parse(value);
        }

        // The following code deals with deserializing some kind of Blob or
        // TypedArray. First we separate out the type of data we're dealing
        // with from the data itself.
        var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
        var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

        // Fill the string into a ArrayBuffer.
        var bufferLength = serializedString.length * 0.75;
        var len = serializedString.length;
        var i;
        var p = 0;
        var encoded1, encoded2, encoded3, encoded4;

        if (serializedString[serializedString.length - 1] === "=") {
            bufferLength--;
            if (serializedString[serializedString.length - 2] === "=") {
                bufferLength--;
            }
        }

        var buffer = new ArrayBuffer(bufferLength);
        var bytes = new Uint8Array(buffer);

        for (i = 0; i < len; i+=4) {
            encoded1 = BASE_CHARS.indexOf(serializedString[i]);
            encoded2 = BASE_CHARS.indexOf(serializedString[i+1]);
            encoded3 = BASE_CHARS.indexOf(serializedString[i+2]);
            encoded4 = BASE_CHARS.indexOf(serializedString[i+3]);

            /*jslint bitwise: true */
            bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
            bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
            bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
        }

        // Return the right type based on the code/type set during
        // serialization.
        switch (type) {
            case TYPE_ARRAYBUFFER:
                return buffer;
            case TYPE_BLOB:
                return new Blob([buffer]);
            case TYPE_INT8ARRAY:
                return new Int8Array(buffer);
            case TYPE_UINT8ARRAY:
                return new Uint8Array(buffer);
            case TYPE_UINT8CLAMPEDARRAY:
                return new Uint8ClampedArray(buffer);
            case TYPE_INT16ARRAY:
                return new Int16Array(buffer);
            case TYPE_UINT16ARRAY:
                return new Uint16Array(buffer);
            case TYPE_INT32ARRAY:
                return new Int32Array(buffer);
            case TYPE_UINT32ARRAY:
                return new Uint32Array(buffer);
            case TYPE_FLOAT32ARRAY:
                return new Float32Array(buffer);
            case TYPE_FLOAT64ARRAY:
                return new Float64Array(buffer);
            default:
                throw new Error('Unkown type: ' + type);
        }
    }

    // Serialize a value, afterwards executing a callback (which usually
    // instructs the `setItem()` callback/promise to be executed). This is how
    // we store binary data with localStorage.
    function _serialize(value, callback) {
        var valueString = '';
        if (value) {
            valueString = value.toString();
        }

        // Cannot use `value instanceof ArrayBuffer` or such here, as these
        // checks fail when running the tests using casper.js...
        //
        // TODO: See why those tests fail and use a better solution.
        if (value && (value.toString() === '[object ArrayBuffer]' ||
                      value.buffer && value.buffer.toString() === '[object ArrayBuffer]')) {
            // Convert binary arrays to a string and prefix the string with
            // a special marker.
            var buffer;
            var marker = SERIALIZED_MARKER;

            if (value instanceof ArrayBuffer) {
                buffer = value;
                marker += TYPE_ARRAYBUFFER;
            } else {
                buffer = value.buffer;

                if (valueString === '[object Int8Array]') {
                    marker += TYPE_INT8ARRAY;
                } else if (valueString === '[object Uint8Array]') {
                    marker += TYPE_UINT8ARRAY;
                } else if (valueString === '[object Uint8ClampedArray]') {
                    marker += TYPE_UINT8CLAMPEDARRAY;
                } else if (valueString === '[object Int16Array]') {
                    marker += TYPE_INT16ARRAY;
                } else if (valueString === '[object Uint16Array]') {
                    marker += TYPE_UINT16ARRAY;
                } else if (valueString === '[object Int32Array]') {
                    marker += TYPE_INT32ARRAY;
                } else if (valueString === '[object Uint32Array]') {
                    marker += TYPE_UINT32ARRAY;
                } else if (valueString === '[object Float32Array]') {
                    marker += TYPE_FLOAT32ARRAY;
                } else if (valueString === '[object Float64Array]') {
                    marker += TYPE_FLOAT64ARRAY;
                } else {
                    callback(new Error("Failed to get type for BinaryArray"));
                }
            }

            callback(marker + _bufferToString(buffer));
        } else if (valueString === "[object Blob]") {
            // Conver the blob to a binaryArray and then to a string.
            var fileReader = new FileReader();

            fileReader.onload = function() {
                var str = _bufferToString(this.result);

                callback(SERIALIZED_MARKER + TYPE_BLOB + str);
            };

            fileReader.readAsArrayBuffer(value);
        } else {
            try {
                callback(JSON.stringify(value));
            } catch (e) {
                if (this.console && this.console.error) {
                    this.console.error("Couldn't convert value into a JSON string: ", value);
                }

                callback(null, e);
            }
        }
    }

    var webSQLStorage = {
        _driver: 'webSQLStorage',
        _initStorage: _initStorage,
        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem,
        clear: clear,
        length: length,
        key: key
    };

    if (typeof define === 'function' && define.amd) {
        define('webSQLStorage', function() {
            return webSQLStorage;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = webSQLStorage;
    } else {
        this.webSQLStorage = webSQLStorage;
    }
}).call(this);
(function() {
    'use strict';

    // Promises!
    var Promise = (typeof module !== 'undefined' && module.exports) ?
                  require('promise') : this.Promise;

    // Avoid those magic constants!
    var MODULE_TYPE_DEFINE = 1;
    var MODULE_TYPE_EXPORT = 2;
    var MODULE_TYPE_WINDOW = 3;

    // Attaching to window (i.e. no module loader) is the assumed,
    // simple default.
    var moduleType = MODULE_TYPE_WINDOW;

    // Find out what kind of module setup we have; if none, we'll just attach
    // localForage to the main window.
    if (typeof define === 'function' && define.amd) {
        moduleType = MODULE_TYPE_DEFINE;
    } else if (typeof module !== 'undefined' && module.exports) {
        moduleType = MODULE_TYPE_EXPORT;
    }

    // Initialize IndexedDB; fall back to vendor-prefixed versions if needed.
    var indexedDB = indexedDB || this.indexedDB || this.webkitIndexedDB ||
                    this.mozIndexedDB || this.OIndexedDB ||
                    this.msIndexedDB;

    // Check for WebSQL.
    var openDatabase = this.openDatabase;

    // The actual localForage object that we expose as a module or via a global.
    // It's extended by pulling in one of our other libraries.
    var _this = this;
    var localForage = {
        INDEXEDDB: 'asyncStorage',
        LOCALSTORAGE: 'localStorageWrapper',
        WEBSQL: 'webSQLStorage',

        _config: {
            description: '',
            name: 'localforage',
            // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
            // we can use without a prompt.
            size: 4980736,
            storeName: 'keyvaluepairs',
            version: 1.0
        },

        // Set any config values for localForage; can be called anytime before
        // the first API call (e.g. `getItem`, `setItem`).
        // We loop through options so we don't overwrite existing config
        // values.
        config: function(options) {
            // If the options argument is an object, we use it to set values.
            // Otherwise, we return either a specified config value or all
            // config values.
            if (typeof(options) === 'object') {
                // If localforage is ready and fully initialized, we can't set
                // any new configuration values. Instead, we return an error.
                if (this._ready) {
                    return new Error("Can't call config() after localforage " +
                                     "has been used.");
                }

                for (var i in options) {
                    this._config[i] = options[i];
                }

                return true;
            } else if (typeof(options) === 'string') {
                return this._config[options];
            } else {
                return this._config;
            }
        },

        driver: function() {
            return this._driver || null;
        },

        _ready: Promise.reject(new Error("setDriver() wasn't called")),

        setDriver: function(driverName, callback) {
            var driverSet = new Promise(function(resolve, reject) {
                if ((!indexedDB && driverName === localForage.INDEXEDDB) ||
                    (!openDatabase && driverName === localForage.WEBSQL)) {
                    reject(localForage);

                    return;
                }

                localForage._ready = null;

                // We allow localForage to be declared as a module or as a library
                // available without AMD/require.js.
                if (moduleType === MODULE_TYPE_DEFINE) {
                    require([driverName], function(lib) {
                        localForage._extend(lib);

                        resolve(localForage);
                    });

                    // Return here so we don't resolve the promise twice.
                    return;
                } else if (moduleType === MODULE_TYPE_EXPORT) {
                    // Making it browserify friendly
                    var driver;
                    switch (driverName) {
                        case localForage.INDEXEDDB:
                            driver = require('./drivers/indexeddb');
                            break;
                        case localForage.LOCALSTORAGE:
                            driver = require('./drivers/localstorage');
                            break;
                        case localForage.WEBSQL:
                            driver = require('./drivers/websql');
                    }

                    localForage._extend(driver);
                } else {
                    localForage._extend(_this[driverName]);
                }

                resolve(localForage);
            });

            driverSet.then(callback, callback);

            return driverSet;
        },

        ready: function(callback) {
            if (this._ready === null) {
                this._ready = this._initStorage(this._config);
            }

            this._ready.then(callback, callback);

            return this._ready;
        },

        _extend: function(libraryMethodsAndProperties) {
            for (var i in libraryMethodsAndProperties) {
                if (libraryMethodsAndProperties.hasOwnProperty(i)) {
                    this[i] = libraryMethodsAndProperties[i];
                }
            }
        }
    };

    // Select our storage library.
    var storageLibrary;
    // Check to see if IndexedDB is available and if it is the latest
    // implementation; it's our preferred backend library. We use "_spec_test"
    // as the name of the database because it's not the one we'll operate on,
    // but it's useful to make sure its using the right spec.
    // See: https://github.com/mozilla/localForage/issues/128
    if (indexedDB && indexedDB.open('_localforage_spec_test', 1).onupgradeneeded === null) {
        storageLibrary = localForage.INDEXEDDB;
    } else if (openDatabase) { // WebSQL is available, so we'll use that.
        storageLibrary = localForage.WEBSQL;
    } else { // If nothing else is available, we use localStorage.
        storageLibrary = localForage.LOCALSTORAGE;
    }

    // If window.localForageConfig is set, use it for configuration.
    if (this.localForageConfig) {
        localForage.config = this.localForageConfig;
    }

    // Set the (default) driver.
    localForage.setDriver(storageLibrary);

    // We allow localForage to be declared as a module or as a library
    // available without AMD/require.js.
    if (moduleType === MODULE_TYPE_DEFINE) {
        define(function() {
            return localForage;
        });
    } else if (moduleType === MODULE_TYPE_EXPORT) {
        module.exports = localForage;
    } else {
        this.localforage = localForage;
    }
}).call(this);

(function(doc, win, undefined) {
    'use strict';

    var selDOM, arr, makeArray, deDup, htmlToNodes, isHTMLstr, proto, indexOfNode, injectContent;

    arr = Array.prototype;
    makeArray = function(list) {
        return arr.slice.call(list);
    };

    deDup = function(arr) {
        var deDupped = selDOM(),
            _i, _ilen, _iref;
        for (_i = 0, _ilen = arr.length; _i < _ilen; _i++) {
            _iref = arr[_i];
            if (deDupped.indexOf(_iref) === -1) {
                deDupped.push(_iref);
            }
        }
        return deDupped;
    };

    isHTMLstr = function(str) {
        return !!str.match(/^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/);
    };
    htmlToNodes = function(htmlStr) {
        var frag = doc.createDocumentFragment(),
            temp = frag.appendChild(doc.createElement('div'));

        temp.innerHTML = htmlStr;
        return temp.childNodes;
    };
    indexOfNode = function(el) {
        var parent = el.parentNode,
            children = makeArray(parent.children);
        return children.indexOf(el);
    };

    injectContent = function(content, method) {
        var clone = this.length - 1; // Don't clone node if there's only one in the set, just move it.
        content = selDOM(content); // format the content
        this.each(function(i, el) {
            var parent, childIdx, lastChildIdx;

            if (method === 'after') {
                parent = el.parentNode;
                childIdx = indexOfNode(el);
                lastChildIdx = parent.childElementCount - 1;
            }
            content.each(function(j, item) {
                var node = clone ? item.cloneNode(true) : item;
                if (method === 'prepend') {
                    el.insertBefore(node, el.firstChild);
                } else if (method === 'append') {
                    el.appendChild(node);
                } else if (method === 'before') {
                    el.parentNode.insertBefore(node, el);
                } else if (method === 'after') {
                    if (childIdx === lastChildIdx) {
                        el.appendChild(node);
                    } else {
                        parent.insertBefore(node, parent.children[++childIdx]);
                    }
                }
            }, (method === 'prepend'));
        });
        return this;
    };

    selDOM = function(selector, context) {
        return new proto.init(selector, context);
    };
    selDOM.isPlainObject = function(obj) {
        // Ripped from jQuery source (http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.js)
        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        if (typeof obj !== "object" || obj.nodeType || obj.window === win) {
            return false;
        }

        // Support: Firefox <20
        // The try/catch suppresses exceptions thrown when attempting to access
        // the "constructor" property of certain host objects, ie. |window.location|
        // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
        try {
            if (obj.constructor && !Object.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) {
            return false;
        }

        // If the function hasn't returned already, we're confident that
        // |obj| is a plain object, created by {} or constructed with new Object
        return true;
    };

    selDOM.version = '0.0.1';

    proto = selDOM.prototype = [];
    proto.constructor = selDOM;
    proto.init = function(selector, context) {
        var selF = this;

        // empty case
        if (!selector && !context) {
            return selF;
        }

        // root
        if (selector === doc && !context) {
            selF.push(doc);
            return selF;
        }

        // context checking
        if (!(context instanceof selDOM)) {
            if (!context) {
                context = selF.constructor(doc);
            } else if (typeof context === 'string') {
                context = selF.constructor(context);
            } else {
                throw new TypeError('`context` must be a selector string or selDOM object');
            }
        }

        //selector checking

        // If no selector, return empty selDOM object
        if (!selector) {
            // return selF; // No-op;
        } else if (selector === doc || selector === win || selector.nodeType) {
            selF.push(selector);
        } else if (typeof selector === 'string') {
            if (isHTMLstr(selector)) {
                selF.push.apply(selF, makeArray(htmlToNodes(selector)));
            } else {
                context.each(function(idx, el) {
                    selF.push.apply(selF, makeArray(el.querySelectorAll(selector)));
                });
            }

        } else if (selector instanceof selDOM) {
            if (context.length === 1 && context[0] === doc) {
                selF.push.apply(selF, selector);
            } else {
                context.each(function(ctx_i, ctx_el) {
                    var $ctx_el = selDOM(ctx_el);
                    selF.push.apply(selF, $ctx_el.find(selector));
                });
            }
        } else if (Array.isArray(selector)) {
            selF.splice(0, 0, selector);
        }
        return selF;
    };

    proto.find = function(selector) {
        var found = selDOM(),
            el;
        this.each(function(i, el) {
            var $items = (selector instanceof selDOM) ? selector : selDOM(selector);
            $items.each(function(idx, item) {
                //https://developer.mozilla.org/en-US/docs/Web/API/Node.compareDocumentPosition
                if (el.compareDocumentPosition(item) & (Node.DOCUMENT_POSITION_CONTAINED_BY + Node.DOCUMENT_POSITION_FOLLOWING)) {
                    found.push.call(found, item);
                }
            });
        });

        return deDup(found);
    };
    proto.each = function(fn) {
        this.forEach(function(el, i, arr) {
            fn.call(el, i, el);
        });
        return arr;
    };

    proto.addClass = function() {
        //Flatten nested arrays and normalize space delimited class lists
        var args = arr.slice.call(arguments, 0).toString().split(/[\s,]/);
        this.each(function(i, el) {
            el.classList.add.apply(el.classList, args);
        });
        return this;
    };
    proto.toggleClass = function() {
        //Flatten nested arrays and normalize space delimited class lists
        var args = arr.slice.call(arguments, 0).toString().split(/[\s,]/);
        this.each(function(i, el) {
            el.classList.toggle.apply(el.classList, args);
        });
        return this;
    };
    proto.removeClass = function() {
        //Flatten nested arrays and normalize space delimited class lists
        var args = arr.slice.call(arguments, 0).toString().split(/[\s,]/);
        this.each(function(i, el) {
            el.classList.remove.apply(el.classList, args);
        });
        return this;
    };
    proto.hasClass = function(className) {
        var hasClass = false;
        this.each(function(i, el) {
            if (el.classList.contains(className)) {
                hasClass = true;
            }
        });
        return hasClass;
    };
    proto.empty = function() {
        this.each(function(i, el) {
            el.innerHTML = '';
        });

    };
    proto.html = function(content) {
        var asHTMLStr = function(i, el) {
            el.innerHTML = content;
        },
            asFunction = function(i, el) {
                oldHTML = this.innerHTML;
                this.innerHTML = '';
                this.innerHTML = content.call(el, i, oldHTML);
            },
            oldHTML;
        if (content) {
            if (typeof content === 'string') {
                this.each(asHTMLStr);
            } else if (typeof content === 'function') {
                this.each(asFunction);
            } else {
                throw new TypeError('The first argument in the `html` method must be an HTML string or a function');
            }
            return this;
        } else {
            return this[0] ? this[0].innerHTML : "";
        }
    };
    proto.text = function(content) {
        var asTextStr = function(i, el) {
            el.innerText = content;
        },
            asFunction = function(i, el) {
                oldText = this.innerText;
                this.innerText = '';
                this.innerText = content.call(el, i, oldText);
            },
            oldText;
        if (content) {
            if (typeof content === 'string') {
                this.each(asTextStr);
            } else if (typeof content === 'function') {
                this.each(asFunction);
            } else {
                throw new TypeError('The first argument in the `text` method must be a text string or a function');
            }
            return this;
        } else {
            return this[0] ? this[0].innerText : "";
        }
    };
    proto.attr = function(attrName, attrValue) {
        var method = 'getAttribute',
            setAttr = function(i, el) {
                el.setAttribute(attr, attrName[attr]);
            },
            val;
        if (selDOM.isPlainObject(attrName)) {
            for (var attr in attrName) {
                if (attrName.hasOwnProperty(attr)) {
                    this.each(setAttr);
                }
            }
            return this;
        } else if (typeof attrName === 'string') {
            if (typeof attrValue === 'string') {
                this.each(function(i, el) {
                    el.setAttribute(attrName, attrValue);
                });
            } else if (attrValue === undefined) {
                val = this[0].getAttribute(attrName);
            }
            return (val === undefined) ? this : val;
        } else {
            throw new TypeError('The first argument of `attr` must be a propery name as a string or an object representing a hash of attribute:value pairs.');
        }
    };
    proto.removeAttr = function(attrName) {
        this.each(function(i, el) {
            el.removeAttribute(attrName);
        });
    };
    proto.remove = function(selector) {
        var $items = selDOM(selector, this);
        $items.each(function(i, el) {
            el.parentNode.removeChild(el);
        });
        return $items;
    };
    proto.prepend = function(content) {
        return injectContent.call(this, content, 'prepend');
    };
    proto.append = function(content) {
        return injectContent.call(this, content, 'append');
    };
    proto.prependTo = function(target) {
        target = (typeof target === 'string') ? selDOM(target) : target;
        if (target instanceof selDOM) {
            injectContent.call(target, this, 'prepend');
            return this;
        } else {
            throw new TypeError('The `target` parameter of the prependTo method must be a selector or selDOM object');
        }
    };
    proto.appendTo = function(target) {
        target = (typeof target === 'string') ? selDOM(target) : target;

        if (target instanceof selDOM) {
            injectContent.call(target, this, 'append');
            return this;
        } else {
            throw new TypeError('The `target` parameter of the appendTo method must be selector or selDOM object');
        }
    };
    proto.after = function(content) {
        injectContent.call(this, content, 'after');
        return this;
    };
    proto.before = function(content) {
        injectContent.call(this, content, 'before');
        return this;
    };
    proto.insertAfter = function(target) {
        target = (typeof target === 'string') ? selDOM(target) : target;

        if (target instanceof selDOM) {
            injectContent.call(target, this, 'after');
            return this;
        } else {
            throw new TypeError('The `target` parameter of the insertAfter method must be selector or selDOM object');
        }
    };
    proto.insertBefore = function(target) {
        target = (typeof target === 'string') ? selDOM(target) : target;

        if (target instanceof selDOM) {
            injectContent.call(target, this, 'before');
            return this;
        } else {
            throw new TypeError('The `target` parameter of the insertBefore method must be selector or selDOM object');
        }
    };
    proto.prop = function(propName, propValue) {
        var propNames,
            setProp = function(i, el) {
                el[prop] = propName[prop];
            };
        if (selDOM.isPlainObject(propName)) {
            for (var prop in propName) {
                if (propName.hasOwnProperty(prop)) {
                    this.each(setProp);
                }
            }
            return this;
        } else if (typeof propName === 'string') {
            if (propValue && typeof propValue === 'string') {
                this.each(function(i, el) {
                    el[propName] = propValue;
                });
                return this;
            } else if (propValue === undefined) {
                return this[0][propName];
            }
        } else {
            throw new TypeError('The first argument of `prop` must be a propery name as a string or an object representing a hash of property:value pairs.');
        }
    };
    proto.removeProp = function(propName) {
        this.each(function(i, el) {
            delete el[propName];
        });
        return this;
    };
    proto.init.prototype = proto;
    window.selDOM = selDOM;
    window.$ = window.selDOM;
})(document, window);
//TODO/NOTES
//	1. first load package should include:
//		- first article if there is a newer one
//		- about page
//		- main page
//	2. most of this should go in local storage of some flavor one first load
//		- implement pouch? or hoodie?
//	3. Show navigation items for prev/next article/about
//		- on first use these should let you know you can swipe instead
//		- use localstorage to determine new/returning
//		- if someone starts using swipe fade out the inputs?

var designfrontier = action.eventMe({
	init: function(){
		var that = this
			, doc = document
			, body = doc.getElementsByTagName('body')[0];

		that.location = 1;

		//swipe navigation listeners yo!
		that.listen('swipe:right-to-left', that.nextArticle, that);
		that.listen('swipe:left-to-right', that.previousArticle, that);

		//bring in da hammaaa!!!
		Hammer(body).on('swipeleft', function(){
			that.emit('swipe:right-to-left');
		}).on('swiperight', function(){
			that.emit('swipe:left-to-right');
		});
		//end swipe navigation handlers and stuff

		//navigation helpers
		// $('.right-helper-tab').on('click', function(){
		// 	that.emit('swipe:right-to-left');
		// });

		// $('.left-helper-tab').on('click', function(){
		// 	that.emit('swipe:left-to-right');
		// });

		//data listeners
		that.listen('data:location:get', that.returnValue('location'), that);
		that.listen('panes:getAll', that.getPanes, that);

		//get the panes
		that.emit('panes:getAll');

		return that;
	}

	// , setupRoutes: function(){
	// 	var that = this
	// 		, uid = 0;

	// 	that.listen('navigate:to', function(urlIn){
	// 		var url = urlIn
	// 			, push = true;

	// 		if(typeof url === 'object'){
	// 			push = url.pushState;
	// 			url = url.url;
	// 		}

	// 		if(push){
	// 			history.pushState({id: url},'designfrontier' + uid++,url);
	// 		}
	// 	});

	// 	window.onpopstate = function(d, a, c){
	// 		var locationArray = location.pathname.split('/');
	// 		that.emit('navigate:to', {url: locationArray.pop(), pushState: false});
	// 	};
	// }

	, nextArticle: function(){
		var that = this
			, currentLocation = that.location;

		// $(that.panes[currentLocation]).css('right', '100%');
		// $(that.panes[currentLocation + 1]).css('right', '0');

		if(currentLocation === 1){
			history.pushState({},'article 1', 'article-1');
		}
	}

	, previousArticle: function(){
		var that = this
			, currentLocation = that.location;

		// $(that.panes[currentLocation]).css('right', '0');
		// $(that.panes[currentLocation + 1]).css('right', '100%');

		if(currentLocation === 1){
			history.pushState({},'article 1', 'about-me');
		}else{
			history.pushState({},'article 1', 'test');	
		}
	}

	, getPanes: function(){
		var that = this;

		that.panes = document.querySelector('.pane');
		that.emit('panes:ready');
		console.log('panes set');
	}

	, returnValue: function(name){
		var that = this;

		that.emit('data:' + name, that[name]);
	}
});
this["action"] = this["action"] || {};
this["action"]["templates"] = this["action"]["templates"] || {};
this["action"]["templates"]["about"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h1 class=\"heading\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\n";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });;
this["action"] = this["action"] || {};
this["action"]["templates"] = this["action"]["templates"] || {};
this["action"]["templates"]["article-template"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"header-image\">\n	<img src=\"";
  if (helper = helpers.headerImage) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.headerImage); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n</div>\n<h1 class=\"heading\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\n<article class=\"\">\n	";
  if (helper = helpers.content) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.content); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</article>";
  return buffer;
  });;
this["action"] = this["action"] || {};
this["action"]["templates"] = this["action"]["templates"] || {};
this["action"]["templates"]["articles-all-template"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n	<h3 class=\"heading\">\n		<a href=\"/articles/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n	</h3>\n";
  return buffer;
  }

  buffer += "<h1>All Articles</h1>\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.articles), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });;
action.dataHandler = (function(){
	var dataStore = {
		articles: action.modelMe({
			url: '/api'
			, init: function(){
				var that = this
					localStore = window.localforage;

				//setup events
				that.listen('article:get', function(articleId){
					//check to see if this thing is locally cached
					localStore.getItem('articles', function(articles){
						if(articles === null){
							//not cached yet
							that.fetch('articles');
						} else {
							//articles is cached. update and serve from here
							that.emit('articles:loaded', articles);
							that.emit('articles:update');
						}
					});
					
					that.emit('article:set', dataStore[articleId]);
				});

				//cache articles locally...
				that.listen('articles:loaded', function(articles){
					that.set('articles', articles);
				});

				that.listen('articles:update', function(){
					that.fetchNewer();
				});

				that.listen('articles:updated', function(update){
					//update the articles object with the new stuff and save it to 
					//	localforage
					var articles = that.get('articles')
						, i = 0;

					//update the items that haven't been downloaded yet
					for(i = 0; i < update.length; i++){
						articles[update[i].id] = update[i];
					}

					that.set('articles', articles);
					localStore.setItem('articles', articles);
				});

				that.emit('articles:get');
			}
			, newerFetch: function(){
				$.ajax({
                    type: 'get'
                    , url: requestUrl + '/newer/' + new Date().toISOString()
                    , success: function(data, status){
                        if(status !== 'success'){
                            that.emit('global:error', new action.Error('http', 'Error in request', that));
                        }

                        if(data.length){
                        	that.emit('articles:updated', data);
                        }
                    }
                    , error: function(xhr, errorType, error){
                        that.emit('global:error', new action.Error('http', 'Error in request type: ' + errorType, that, error));
                    }
                });
			}
			, dataEvent: 'articles:loaded'
		})
	}

	return dataStore;
})();
//this is the template manager event system
action.listen('template:get', function(templateID){
	action.emit('template:set:' + templateID, action.templates[templateID]);
});