;(function (global) {

    var _beancon = global.beacon;
    
    // beacon 天赋技能：为对象进行能力加持
    function Avatar(obj) {
        this.target = obj;
    }

    // 苗正根红的 beacon， core.init之后吸收影分身正式踏入战场。
    var beacon = function (obj) {
        if(this !== global){
            beacon.blend(this,beacon); // 是使被扩展方法能够通过call 或 apply 进行继承
        }
        return new Avatar(obj);
    };
    
    beacon.toString = function () { return "baishuiz@gmail.com"};

    // beacon 能力之源
    var core = {
        base : preBeacon,
        avatarCore: Avatar.prototype,
        self: preBeacon,
        init: function () {
            var freeze = Object.freeze;
            global.beacon = beacon;
            core.merge(beacon, preBeacon);
            delete global.beacon.base; // 保护内核，杜绝外部访问
            freeze && freeze(beacon); 
        },
        login:function(){
            global.beacon = beacon;
        },
        logoff:function(){
            global.beacon = _beancon;
        }
    };
    
    
    var preBeacon = {base:core}; // 创建影分身
    global.beacon = preBeacon; // 影分身修行开始， 开始各种能力加持，稍后将在 core.init 后被 beacon 吸收。
    
})(this);