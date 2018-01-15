export function isPublic(req) {
    return new RegExp('/api/auth').test(req.path) ||
        new RegExp('/api/rasgadas').test(req.path)
}