'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isPublic = isPublic;
function isPublic(req) {
    return new RegExp('/api/auth').test(req.path) || new RegExp('/api/cities').test(req.path) || new RegExp('/api/images').test(req.path) || new RegExp('/api/talks').test(req.path) || new RegExp('/api/notifications/main').test(req.path) || new RegExp('/api/suggestions').test(req.path) || new RegExp('/api/home').test(req.path);
}