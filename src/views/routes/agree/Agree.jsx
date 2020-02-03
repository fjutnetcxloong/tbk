//协议,2019-11-19,楚小龙

import './Agree.less';

const {urlCfg} = Configs;

export default class AgreeMent extends BaseComponent {
    state = {
        protocol: {} //协议内容
    }

    componentDidMount() {
        this.getProtocol();
    }

    //获取协议
    getProtocol = () => {
        this.fetch(urlCfg.agreement).then(res => {
            if (res && res.status === 0) {
                this.setState({
                    protocol: res.data
                });
            }
        });
    }

    render() {
        const {protocol} = this.state;
        console.log(window.location.href);
        return (
            <div className="agree-container">
                <h3 className="agree-title">{protocol.agreement && protocol.agreement.title}</h3>
                <div className="agree-cont">
                    <pre>{protocol.agreement && protocol.agreement.content}</pre>
                </div>
            </div>
        );
    }
}