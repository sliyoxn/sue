import {setVal, getVal} from "../compiler/util.js";

export default function analysis_s_model(directiveKey, directiveValue, element,context, payload = {}) {
    if (element.tagName !== "INPUT") return;
    element.value = getVal(context.vm, directiveValue);
    element.addEventListener("input", function (event) {
        let value = event.target.value;
        setVal(context.vm, directiveValue, value);
    });
    element.removeAttribute(directiveKey);
}












