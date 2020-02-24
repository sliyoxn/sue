import VNode from "./VNode.js";
import {nodeType} from "../public/Variable.js";

export function createElementVNode({tag, children, parent, elem, render, attr}) {
    return new VNode({
        tag,
        children,
        parent,
        elem,
        nodeType : nodeType.ELEMENT,
        render,
        attr
    })
}

export function createTextNode({elem, render, parent}) {
    return new VNode({
        elem,
        render,
        parent,
        nodeType : nodeType.TEXT
    })
}
