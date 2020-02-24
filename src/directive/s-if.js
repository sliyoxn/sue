import Watcher from "../observe/bean/Watcher.js";
import {getVal} from "../compiler/util.js";

function analysis_s_if(directiveKey, directiveValue, element, context, payload = {}) {

    let comment = document.createComment(directiveKey + "=" + directiveValue + "  " + element.innerText);
    let eleInPage = true;
    let cb = function (newVal) {
        if (newVal) {
            comment.replaceWith(element);
            eleInPage = true;
        } else {
            element.replaceWith(comment);
        }
    };
    let watcher = new Watcher(context.vm, directiveValue, cb);
    if (!getVal(context.vm, directiveValue)) {
        element.replaceWith(comment);
    }
}

export default analysis_s_if;
