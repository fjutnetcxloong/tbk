/**
 * @desc base --actionTypes、actionCreator定义,调用actionCreator函数返回action对象或函数
 * @returns {baseActionTypes, baseActionCreator}
 */

import {keyMirror} from '../utils/mixin';

const baseActionTypes = keyMirror({
    SHOW_LOADING: '',
    HIDE_LOADING: '',
    HIDE_ALL_LOADING: '',
    SHOW_ALERT: '',
    HIDE_ALERT: '',
    SHOW_CONFIRM: '',
    HIDE_CONFIRM: '',
    SHOW_POPUP: '',
    HIDE_POPUP: '',
    SET_CODE: '',
    SET_USER_TOKEN: ''
});

/**
 * 显示加载中动画
 * @returns {action}
 */
function _showLoading() {
    return {
        type: baseActionTypes.SHOW_LOADING
    };
}

/**
 * 取消加载中动画
 *
 * @returns {action}
 */
function _hideLoading() {
    return {
        type: baseActionTypes.HIDE_LOADING
    };
}

/**
 * 取消全部加载中动画
 *
 * @returns {action}
 */
function _hideAllLoading() {
    return {
        type: baseActionTypes.HIDE_ALL_LOADING
    };
}

/**
 * 显示alert弹窗
 *
 * @param param
 * @returns {Function}
 *
 */
function _showAlert(params = {}) {
    const {title, message, btnText, callback} = params;
    return {
        type: baseActionTypes.SHOW_ALERT,
        playload: {
            alertTitle: title,
            alertMsg: message,
            alertBtnText: btnText,
            alertCb: callback
        }
    };
}

/**
 * 关闭alert弹窗
 *
 * @param param
 * @returns {action}
 *
 */
function _hideAlert() {
    return {
        type: baseActionTypes.HIDE_ALERT
    };
}

/**
 * 显示 confirm 弹窗
 *
 * @param param
 * @returns {Function}
 *
 */
function _showConfirm(params) {
    const {title, message, btnTexts, callbacks} = params;
    return {
        type: baseActionTypes.SHOW_CONFIRM,
        playload: {
            cfmTitle: title,
            cfmMsg: message,
            cfmBtnTexts: btnTexts,
            cfmCallbacks: callbacks
        }
    };
}

/**
 * 关闭confirm弹窗
 *
 * @return {action}
 */
function _hideConfirm() {
    return {
        type: baseActionTypes.HIDE_CONFIRM
    };
}

function _setCode(code) {
    return {
        type: baseActionTypes.SET_CODE,
        playload: {
            code
        }
    };
}

function _setUserToken(userToken) {
    return {
        type: baseActionTypes.SET_USER_TOKEN,
        payload: {
            userToken
        }
    };
}

const baseActionCreator = {
    showLoading: _showLoading,
    hideLoading: _hideLoading,
    hideAllLoading: _hideAllLoading,
    showAlert: _showAlert,
    hideAlert: _hideAlert,
    showConfirm: _showConfirm,
    hideConfirm: _hideConfirm,
    setCode: _setCode,
    setUserToken: _setUserToken
};


export {baseActionTypes, baseActionCreator};
