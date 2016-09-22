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
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
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
                    if (deep && copy && (jQuery.isPlainObject(copy) ||
                            (copyIsArray = jQuery.isArray(copy)))) {

                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];

                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = jQuery.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };
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
        }
    });

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
            arr=arr.join('.').split('.');
            for(var i=0,l=arr.length;i<l;i++){
                if(tempArr.indexOf(arr[i])==-1){
                    tempArr.push(arr[i])
                }
            }
            return tempArr;
        },
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
            m=Math.pow(10,Math.max.apply(null,r));
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
