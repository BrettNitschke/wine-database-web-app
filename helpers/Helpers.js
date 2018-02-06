

var theHelpers = {};



theHelpers.by = function(name, minor, isAscending=true) {
    const reverseMutliplier = isAscending ? 1 : -1;
    return function (o, p) {
        let a, b;
        let result;
        if (o && p && typeof o === "object" && typeof p === "object") {
            a = o[name];
            b = p[name];
            if (a === b) {
                return typeof minor === 'function' ? minor(o, p) : 0;
            }
            if (typeof a === typeof b) {
                result = a < b ? -1 : 1;
            } else {
                result = typeof a < typeof b ? -1 : 1;
            }
            return result * reverseMutliplier;
        } else {
            throw {
                name: "Error",
                message: "Expected an object when sorting by " + name
            };
        }
    };
};


module.exports = theHelpers;
