import {createLogger} from 'redux-logger';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import {createHashHistory as createHistory} from 'history';
import {rootReducer} from './reducers';


// 创建 history 单例
const hashHistory = createHistory();

const routersMiddleware = routerMiddleware(hashHistory),
    middleware = [routersMiddleware];
const reducers = combineReducers({
    ...rootReducer
});
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(reducers, applyMiddleware(...middleware));

/**
 * 添加 reducer 函数
 * @param reducer
 */
function injectReducer(reducer) {
    store.replaceReducer(combineReducers({
        ...rootReducer,
        ...reducer
    }));
}


export {store, injectReducer, hashHistory};
