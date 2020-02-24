import Watcher from "../observe/bean/Watcher.js";
import {getVal} from "../compiler/util.js";

function analysis_s_bind(directiveKey, directiveValue, element, context) {

    let attrName = directiveKey.split(":")[1];
    let vm = context.vm;
    let watcher = new Watcher(vm, directiveValue, function (newVal) {
        element.setAttribute(attrName, newVal);
    }.bind(vm));

    element.setAttribute(attrName, getVal(vm, directiveValue));
    element.removeAttribute(directiveKey);
    
}

export {analysis_s_bind}
