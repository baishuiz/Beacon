/*
 * @module  EventStore
 * MIT Licensed
 * @author  baishuiz@gmail.com
 */
;(function (beacon) {
    var eventList = [];
    var base = beacon.base;
    
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

    function registCombinationEvent(targetId, event, eventHandle){
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
                    //handleList.splice(handleIndex,1); //IE8 下 splice 没有按照引用方式处理数组
                    events[i].fn.splice(handleIndex,1);
                }
            }
        } else {
            //handleList.splice(0);
            ///events[i].fn.splice(0); //IE8 下 对象属性 的splice 没有效果.
            events[i].fn = [];
        }
    }
    
    function removeCombinationEvent(targetId, event, eventHandle) {
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
    
    var api = {
        registEvent : registEvent,
        registCombinationEvent : registCombinationEvent,
        removeEvent : removeEvent,
        removeCombinationEvent : removeCombinationEvent,
        getEventList : getEventList
    };
    base.eventStore = api;
}) (beacon);