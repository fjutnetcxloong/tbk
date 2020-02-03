/**
 * app 路口文件
 */
import {Fragment} from 'react';
import {Provider} from 'react-redux';
import {hot} from 'react-hot-loader';
import initReactFastclick from 'react-fastclick';
import {store} from '../redux/store';
import BasePage from './common/base/BasePage';
import {ViewRoutes} from './routes/index';
import './App.less';

initReactFastclick();

const App = () => (
    <Provider store={store}>
        <Fragment>
            <BasePage/>
            <ViewRoutes/>
        </Fragment>
    </Provider>
);

export default hot(module)(App);
