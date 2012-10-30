;(function (host) {
    var _Event = {};

    var eventList = []
       , targetList = []

    function getTargetId(target) {
        var targetId = (targetId = base.ArrayIndexOf(targetList, target)) >= 0
                           ? targetId
                           : targetList.push(target) - 1;
        return targetId;
    };


    _Event.addEventListener = function (target, eventName, eventHandle, option) {

        option = option || {};
        option.Parameter = option.Parameter || [];
        //var targetList = eventList.targetList

        //获取事件目标id                
        var targetId = getTargetId(target)
            , eventNames = eventList[eventName] = eventList[eventName] || {} //压入事件处理句柄
            , eventHandles = eventNames[targetId] = eventNames[targetId] || [];
            
        eventHandles.eventHandleAction = eventHandles.eventHandleAction || function () { };
        eventHandles.push({ target: target, eventHandle: eventHandle, Parameter: option.Parameter });

        eventHandles.eventHandleAction = function (oldevts) {
            return function () {
                oldevts();
                eventHandle.apply(target, option.Parameter);
            }
        } (eventHandles.eventHandleAction);
    };


    _Event.removeEventListener = function (target, eventName, eventHandle, option) {
        var targetId = getTargetId(target)
                    , eventHandles = eventList[eventName][targetId];
        eventHandles.eventHandleAction = function () { };

        for (var i = eventHandles.length - 1; i >= 0; i--) {

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


    _Event.dispatchEvent = function (target, eventName) {
        switch (arguments.length) {
            case 2:
                var targetId = getTargetId(target),
                    eventNames = eventList[eventName];
                eventNames[targetId] && eventNames[targetId].eventHandleAction();
                break;
            case 1:
                eventName = arguments[0];
                for (var targetId = 0; targetId < targetList.length; targetId++) {
                    var currentTarget = targetList[targetId];
                    currentTarget && arguments.callee(currentTarget, eventName);
                }
        }
    };

    host = host || window;
    host.Event = _Event;
}) (window);