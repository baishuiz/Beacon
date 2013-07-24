;(function(beacon){
    var base = beacon.base;
    function CombinationalEvent(){
        if(this instanceof CombinationalEvent) {
            return this;
        }
        
        var events = [].slice.call(arguments,0);
        var fn = function(){
            function  resetEventList(){
                return events.slice(0);
            }
            
            this.resetEventList = resetEventList;
            this.eventList = resetEventList();
        }
        fn.prototype = new CombinationalEvent;
        
        return new fn;
    }
    base.combinationalEvent = CombinationalEvent;
})(beacon);