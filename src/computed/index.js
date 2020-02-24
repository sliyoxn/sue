import {global, targetSymbol} from "../public/Variable.js";
import Watcher from "../observe/bean/Watcher.js";
import Dep from "../observe/bean/Dep.js";

const computedDepMap = {};
const depCollectFuncArr = [];
function initComputed(vm, computedObj) {
    if (typeof computedObj !== "object") return;
    Object.keys(computedObj).forEach((key) => {
        if (typeof computedObj[key] === "function") {
            wrapComputed(computedObj, key, vm);
        }
    });
    for (let depCollectFunc of depCollectFuncArr) {
        depCollectFunc();
    }
    while (depCollectFuncArr.length) {
        depCollectFuncArr.pop()();
    }
}

function wrapComputed(computedObj, key, vm) {
    let valCache = undefined;
    let originFun = computedObj[key];
    let watcher = new Watcher(vm, key, function () {
        valCache = originFun.call(this);
        computedDepMap[key] && computedDepMap[key].notify();
    }.bind(vm));
    Object.defineProperty(vm, key, {
        get() {
            if (global[targetSymbol]) {
                let dep = computedDepMap[key] ? computedDepMap[key] : (computedDepMap[key] = new Dep());
                dep.addSub(global[targetSymbol]);
            }
            return valCache;
        },
        set(v) {
            valCache = v;
            computedDepMap[key] && computedDepMap[key].notify();
        }
    });
    depCollectFuncArr.push((function () {
        global[targetSymbol] = watcher;
        valCache = originFun.call(vm);
        global[targetSymbol] = null;
    }));
}


export {initComputed}
