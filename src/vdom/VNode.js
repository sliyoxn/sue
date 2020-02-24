let vid = 1;
class VNode {
    /**
     * @param tag 标签类型
     * @param elem 对应的真实节点
     * @param attr 属性map
     * @param children 当前节点下的子节点
     * @param text 虚拟节点的模板文本
     * @param data 虚拟节点对应的数据
     * @param parent 父节点
     * @param nodeType 节点类型
     * @param render 渲染函数
     *
     */
    constructor({tag, elem, attr, children, text, data = {}, parent, nodeType, render}) {
        this.tag = tag;
        this.elem = elem;
        this.attr = attr;
        this.children = children;
        this.text = text;
        this.data = data;
        this.parent = parent;
        this.nodeType = nodeType;
        this.vid = vid++;
        this.render = render;
    }
}


export default VNode;
