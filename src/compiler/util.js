export function getDomEle(el) {
    if (!(el instanceof Element)) {
        el = document.querySelector(el);
    }
    if (el instanceof Element) {
        return el;
    }
    return null;
}



export function getRely(str, context) {
    let regExp = /{{(.+?)}}/gm;
    let array = (typeof str === "string" ? str.match(regExp) : null);
    let returnArray = [];
    if (array != null) {
        for (let i = 0, length = array.length; i < length; i++) {
            regExp.lastIndex = 0;
            returnArray[i] = regExp.exec(array[i])[1];
        }
    }
    return returnArray;
}

export function getRenderFun(vm, template) {
    return function () {
        return template.replace(/{{(.+?)}}/gm , function (target, name ,...arg) {
            return `${getVal(vm, name)}`;
        });
    }
}


export function getVal(object, expOrFunc) {
    let val = undefined;
    let exp = /([.+])/gm;
    try {
        if (typeof expOrFunc === "string") {
            // 处理[0]这种格式的数据
            let exp = /(\[.+?\])/gm;
            let str = expOrFunc.replace(exp, (...arg) => {
                return "." + arg[0].slice(1, arg[0].length - 1);
            });
            let array = str.split(".");
            for (let i = 0, length = array.length; i < length; i++) {
                val = object[array[i]];
                object = val;
            }
        }
    }catch (e) {
        console.info(e);
    }
    return val;
}


export function setVal(object, expOrFunc, value) {
    let val = undefined;
    let exp = /([.+])/gm;
    if (typeof expOrFunc === "string") {
        let exp = /(\[.+?\])/gm;
        let str = expOrFunc.replace(exp, (...arg) => {
            return "." + arg[0].slice(1, arg[0].length - 1);
        });
        let array = str.split(".");
        let length = array.length;
        for (let i = 0; i < length - 1; i++) {
            object = object[array[i]];
        }
        object[array[length - 1]] = value;
    }
}







