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
       var api = {
           dom : dom
          ,attachEvent : function (eventName, eventHandle) {
              events[eventName] = events[eventName] || [];
              events[eventName].push(eventHandle);
              events.push(eventName);
          }
          
         ,removeEvent : function (eventName, eventHandle) {
              var eventHandles = events[eventName];
              var result;
              if(eventName && eventHandle) {
                  var handleIndex = arrayIndexOf(eventHandles, eventHandle);
                  result = events[eventName].splice(handleIndex, 1);
              } else if(eventName && !eventHandle) {
                  result = events[eventName];
                  events[eventName] = [];
              } else if(!eventName && !eventHandle) {
                  result = events;
                  events = [];
              }
              return result;
          } 
       }
       return api
    }

    base.EventStructure = EventStructure;
}) (beacon);