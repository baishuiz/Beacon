;(function (global) {

    var _beancon = global.beacon;
    
    // beacon 天赋技能：为对象进行能力加持
    function Avatar(obj) {
        this.target = obj;
    }

    // 苗正根红的 beacon， core.init之后吸收影分身正式踏入战场。
    var beacon = function (obj) {
        if(this !== global){
            beacon.blend(this,beacon); // 是使被扩展方法能够通过call 或 apply 进行继承
        }
        return new Avatar(obj);
    };
    
    beacon.toString = function () { return "baishuiz@gmail.com"};

    // beacon 能力之源
    var core = {
        base : preBeacon,
        avatarCore: Avatar.prototype,
        self: preBeacon,
        init: function () {
            var freeze = Object.freeze;
            global.beacon = beacon;
            core.merge(beacon, preBeacon);
            freeze && freeze(beacon); 
            delete global.beacon.base; // 保护内核，杜绝外部访问
        },
        login:function(){
            global.beacon = beacon;
        },
        logoff:function(){
            global.beacon = _beancon;
        }
    };
    
    
    var preBeacon = {base:core}; // 创建影分身
    global.beacon = preBeacon; // 影分身修行开始， 开始各种能力加持，稍后将在 core.init 后被 beacon 吸收。
    
})(this);;
;(function (beacon) {
    var base = beacon.base || {};
    var _base = {
        /**
        * @name beacon.base.merge
        * @class [merge 将其他对象赋到mainObj上]
        * @param  {Object} mainObj [merge对象到mainObj上]
        * @param  {Object} p1,p2,p3... [支持一次merge多个对象，从第二个参数开始]
        * @return {Object}         [返回merge之后的对象]
        * @example 
        * NEG.base.merge({x:1,y:1},{z:1},{a:1})
        * 结果：返回 {x:1,y:1,z:1,a:1}
        */
        merge: function (mainObj) {
            var argLength = arguments.length ;
            for (var index = 0; index < argLength; index++) {
                var sourceObj = arguments[index];
                for (var item in sourceObj) {
                    mainObj[item] = sourceObj[item];
                }
            }
            return mainObj;
        },
        
        
        // options : --cover , --mergePrototype
        blend : function(mainObj,attrSource,options) {
            var _options = {
                cover:true,
                mergePrototype:false
            };
            options = options ? _base.merge(_options,options): _options;
            attrSource = [].concat(attrSource);
            var sourceLength = attrSource.length ;
            for (var index = 0; index < sourceLength; index++) {
                var sourceObj = attrSource[index];
                for (var item in sourceObj) {
                    var rule1 = options.mergePrototype || sourceObj.hasOwnProperty(item);
                    var rule2 = options.cover || !mainObj[item];
                    if(rule1 && rule2) {
                         mainObj[item] = sourceObj[item];
                    } 
                }
            }
            return mainObj;            
            
        },
        
        
        
        
       isType : function(obj,type){
            //return Object.toString.call(obj).indexOf('[object ' + type) == 0 || !!(obj instanceof Number);
            return (type === "Null" && obj === null) ||
                (type === "Undefined" && obj === void 0 ) ||
                (type === "Number" && isFinite(obj)) ||
                 Object.prototype.toString.call(obj).slice(8,-1) === type;
        },        
        
        
        
        /**
        * @name beacon.base.NS
        * @class [创建命名空间]
        * @param {String} NSString [要创建的命名空间，以点号隔开]
        * @param {Object} root [参数nsString的根节点，(默认是 当前host)]
        * @return {Object} [返回创建的对象，若已存在则直接返回]
        * @example
        * beacon.base.NS("Biz.Common").ConsoleOne=function(){console.log(1);};
        * Biz.Common.ConsoleOne();
        * 结果：输出 1
        */
        NS: function (nsString, root) {
            var host   = (function(){return this;})();
            var nsPath = nsString.split("."),
                ns     = root || host || {}; 
                
            for (var i = 0, len = nsPath.length; i < len; i++) {
                var currentPath = nsPath[i];
                ns[currentPath] = ns[currentPath] || {};
                ns = ns[currentPath];
            }
            return ns;
        },
        
        
        
        /**
        * @name beacon.base.ArrayIndexOf
        * @class [返回对象存在数组的index,不存在返回-1]
        * @param {Array} array [操作的数组]
        * @param {Object} el [查找的对象]
        * @returns {number} [返回对象存在数组的Index,不存在返回-1]
        * @example
        * beacon.base.ArrayIndexOf([1,2,3,5],3);
        * 结果：返回 2
        */
        //ToDO：改为两分法快速查找
        arrayIndexOf: function(array, el) {
            _base.arrayIndexOf = Array.prototype.indexOf ? 
                        function(array, el){
                            array = [].slice.call(array,0);
                            return array.indexOf(el);
                        } :
                        function(array, el){
                            array = [].slice.call(array,0);
                            for (var i = array.length; i>=0; i-- ) {
                                if (array[i] === el) {
                                    return i;
                                }
                            }
                            return i;
                        };
            return _base.arrayIndexOf(array, el);
        },
         

       
       
       //ToDO： 增加一个可选参数进行深度each
       each : function(array,fn){
            if(!array) return;
            array = [].concat(array);
            for (var i = array.length - 1; i >= 0; i--) {
                fn.call(array[i],i,array[i]);
            }
        },
       
       getGUID : function(){
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3 | 0x8);
                return v.toString(16);
            }).toUpperCase();
        },

        enum : function() {
          var _enum = {};
          for (var i = 0; i < arguments.length; i++) {
            _enum[arguments[i]] = arguments[i];
          }
          return _enum;
        }
    };
    _base.blend(base, _base);
})(beacon);;;(function(beacon){
    var base = beacon.base;
    function CombinationalEvent(){
        
        if(this instanceof CombinationalEvent) {
            return this;
        }
        
        var handleList = [];
        var handleProxyList = [];
        var originalEvents = [].slice.call(arguments, 0);
        var events = originalEvents.slice(0);
        
        var Fn = function() {
            function  resetEventList(){
                events = originalEvents.slice(0);
                return events;
            }
            
            var attachHandleProxy = function(handle, handleProxy){
                var index = base.arrayIndexOf(handleList,handle)
                if(index < 0){
                    handleList.push(handle);
                    handleProxyList.push(handleProxy);
                }
            };
            
            var getHandleProxy = function(handle) {
                var index = base.arrayIndexOf(handleList,handle);
                var handleProxy = handleProxyList[index];
                return handle ? handleProxy : handleProxyList.slice(0) ;
            }
            
            this.resetEventList = resetEventList;
            this.getEventList = function(){
                return originalEvents.slice(0);
            };
            
            
            this.registEvent = function (eventHandle){
                
                var indexOf = base.arrayIndexOf;
                var events = originalEvents.slice(0);
                var handleProxy = function(eventObject, eventBody){
                    var target = this;
                    var eventIndex = indexOf(events,eventObject.eventType);
                    if (eventIndex >= 0) {
                        events.splice(eventIndex, 1);
                    }
                
                    if (events.length === 0) {
                        eventHandle.call(target, eventBody);
                        events = resetEventList();
                    }
                };
                attachHandleProxy(eventHandle, handleProxy);
                return handleProxy;
            };
            
            
            this.removeEvent = function(eventHandle) {
                var handleProxy = [].concat(getHandleProxy(eventHandle));
                return handleProxy;
            }            
        }
        
        Fn.prototype = new CombinationalEvent();
        return new Fn();
    }
    
    base.combinationalEvent = CombinationalEvent;
})(beacon);;
/*
 * @module  EventDispatcher
 * MIT Licensed
 * @author  baishuiz@gmail.com
 */
;(function (beacon) {
    var base = beacon.base;
    
    var eventList = [];
    var targetList = [];
    
    var event = {
       hostProxy : {}
       
       ,attachEvent : function(eventName, eventHandle) {
            var eventId = registTarget(this);
            var regEvent = (eventName instanceof base.combinationalEvent) ? 
                               registCombinationinlEvent :
                                   registEvent;
                                   
            regEvent(eventId, eventName, eventHandle);
        }
        
       ,fireEvent : function(eventName, eventBody){
            var target = this;
            var targetIndex = getTargetIndex(targetList,target);
            var events = eventList[targetIndex];
            var eventHandles;
            for(var i=0; i<events.length; i++) {
                if(events[i].name === eventName ) {
                    eventHandles = events[i].fn;
                    break;
                }
            }
            base.each(eventHandles, function(i){
                var eventObject = {
                    eventType:eventName
                };
                eventHandles[i].call(target,eventObject, eventBody);
            });
        }
       
       ,publicDispatchEvent : function(eventName, eventBody){
            base.each(targetList,function(i){
                event.fireEvent.call(targetList[i], eventName, eventBody);
            });
       }
       
       
       ,removeEvent: function(eventName,eventHandle){
           var target = this;
           var targetIndex = getTargetIndex(targetList,target);
           
           if(eventName instanceof base.combinationalEvent) {
               removeCombinationinlEvent(targetIndex, eventName, eventHandle);
           } else {
               removeEvent(targetIndex, eventName, eventHandle);
           }
           
           
       }       
    };
    
    var Event = (function(){
            var Event = function(){};
            Event.prototype = event;
            base.blend(Event, event);
            return Event;
    }());
    
    
    
    function getTargetIndex(targetList,target){
         var targetIndex = base.arrayIndexOf(targetList,target);
         return targetIndex;
    }
    
    function registTarget(target) {
        var targetIndex = getTargetIndex(targetList,target);
        if(targetIndex<0){
            targetIndex = targetList.push(target) - 1;
        }
        return targetIndex;
    }
    
    function registEvent(eventId, eventName, eventHandle) {
        var indexOf = base.arrayIndexOf;
        
        if(!eventList[eventId] || eventList[eventId].length<=0) {
          eventList[eventId] = [{
            name:eventName
           ,fn  :[]
          }];  
        } 
        
        
        var events = eventList[eventId];
        for(var i=0; i<events.length; i++) {
            if(events[i].name === eventName ) {
                events[i].fn.push(eventHandle);        
                break;
            }
            
            if(i===events.length-1){
                eventList[eventId].push({
                    name:eventName
                   ,fn  :[]
                });
            }
        }
    }
    
    
    function registCombinationinlEvent(targetId, event, eventHandle){
        var handleProxy = event.registEvent(eventHandle);
        var eventList = event.getEventList();
        base.each(eventList, function(index){
            registEvent(targetId, eventList[index], handleProxy);
        });
    }
    
    
    
    function removeEvent(eventId, eventName, eventHandle) {
        if(!eventList[eventId]) {
          return null;
        } 
        
        if(!eventName && !eventHandle) {
            eventList[eventId] = [];
            return true
        }
        
        var events = eventList[eventId];
        var handleList;
        for(var i=0; i<events.length; i++) {
            if(events[i].name === eventName ) {
                handleList = events[i].fn;        
                break;
            }
        }
        
        
        if(eventHandle){
            for(var handleIndex = handleList.length; handleIndex >=0; handleIndex--){
                if(handleList[handleIndex] === eventHandle){
                    handleList.splice(handleIndex,1);
                }
            }
        } else {
            handleList.splice(0);
        }
    }
    
    
    
    function removeCombinationinlEvent(targetId, event, eventHandle) {
        var handleProxyList = event.removeEvent(eventHandle);
        base.each(handleProxyList, function(i){
            var handleProxy = handleProxyList[i];
            var eventList = event.getEventList();
            base.each(eventList, function(index) {
                var eventName = eventList[index];
                removeEvent(targetId, eventName, handleProxy);    
            });
        });    
    }
    
    function getEventList(targetId, eventName) {
        var events = eventList[targetId];
        var handleList;
        for(var i=0; i<events.length; i++) {
            if(events[i].name === eventName ) {
                handleList = events[i].fn;        
                break;
            }
        }
        return handleList;
    }

    base.Event = Event;
}) (beacon);;/*
 * @module  DOMEvent
 * MIT Licensed
 * @author  baishuiz@gmail.com
 */
;(function (beacon) {
    var base = beacon.base;
    var host = (function(){return this}());
    
    var EventStructure  = function(dom) {
       var arrayIndexOf = base.arrayIndexOf;
       var events = [];
       var api = {
           dom : dom
          ,attachEvent : function (eventName, eventHandle) {
              events[eventName] = events[eventName] || [];
              events[eventName].push(eventHandle);
              events.push(eventName);
          }
          
         ,removeEvent : function (eventName, eventHandle) {
              var eventHandles = events[eventName];
              var result;
              if(eventName && eventHandle) {
                  var handleIndex = arrayIndexOf(eventHandles, eventHandle);
                  result = events[eventName].splice(handleIndex, 1);
              } else if(eventName && !eventHandle) {
                  result = events[eventName];
                  events[eventName] = [];
              } else if(!eventName && !eventHandle) {
                  result = events;
                  events = [];
              }
              return result;
          } 
       }
       return api
    }

    var eventMap = {
        structures : []
       ,getStructure : function(dom) {
           var activeStructure
           for(var i = 0; i < eventMap.structures.length; i++) {
               activeStructure = eventMap.structures[i];
               if (activeStructure.dom === dom) {
                   return activeStructure;
               }
           }
       }
       
       ,add : function (dom, eventName, eventHandle) {
           var activeStructure = eventMap.getStructure(dom);
           if(!activeStructure) {
             activeStructure = new EventStructure(dom);
             eventMap.structures.push(activeStructure);
           } 
           activeStructure.attachEvent(eventName, eventHandle);
           
       }
       
      ,remove : function (dom, eventName, eventHandle) {
          var activeStructure = eventMap.getStructure(dom);
          return activeStructure.removeEvent(eventName, eventHandle);
      }
    }
    
    
    var help = {
        attachEvent : function (eventName, eventHandle) {
            var dom = this;
            
            var addEventListener = function (eventName, eventHandle) {
                var dom = this;
                dom.addEventListener(eventName, eventHandle, false);
            };
            
            var attachEvent = function(eventName, eventHandle){
                var dom = this;
                dom.attachEvent("on" + eventName, eventHandle);
            };
            
            var otherFn = function(eventName, eventHandle) {
                var dom = this;
                var oldHandle = dom["on" + eventName];
                dom["on" + eventName] = function() {
                    oldHandle.call(dom);
                    eventHandle.call(dom);
                };
            };
            
            var proxy;
            if (host.addEventListener) {
                addEventListener.call(dom, eventName, eventHandle);
                proxy = addEventListener;
            } else if (host.attachEvent) {
                attachEvent.call(dom, eventName, eventHandle);
                proxy = attachEvent;
            }else {
                otherFn.call(dom, eventName, eventHandle);
                proxy = otherFn;
            }
            return help.attachEvent = proxy;
        }
       
       ,fireEvent   : function (eventType, option) {
            var dom = this;
            var dispatchEvent = function(eventType, option) {
                    var dom = this;
                    option = option || {bubbles:false,cancelable:false};
                    var evt = document.createEvent("Event");
                    evt.initEvent(eventType, option.bubbles, option.cancelable);
                    dom.dispatchEvent(evt);
           };
           
           var fireEvent = function (eventType, option) {
                var dom = this;
                option = option || {bubbles:false,cancelable:false};
                option.ieHack = dom.all && dom.all.toString(); // 规避 IE 异常，当 dom 不在DOM树时，IE7下 fireEVent会抛出异常；此处采用赋值操作以避免js压缩时清除冗余语句；
                
                eventType = 'on' + eventType;
                var evt = document.createEventObject();
                evt.cancelBubble = option.cancelable;
                dom.fireEvent(eventType, evt);
           };
           
            var proxy;
            if (document.createEvent && dom.dispatchEvent) {
                dispatchEvent.call(dom, eventType, option);
                proxy = dispatchEvent;
            } else if (document.createEventObject && dom.fireEvent) {
                fireEvent.call(dom, eventType, option);
                proxy = fireEvent;
            }
            return proxy;
       }
        
       ,removeEvent : function (eventType, eventHandle) {
            var dom = this;
            var removeEventListener = function(eventType, eventHandle) {
                    var dom = this;
                    dom.removeEventListener(eventType, eventHandle, false);
           };
           
           var detachEvent = function (eventType, eventHandle) {
                var dom = this;
                dom.detachEvent('on' + eventType, eventHandle);
           };
           
            var proxy;
            if (dom.removeEventListener) {
                removeEventListener.call(dom, eventType, eventHandle);
                proxy = removeEventListener;
            } else if (dom.detachEvent) {
                detachEvent.call(dom, eventType, eventHandle);
                proxy = detachEvent;
            }
            return help.removeEvent = proxy;           
       }   
    };
    
    var event = {
        attachEvent : function(eventName, eventHandle){
            var dom = this;
            eventMap.add(dom, eventName, eventHandle);
            help.attachEvent.call(dom, eventName, eventHandle);
        }
       
       ,fireEvent : function(eventType, option) {
            var dom = this;
            event.fireEVent = help.fireEvent.call(dom, eventType, option);
       }
       
      ,removeEvent : function(eventType, eventHandle) {
          var dom = this;
          if(eventType && eventHandle) {
              help.removeEvent.call(dom, eventType, eventHandle);
          } else if (eventType && !eventHandle) {
              var eventHandles = eventMap.remove(dom, eventType) 
              eventHandles && base.each(eventHandles, function(){
                 var activeHandle = this;
                 event.removeEvent.call(dom, eventType, activeHandle);
              });
          } else if (!eventType && !eventHandle) {
              var eventTypes = eventMap.remove(dom) 
              eventTypes && base.each(eventTypes, function(){
                  var activeEventType = this;
                  activeEventType && base.each(eventTypes[activeEventType], function(){
                      var activeEventHandle = this;  
                      event.removeEvent.call(dom, activeEventType, activeEventHandle);
                  });
                  
              });              
          }     
      }
       
      ,isHTMLElement : function (obj) {
            var _isHTMLElement;
            if (host.HTMLElement) {
        	    _isHTMLElement = obj instanceof HTMLElement ;
        	} else {
        	    var _nodeName = obj.nodeName;
        		_isHTMLElement = !delete obj.nodeName;
        		obj.nodeName = _nodeName;
        	}
        
        	if(!_isHTMLElement){
        	    _isHTMLElement = obj==document || obj == window;
        	}
        	return _isHTMLElement;
        }
        
       ,isEventSupported : function(dom, eventType){
            if(!event.isHTMLElement(dom)){ return false}
        	
            var isSupported = false;
            if(dom === window || dom === document) {
                var ifm = document.createElement('iframe');
                ifm.style.display='none';
                document.body.appendChild(ifm);
                
                var dummyElement = dom === window ? 
                                     ifm.contentWindow : 
                                     ifm.contentDocument;
                event.attachEvent.call(dummyElement, eventType, function(){
                    isSupported = true;
                });
                event.fireEvent.call(dummyElement, eventType);
                ifm.parentNode.removeChild(ifm)
            } else {
            
            	var elementName = dom.tagName;
            	var eventType = 'on' + eventType;
            	dom = document.createElement(elementName);
            	
            	isSupported  = (eventType in dom);
            	
                if ( !isSupported ) {
                    dom.setAttribute(eventType, "return;");
                    isSupported = typeof dom[eventType] === "function";
                }
                dom = null;
            }
        
            return isSupported;
       }

    };

    base.DOMEvent = event;
}) (beacon);;;(function (beacon) {
    var base = beacon.base;
    var openAPI = {
        
        /**
        * @name beacon.on
        * @class [全局事件监听及广播]
        * @param {Object} eventName   [事件名]
        * @param {*} option [事件句柄 或 事件处理参数]
        */
        on : (function(){
                
                var base = beacon.base;
                var isType = base.isType;
                var hostProxy = base.Event.hostProxy;
                var publicDispatchEvent = base.Event.publicDispatchEvent;
                var addEventListener = base.Event.attachEvent;
                
                var _on = function(eventName,option){
                    var args = [].slice.call(arguments,0);
                    if (option && isType(option, 'Function')) {
                        //args.unshift(hostProxy);
                        addEventListener.apply(hostProxy,args);
                    } else {
                        publicDispatchEvent.apply(hostProxy,args);
                    }   
                };
                return _on;         
        }(beacon))
        
        , off : (function(){
            var base = beacon.base;
            var hostProxy = base.Event.hostProxy;
            var _off = function(eventName, eventHandle){
                    var args = [].slice.call(arguments,0);
                    base.Event.removeEvent.apply(hostProxy,args);
                    
                };
                return _off;
        }())
        
        , blend:base.blend
        , NS : base.NS
        , arrayIndexOf : base.ArrayIndexOf
        , isType : base.isType
        
        , Enum : base.Enum
        ,loginGlobal  : base.login
        ,logoffGlobal : base.logoff 
        ,createEvent : function(){
            var args = [].slice.call(arguments,0);
            var event;
            if(arguments.length>1){
                event = base.combinationalEvent.apply(this, args)    ;
            } else {
                event = {desc:args[0]};
            }
            return event;
        }
        
    },
    
    
    
    
    avatarAPI = {
       /**
       * @name beacon(target).on
       * @class [具体对象的事件绑定]
       * @param {Object} eventName   [事件名]
       * @param {Function} eventHandle [事件处理句柄:若没有指定会将targetId和对应eventName的事件句柄全部清除]
       * @param {Object} option      [配置选项]
       * @example
       * beacon("body").on("load",function(){console.info("i am ready");},{});
       * 结果：在onload时间后 输出 i am ready
       */
       on: function (eventType, option) {
         var args = [].slice.call(arguments,0);
         var target = this.target
            , base = beacon.base
        
         var isHTMLElement = base.DOMEvent.isHTMLElement(target);
         var isEventSupported = base.DOMEvent.isEventSupported(target, eventType);
         var dispatchEvent = isHTMLElement && isEventSupported ?
                                 base.DOMEvent.fireEvent :
                                 base.Event.fireEvent;
                                 
         var addEventListener = isHTMLElement && isEventSupported ? 
                                    base.DOMEvent.attachEvent :
                                    base.Event.attachEvent;    
         
         if(option && base.isType(option, 'Function')){
            base.each(target,function(i,target){
                addEventListener.apply(target, args); 
            }); 
         } else {
             base.each(target,function(i,target){
                dispatchEvent.apply(target, args); 
            }); 
         }
       }, 
       
       
       
       
       
       /**
       * @name beacon(target).off
       * @class [具体对象 事件移除]
       * @param {Object} eventName   [事件名]
       * @param {Function} eventHandle [事件处理句柄:若没有指定会将targetId和对应eventName的事件句柄全部清除]
       * @param {Object} option      [配置选项]
       * @example
       * var fn=function(){};
       * beacon("body").off("load",fn,{});
       */
       off: function (eventType, eventHandle, option) {
           //if(arguments.length<=0){return}
           var target = this.target;
           var isHTMLElement = base.DOMEvent.isHTMLElement(target);
           var isDomEvent = eventType && base.DOMEvent.isEventSupported(target, eventType);
           
           var removeEventListener = isHTMLElement && isDomEvent ? 
                                         base.DOMEvent.removeEvent :
                                            base.Event.removeEvent;  
                                    
            base.each(target,function(i,target){
                //removeEventListener.call(target, eventType, eventHandle, option);
                isHTMLElement && base.DOMEvent.removeEvent.call(target, eventType, eventHandle, option);
                base.Event.removeEvent.call(target, eventType, eventHandle, option);
            }); 
       }
   };
    base.blend(base.avatarCore, avatarAPI);
    base.blend(beacon, openAPI);
    base.init();
})(beacon);