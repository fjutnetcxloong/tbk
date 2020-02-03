import {currentHref as href} from './hrefCfg';

export const urlCfg = {
    goodsDetail: href.apiPath + 'goodsdetail',  // 商品详情
    exchangeCoupon: href.apiPath + 'tbk-use-balance', //兑换优惠券
    getBalanceMoney: href.apiPath + 'tbk-get-balance', //查询当前余额
    getUrlProgrm: href.apiPath + 'shareurl', //跳转到小程序所需要的url
    applyForPromotion: href.apiPath + 'ApplyExtension', //申请成为推广员
    superSearch: href.apiPath + 'Chaojiso', //超级搜
    rootGrow: href.apiPath + 'Headcolor', //获取用户身份
    agreement: href.apiPath + 'agreement', //获取协议
    tbGoodsDetail: href.apiPath + 'tbk-inter-f', //淘宝商品详情
    getCShare: href.apiPath + 'get-ticket-info', //C享卡领取
    getCShareH: href.apiPath + 'get-ticket-info-h5', //C享卡领取
    getCactive: href.apiPath + 'get-build-info' //C享卡几激活
};
