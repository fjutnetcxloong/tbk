
const hrefCfg = {
    // 测境
    dev: {
        apiPath: 'https://csapi.zzhads.vip/ticket/',
        apiShopPath: '',
        scan: ''
    },
    // 预生产环境
    preProd: {
        apiPath: '',
        scan: ''
    },
    // 生产环境
    production: {
        apiPath: 'https://api.zzhads.vip/ticket/',
        scan: ''
    }
};


const currentHref = (function () {
    let url;
    function __chkEnv(envName) {
        const env = process.env.NODE_ENV || '';
        if (env === envName) return true;
        return false;
    }
    if (__chkEnv('production')) {
        url = hrefCfg.production;
    } else if (__chkEnv('prev')) {
        url = hrefCfg.preProd;
    } else {
        url = hrefCfg.dev;
    }
    return url;
}());


export {currentHref, hrefCfg};
