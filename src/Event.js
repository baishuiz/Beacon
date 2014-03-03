/*
 * @module  EventDispatcher
 * MIT Licensed
 * @author  baishuiz@gmail.com
 */
;(function (beacon) {
    var base = beacon.base;
    var getTargetIndex = base.targetStore.getTargetIndex,
        registTarget   = base.targetStore.registTarget,
        getTargetList  = base.targetStore.getTargetList;
    
    
    var registCombinationEvent = base.eventStore.registCombinationEvent,
        registEvent            = base.eventStore.registEvent,
        removeCombinationEvent = base.eventStore.removeCombinationEvent,
        removeEvent            = base.eventStore.removeEvent,
        getEventList           = base.eventStore.getEventList;
    //var eventList = [];
    //var targetList = [];
    
    var event = {
       hostProxy : {}
       
       ,attachEvent : function(eventName, eventHandle) {
            var eventId = registTarget(this);
            var regEvent = (eventName instanceof base.combinationalEvent) ? 
                               registCombinationEvent :
                                   registEvent;
                                   
            regEvent(eventId, eventName, eventHandle);
        }
        
       ,fireEvent : function(eventName, eventBody){
            var target = this;
            var targetList = getTargetList();
            var eventList = getEventList();
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
            var targetList = getTargetList();
            base.each(targetList,function(i){
                event.fireEvent.call(targetList[i], eventName, eventBody);
            });
       }
       
       
       ,removeEvent: function(eventName,eventHandle){
           var target = this;
           var targetList = getTargetList();
           var targetIndex = getTargetIndex(targetList,target);
           
           if(eventName instanceof base.combinationalEvent) {
               removeCombinationEvent(targetIndex, eventName, eventHandle);
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

    base.Event = Event;
}) (beacon);