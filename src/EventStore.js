/*
 * @module  EventStore
 * MIT Licensed
 * @author  baishuiz@gmail.com
 */
;(function (beacon) {
    var eventList = [];
    var base = beacon.base;
    var EventStructure = base.EventStructure;
    
    function registEvent(target, eventName, eventHandle) {
        var activeStructure = getEventList(target);
        if(!activeStructure) {
            activeStructure = new EventStructure(target);
            eventList.push(activeStructure);
        } 
        activeStructure.attachEvent(eventName, eventHandle);
    }

    function registCombinationEvent(target, event, eventHandle){
        var handleProxy = event.registEvent(eventHandle);
        var eventList = event.getEventList();
        base.each(eventList, function(index){
            registEvent(target, eventList[index], handleProxy);
        });
    }
    
    function removeEvent(target, eventName, eventHandle) {
        if(!target){
            
            base.each(eventList,function(index,activeEvent) {
                //var activeStructure = getEventList(activeTarget);
                activeEvent.removeEvent(eventName, eventHandle);     
            })
            eventList =[];
            return;
        }
        
        var activeStructure = getEventList(target);
        return activeStructure && activeStructure.removeEvent(eventName, eventHandle);
    }
    
    function removeCombinationEvent(target, event, eventHandle) {
        var handleProxyList = event.removeEvent(eventHandle);
        base.each(handleProxyList, function(i){
            var handleProxy = handleProxyList[i];
            var eventList = event.getEventList();
            base.each(eventList, function(index) {
                var eventName = eventList[index];
                removeEvent(target, eventName, handleProxy);    
            });
        });    
    }
    
    function getEventList(target) {
        if(!target){
            return eventList.slice(0);
        }
        for(var i=0; i<eventList.length; i++) {
            var activeEventList = eventList[i];
            if(activeEventList.dom === target ) {
                return  activeEventList;        
            }
        }
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