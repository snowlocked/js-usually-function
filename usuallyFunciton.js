(function(global, factory) {

    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {

        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get jQuery.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info.
        module.exports = global.document ?
            factory(global, true) :
            function(w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }

    // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {

    var version = "0.1.0";

    var myUsuallyFunction = function() {
        return new myUsuallyFunction.fn.init();
    }

    myUsuallyFunction.fn = myUsuallyFunction.prototype = {
        version: version,
    };

    var init = myUsuallyFunction.fn.init = function() {
        console.log('init successful');
    };

    myUsuallyFunction.extend = myUsuallyFunction.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // Skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !myUsuallyFunction.isFunction(target)) {
            target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {

            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {

                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (myUsuallyFunction.isPlainObject(copy) ||
                            (copyIsArray = myUsuallyFunction.isArray(copy)))) {

                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && myUsuallyFunction.isArray(src) ? src : [];

                        } else {
                            clone = src && myUsuallyFunction.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = myUsuallyFunction.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    }

    myUsuallyFunction.extend({

        // Unique for each copy of myUsuallyFunction on the page
        expando: "myUsuallyFunction" + (version + Math.random()).replace(/\D/g, ""),

        // Assume jQuery is ready without the ready module
        isReady: true,

        error: function(msg) {
            throw new Error(msg);
        },

        noop: function() {},

        isFunction: function(obj) {
            return myUsuallyFunction.type(obj) === "function";
        },

        isArray: Array.isArray,

        isWindow: function(obj) {
            return obj != null && obj === obj.window;
        },

        isNumeric: function(obj) {

            // As of jQuery 3.0, isNumeric is limited to
            // strings and numbers (primitives or objects)
            // that can be coerced to finite numbers (gh-2662)
            var type = myUsuallyFunction.type(obj);
            return (type === "number" || type === "string") &&

                // parseFloat NaNs numeric-cast false positives ("")
                // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
                // subtraction forces infinities to NaN
                !isNaN(obj - parseFloat(obj));
        },

        isPlainObject: function(obj) {
            var proto, Ctor;

            // Detect obvious negatives
            // Use toString instead of jQuery.type to catch host objects
            if (!obj || toString.call(obj) !== "[object Object]") {
                return false;
            }

            proto = getProto(obj);

            // Objects with no prototype (e.g., `Object.create( null )`) are plain
            if (!proto) {
                return true;
            }

            // Objects with prototype are plain iff they were constructed by a global Object function
            Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
            return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
        },

        isEmptyObject: function(obj) {

            /* eslint-disable no-unused-vars */
            // See https://github.com/eslint/eslint/issues/6125
            var name;

            for (name in obj) {
                return false;
            }
            return true;
        },

        type: function(obj) {
            if (obj == null) {
                return obj + "";
            }

            // Support: Android <=2.3 only (functionish RegExp)
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[toString.call(obj)] || "object" :
                typeof obj;
        },
    });
    /*日期格式转换为特定字符串
     *date：时间
     *formate:格式字符串，如'yyyy-mm-dd HH:mm:ss'等
     */
    myUsuallyFunction.extend({
        dateFormat: function(date, format) {
            var args = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
                "S": date.getMilliseconds()
            };
            if (/(y+)/.test(format))
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var i in args) {
                var n = args[i];
                if (new RegExp("(" + i + ")").test(format))
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
            }
            return format;
        },
        // 设置年月日时间，year必传，其余可选，month为1-12
        setAccDate:function(year,month,day,hour,minute,second){
            month=month?month:1;
            day=day?day:1;
            hour=hour?hour:0;
            minute=minute?minute:0;
            second=second?second:0;
            var theDate = new Date(year,month-1,day,hour,minute,second);
            theDate.setFullYear(year);
            return theDate;
        },
        // 计算年龄
        calAge:function(birthday){
            var now = new Date().getTime();
            birthday = birthday.getTime();
            return Math.floor(new Date(now-birthday).getFullYear()-1970);
        }
    });
    Date.prototype.format = function(format){
        return myUsuallyFunction.dateFormat(this,format);
    };

    // 获取数组最大值，最小值，去重
    myUsuallyFunction.extend({
        max:function(){
            var arr = [];
            for(var i=0,l=arguments.length;i<l;i++){
                arr.push(arguments[i]);
            }
            return Math.max.apply(null,arr.join(',').split(','));
        },
        min:function(){
            var arr = [];
            for(var i=0,l=arguments.length;i<l;i++){
                arr.push(arguments[i]);
            }
            return Math.min.apply(null,arr.join(',').split(','));
        },
        removeSameNum:function(){
            var arr = [],tempArr=[];
            for(var i=0,l=arguments.length;i<l;i++){
                arr.push(arguments[i]);
            }
            arr=arr.join(',').split(',');
            for(var i=0,l=arr.length;i<l;i++){
                if(tempArr.indexOf(arr[i])==-1){
                    tempArr.push(arr[i])
                }
            }
            return tempArr;
        },
    });
    // 大小排序,min2Max：从小到大；max2Min：从大到小
    myUsuallyFunction.extend({
        min2Max:function(){
            var arr = [];
            for(var i=0,l=arguments.length;i<l;i++){
                arr.push(arguments[i]);
            }
            return arr.join(',').split(',').sort(function(a,b){
                return a-b;
            });
        },
        max2Min:function(){
            var arr = [];
            for(var i=0,l=arguments.length;i<l;i++){
                arr.push(arguments[i]);
            }
            return arr.join(',').split(',').sort(function(a,b){
                return b-a;
            });
        }
    });

    // 精确四则运算
    myUsuallyFunction.extend({
        //除法函数，用来得到精确的除法结果
        //说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
        //调用：accDiv(arg1,arg2)
        //返回值：arg1除以arg2的精确结果
        accDiv: function(arg1, arg2) {
            var t1 = 0,
                t2 = 0,
                r1, r2;
            try {
                t1 = arg1.toString().split(".")[1].length;
            } catch (e) {}
            try {
                t2 = arg2.toString().split(".")[1].length;
            } catch (e) {}
            with(Math) {
                r1 = Number(arg1.toString().replace(".", ""))
                r2 = Number(arg2.toString().replace(".", ""))
                return (r1 / r2) * pow(10, t2 - t1);
            }
        },
        //乘法函数，用来得到精确的乘法结果
        //说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
        //调用：accMul(arg1,arg2)
        //返回值：arg1乘以arg2的精确结果
        accMul: function(arg1, arg2) {
            var m = 0,
                s1 = arg1.toString(),
                s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length;
            } catch (e) {}
            try {
                m += s2.split(".")[1].length;
            } catch (e) {}
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        },
        //加法函数，用来得到精确的加法结果
        //说明：javascript的加法结果会有误差，在浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
        //调用：accAdd(arg1,arg2,...)
        //返回值：arguments相加的精确结果
        accAdd: function() {
            var r=[],sum=0,m;
            for(var i=0,l=arguments.length;i<l;i++){
                try{
                    r[i]=arguments[i].toString().split('.')[1].length;
                }catch(e){
                    r[i]=0;
                }
            }
            m=Math.pow(10,myUsuallyFunction.max(r));
            for(var i=0,l=arguments.length;i<l;i++){
                sum+=arguments[i]*m;
            }
            return sum/m;
        },
        //减法函数，用来得到精确的减法结果
        //说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
        //调用：accAdd(arg1,arg2)
        //返回值：arg1减去arg2的精确结果
        accSub: function(arg1, arg2) {
            var r1, r2, m, n;
            try {
                r1 = arg1.toString().split(".")[1].length;
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            } catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            //last modify by deeka
            //动态控制精度长度
            n = (r1 >= r2) ? r1 : r2;
            return ((arg1 * m - arg2 * m) / m).toFixed(n);
        },
        //求余函数
        accMod: function(arg1, arg2) {
            var r1, r2, m;
            try {
                r1 = arg1.toString().split(".")[1].length
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length
            } catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            return ((arg1 * m) % (arg2 * m)) / m;
        }
    });
    //给Number类型赋予四则运算方法
    Number.prototype.accAdd = function(num){
        return myUsuallyFunction.accAdd(this,num);
    };
    Number.prototype.accSub = function(num){
        return myUsuallyFunction.accSub(this,num);
    };
    Number.prototype.accMul = function(num){
        return myUsuallyFunction.accMul(this,num);
    }
    Number.prototype.accDiv = function(num){
        return myUsuallyFunction.accDiv(this,num);
    }
    Number.prototype.accMod = function(num){
        return myUsuallyFunction.accMod(this,num);
    }

    //生产随机整数及补全位数（针对验证码补0）
    myUsuallyFunction.extend({
        random:function(min,max){
            if(!max){
                max=min;
                min=0;
            }
            if(min>max){
                min=[max,max=min][0];
            }
            return Math.floor(Math.random().accMul(max-min+1)+min);
        },
        add0:function(num,totalLength){
            num = num.toString().split('.')[0];
            l=totalLength-num.length;
            for(var i=0;i<l;i++){
                num = "0"+num;
            }
            return num;
        }
    });
    // 针对Number补0（如果Number为小数，则去掉小数;为负数，则取正）
    Number.prototype.add0 = function(totalLength){
        return myUsuallyFunction.add0(Math.abs(this),totalLength);
    }
    var

    // Map over myUsuallyFunction in case of overwrite
        _myUsuallyFunction = window.myUsuallyFunction,

        // Map over the _ in case of overwrite
        __ = window._;

    if (!noGlobal) {
        window.myUsuallyFunction = window._ = myUsuallyFunction;
    }


    return myUsuallyFunction;
})
