;(function(beacon){
    var base = beacon.base;
    function CombinationalEvent(){
        
        if(this instanceof CombinationalEvent) {
            return this;
        }
        
        var handleList = [];
        var handleProxyList = [];
        var originalEvents = [].slice.call(arguments, 0);
        var events = originalEvents.slice(0);
        
        var Fn = function() {
            function  resetEventList(){
                events = originalEvents.slice(0);
                return events;
            }
            
            var attachHandleProxy = function(handle, handleProxy){
                var index = base.arrayIndexOf(handleList,handle)
                if(index < 0){
                    handleList.push(handle);
                    handleProxyList.push(handleProxy);
                }
            };
            
            var getHandleProxy = function(handle) {
                var index = base.arrayIndexOf(handleList,handle);
                var handleProxy = handleProxyList[index];
                return handle ? handleProxy : handleProxyList.slice(0) ;
            }
            
            this.resetEventList = resetEventList;
            this.getEventList = function(){
                return originalEvents.slice(0);
            };
            
            
            this.registEvent = function (eventHandle){
                
                var indexOf = base.arrayIndexOf;
                var events = originalEvents.slice(0);
                var handleProxy = function(eventObject, eventBody){
                    var target = this;
                    var eventIndex = indexOf(events,eventObject.eventType);
                    if (eventIndex >= 0) {
                        events.splice(eventIndex, 1);
                    }
                
                    if (events.length === 0) {
                        eventHandle.call(target, eventBody);
                        events = resetEventList();
                    }
                };
                attachHandleProxy(eventHandle, handleProxy);
                return handleProxy;
            };
            
            
            this.removeEvent = function(eventHandle) {
                var handleProxy = [].concat(getHandleProxy(eventHandle));
                return handleProxy;
            }            
        }
        
        Fn.prototype = new CombinationalEvent();
        return new Fn();
    }
    
    base.combinationalEvent = CombinationalEvent;
})(beacon);