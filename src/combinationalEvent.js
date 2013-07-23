;(function(beacon){
    var base = beacon.base;
    function CombinationalEvent(){
        if(this instanceof CombinationalEvent) {
            return this;
        }
        events = [].slice.call(arguments,0);
        var args = events.slice();
        
        var fn = function(){
            this.eventList = args;
            this.resetEventList = function(){
                events.slice();
            }
        }
        fn.prototype = new CombinationalEvent;
        
        return new fn;
    }
    base.combinationalEvent = CombinationalEvent;
})(beacon);