import {initData} from "../observe/observe.js";
import {compiler} from "../compiler/compiler.js";
import {initComputed} from "../computed/index.js";
import {initWatch} from "../watch/index.js";
import {initMethod} from "../method/index.js";

class Sue {
    constructor(options) {
        let data = options.data || {};
        let el = options.el || '';
        let method = options.method || {};
        let watch = options.watch || {};
        let computed = options.computed;
        let mountedHook = options.mounted;
        this._data = data;
        this._el = el;
        this._method = method;
        this._watch = watch;
        this._computed = computed;
        initData(this, data);
        initComputed(this, options.computed);
        initWatch(this, options.watch);
        initMethod(this, options.method);
        compiler(options.el, this);
        mountedHook && mountedHook.call(this);
    }
}

export default Sue;
