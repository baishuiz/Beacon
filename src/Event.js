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

       ,attachActionEvent : function(eventName, target, eventHandle) {
            var actionEvent = eventName.desc;
            var isActionEvent = base.isType(eventName.desc, 'Function');
            isActionEvent && actionEvent(target, eventHandle);
            var eventList = ['touchmove', 'mousemove'];

            base.each(eventList, function(i, activeEvent){
              isActionEvent && window.beacon(document).on(activeEvent, function(e){
                event.publicDispatchEvent(eventName, e);
              });
            })

       }

       ,attachEvent : function(eventName, eventHandle) {
            var target   = this;
            var regEvent = (eventName instanceof base.combinationalEvent)
                           ? registCombinationEvent
                           : registEvent;

            event.attachActionEvent(eventName, target, eventHandle);
            regEvent(target, eventName, eventHandle);
        }

       ,fireEvent : function(eventName, eventBody){
            var target        = this;
            var eventList     = getEventList(target);
            if(!eventList) {return}
            var eventHandles  = eventList.getEventList(eventName);
            var isActionEvent = base.isType(eventName.desc, 'Function');
            var actioniResult = isActionEvent && eventName.desc(eventBody);

            (!!actioniResult == !!isActionEvent) &&
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

            base.each(targetList, function(i){
                var activeTarget = targetList[i].dom;
                event.fireEvent.call(activeTarget, eventName, eventBody);
            });

       }


       ,removeEvent: function(eventName,eventHandle){
            var target = this;
            var removeFnProxy = (eventName instanceof base.combinationalEvent)
                                ?  removeCombinationEvent
                                :  removeEvent;
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
