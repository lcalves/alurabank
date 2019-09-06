System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CheckboxItem;
    return {
        setters: [],
        execute: function () {
            CheckboxItem = class CheckboxItem {
                constructor(value, label, checked = false) {
                    this.value = value;
                    this.label = label;
                    this.checked = checked;
                }
            };
            exports_1("CheckboxItem", CheckboxItem);
        }
    };
});
