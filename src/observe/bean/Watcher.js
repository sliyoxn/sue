import {global, targetSymbol} from "../../public/Variable.js";
import {getVal} from "../../compiler/util.js";
/**
 *
 * @param vm vue实例
 * @param exp 要监听的属性的表达式
 * @param cb
 * @constructor
 */
export default class Watcher {
    constructor(vm, exp, cb) {
        this.cb = cb;
        this.vm = vm;
        this.exp = exp;
        this.value = this.get();
    };

    update() {
        this.run();
    }

    run() {
        let value = getVal(this.vm, this.exp);
        let oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    }

    get() {
        global[targetSymbol] = this;
        let value = getVal(this.vm, this.exp);
        global[targetSymbol] = null;
        return value;
    }
}
