;(function (beacon) {
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
        
        , once : function(eventName, eventHandle){
            var handleProxy = function(){
                 openAPI.off(eventName, eventHandle);
            }
            openAPI.on(eventName, eventHandle);
            openAPI.on(eventName, handleProxy);
        }
        
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
       
       
       
       once : function(eventName, eventHandle){
            var targetHost = this;
            avatarAPI.on.call(targetHost, eventName, eventHandle);
            avatarAPI.on.call(targetHost,eventName, function(){
                avatarAPI.off.call(targetHost,eventName, eventHandle);
            })
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