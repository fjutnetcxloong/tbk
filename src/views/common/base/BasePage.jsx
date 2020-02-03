
/**
 * 基础组件，加载全局控制的组件，Loading、alert、confirm
 */

import {connect} from 'react-redux';
import {Alert, Confirm} from '../../../components/modal/index';
import {Loading} from '../../../components/toast/index';

class BasePage extends BaseComponent {
    renderLoading = () => {
        const {loadingShow} = this.props;
        return (
            <Loading
                visible={loadingShow}
                type="spinningBubbles"
                color="red"
                width="100"
                height="100"
            />
        );
    };

    renderAlert = () => {
        const {
            alertShow, alertTitle, alertMsg, alertCallback,
            alertBtnText
        } = this.props;
        return (
            <Alert
                visible={alertShow}
                title={alertTitle}
                message={alertMsg}
                btnText={alertBtnText}
                callback={alertCallback}
            />
        );
    };

    renderConfirm = () => {
        const {
            confirmShow, cfmTitle, cfmMsg, cfmBtnTexts,
            cfmCallbacks
        } = this.props;
        return (
            <Confirm
                visible={confirmShow}
                title={cfmTitle}
                message={cfmMsg}
                btnTexts={cfmBtnTexts}
                callbacks={cfmCallbacks}
            />
        );
    };

    //导航菜单

    render() {
        return (
            <div data-component="base" data-role="page">
                {this.renderLoading()}
                {this.renderAlert()}
                {this.renderConfirm()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const base = state.base;
    return {
        loadingShow: base.loadingShow,
        alertShow: base.alertShow,
        alertTitle: base.alertTitle,
        alertMsg: base.alertMsg,
        alertSubMsg: base.alertSubMsg,
        alertCallback: base.alertCallback,
        alertBtnText: base.alertBtnText,
        confirmShow: base.confirmShow,
        cfmTitle: base.cfmTitle,
        cfmMsg: base.cfmMsg,
        cfmBtnTexts: base.cfmBtnTexts,
        cfmCallbacks: base.cfmCallbacks
    };
};


export default connect(mapStateToProps, null)(BasePage);
