import {global, targetSymbol} from "../public/Variable.js";
import Dep from "./bean/Dep.js";

function observe(obj) {
    if (typeof obj !== "object") return;
    let proxy = getProxyObj(obj);
    // proxy是浅代理
    // 需要循环所有的属性，进行深代理，这样才能把整个对象都转化成响应式的
    Object.keys(proxy).forEach((key) => {
        if (typeof proxy[key] === "object") {
            proxy[key] = observe(proxy[key]);
        }
    });
    return proxy;
}
function getProxyObj(obj) {
    // 用于存放属性的Dep, dep[key]就是这个属性的Dep
    let depMap = {};
    return new Proxy(obj, {
        get(target, key, proxy) {
            if (global[targetSymbol]) {
                let dep = depMap[key] ?
                    depMap[key] : (depMap[key] = new Dep());
                dep.addSub(global[targetSymbol]);
            }
            return target[key];
        },
        set(target, key, value, proxy) {
            target[key] = value;
            depMap[key] && depMap[key].notify(value);
            return true;
        }
    });
}

/**
 * 把target.xx的访问代理到proxyTo.xx上
 * @param target
 * @param proxyTo
 */
function proxyKeys(target, proxyTo) {
    Object.keys(proxyTo).forEach((key) => {
        Object.defineProperty(target, key, {
            configurable : true,
            enumerable : true,
            get() {
                return proxyTo[key];
            },
            set(v) {
                proxyTo[key] = v;
            }
        })
    })
}


function initData(vm, data) {
    proxyKeys(vm, observe(data));
}

export {initData , proxyKeys};
