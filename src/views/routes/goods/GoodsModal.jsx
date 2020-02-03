//商品详情页弹框，2019/10/24，楚小龙
import {Button, Modal} from 'antd-mobile';
import './GoodsModal.less';

const {urlCfg} = Configs;
const {isAndroid} = Utils;
const alert = Modal.alert;
export default class GoodsModal extends BaseComponent {
    //兑换优惠券
    forExchange = () => {
        const {goodsInfoParams, showModal} = this.props;
        this.fetch(urlCfg.exchangeCoupon, {
            data: {
                goods_id: goodsInfoParams.goodId || goodsInfoParams.skuId || goodsInfoParams.itemId,
                types: goodsInfoParams.types,
                money: goodsInfoParams.coupon_discount || '0'
            }
        }).then(res => {
            if (res && res.status === 0) {
                showModal(false);
                if (res.data.bind && res.data.bind === 2) { //未绑定
                    alert(null, res.message, [
                        {text: '取消', onPress: () => {}},
                        {
                            text: '去绑定',
                            onPress: () => new Promise((resolve) => {
                                this.bindSmallProgram();
                                // Toast.info('onPress Promise', 1);
                                setTimeout(resolve, 1000);
                            })
                        }
                    ]);
                } else {
                    this.goToCamProgram();
                }
            }
        });
    }

    //账号未绑定小程序
    bindSmallProgram = () => {
        console.log('未绑定');
        const {goodsInfoParams: {id}} = this.props;
        const test = true;//是否是测试环境
        if (isAndroid) {
            window.native.turnBinding(`${test ? 'gh_65509d19bc60' : 'gh_e8defccbe927'},pages/member/member?token=${id},${test ? 'test' : 'prev'}`);
        } else {
            window.webkit.messageHandlers.turnBinding.postMessage(`${test ? 'gh_65509d19bc60' : 'gh_e8defccbe927'},pages/member/member?token=${id},${test ? 'test' : 'prev'}`);
        }
    }

    //立即兑换跳转app或h5
    goToCamProgram = () => {
        console.log('已绑定');
        const {goodsInfoParams: {parameter, url, webUrl, skuId}} = this.props;
        const data = {shopType: parameter};
        const data2 = {shopType: parameter, shopUrl: url, webUrl};
        if (parameter === '4') {
            if (isAndroid) {
                window.native.turnTaoBao(JSON.stringify(data));
            } else {
                window.webkit.messageHandlers.turnOpenApp.postMessage(JSON.stringify(data));
            }
        } else if (parameter === '0') {
            if (isAndroid) {
                window.native.turnApp(JSON.stringify(data2));
            } else {
                window.webkit.messageHandlers.turnOpenApp.postMessage(JSON.stringify(data2));
            }
        } else if (parameter === '2') {
            const newUrl = url.replace('https://', '');
            const test = true;
            const token = window.localStorage.getItem('userToken');
            if (isAndroid) {
                window.native.turnBinding(`gh_fd46fdd8f9cd, /pages/index/shop-details/shopDetails?goodsId=${skuId}&pathUrl=${newUrl}&transfer=${parameter}&token=${token},${test ? 'test' : 'prev'}`);
            } else {
                window.webkit.messageHandlers.turnBinding.postMessage(`gh_fd46fdd8f9cd, /pages/index/shop-details/shopDetails?goodsId=${skuId}&pathUrl=${newUrl}&transfer=${parameter}&token=${token},${test ? 'test' : 'prev'}`);
            }
        } else {
            return;
        }
    }

    render() {
        const {showModal, couponInfo} = this.props;
        return (
            <div className="goods-modal-container">
                <div className="goods-modal-mask" onClick={() => showModal(false)}/>
                {
                    couponInfo.images && couponInfo.images.bg
                    && (
                        <div className="goods-modal-content">
                            <div className="modal-content">
                                <img src={couponInfo && couponInfo.images && couponInfo.images.bg} alt=""/>
                                <div className="modal-content-data">
                                    {couponInfo.top_message}
                                </div>
                                <div className="modal-content-data-bottom">
                                    <div className="data-bottom-money">
                                        <p>{couponInfo.message}</p>
                                        <p className="show-warnning">一经兑换概不退回</p>
                                    </div>
                                    <Button onClick={this.forExchange}>立即兑换</Button>
                                    <p className="the-remain">{couponInfo.balance_msg}</p>
                                </div>
                            </div>
                            <div className="modal-close">
                                <div className="modal-close-icon" onClick={() => showModal(false)}/>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}