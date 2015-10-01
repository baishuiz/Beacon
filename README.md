Beacon
======

轻量级事件类库

### 事件  
事件对象可分为如下几种类型:  
* 字符串  
    可以是浏览器预定事件名，也可以自定义任意字符串

        var event = "简单事件字符串";
* 普通事件
    引用类型，通过 createEvent 方法创建。参数可选，建议传入简短描述文字，以便开发调试。

        var event = beacon.createEvent("General Event");

* 复合事件
    引用类型，通过 createEvent 方法创建。参数为任意事件类型，参数数量不限。

        // 定义两个普通事件
        var eventA = beacon.createEvent("General Event A");
        var eventB = beacon.createEvent("General Event B");

        // 由以上两个普通事件组合成为一个复合事件
        var ComEvent = beacon.createEvent(eventA, eventB);

* 行为事件
    引用类型，通过 createEvent 方法创建。参数为 Function 类型，仅限一个参数。

        // 定义一个行为事件， 用户 mousemove 或 touchmove 时会执行该方法。
        // 当 actionEvent 返回值为 true 时触发事件。
        var actionEvent = beacon.createEvent(function(target, eventHandle){
            // 此处编写你的判断逻辑。。。。
            return true;  
        });

        beacon.on(actionEvent, function(){});


### 事件侦听
事件侦听分为以下两种方式：
* 指定侦听对象

        beacon(target).on(event, eventHandle);

* 全局侦听

        beacon.on(event, eventHandle);

### 触发事件

* 触发指定对象事件

        beacon(target).on(event, [userData]);

* 广播事件

        beacon.on(event, [userData]);

### 移除事件侦听
* 移除全局事件

        beacon.off("event" [, eventHandle]);

* 移除特定对象的指定事件

        beacon(target).off("event" [, eventHandle]);


* 移除特定对象的所有事件

        beacon(target).off();
