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

       ,attachActionEvent : function(eventName) {
            var isActionEvent = base.isType(eventName.desc, 'Function');
            isActionEvent && window.beacon(document).on("touchmove", function(e){
              event.publicDispatchEvent(eventName, e);
            });

            isActionEvent && window.beacon(document).on("mousemove", function(e){
              event.publicDispatchEvent(eventName, e);
            });
       }

       ,attachEvent : function(eventName, eventHandle) {
            var target   = this;
            var regEvent = (eventName instanceof base.combinationalEvent)
                           ? registCombinationEvent
                           : registEvent;

            event.attachActionEvent(eventName);
            regEvent(target, eventName, eventHandle);
        }

       ,fireEvent : function(eventName, eventBody){
            var target       = this;
            var eventList    = getEventList(target);
            var eventHandles = eventList.getEventList(eventName);

            base.each(eventHandles, function(index, activeEventHandle){
                var eventObject = {
                    eventType:eventName
                };
                activeEventHandle.call(target, eventObject, eventBody);
            });
        }

       ,publicDispatchEvent : function(eventName, eventBody){
            var targetList    = getEventList();
            var isActionEvent = base.isType(eventName.desc, 'Function');
            var actioniResult = isActionEvent && eventName.desc(eventBody);
            (!!actioniResult == !!isActionEvent) && fire();

            function fire(){
              base.each(targetList, function(i){
                  var activeTarget = targetList[i].dom;
                   event.fireEvent.call(activeTarget, eventName, eventBody);
              });
            }
       }


       ,removeEvent: function(eventName,eventHandle){
            var target = this;
            var removeFnProxy = (eventName instanceof base.combinationalEvent) ?
                                    removeCombinationEvent :
                                        removeEvent;
            removeFnProxy(target, eventName, eventHandle);
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
