/**
 *  baseReducer函数定义
 */
import {baseActionTypes as ActionTypes} from '../baseAction';

const {createReducer} = Utils,
    loadingState = {
        loadingShow: false,
        loadingNum: 0
    },
    alertState = {
        alertShow: false,
        alertTitle: '',
        alertMsg: '',
        alertBtnText: '',
        alertCallback: null
    },
    confirmState = {
        confirmShow: false,
        cfmTitle: '',
        cfmMsg: '',
        cfmBtnTexts: [],
        cfmCallbacks: null
    },
    popupState = {
        popupShow: false,
        popAnimationType: ''
    };
/**
 * baseState 初始化 1
 * @type {state}
 */
const baseState = {
    ...loadingState,
    ...alertState,
    ...confirmState,
    ...popupState
};

export default {
    base: createReducer(baseState, {
        [ActionTypes.SHOW_LOADING](state) {
            let loadingNum = state.loadingNum;
            return Object.assign({}, state, {
                loadingShow: true,
                loadingNum: ++loadingNum
            });
        },
        [ActionTypes.HIDE_LOADING](state) {
            let loadingNum = state.loadingNum;
            console.log(loadingNum);
            loadingNum = loadingNum > 0 ? --loadingNum : 0;
            if (loadingNum === 0) {
                return Object.assign({}, state, {
                    loadingShow: false,
                    loadingNum
                });
            }
            return Object.assign({}, state, {
                loadingNum
            });
        },
        [ActionTypes.HIDE_ALL_LOADING](state) {
            return Object.assign({}, state, {
                loadingShow: false,
                loadingNum: 0
            });
        },
        [ActionTypes.SHOW_ALERT](state, action) {
            const {
                alertTitle,
                alertMsg,
                alertCb,
                alertBtnText
            } = action.playload;
            return Object.assign({}, state, {
                alertShow: true,
                alertTitle,
                alertMsg,
                alertCb,
                alertBtnText
            });
        },
        [ActionTypes.HIDE_ALERT](state) {
            return Object.assign({}, state, {
                alertShow: false
            });
        },
        [ActionTypes.SHOW_CONFIRM](state, action) {
            const {
                cfmTitle,
                cfmMsg,
                cfmBtnTexts,
                cfmCallbacks
            } = action.playload;
            return Object.assign({}, state, {
                confirmShow: true,
                cfmTitle,
                cfmMsg,
                cfmBtnTexts,
                cfmCallbacks
            });
        },
        [ActionTypes.HIDE_CONFIRM](state) {
            return Object.assign({}, state, {
                confirmShow: false
            });
        },
        [ActionTypes.SHOW_POPUP](state, action) {
            const {
                popAnimationType
            } = action.playload;
            return Object.assign({}, state, {
                popupShow: true,
                popAnimationType
            });
        },
        [ActionTypes.HIDE_POPUP](state) {
            return Object.assign({}, state, {
                popupShow: false
            });
        },
        [ActionTypes.SET_CODE](state, action) {
            const {code} = action.playload;
            return Object.assign({}, state, {
                code: code
            });
        },
        [ActionTypes.SET_USER_TOKEN](state, action) {
            const {userToken} = action.payload;
            return Object.assign({}, state, {
                userToken: userToken
            });
        }
    })
};
