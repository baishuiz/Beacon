Beacon
======

轻量级事件类库

### 事件
    事件对象可分为如下几种类型:  
    * 字符串  
        var event = "简单事件字符串";
    * 普通事件对象      
        var event = beacon.createEvent("General Event");
        
    * 复合事件对象      
        var eventA = beacon.createEvent("General Event A");
        var eventB = beacon.createEvent("General Event B");
        var ComEvent = beacon.createEvent(eventA, eventB);
        
### 触发指定对象事件
        beacon(target).on("简单事件字符串");
        
### 广播事件
        beacon.on("简单事件字符串");
        
### 移除指定事件句柄
        var eventHandle = function(){};
        beacon.on("event", eventHandle);        
        beacon.off("event", eventHandle);
        
### 移除特定对象的指定事件句柄
        var eventHandle = function(){};
        var target = {};
        beacon(target).on("event", eventHandle);        
        beacon(target).off("event", eventHandle);        
        
### 移除特定对象的指定事件
        var eventHandle = function(){};
        var target = {};
        beacon(target).on("event", eventHandle);        
        beacon(target).off("event");                
        
### 移除特定对象的所有事件
        var eventHandle = function(){};
        var target = {};
        beacon(target).on("event", eventHandle);        
        beacon(target).off();                        
        
### 特定事件
        var event = beacon.createEvent("test event");
        beacon.on(event, function(){
            console.log("事件已触发");
        });
        beacon.on(event);
        
### 复合事件
        var eventA = beacon.createEvent("test event A");
        var eventB = beacon.createEvent("test event B");
        var ComEvent = beacon.createEvent(eventA, eventB);
        beacon.on(Comevent, function(){
            console.log("事件已触发");
        });
        beacon.on(eventA);
        beacon.on(eventB);