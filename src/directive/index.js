import analysis_s_model from "./s-model.js";
import analysis_s_on from "./s-on.js";
import {analysis_s_bind} from "./s-bind.js";
import analysis_s_if from "./s-if.js";

const map = {
    "s-model" : analysis_s_model,
    "s-on" : analysis_s_on,
    "s-bind" : analysis_s_bind,
    "s-if" : analysis_s_if,
};


export function analysisDirective(attrMap, element, context) {
    Object.keys(attrMap).forEach(directiveKey => {
        let directiveValue = attrMap[directiveKey];
        let directiveName = directiveKey.split(":")[0];
        map[directiveName] && map[directiveName](directiveKey, directiveValue, element, context);
    })
}




