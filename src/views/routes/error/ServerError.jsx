/*
* 服务器错误组件
* */
import {Button} from 'antd-mobile';
import './Index.less';

const {FIELD} = Constants;
const {appHistory} = Utils;

const Error = () => (
    <React.Fragment>
        <div className="err-container">
            <div className="server-err-img"/>
            <p className="err-title">{FIELD.Page_Crash}</p>
            <Button className="err-btn" onClick={() => appHistory.goBack()}>重新加载</Button>
        </div>
    </React.Fragment>
);

export default class ServerError extends React.PureComponent {
    render() {
        return <Error/>;
    }
}