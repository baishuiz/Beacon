;(function (beacon) {
    var base = beacon.base;
    var openAPI = {
        
        /**
        * @name beacon.on
        * @class [quanju全局事件监听及广播]
        * @param {Object} eventName   [事件名]
        * @param {*} option [事件句柄 或 事件处理参数]
        */
        on : function(){
                var hostProxy = {};
                var base = beacon.base;
                var isType = base.isType;
                var publicDispatchEvent = base.Event.publicDispatchEvent;
                var addEventListener = base.Event.addEventListener;
                
                var _on = function(eventName,option){
                    var args = [].slice.call(arguments,0);
                    if (option && isType(option, 'Function')) {
                        args.unshift(hostProxy);
                        addEventListener.apply(hostProxy,args);
                    } else {
                        publicDispatchEvent.apply(hostProxy,args);
                    }   
                };
                return _on;         
        }(beacon)
        
        , blend:base.blend
        , NS : base.NS
        , arrayIndexOf : base.ArrayIndexOf
        , isType : base.isType
        
        , Enum : base.Enum
        ,loginGlobal  : base.login
        ,logoffGlobal : base.logoff 
        
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
       on: function (eventType, eventHandle, option) {


         var target = this.target
            , base = beacon.base
            ,isHTML = base.DOM.isHTMLElement
            ,hasEvent = base.DOM.supportEvent
            , isDomEvent = isHTML(target) && hasEvent(target,eventType)
            , addEventListener = isDomEvent ?
                                    base.DOM.event.addEventListener :
                                        base.event.addEventListener
                                   
            , dispatchEvent = isDomEvent ?
                                base.BOM.event.dispatchEvent :
                                    base.event.dispatchEvent;

            
         if (arguments.length==1){
            base.each(target,function(i,target){
                dispatchEvent(target, eventType); 
            });                     
         }else {
            base.each(target,function(i,target){
                addEventListener(target, eventType, eventHandle, option); 
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
           if(arguments.length<=0){return}
           var target = this.target
               ,isHTML = base.DOM.isHTMLElement
               ,hasEvent = base.DOM.supportEvent
               ,isDomEvent = isHTML(target) && hasEvent(target,eventType)
               ,removeEventListener = isDomEvent ?
                                           base.DOM.event.removeEventListener :
                                               base.event.removeEventListener;

            base.each(target,function(i,target){
                removeEventListener(target, eventType, eventHandle, option);
            }); 
       }
   };
    base.merge(base.avatarCore, avatarAPI);
    base.merge(beacon, openAPI);
    base.init();
})(beacon);