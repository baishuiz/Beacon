;(function(beacon){
    var base = beacon.base;
    function CombinationalEvent(){
        
        if(this instanceof CombinationalEvent) {
            return this;
        }
        
        var handleList = [];
        var handleProxyList = [];
        var events = [].slice.call(arguments, 0);
        
        var Fn = function() {
            function  resetEventList(){
                this.eventList = events.slice(0)
                return this.eventList;
            }
            
            this.resetEventList = resetEventList;
            this.eventList = resetEventList();
            
            this.attachHandleProxy = function(handle, handleProxy){
                var index = base.arrayIndexOf(handleList,handle)
                if(index < 0){
                    handleList.push(handle);
                    handleProxyList.push(handleProxy);
                }
            }
            
            this.getHandleProxy = function(handle) {
                var index = base.arrayIndexOf(handleList,handle);
                var handleProxy = handleProxyList[index];
                return handle ? handleProxy : handleProxyList.slice(0) ;
            }
        }
        
        Fn.prototype = new CombinationalEvent;
        return new Fn;
    }
    
    base.combinationalEvent = CombinationalEvent;
})(beacon);