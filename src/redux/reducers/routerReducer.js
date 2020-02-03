/**
 *  routerReducer函数定义
 */
import {LOCATION_CHANGE} from 'react-router-redux';

const {createReducer} = Utils,
    /**
     * routerState 初始化
     * @type {state}
     */
    routerState = {
        locationState: null
    };


export default {
    routing: createReducer(routerState, {
        [LOCATION_CHANGE](state, action) {
            return {
                ...routerState,
                locationState: action
            };
        }
    })
};
