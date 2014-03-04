/*
 * @module  EventDispatcher
 * MIT Licensed
 * @author  baishuiz@gmail.com
 */
;(function (beacon) {
    var base        = beacon.base,
        eventStore  = base.eventStore;
        
    var registCombinationEvent = eventStore.registCombinationEvent,
        registEvent            = eventStore.registEvent,
        removeCombinationEvent = eventStore.removeCombinationEvent,
        removeEvent            = eventStore.removeEvent,
        getEventList           = eventStore.getEventList;

    var event = {
       hostProxy : {}
       
       ,attachEvent : function(eventName, eventHandle) {
            //var eventId = registTarget(this);
            var target = this;
            var regEvent = (eventName instanceof base.combinationalEvent) ? 
                               registCombinationEvent :
                                   registEvent;
                                   
            regEvent(target, eventName, eventHandle);
        }
        
       ,fireEvent : function(eventName, eventBody){
            var target = this;
            var eventList = getEventList(target);
            var eventHandles = eventList.getEventList(eventName);

            base.each(eventHandles, function(i){
                var eventObject = {
                    eventType:eventName
                };
                eventHandles[i].call(target,eventObject, eventBody);
            });
        }
       
       ,publicDispatchEvent : function(eventName, eventBody){
            var targetList = getEventList();
            base.each(targetList,function(i){
                var activeTarget = targetList[i];
                event.fireEvent.call(activeTarget.dom, eventName, eventBody);
            });
       }
       
       
       ,removeEvent: function(eventName,eventHandle){
           var target = this;
           if(eventName instanceof base.combinationalEvent) {
               removeCombinationEvent(target, eventName, eventHandle);
           } else {
               removeEvent(target, eventName, eventHandle);
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