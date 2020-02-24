export default class Dep {
    constructor() {
        // 初始化订阅者列表
        this.subs = new Set();
    }
    addSub(sub) {
        // 添加订阅者
        this.subs.add(sub);
    }
    notify() {
        this.subs.forEach((sub) => {
            // 通知订阅者
            sub.update();
        })
    }
}
