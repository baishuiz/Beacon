
/*
 * @module  EventDispatcher
 * MIT Licensed
 * @author  baishuiz@gmail.com
 */
;(function (beacon) {
    var base = beacon.base || {};
    
    var eventPrototype = {
        addEventListener : function(eventType, eventHandle){
            
        }
    };
    
    
    /**
     * @name  EventDispatcher
     * @class [非DOM元素 事件发送者构造函数]
     **/
    
    function EventDispatcher() {
        var target = this targetProxy
    }
    EventDispatcher.prototype = eventPrototype;
    
    
    base.event = new EventDispatcher();
    
    
    
    
// temp below
    var event = {};
    var eventList = []
       ,targetList = [];

    function getTargetId(target) {
        var targetId = base.ArrayIndexOf(targetList, target);
        targetId = targetId >= 0 ? 
                        targetId
                           : targetList.push(target) - 1;
        return targetId;
    }

    /**
     * @name beacon.base.Event.addEventListener
     * @class [非DOM元素 事件侦听]
     * @param {Object} target      [事件宿主]
     * @param {[type]} eventName   [事件名]
     * @param {Function} eventHandle [事件处理句柄]
     * @param {Object} option      [配置选项,option.Parameter]
     * @example
     */
    event.addEventListener = function (target, eventName, eventHandle, option) {
        option = option || {};
        option.Parameter = option.Parameter || [];
        eventList[eventName] = eventList[eventName] || {};
        
        //获取事件目标id                
        var targetId = getTargetId(target);

        //压入事件处理句柄
        
        var eventNames = eventList[eventName] 
                   , eventHandles = eventNames[targetId] = eventNames[targetId] || [];
        eventHandles.eventHandleAction = eventHandles.eventHandleAction || function () { };
        eventHandles.push({ target: target, eventHandle: eventHandle, Parameter: option.Parameter });


        eventHandles.eventHandleAction = function (oldevts) {
            return function (data) {
                var eventObjetc = {
                    target: target
                };
                oldevts.call(target, eventObjetc, data);
                //eventHandle.apply(target, option.Parameter);
                eventHandle.call(target, eventObjetc, data);
            }
        } (eventHandles.eventHandleAction);
    };

    /**
    * @name NEG.base.Event.removeEventListener
    * @class [非DOM元素 移除事件侦听]
    * @param {Object} target      [事件宿主]
    * @param {[type]} eventName   [事件名]
    * @param {Function} eventHandle [事件处理句柄:若没有指定会将targetId和对应eventName的事件句柄全部清除]
    * @param {Object} option      [配置选项]
    */
    event.removeEventListener = function (target, eventName, eventHandle, option) {
        var targetId = getTargetId(target)
                    , eventHandles = eventList[eventName][targetId];
        eventHandles.eventHandleAction = function () { };

        for (var i = eventHandles.length - 1; i >= 0; i--) {
            /*
            *Modify by Ben 2012/04/28                
            *若没有指定eventHanlde,会将targetId和对应eventName的事件句柄全部清除
            */
            if (eventHandles[i] && eventHandles[i].eventHandle == eventHandle || !eventHandle) {
                eventHandles.splice(i, 1);
            }
            else {
                eventHandles.eventHandleAction = function (oldevts, currentHandle) {
                    return function () {
                        currentHandle.eventHandle.apply(currentHandle.target, currentHandle.Parameter);
                        oldevts();
                    }
                } (eventHandles.eventHandleAction, eventHandles[i]);
            }
        }
    };

    /**
    * @name NEG.base.Event.dispatchEvent
    * @class [非DOM元素 事件广播]
    * @param {Object} target      [事件宿主]
    * @param {String} eventName   [事件名]
    * @param {Function} eventHandle [事件处理句柄:若没有指定会将targetId和对应eventName的事件句柄全部清除]
    * @param {Object} option      [配置选项]
    */
    event.dispatchEvent = function (target, eventName, data) {
        var eventObjetc = {
            target: target
        };
        var targetId = getTargetId(target),
            eventNames = eventList[eventName];
        //eventNames && eventNames[targetId] && eventNames[targetId].eventHandleAction(data);
        if (eventNames && eventNames[targetId]) {
            for (var i = 0; i < eventNames[targetId].length; i++) {
                eventNames[targetId][i].eventHandle.call(target, eventObjetc, data);
            }
        }

    };

    _Event.publicDispatchEvent = function (eventName, data) {
        for (var targetId = 0; targetId < targetList.length; targetId++) {
            var currentTarget = targetList[targetId];
            currentTarget && _Event.dispatchEvent(currentTarget, eventName, data);
        }
    }

    base.event = base.event || {};
    base.event = event;
}) (beacon);