
describe("工具方法测试", function () {


    describe("blend", function(){
        it("单个对象合并", function(){
            var a = {a:1};
            var b = {a:2, b:1}
            beacon.utility.blend(a,b);
            expect(a.a).toBeDefined(2);
            expect(a.b).toBeDefined(1);
        });

        it("多个对象合并", function(){
          var a = {a:1};
          var b = {a:2, b:1}
          var c = {a:3, b:1, c:6}
          beacon.utility.blend(a,[b,c]);
          expect(a.a).toBeDefined(3);
          expect(a.b).toBeDefined(1);
          expect(a.c).toBeDefined(6);
        });


        it("reset 参数", function(){
          var a = {a:1};
          var b = {b:100}
          beacon.utility.blend(a,b,{reset:true});
          expect(a.a).toBeDefined(undefined);
          expect(a.b).toBeDefined(100);
        });
    });

});
