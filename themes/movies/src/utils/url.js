export const convertParams = (params) => {
    return Object.keys(params).map(key => {
        if(Array.isArray(params[key])){
            return key + '=' + params[key].join(",")
        }else{
            if(params[key] && typeof params[key] === "object"){
                let obj = params[key]
                return Object.keys(obj).map(i => `${key}[${i}]=${obj[i]}`).join("&")
            }
            return key + '=' + params[key]
        }
    }).join('&')
}

export const getParamsAsObject = (query) => {

    query = query.substring(query.indexOf('?') + 1);

    let re = /([^&=]+)=?([^&]*)/g;
    let decodeRE = /\+/g;

    let decode = function (str) {
        return decodeURIComponent(str.replace(decodeRE, " "));
    };

    let params = {}, e;
    e = re.exec(query);
    while (e) {
        let k = decode(e[1]), v = decode(e[2]);
        if (k.substring(k.length - 2) === '[]') {
            k = k.substring(0, k.length - 2);
            (params[k] || (params[k] = [])).push(v);
        }
        else params[k] = v;
        e = re.exec(query);
    }

    let assign = function (obj, keyPath, value) {
        let lastKeyIndex = keyPath.length - 1;
        for (let i = 0; i < lastKeyIndex; ++i) {
            let key = keyPath[i];
            if (!(key in obj))
                obj[key] = {}
            obj = obj[key];
        }
        obj[keyPath[lastKeyIndex]] = value;
    }

    for (let prop in params) {
        let structure = prop.split('[');
        if (structure.length > 1) {
            let levels = [];
            structure.forEach(function (item, i) {
                let key = item.replace(/[?[\]\\ ]/g, '');
                levels.push(key);
            });
            assign(params, levels, params[prop]);
            delete(params[prop]);
        }
    }
    return params;
};