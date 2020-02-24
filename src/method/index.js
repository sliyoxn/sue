import {proxyKeys} from "../observe/observe.js";

function initMethod(vm, methodObj = {}) {
    proxyKeys(vm, methodObj);
}


export {initMethod};
