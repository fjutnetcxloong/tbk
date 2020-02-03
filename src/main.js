/**
 * 入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';

global.getUserToken = (userToken) => {
    if (userToken === 'null') userToken = '';
    window.localStorage.setItem('userToken', userToken);
};

const timer = setTimeout(() => {
    clearTimeout(timer);
    const render = Component => {
        ReactDOM.render(
            <Component/>,
            document.getElementById('root'),
        );
    };
    render(App);
}, 100);
timer();