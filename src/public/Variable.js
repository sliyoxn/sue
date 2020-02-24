const targetSymbol = Symbol("target");
const global = window || {};
const nodeType = {
    ELEMENT : 1,
    TEXT : 3
};
Object.freeze(nodeType);





export {global, targetSymbol, nodeType};
