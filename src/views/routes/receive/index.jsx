//权益升级页，2019/10/23，楚小龙
import './index.less';
import copy from 'copy-to-clipboard';
import {Button} from 'antd-mobile';

const {getUrlParam, isAndroid} = Utils;
const {urlCfg} = Configs;
export default class Receive extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            wxTip: navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1,
            dataInfo: {}, //卡券信息
            token: decodeURI(getUrlParam('token', encodeURI(props.location.search))),
            type: decodeURI(getUrlParam('type', encodeURI(props.location.search)))  //1为领取页面 2未激活页面
        };
    }

    componentDidMount() {
        const {type} = this.state;
        if (type === '1') {
            this.getCShareInfo();
        } else {
            this.getCactiveInfo();
        }
    }

    //领取数据获取
    getCShareInfo = () => {
        const {token} = this.state;
        this.fetch(urlCfg.getCShareH, {
            data: {token}
        }).then(res => {
            if (res && res.status === 0) {
                this.setState({
                    dataInfo: res.data
                });
            }
        });
    }

    //激活数据获取
    getCactiveInfo = () => {
        const token = decodeURI(getUrlParam('token', encodeURI(this.props.location.search)));
        this.fetch(urlCfg.getCactive, {
            data: {token}
        }).then(res => {
            if (res && res.status === 0) {
                this.setState({
                    dataInfo: res.data
                });
            }
        });
    }


    //点击跳转App
    getTrunToApp = () => {
        const {token, type, dataInfo} = this.state;
        const t = 1000;
        let hasApp = true;
        const t1 = Date.now();
        const ifr = document.createElement('iframe');
        if (isAndroid) {
            if (type === '1') {
                ifr.setAttribute('src', 'cshare://getcard');
            } else {
                ifr.setAttribute('src', 'cshare://activecard');
            }
        } else {
            window.location.href = 'urlSchemCS://';
        }
        ifr.setAttribute('style', 'display:none');
        document.body.appendChild(ifr);
        const openScript = setTimeout(() => {
            const t2 = Date.now();
            if (t2 - t1 < t + 1000) {
                hasApp = false;
            }
        }, t);
        if (isAndroid) {
            if (type === '1') {
                copy(JSON.stringify({token, money: dataInfo.price}));//复制与原生定好的口令，这样进入app时他们会自行判定
            } else {
                copy(token);//复制与原生定好的口令，这样进入app时他们会自行判定
            }
        } else {
            const obj = {
                token,
                type
            };
            copy(JSON.stringify(obj));//复制与原生定好的口令，这样进入app时他们会自行判定
        }
        const openScriptTwo = setTimeout(() => {
            clearTimeout(openScript);//清除上面那个定时器
            if (!hasApp) {
                // 跳转下载链接
                clearTimeout(openScriptTwo);//清除当前定时器
                if (isAndroid) {
                    window.open('https://img.zzha.vip/c_app/capp.apk');
                } else {
                    window.location.href = 'https://img.zzha.vip/c_app/capp.apk';
                }
            }
            document.body.removeChild(ifr);
        }, 2000);
    }

    render() {
        const {dataInfo, type, wxTip} = this.state;
        return (
            <React.Fragment>
                {
                    !wxTip && (type === '1' ? (
                        <div className="receive-wrap">
                            <h2>C享卡领取</h2>
                            <div className="bg"><span>{dataInfo.price}</span></div>
                            <p>{dataInfo.text}</p>
                            <p className="rules">领取说明：如您已下载APP点击领取后我们将跳转APPC享领取页，如您尚未下载APP我们将引导您前往APP下载，下载后请回到该页面或重新扫码进行领取</p>
                            <Button onClick={this.getTrunToApp}>立即领取</Button>
                        </div>
                    ) : (
                        <div className="activation-wrap">
                            <h2>C享卡激活</h2>
                            <div className="bg"><span>{dataInfo.price}</span><p>本卡组共有{dataInfo.count}张C享卡</p></div>
                            <p onClick={this.getTrunToApp}>+新增推卡人</p>
                            <p className="rules">激活说明：如您已下载APP点击领取后我们将跳转APPC享激活页，如您尚未下载APP我们将引导您前往APP下载，下载后请回到该页面或重新扫码进行领取</p>
                            <Button onClick={this.getTrunToApp}>立即激活</Button>
                        </div>
                    ))
                }
                {
                    wxTip && <div className="wx-tip"><img src={require('../../../assets/images/wx.png')}/></div>
                }
            </React.Fragment>
        );
    }
}