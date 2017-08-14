export function getChildField(obj, attr, value) {
    if(!obj) obj = {};
    let childAttr = null;
    if(attr.indexOf('.') === -1) {
        obj[attr] = value;
        return obj;
    }
    let attrs = attr.split('.');
    for(let index in attrs) {
        let attr = attrs[index];
        if(Number(index) === attrs.length - 1) {
            childAttr[attr] = value;
            break;
        } else if(!childAttr) {
            if(!obj[attr]) obj[attr] = {};
            childAttr = obj[attr];
        } else {
            if(!childAttr[attr]) childAttr[attr] = {};
            childAttr = childAttr[attr];
        }
    }
    return obj;
}