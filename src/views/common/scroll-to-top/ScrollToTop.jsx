/*
* 页面跳转，滚动条返回顶部
* 错误边界
* */
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
// import Nothing from '../nothing/Nothing';

// const {appHistory} = Utils;
// const {FIELD} = Constants;
class ScrollToTop extends React.PureComponent {
    static propTypes = {
        children: PropTypes.object,
        location: PropTypes.object
    };

    static defaultProps = {
        children: null,
        location: null
    };

    // state = {
    //     hasError: false
    // }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    render() {
        // const {hasError} = this.state;
        // if (hasError) {
        //     return (
        //         <Nothing
        //             text={FIELD.Page_Crash}
        //             title="返回"
        //             onClick={() => appHistory.goBack()}
        //         />
        //     );
        // }
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);
