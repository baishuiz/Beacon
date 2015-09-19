
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


    describe("Beacon(target).on ", function(){
        it("自定义普通事件全局广播", function(){
           var CUSTOM_EVENT = beacon.createEvent("custom event");
           var testResult = false;
           var target = {soul:"cat"};
           beacon(target).on(CUSTOM_EVENT, function(){
              testResult = true;
           });

           expect(testResult).toEqual(false);
           beacon(target).on(CUSTOM_EVENT);
           expect(testResult).toEqual(true);
        });


        it("自定义复合事件全局广播", function(){
           var INTEGRANT_EVENT_FIRST  = beacon.createEvent("integrant event first");
           var INTEGRANT_EVENT_SECEND = beacon.createEvent("integrant event secend");
           var COMBINATIOINAL_EVENT   = beacon.createEvent(INTEGRANT_EVENT_FIRST, INTEGRANT_EVENT_SECEND);
           var testResult = 0;
           var target = {soul:"dog"};
           beacon(target).on(COMBINATIOINAL_EVENT, function(){
              testResult++;
           });

           expect(testResult).toEqual(0);
           beacon(target).on(INTEGRANT_EVENT_FIRST);
           expect(testResult).toEqual(0);
           beacon(target).on(INTEGRANT_EVENT_SECEND);
           expect(testResult).toEqual(1);
           beacon(target).on(INTEGRANT_EVENT_SECEND);
           expect(testResult).toEqual(1);
           beacon(target).on(INTEGRANT_EVENT_FIRST);
           expect(testResult).toEqual(2);
        });


        describe("移除普通事件侦听", function(){
            it("当同时指定事件名及事件句柄时", function(){
                var result = 0;
                var CUSTOM_EVENT =beacon.createEvent("cusotm event");
                var target = {soul:"rabbit"};

                function customEventHandle(){
                    result++;
                }
                beacon(target).on(CUSTOM_EVENT, customEventHandle);
                beacon(target).on(CUSTOM_EVENT);
                expect(result).toEqual(1);
                beacon(target).on(CUSTOM_EVENT);
                expect(result).toEqual(2);
                beacon(target).off(CUSTOM_EVENT, customEventHandle);
                beacon(target).on(CUSTOM_EVENT);
                expect(result).toEqual(2);
            });

            it("移除指定事件名下所有处理句柄", function(){
                var result = {
                    a:0,
                    b:10
                };
                var CUSTOM_EVENT =beacon.createEvent("cusotm event");
                var target = {soul:"alpaca"};

                function customEventHandleA(){
                    result.a+=1;
                }

                function customEventHandleB(){
                    result.b+=1;
                }

                beacon(target).on(CUSTOM_EVENT, customEventHandleA);
                beacon(target).on(CUSTOM_EVENT, customEventHandleB);


                beacon(target).on(CUSTOM_EVENT);
                expect(result.a).toEqual(1);
                expect(result.b).toEqual(11);

                beacon(target).on(CUSTOM_EVENT);
                expect(result.a).toEqual(2);
                expect(result.b).toEqual(12);

                beacon(target).off(CUSTOM_EVENT);

                beacon(target).on(CUSTOM_EVENT);
                expect(result.a).toEqual(2);
                expect(result.b).toEqual(12);
            });




            it("清空自定义事件", function(){
                var result = {
                    a:0,
                    b:10
                };
                var CUSTOM_EVENT_A =beacon.createEvent("cusotm event A");
                var CUSTOM_EVENT_B =beacon.createEvent("cusotm event B");
                var target = {soul:" seal"};

                function customEventHandleA(){
                    result.a+=1;
                }

                function customEventHandleB(){
                    result.b+=1;
                }

                beacon(target).on(CUSTOM_EVENT_A, customEventHandleA);
                beacon(target).on(CUSTOM_EVENT_B, customEventHandleB);


                beacon(target).on(CUSTOM_EVENT_A);
                expect(result.a).toEqual(1);
                expect(result.b).toEqual(10);

                beacon(target).on(CUSTOM_EVENT_B);
                expect(result.a).toEqual(1);
                expect(result.b).toEqual(11);

                beacon(target).on(CUSTOM_EVENT_B);
                beacon(target).on(CUSTOM_EVENT_A);
                expect(result.a).toEqual(2);
                expect(result.b).toEqual(12);


                beacon(target).off();

                beacon(target).on(CUSTOM_EVENT_A);
                beacon(target).on(CUSTOM_EVENT_B);
                expect(result.a).toEqual(2);
                expect(result.b).toEqual(12);
            });

        });

        describe("移除复合事件", function(){
            it("指定事件句柄", function(){
                var INTEGRANT_EVENT_FIRST  = beacon.createEvent("integrant event first");
                var INTEGRANT_EVENT_SECEND = beacon.createEvent("integrant event secend");
                var COMBINATIOINAL_EVENT   = beacon.createEvent(INTEGRANT_EVENT_FIRST, INTEGRANT_EVENT_SECEND);
                var testResult = 0;
                var target = {soul:"squirrel"};
                var eventHandle = function(){
                  testResult++;
                };

                beacon(target).on(COMBINATIOINAL_EVENT, eventHandle);

                expect(testResult).toEqual(0);

                beacon(target).on(INTEGRANT_EVENT_FIRST);
                expect(testResult).toEqual(0);

                beacon(target).on(INTEGRANT_EVENT_SECEND);
                expect(testResult).toEqual(1);

                beacon(target).on(INTEGRANT_EVENT_SECEND);
                expect(testResult).toEqual(1);

                beacon(target).on(INTEGRANT_EVENT_FIRST);
                expect(testResult).toEqual(2);

                beacon(target).off(COMBINATIOINAL_EVENT, eventHandle);

                beacon(target).on(INTEGRANT_EVENT_SECEND);
                beacon(target).on(INTEGRANT_EVENT_FIRST);
                expect(testResult).toEqual(2);

            });


            it("清除指定事件下的所有句柄", function(){
                var INTEGRANT_EVENT_FIRST  = beacon.createEvent("integrant event first");
                var INTEGRANT_EVENT_SECEND = beacon.createEvent("integrant event secend");
                var COMBINATIOINAL_EVENT   = beacon.createEvent(INTEGRANT_EVENT_FIRST, INTEGRANT_EVENT_SECEND);
                var target = {soul:"starfish"};
                var testResult = {
                    a:1,b:100
                };
                var eventHandleA = function(){
                  testResult.a++;
                };

                var eventHandleB = function(){
                  testResult.b++;
                };

                beacon(target).on(COMBINATIOINAL_EVENT, eventHandleA);

                expect(testResult.a).toEqual(1);
                expect(testResult.b).toEqual(100);

                beacon(target).on(INTEGRANT_EVENT_FIRST);
                expect(testResult.a).toEqual(1);
                expect(testResult.b).toEqual(100);

                beacon(target).on(INTEGRANT_EVENT_SECEND);
                expect(testResult.a).toEqual(2);
                expect(testResult.b).toEqual(100);


                beacon(target).on(COMBINATIOINAL_EVENT, eventHandleB);

                beacon(target).on(INTEGRANT_EVENT_SECEND);
                expect(testResult.a).toEqual(2);
                expect(testResult.b).toEqual(100);

                beacon(target).on(INTEGRANT_EVENT_FIRST);
                expect(testResult.a).toEqual(3);
                expect(testResult.b).toEqual(101);

                beacon(target).on(INTEGRANT_EVENT_SECEND);
                beacon(target).on(INTEGRANT_EVENT_FIRST);
                expect(testResult.a).toEqual(4);
                expect(testResult.b).toEqual(102);


                beacon(target).off(COMBINATIOINAL_EVENT);

                beacon(target).on(INTEGRANT_EVENT_SECEND);
                beacon(target).on(INTEGRANT_EVENT_FIRST);
                expect(testResult.a).toEqual(4);
                expect(testResult.b).toEqual(102);
            });



            it("清空所有事件", function(){
                var INTEGRANT_EVENT_FIRST  = beacon.createEvent("integrant event first");
                var INTEGRANT_EVENT_SECEND = beacon.createEvent("integrant event secend");
                var COMBINATIOINAL_EVENT   = beacon.createEvent(INTEGRANT_EVENT_FIRST, INTEGRANT_EVENT_SECEND);
                 var target = {soul:"apple"};
                var testResult = 0;
                var eventHandle = function(){
                  testResult++;
                };

                beacon(target).on(COMBINATIOINAL_EVENT, eventHandle);

                expect(testResult).toEqual(0);

                beacon(target).on(INTEGRANT_EVENT_FIRST);
                expect(testResult).toEqual(0);

                beacon(target).on(INTEGRANT_EVENT_SECEND);
                expect(testResult).toEqual(1);

                beacon(target).on(INTEGRANT_EVENT_SECEND);
                expect(testResult).toEqual(1);

                beacon(target).on(INTEGRANT_EVENT_FIRST);
                expect(testResult).toEqual(2);

                beacon(target).off();

                beacon(target).on(INTEGRANT_EVENT_SECEND);
                beacon(target).on(INTEGRANT_EVENT_FIRST);
                expect(testResult).toEqual(2);

            });
        });


        describe("获取事件对象", function() {
            it("当触发普通事件时", function(){
                var target = {};
                var event = beacon.createEvent("test");
                var result = 0;
                beacon(target).on(event, function(event, data){
                    expect(event).toBeDefined();
                    expect(data).toBeDefined();
                    expect(data).toEqual("someData");
                    result = data;
                });
                beacon(target).on(event, "someData");
                expect(result).toEqual("someData");
            });

        });

        describe("DOM事件", function(){
            describe("HTML 元素默认事件", function() {
                it("绑定事件", function() {
                    var result = 100;
                    var div = document.createElement("div");
                    beacon(div).on("click", function(){
                        result += 100;
                    });

                    beacon(div).on("click");
                    expect(result).toEqual(200);
                    beacon(div).on("click");
                    expect(result).toEqual(300);

                    beacon(div).on("click", function(){
                        result += 1;
                    });
                    beacon(div).on("click");
                    expect(result).toEqual(401);
                });


                describe("移除事件", function() {
                    it("指定handle", function(){
                        var result = 100;
                        var div = document.createElement("div");
                        var eventHandleA = function(){
                            result += 100;
                        };

                        var eventHandleB = function(){
                            result += 1;
                        }

                        beacon(div).on("click", eventHandleA);
                        beacon(div).on("click", eventHandleB);

                        beacon(div).on("click");
                        expect(result).toEqual(201);

                        beacon(div).off("click", eventHandleA);
                        beacon(div).on("click");
                        expect(result).toEqual(202);
                    });

                    it("指定eventName， 不指定handle", function(){
                        var result = 100;
                        var div = document.createElement("div");
                        var eventHandleA = function(){
                            result += 100;
                        };

                        var eventHandleB = function(){
                            result += 1;
                        }

                        beacon(div).on("click", eventHandleA);
                        beacon(div).on("click", eventHandleB);

                        beacon(div).on("click");
                        expect(result).toEqual(201);

                        beacon(div).off("click");
                        beacon(div).on("click");
                        expect(result).toEqual(201);
                    });

                    it("清空全部事件", function(){
                        var result = 100;
                        var div = document.createElement("div");
                        var eventHandleA = function(){
                            result += 100;
                        };

                        var eventHandleB = function(){
                            result += 1;
                        }

                        var eventHandleC = function(){
                            result += 10;
                        }

                        beacon(div).on("click", eventHandleA);
                        beacon(div).on("click", eventHandleB);
                        beacon(div).on("dblclick", eventHandleC);

                        beacon(div).on("click");
                        expect(result).toEqual(201);

                        beacon(div).on("dblclick");
                        expect(result).toEqual(211);

                        beacon(div).off();
                        beacon(div).on("dblclick");
                        beacon(div).on("click");
                        expect(result).toEqual(211);
                    });

                });
            });

            describe("window 默认事件", function() {
                it("绑定事件", function() {
                    var result = 0;
                    document.body.style.height = "2000px";
                    beacon(window).on("scroll", function(){
                        result += 100;
                    });

                    beacon(window).on("scroll")
                    expect(result).toEqual(100);
                });
            });
        });

    });

    describe("beacon(target).once", function(){
        it("普通事件侦听与触发", function(){
           var testResult = 0;
           var CUSTOM_EVENT = beacon.createEvent("custom event");
           var target = {};
           beacon(target).once(CUSTOM_EVENT, function(){
               testResult++;
           })

           expect(testResult).toEqual(0);

           // 第一次触发
           beacon(target).on(CUSTOM_EVENT);
           expect(testResult).toEqual(1);

           // 第二次触发
           beacon(target).on(CUSTOM_EVENT);
           expect(testResult).toEqual(1);

           // 第三次全局触发
           beacon.on(CUSTOM_EVENT);
           expect(testResult).toEqual(1);

        });
    });
});



describe("自定义条件事件", function(){
  it("普通条件事件", function(){

    var target = {};
    var result = 0;
    var actionEvent = beacon.createEvent(function(){
        return result == 100;
    });

    beacon(target).on(actionEvent, function(){
        result = 666;
    });

    beacon(target).on(actionEvent);
    expect(result).toEqual(0);

    result = 100;
    beacon(target).on(actionEvent);
    expect(result).toEqual(666);

  });

    it("自定义行为事件", function(){

        var target = {};
        var result = 0;
        var actionEvent = beacon.createEvent(function(e){
            var result = {
              redian : 10,
              speed  : 6
            }
            return result;
        });

        beacon(target).on(actionEvent, function(e) {
            // expect(e.redian).toBeDefined();
            // expect(e.speed).toBeDefined();
            result = 100;
        });

        beacon(document).on("touchmove");
        expect(result).toEqual(100);

        result = 0;
        expect(result).toEqual(0);
        beacon(document).on("mousemove");
        expect(result).toEqual(100);

    });
});
