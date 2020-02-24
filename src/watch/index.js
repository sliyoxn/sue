import Watcher from "../observe/bean/Watcher.js";

function initWatch(vm, watchObj) {

    Object.keys(watchObj).forEach((key) => {
        let cb = watchObj[key];
        let watcher = new Watcher(vm, key, cb);
    });

}


export {initWatch}
