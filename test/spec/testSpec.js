
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
        
        
        describe("移除普通事件侦听", function(){
            it("当同时指定事件名及事件句柄时", function(){
                var result = 0;
                var CUSTOM_EVENT =new String("cusotm event");
                
                function customEventHandle(){
                    result++;
                }
                beacon.on(CUSTOM_EVENT, customEventHandle);
                beacon.on(CUSTOM_EVENT);
                expect(result).toEqual(1);
                beacon.on(CUSTOM_EVENT);
                expect(result).toEqual(2);
                beacon.off(CUSTOM_EVENT, customEventHandle);
                beacon.on(CUSTOM_EVENT);
                expect(result).toEqual(2);
            });
            
            it("移除指定事件名下所有处理句柄", function(){
                var result = {
                    a:0,
                    b:10
                };
                var CUSTOM_EVENT =new String("cusotm event");
                
                function customEventHandleA(){
                    result.a+=1;
                }
                
                function customEventHandleB(){
                    result.b+=1;
                }
                
                beacon.on(CUSTOM_EVENT, customEventHandleA);
                beacon.on(CUSTOM_EVENT, customEventHandleB);

                
                beacon.on(CUSTOM_EVENT);
                expect(result.a).toEqual(1);
                expect(result.b).toEqual(11);
                
                beacon.on(CUSTOM_EVENT);
                expect(result.a).toEqual(2);
                expect(result.b).toEqual(12);
                
                beacon.off(CUSTOM_EVENT);
                
                beacon.on(CUSTOM_EVENT);
                expect(result.a).toEqual(2);
                expect(result.b).toEqual(12);
            });
            
            
            
            
            it("清空全局自定义事件", function(){
                var result = {
                    a:0,
                    b:10
                };
                var CUSTOM_EVENT_A =new String("cusotm event A");
                var CUSTOM_EVENT_B =new String("cusotm event B");
                
                function customEventHandleA(){
                    result.a+=1;
                }
                
                function customEventHandleB(){
                    result.b+=1;
                }
                
                beacon.on(CUSTOM_EVENT_A, customEventHandleA);
                beacon.on(CUSTOM_EVENT_B, customEventHandleB);

                
                beacon.on(CUSTOM_EVENT_A);
                expect(result.a).toEqual(1);
                expect(result.b).toEqual(10);
                
                beacon.on(CUSTOM_EVENT_B);
                expect(result.a).toEqual(1);
                expect(result.b).toEqual(11);
                
                beacon.on(CUSTOM_EVENT_B);
                beacon.on(CUSTOM_EVENT_A);
                expect(result.a).toEqual(2);
                expect(result.b).toEqual(12);
                
                
                beacon.off();
                
                beacon.on(CUSTOM_EVENT_A);
                beacon.on(CUSTOM_EVENT_B);
                expect(result.a).toEqual(2);
                expect(result.b).toEqual(12);
            });
            
        });
    });
    
    
    
    
});
