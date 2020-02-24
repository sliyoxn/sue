function analysis_s_on(directiveKey, directiveValue, element, context) {
    let eventName = directiveKey.split(":")[1];
    let vm = context.vm;
    let cb = vm[directiveValue];

    element.addEventListener(eventName, cb.bind(vm));
    element.removeAttribute(directiveKey);
}

export default analysis_s_on;
