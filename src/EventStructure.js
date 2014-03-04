/*
 * @module  EventStructure
 * MIT Licensed
 * @author  baishuiz@gmail.com
 */
;(function (beacon) {
    var base = beacon.base;
    
    
    
    var EventStructure  = function(dom) {
       var arrayIndexOf = base.arrayIndexOf;
       var events = [];
       
       function getEventName(event){
        var eventIndex = arrayIndexOf(events,event);
        if(eventIndex<0){
            eventIndex = events.push(event)-1;
        }
        var eventName = base.isType(event,'String')?event:"event_" + eventIndex;
        return eventName;
       }
       
       var api = {
           dom : dom
          ,attachEvent : function (event, eventHandle) {
              var eventName = getEventName(event);
              events[eventName] = events[eventName] || [];
              events[eventName].push(eventHandle);
              
          }
          
         ,removeEvent : function (event, eventHandle) {
              
              var result;
              if(event && eventHandle) {
                  var eventName = getEventName(event);
                  var eventHandles = events[eventName];
                  var handleIndex = arrayIndexOf(eventHandles, eventHandle);
                  result = events[eventName].splice(handleIndex, 1);
              } else if(event && !eventHandle) {
                  var eventName = getEventName(event);
                  var eventHandles = events[eventName];
                  result = events[eventName];
                  events[eventName] = [];
              } else if(!event && !eventHandle) {
                  result = events;
                  events = [];
              }
              return result;
          }
          
         ,getEventList : function(event){
             var eventName = getEventName(event);
             var result = event ? events[eventName] : events.slice(0);
             return result;
         }
         
         ,getEventName:getEventName
       }
       return api
    }

    base.EventStructure = EventStructure;
}) (beacon);