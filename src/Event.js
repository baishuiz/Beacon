
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
       
       ,attachEvent : function(eventName,eventHandle) {
            var eventId = registTarget(this);
            if(eventName instanceof base.combinationalEvent) {
                registCombinationinlEvent(eventId, eventName, eventHandle);
            } else {
                registEvent(eventId, eventName, eventHandle);
            }
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
            base.each(eventHandles,function(i){
                eventObject = {
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
           removeEvent(targetIndex, eventName, eventHandle);
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
        
        if(!eventList[eventId]) {
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
        var eventList = event.eventList;
        var handleProxy = function(eventObject, eventBody){
                var target = this;
                var eventIndex = base.arrayIndexOf(eventList,eventObject.eventType);
                if(eventIndex>=0){
                    eventList.splice(eventIndex, 1);
                }
                
                if(eventList.length===0){
                    eventHandle.call(target,eventBody);
                    eventList = event.resetEventList();
                }
        };
        
        base.each(eventList,function(index){
            registEvent(targetId, eventList[index], handleProxy);
        });
    }
    
    
    
    function removeEvent(eventId, eventName, eventHandle) {
        var indexOf = base.arrayIndexOf;
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
            for(var i=handleList.length;i>=0;i--){
                if(handleList[i] === eventHandle){
                    handleList.splice(i,1);
                }
            }
        } else {
            handleList.splice(0);
        }
    }

    base.Event = Event;
}) (beacon);