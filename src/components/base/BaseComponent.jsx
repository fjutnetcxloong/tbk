/**
 * 根组件  封装组件一些逻辑通用方法
 */
import PropTypes from 'prop-types';
import {baseActionCreator as actionCreator} from '../../redux/baseAction';
import {fetch, abort} from '../../http/axios';

class BaseComponent extends React.PureComponent {
    static propTypes = {
        children: PropTypes.array
    };

    static contextTypes = {
        store: PropTypes.object
    };

    static defaultProps = {
        children: null
    };


    constructor(props, context) {
        super(props, context);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     const thisProps = this.props || {},
    //         thisState = this.state || {},
    //         newProps = nextProps || {},
    //         newState = nextState || {};
    //     if (Object.keys(thisProps).length !== Object.keys(newProps).length
    //         || Object.keys(thisState).length !== Object.keys(newState).length) {
    //         return true;
    //     }
    //     return false;
    // }

    // 元素销毁时，清掉未完成Ajax回调函数, 关闭alert、confirm弹窗
    componentWillUnmount() {
        console.log('BaseComponent componentWillUnmount', this.getComponnetName());
        const {store} = this.context,
            base = store.getState().base;
        base.alertShow && store.dispatch(actionCreator.hideAlert());
        base.confirmShow && store.dispatch(actionCreator.hideConfirm());
        abort();
    }

    // 获取组件名称
    getComponnetName() {
        try {
            return this.__proto__.constructor.name;
        } catch (e) {
            return '';
        }
    }

    // 获取子元素, 返回正确的子元素
    getChildren() {
        const children = [];
        React.Children.forEach(this.props.children, (child) => {
            if (React.isValidElement(child)) {
                children.push(child);
            }
        });
        return children;
    }

    /**
     * 发送http请求
     */
    fetch(url, params) {
        return fetch(url, params);
    }

    // 终止http请求
    abort() {
        abort();
    }
}

export default BaseComponent;
