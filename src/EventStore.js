/*
 * @module  EventStore
 * MIT Licensed
 * @author  baishuiz@gmail.com
 */
;(function (beacon) {
    var eventList = [];
    var base = beacon.base;
    var EventStructure = base.EventStructure;

    function createEventStructure(target) {
      var structure = new EventStructure(target);
      eventList.push(structure);
      return structure;
    }

    function registEvent(target, eventName, eventHandle) {
      var activeStructure = getEventList(target) || createEventStructure(target);
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
        var cloneEventList = eventList.slice(0)
        var structureList = target ? (getEventList(target) || []) : eventList.slice(0);
        base.each(structureList, function(index, activeStructure) {

            activeStructure.removeEvent(eventName, eventHandle);
            if(!eventName && !eventHandle){
              var index = base.arrayIndexOf(eventList,activeStructure);
              cloneEventList.splice(index,1);
           }
        });
        eventList = cloneEventList;
    }

    function removeCombinationEvent(target, event, eventHandle) {
        var handleProxyList = event.removeEvent(eventHandle);
        base.each(handleProxyList, function(i){
            var handleProxy = handleProxyList[i];
            var eventList = event.getEventList();
            base.each(eventList, function(index, eventName) {
                removeEvent(target, eventName, handleProxy);
            });
        });
    }

    function getEventList (target) {
      if(!target){
        return eventList.slice(0);
      }
      for(var i = 0; i < eventList.length; i++) {
        var activeEventList = eventList[i];
        if(activeEventList.target === target ) {
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
