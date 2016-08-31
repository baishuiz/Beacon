
;(function (beacon) {
    var base = beacon.base || {};
    var _base = {
        /**
        * @name beacon.base.merge
        * @class [merge 将其他对象赋到mainObj上]
        * @param  {Object} mainObj [merge对象到mainObj上]
        * @param  {Object} p1,p2,p3... [支持一次merge多个对象，从第二个参数开始]
        * @return {Object}         [返回merge之后的对象]
        * @example
        * NEG.base.merge({x:1,y:1},{z:1},{a:1})
        * 结果：返回 {x:1,y:1,z:1,a:1}
        */
        merge: function (mainObj) {
            var argLength = arguments.length ;
            for (var index = 0; index < argLength; index++) {
                var sourceObj = arguments[index];
                for (var item in sourceObj) {
                    mainObj[item] = sourceObj[item];
                }
            }
            return mainObj;
        },


        // options : --cover , --mergePrototype, --reset
        blend : function(mainObj,attrSource,options) {
            var _options = {
                cover:true,
                mergePrototype:false,
                reset : false
            };
            options = options ? _base.merge(_options,options): _options;
            attrSource = [].concat(attrSource);
            if(options.reset){
              for(var oitem in mainObj){
                if(!attrSource[0][oitem]){
                  attrSource[0][oitem] = undefined;
                }
              }
            }
            var sourceLength = attrSource.length ;
            for (var index = 0; index < sourceLength; index++) {
                var sourceObj = attrSource[index];
                for (var item in sourceObj) {
                    var rule1 = options.mergePrototype || sourceObj.hasOwnProperty(item);
                    var rule2 = options.cover || !mainObj[item];
                    if(rule1 && rule2) {
                         mainObj[item] = sourceObj[item];
                    }
                }
            }
            return mainObj;

        },




       isType : function(obj,type){
            //return Object.toString.call(obj).indexOf('[object ' + type) == 0 || !!(obj instanceof Number);
            return (type === "Null" && obj === null) ||
                (type === "Undefined" && obj === void 0 ) ||
                (type === "Number" && isFinite(obj)) ||
                 Object.prototype.toString.call(obj).slice(8,-1) === type;
        },





        /**
        * @name beacon.base.ArrayIndexOf
        * @class [返回对象存在数组的index,不存在返回-1]
        * @param {Array} array [操作的数组]
        * @param {Object} el [查找的对象]
        * @returns {number} [返回对象存在数组的Index,不存在返回-1]
        * @example
        * beacon.base.ArrayIndexOf([1,2,3,5],3);
        * 结果：返回 2
        */
        //ToDO：改为两分法快速查找
        arrayIndexOf: function(array, el) {
            _base.arrayIndexOf = Array.prototype.indexOf ?
                        function(array, el){
                            array = [].slice.call(array,0);
                            return array.indexOf(el);
                        } :
                        function(array, el){
                            array = [].slice.call(array,0);
                            for (var i = array.length; i>=0; i-- ) {
                                if (array[i] === el) {
                                    return i;
                                }
                            }
                            return i;
                        };
            return _base.arrayIndexOf(array, el);
        },




       //ToDO： 增加一个可选参数进行深度each
       each : function(array,fn){
            if(!array) return;
            array = [].concat(array);
            for (var i = 0; i < array.length; i++) {
                fn.call(array[i],i,array[i]);
            }
        }
    };
    _base.blend(base, _base);
})(beacon);
