/*
 * @module  TargetStore
 * MIT Licensed
 * @author  baishuiz@gmail.com
 */
;(function (beacon) {
    var base = beacon.base;

    var targetList = [];
    
    function getTargetIndex(targetList,target){
         var targetIndex = base.arrayIndexOf(targetList,target);
         return targetIndex;
    }
    
    function registTarget(target) {
        var targetIndex = getTargetIndex(targetList,target);
        if(targetIndex<0){
            targetIndex = targetList.push(target) - 1;
        }
        return targetIndex;
    }
    
    function getTargetList(isRef){
        return isRef ? targetList : targetList.slice(0) ;
    }
    
    var TargetStoreApi = {
        getTargetIndex : getTargetIndex,
        registTarget   : registTarget,
        getTargetList  : getTargetList
    };
    

    base.targetStore = TargetStoreApi;
}) (beacon);