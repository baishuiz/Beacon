Beacon
======

轻量级事件类库

## 侦听事件
        var eventStr = "简单事件字符串";
        beacon.on(eventStr, function(){
            console.log("事件已触发");
        });
        
        var target = {msg: 200};
        beacon(target).on(eventStr, function(){
            console.log("触发指定对象事件");
        });
        
## 广播事件
        beacon(target).on("简单事件字符串");
        beacon.on("简单事件字符串");
        
## 特定事件
        var event = beacon.createEvent("test event");
        beacon.on(event, function(){
            console.log("事件已触发");
        });
        beacon.on(event);
        
## 复合事件
        var eventA = beacon.createEvent("test event A");
        var eventB = beacon.createEvent("test event B");
        var ComEvent = beacon.createEvent(eventA, eventB);
        beacon.on(Comevent, function(){
            console.log("事件已触发");
        });
        beacon.on(eventA);
        beacon.on(eventB);