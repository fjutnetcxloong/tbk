/**
 * confirm 弹窗
 */

import {Modal} from 'antd-mobile';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {baseActionCreator as actionCreator} from '../../../redux/baseAction';
import './index.less';

class Confirm extends React.PureComponent {
    static propTypes = {
        visible: PropTypes.bool,
        title: PropTypes.string,
        message: PropTypes.string,
        btnTexts: PropTypes.array,
        callbacks: PropTypes.array,
        hideConfirm: PropTypes.func.isRequired
    };

    static defaultProps = {
        visible: false,
        title: '',
        message: '',
        btnTexts: ['取消', '确认'],
        callbacks: null
    }

    messageRender() {
        const {message} = this.props;
        return message ? <span>{message}</span> : null;
    }

    render() {
        console.log('confirm render');
        const {
            visible,
            title,
            btnTexts,
            callbacks,
            hideConfirm
        } = this.props;
        const footer = [{
            text: btnTexts[0],
            onPress: () => {
                callbacks && callbacks[0] && callbacks[0]();
                hideConfirm();
            }
        }, {
            text: btnTexts[1],
            onPress: () => {
                callbacks && callbacks[1] && callbacks[1]();
                hideConfirm();
            }
        }];
        return (
            <Modal
                title={title}
                transparent
                maskClosable={false}
                visible={visible}
                platform="ios"
                footer={footer}
            >
                {this.messageRender()}
            </Modal>
        );
    }
}

const mapDispatchToProps = {
    hideConfirm: actionCreator.hideConfirm
};

export default connect(null, mapDispatchToProps)(Confirm);
