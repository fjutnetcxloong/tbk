/**
 * @desc 混合工具函数
 */

import {Toast} from 'antd-mobile';


// 前端提示 content:提示内容  duration:延时关闭  mask:是否显示透明蒙层
export function showInfo(content, duration = 2, mask = true) {
    Toast.info(content, duration, null, mask);
}

// 后端提示成功
export function showSuccess(content, duration = 2, mask = true) {
    Toast.success(content, duration, null, mask);
}

// 后端提示
export function showFail(content, duration = 2, mask = true) {
    Toast.fail(content, duration, null, mask);
}

// 错误提示
export function errorType(data) {
    Toast.info(data.message);
    return ({
        type: null
    });
}

// key 镜像函数
export const keyMirror = (obj) => {
    let key;
    const mirrored = {};
    if (obj && typeof obj === 'object') {
        for (key in obj) {
            if ({}.hasOwnProperty.call(obj, key)) {
                mirrored[key] = key;
            }
        }
    }
    return mirrored;
};

/**
 * 生成 reducer 函数.
 *
 * @param {Object} initialState
 * @param {Object} handlers
 * @returns {function}
 */
export function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if ({}.hasOwnProperty.call(handlers, action.type)) {
            return handlers[action.type](state, action);
        }
        return state;
    };
}

// 获取url参数
export function getUrlParam(name, str) {
    str = str || window.location.search;
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); //构造一个含有目标参数的正则表达式对象
    const r = str.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null;
}

//判断获取的参数是否为'null'
export function itemNull(item) {
    if (item === 'null') item = null;
    return item;
}
