import {getDomEle, getRely, getRenderFun} from "./util.js";
import {createElementVNode, createTextNode} from "../vdom/util.js";
import Watcher from "../observe/bean/Watcher.js";
import {analysisDirective} from "../directive/index.js";

function compiler(el, vm) {
    let context = {
        vm
    };
    domToVNode(el, context);
}


function domToVNode(el, context) {
    let element = getDomEle(el);
    if (!element) return;
    if (element.nodeType === 1) {
        return compilerElementNode(element, context);
    } else if (element.nodeType === 3) {
        return compilerTextNode(element, context);
    }
    return null;

}

function compilerElementNode(element, context) {
    let tag = element.tagName;
    let children = [];
    let elem = element;
    let render = null;
    let attrMap = {};
    let childNode = element.childNodes;

    let attrs = element.attributes;
    for (let attr of attrs) {
        attrMap[attr.name] = attr.value;
    }
    analysisDirective(attrMap, element, context);

    childNode.forEach((node) => {
        let vnode;
        if (node.nodeType === 1) {
            vnode = compilerElementNode(node, context);
        } else if (node.nodeType === 3) {
            vnode = compilerTextNode(node, context);
        }
        children.push(vnode);
    });
    return createElementVNode({
        tag,
        children,
        parent,
        elem,
        render,
        attr: attrMap
    });
}

function compilerTextNode(node, context) {
    let template = node.nodeValue;
    let relyArr = getRely(template, context);
    let renderFun = getRenderFun(context.vm, template);
    let parent = null;
    let textNode = createTextNode({
        elem : node,
        render : function () {
            node.nodeValue = renderFun();
        },
        parent,
    });
    let watcherArr = [];
    for (let i = 0; i < relyArr.length; i++) {
        let watcher = new Watcher(context.vm, relyArr[i], textNode.render);
        watcherArr.push(watcher);
    }
    textNode.render();
    return textNode;
}

export {compiler}






