//超级搜，2019/10/24，楚小龙

import './SuperSearch.less';
import {Button} from 'antd-mobile';

const {urlCfg} = Configs;
const {isAndroid} = Utils;
export default class SuperSearch extends BaseComponent {
    state = {
        superSearchInfo: {}, //超级搜信息
        couponType: false //优惠券类型
    }

    componentDidMount() {
        this.getInfo();
    }

    //点击跳转超级搜页面
    superSearch = () => {
        if (isAndroid) {
            window.native.superSearch('gh_631bf54a285c,hc_pdd/pages/index/index&goodId=456789');
        } else {
            window.webkit.messageHandlers.superSearch.postMessage('我是js传递过来的数据');
        }
    }

    //优惠券类型判断
    getCouponType = (couponType) => {
        this.setState({
            couponType
        });
    }

    //超级搜图片获取
    getInfo = () => {
        this.fetch(urlCfg.superSearch).then(res => {
            if (res && res.errno === 0) {
                this.setState({
                    superSearchInfo: res.data
                });
            }
        });
    }

    render() {
        const {superSearchInfo, couponType} = this.state;
        return (
            <div className="super-search-container">
                <div className="super-search-part1">
                    <img src={superSearchInfo.so} alt=""/>
                    <div className="part1-text">
                        <div className="part1-text-search">
                            <p onClick={this.superSearch}>输入商品名或粘贴拼多多商品标题</p>
                            <div className="super-search-scale"/>
                            {/* <img onClick={this.superSearch} src={require('../../../assets/images/search.png')} alt=""/> */}
                        </div>
                        <div className="part1-text-btn">
                            <div className="pdd-btn-img">
                                <Button
                                    className={couponType ? '' : 'am-button-selected'}
                                    onClick={() => this.getCouponType(false)}
                                >拼多多优惠券
                                </Button>
                            </div>
                            <div className="jd-btn-img">
                                <Button
                                    className={couponType ? 'am-button-selected' : ''}
                                    onClick={() => this.getCouponType(true)}
                                >
                                    京东优惠券
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="super-search-part2">
                    <img src={superSearchInfo.sobian} alt=""/>
                </div>
                <div className="super-search-part3">
                    <img src={couponType ? superSearchInfo.jdhelp : superSearchInfo.pddhelp} alt=""/>
                </div>
            </div>
        );
    }
}
