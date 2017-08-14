'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getChildField = getChildField;
function getChildField(obj, attr, value) {
    if (!obj) obj = {};
    var childAttr = null;
    if (attr.indexOf('.') === -1) {
        obj[attr] = value;
        return obj;
    }
    var attrs = attr.split('.');
    for (var index in attrs) {
        var _attr = attrs[index];
        if (Number(index) === attrs.length - 1) {
            childAttr[_attr] = value;
            break;
        } else if (!childAttr) {
            if (!obj[_attr]) obj[_attr] = {};
            childAttr = obj[_attr];
        } else {
            if (!childAttr[_attr]) childAttr[_attr] = {};
            childAttr = childAttr[_attr];
        }
    }
    return obj;
}