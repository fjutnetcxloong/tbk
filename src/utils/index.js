export {
    keyMirror, createReducer, errorType, getUrlParam,
    showInfo, showFail, showSuccess, itemNull} from './mixin';
// export {rollStatus} from './rollStatus';
const isAndroid = (/android/gi).test(navigator.appVersion);
export {isAndroid};

//复制淘宝链接
global.getTaoBaoUrl = function (res) {
    // alert(2);
    // alert(res);
    window.localStorage.setItem('taoBaoUrl', res);
};