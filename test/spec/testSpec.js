
describe("Beacon", function () {
    it("初始化", function () {
        expect(window.beacon).toBeDefined();
    });
    
    describe("测试API完整性", function(){
        it("定义了 on 方法", function(){
            expect(beacon.on).toBeDefined();
        });    
    });
    
    
    
    describe("对指定目标进行扩展", function(){
        it("基于 prototype 继承", function(){
            var Fn = function(){};
            Fn.prototype = beacon;
            var obj = new Fn;
            expect(obj.on).toBeDefined();
        });
        
        it("基于 call 继承", function(){
            var Fn = function(){
                beacon.call(this);
            };
            var obj = new Fn;
            expect(obj.on).toBeDefined();
        });
        
        
        it("生成对象代理", function(){
            var obj = {};
            var objProxy = beacon(obj);
            expect(objProxy.on).toBeDefined();
        });        
    });
    
    
    describe("Beacon.on", function(){
        it("自定义普通事件全局广播", function(){
           var CUSTOM_EVENT = new String("custom event");
           var testResult = false;
           beacon.on(CUSTOM_EVENT, function(){
              testResult = true;   
           }); 
           
           expect(testResult).toEqual(false);
           beacon.on(CUSTOM_EVENT);
           expect(testResult).toEqual(true);
        });
        
        
        it("自定义复合事件全局广播", function(){
           var INTEGRANT_EVENT_FIRST  = new String("integrant event first");
           var INTEGRANT_EVENT_SECEND = new String("integrant event secend");
           var COMBINATIOINAL_EVENT   = beacon.combinationalEvent(INTEGRANT_EVENT_FIRST, INTEGRANT_EVENT_SECEND);
           var testResult = 0;
           beacon.on(COMBINATIOINAL_EVENT, function(){
              testResult++;   
           }); 
           
           expect(testResult).toEqual(0);
           beacon.on(INTEGRANT_EVENT_FIRST);
           expect(testResult).toEqual(0);
           beacon.on(INTEGRANT_EVENT_SECEND);
           expect(testResult).toEqual(1);
           beacon.on(INTEGRANT_EVENT_SECEND);
           expect(testResult).toEqual(1);
           beacon.on(INTEGRANT_EVENT_FIRST);
           expect(testResult).toEqual(2);
        });        
    });
    
    
    
    
});
