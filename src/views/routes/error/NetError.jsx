/*
* 网络错误组件
* */
import {Button} from 'antd-mobile';
import './Index.less';

const {FIELD} = Constants;
const {appHistory} = Utils;
const Error = () => (
    <React.Fragment>
        <div className="err-container">
            <div className="net-err-img"/>
            <p className="err-title">{FIELD.Net_Error}</p>
            <Button className="err-btn" onClick={() => appHistory.goBack()}>点击刷新</Button>
        </div>
    </React.Fragment>
);

export default class NetError extends React.PureComponent {
    render() {
        return <Error/>;
    }
}
