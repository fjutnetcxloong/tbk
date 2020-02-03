//商品详情页，2019/10/23，楚小龙

import {Modal, Toast} from 'antd-mobile';
import copy from 'copy-to-clipboard';
import GoodsModal from './GoodsModal';
import './GoodsDetail.less';
import CarouselComponent from './CarouselComponent';

const {getUrlParam, isAndroid, itemNull} = Utils;
const {urlCfg} = Configs;
export default class GoodsDetail extends BaseComponent {
    constructor(props) {
        super(props);
        global.getTaoBaoUrl = function (res) {
            window.localStorage.setItem('taoBaoUrl', res);
        };

        this.state = {
            isModal: false, //兑换弹出框
            goodsInfo: {}, //商品信息
            couponInfo: {}, //优惠券信息
            isBind: true, //是否已绑定
            isShowCarousel: false, //轮播图查看
            shareModal: false, //分享弹出框
            copyStatus: false, //是否复制链接
            goodsInfoParams: {
                // goodId: 60909582212,
                // skuId: 60909582212,
                // itemId: 606559524979,
                // parameter: '4',
                // types: 7,
                // coupon_remain_count: 4000,
                // coupon_total_count: 5000,
                // coupon_start_time: '2019-12-10',
                // coupon_end_time: '2020-12-10',
                // coupon_discount: '30'
                goodId: this.calcNull('goodId'), //京东商品ID
                skuId: this.calcNull('skuId'), //拼多多商品ID
                itemId: this.calcNull('itemId'), //淘宝ID
                parameter: this.calcNull('parameter'), //判断商品类型
                types: this.calcNull('types'), //优惠券类型
                coupon_remain_count: this.calcNull('coupon_remain_count'), //券数量
                coupon_total_count: this.calcNull('coupon_total_count'), //优惠券总数量
                coupon_start_time: this.calcNull('coupon_start_time'), //优惠券开始时间
                coupon_end_time: this.calcNull('coupon_end_time'), //优惠券结束时间
                coupon_discount: this.calcNull('coupon_discount') //优惠券金额
            },
            isApp: true //是否是在app的环境之下
        };
    }

    componentDidMount() {
        const {goodsInfoParams: {parameter}} = this.state;
        if (parameter === '4') { //此时请求的是淘宝商品
            this.getTbGoods();
        } else {
            this.getGoodsDetail();
        }
        // this.getTbGoods();
        this.browserEnvironment();
    }

    //从外部浏览器跳转至app指定页
    getTrunToApp = () => {
        const t = 1000;
        let hasApp = true;
        const t1 = Date.now();
        const ifr = document.createElement('iframe');
        if (isAndroid) {
            ifr.setAttribute('src', 'cshare://sharelink');
        } else {
            window.location.href = 'urlSchemCS://';
        }
        ifr.setAttribute('style', 'display:none');
        const obj = {
            cshareKey: window.location.hash.replace('&router=other', ''),
            taoBaoUrl: window.localStorage.getItem('taoBaoUrl')
        };
        copy(JSON.stringify(obj));//复制与原生定好的口令，这样进入app时他们会自行判定
        document.body.appendChild(ifr);
        const openScript = setTimeout(() => {
            const t2 = Date.now();
            if (t2 - t1 < t + 1000) {
                hasApp = false;
            }
        }, t);
        const openScriptTwo = setTimeout(() => {
            clearTimeout(openScript);//清除上面那个定时器
            if (!hasApp) {
                // 跳转下载链接
                clearTimeout(openScriptTwo);//清除当前定时器
                if (isAndroid) {
                    window.open('https://img-1259000115.cos.ap-beijing.myqcloud.com/c_app/capp1.0.1.apk');
                } else {
                    window.location.href = 'https://apps.apple.com/cn/app/id1488411321';
                }
            }
            document.body.removeChild(ifr);
        }, 2000);
    }

    //判断是否是微信浏览器环境
    browserEnvironment = () => {
        const wx = navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
        if (wx) {
            this.setState({
                wxTip: true
            });
        }
    }

    //请求淘宝商品详情
    getTbGoods = () => {
        const {goodsInfoParams} = this.state;
        this.fetch(urlCfg.tbGoodsDetail, {data: {
            interType: 'goods_detail',
            item_id: goodsInfoParams.itemId,
            money: goodsInfoParams.coupon_discount
        }}).then(res => {
            if (res && res.status === 0) {
                this.setState({
                    goodsInfo: res.data
                });
            }
        });
    }

    //分享弹窗
    showShareModal = (show) => {
        // e.preventDefault(); // 修复 Android 上点击穿透
        const router = decodeURI(getUrlParam('router', encodeURI(this.props.location.search)));
        if (router === 'other') {
            this.getTrunToApp();
        } else {
            this.setState({
                shareModal: show
            });
        }
    }

    //关闭分享弹窗
    onClose = () => {
        this.setState({
            shareModal: false
        });
    }

    componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方
        const numNext = decodeURI(getUrlParam('userId', encodeURI(this.props.location.search)));
        const numPrev = decodeURI(getUrlParam('userId', encodeURI(nextProps.location.search)));
        if (numPrev !== 'null' && numPrev !== '' && numNext !== numPrev) {
            const {goodsInfoParams} = this.state;
            goodsInfoParams.goodId = this.receiveNull('goodId', nextProps.location.search);
            goodsInfoParams.skuId = this.receiveNull('skuId', nextProps.location.search);
            goodsInfoParams.itemId = this.receiveNull('itemId', nextProps.location.search);
            goodsInfoParams.parameter = this.receiveNull('parameter', nextProps.location.search);
            goodsInfoParams.types = this.receiveNull('types', nextProps.location.search);
            goodsInfoParams.coupon_remain_count = this.receiveNull('coupon_remain_count', nextProps.location.search);
            goodsInfoParams.coupon_total_count = this.receiveNull('coupon_total_count', nextProps.location.search);
            goodsInfoParams.coupon_start_time = this.receiveNull('coupon_start_time', nextProps.location.search);
            goodsInfoParams.coupon_end_time = this.receiveNull('coupon_end_time', nextProps.location.search);
            goodsInfoParams.coupon_discount = this.receiveNull('coupon_discount', nextProps.location.search);
            this.setState({
                goodsInfoParams
            });
        }
    }

      //公用方法
      calcNull = (item) => {
          const {location: {search}} = this.props;
          return itemNull(decodeURI(getUrlParam(item, encodeURI(search))));
      }

      //公共方法
      receiveNull = (item, nextSearch) => (
          itemNull(decodeURI(getUrlParam(item, encodeURI(nextSearch))))
      )

    //弹出框开关
    showModal = (isModal) => {
        const router = decodeURI(getUrlParam('router', encodeURI(this.props.location.search)));
        if (router === 'other') {
            this.getTrunToApp();
        } else {
            // if (!window.localStorage.getItem('userToken')) { //未登陆的时候
            //     if (isAndroid) {
            //         window.native.showLogin();
            //     } else {
            //         window.webkit.messageHandlers.showLogin.postMessage('数据');
            //     }
            //     return;
            // }
            if (isModal) { //模态框显示时才请求接口
                this.getBalance();
            }
            this.setState({
                isModal
            });
        }
    }

    //是否绑定弹窗
    showBindModal = (isBind) => {
        this.setState({
            isBind
        });
    }

    //获取商品信息
    getGoodsDetail = () => {
        const {goodsInfoParams} = this.state;
        this.fetch(urlCfg.goodsDetail, {
            data: {
                goods_id_list: goodsInfoParams.goodId || goodsInfoParams.skuId,
                parameter: goodsInfoParams.parameter
            }
        }).then(res => {
            if (res && res.status === 0) {
                this.setState({
                    goodsInfo: res.data
                });
            }
        });
    }

    //查询优惠券信息
    getBalance = () => {
        const {goodsInfoParams} = this.state;
        this.fetch(urlCfg.getBalanceMoney, {
            data: {
                types: goodsInfoParams.types,
                goods_id: goodsInfoParams.goodId || goodsInfoParams.skuId || goodsInfoParams.itemId,
                money: goodsInfoParams.coupon_discount || '0'
            }
        }).then(res => {
            if (res && res.status === 0) {
                this.setState({
                    couponInfo: res.data
                }, () => {
                    this.getProgramUrl();
                });
            } else if (res.status === 1) {
                this.showModal(false);
            }
        });
    }

    //获取跳转url
    getProgramUrl = () => {
        const {goodsInfoParams, goodsInfo} = this.state;
        this.fetch(urlCfg.getUrlProgrm, {
            data: {
                goods_id: goodsInfoParams.goodId || goodsInfoParams.skuId || goodsInfoParams.itemId,
                parameter: goodsInfoParams.parameter,
                materialUrl: goodsInfo.materialUrl,
                couponUrl: goodsInfo.couponInfo && goodsInfo.couponInfo.couponList && goodsInfo.couponInfo.couponList[0] && goodsInfo.couponInfo.couponList[0].link
            }
        }).then(res => {
            if (res && res.status === 0) {
                //拼多多的跳转app的链接和京东的h5链接
                goodsInfoParams.url = res.data.we_app_web_view_url_cut || (res.data && res.data.we_app_info && res.data.we_app_info.page_path) || (goodsInfo.couponInfo && goodsInfo.couponInfo.couponList && goodsInfo.couponInfo.couponList[0] && goodsInfo.couponInfo.couponList[0].link);//跳转app的链接
                goodsInfoParams.webUrl = res.data.url;//这是跳转拼多多的h5链接，未安装APP时使用
                this.setState({
                    goodsInfoParams
                });
            }
        });
    }

    //轮播图查看
    showCarousel = (isShowCarousel) => {
        this.setState({
            isShowCarousel
        });
    }

    // 分享功能
    shareFunc = (shareType) => {
        const {goodsInfo} = this.state;
        const data = {shareType, title: goodsInfo.goods_name || (goodsInfo.results && goodsInfo.results.n_tbk_item[0] && goodsInfo.results.n_tbk_item[0] && goodsInfo.results.n_tbk_item[0].cat_name), desc: goodsInfo.goods_desc || (goodsInfo.results && goodsInfo.results.n_tbk_item[0] && goodsInfo.results.n_tbk_item[0] && goodsInfo.results.n_tbk_item[0].title), goodsPic: goodsInfo.goods_thumbnail_url || (goodsInfo.results && goodsInfo.results.n_tbk_item[0] && goodsInfo.results.n_tbk_item[0] && goodsInfo.results.n_tbk_item[0].pict_url), shareLink: window.location.href || (goodsInfo.results && goodsInfo.results.n_tbk_item[0] && goodsInfo.results.n_tbk_item[0] && goodsInfo.results.n_tbk_item[0].item_url)};
        const str = data.shareLink;
        data.shareLink = str + '&router=other';//设置前往其他浏览器时的区别
        if (isAndroid) {
            window.native.share(JSON.stringify(data));
        } else {
            window.webkit.messageHandlers.share.postMessage(JSON.stringify(data));
        }
    }

    // 复制链接
    copyLink = () => {
        this.setState({
            copyStatus: true
        });
        Toast.info('复制成功', 1);
        if (isAndroid) {
            window.native.copyLink(`${window.location.href}&router=other`);
        } else {
            window.webkit.messageHandlers.copyLink.postMessage(`${window.location.href}&router=other`);
        }
    }

    //判断商品来源使用logo
    showIcon = () => {
        const {goodsInfoParams: {parameter}} = this.state;
        let iconName = '';
        if (parameter === '0') {
            iconName = 'part1-icon-pdd';
        } else if (parameter === '2') {
            iconName = 'part1-icon-jd';
        } else if (parameter === '4') {
            iconName = 'part1-icon-tb';
        } else {
            iconName = 'part1-icon-default';
        }
        return iconName;
    }

    render() {
        const {goodsInfo, isModal, couponInfo, goodsInfoParams, isShowCarousel, wxTip, isApp} = this.state;
        const router = decodeURI(getUrlParam('router', encodeURI(this.props.location.search)));
        return (
            <div className="goods-detail-container">
                {
                    router === 'other' && isApp && (
                        <div id="open-app">
                            <span onClick={() => { this.setState({isApp: false}) }}>X</span>
                            <div className="app-content">
                                <span/>
                                <span>打开C享网APP</span>
                                <p>看见不同的世界</p>
                            </div>
                            <span onClick={this.getTrunToApp}>打开APP</span>
                        </div>
                    )
                }

                <div className={isShowCarousel ? 'show-carousel goods-detail-top' : 'goods-detail-top'}>
                    {
                        isShowCarousel && (
                            <div
                                className="carousel-mask"
                                onClick={() => this.showCarousel(false)}
                                style={{height: window.screen.height + 'px'}}
                            />
                        )
                    }
                    <CarouselComponent showCarousel={this.showCarousel} goodsPicture={goodsInfo.goods_gallery_urls || (goodsInfo.results && goodsInfo.results.n_tbk_item && goodsInfo.results.n_tbk_item[0] && goodsInfo.results.n_tbk_item[0].small_images.string && goodsInfo.results.n_tbk_item[0].small_images.string)}/>
                </div>
                <div className="goods-detail-bottom">
                    <div className="goods-detail-bottom-part1 pd30">
                        <div className="part1-price-container">
                            <span>￥</span>
                            {
                                goodsInfo.now_price && <span className="part1-price">{goodsInfo.now_price}</span>
                            }
                            {
                                goodsInfoParams.coupon_discount && (goodsInfo.results && goodsInfo.results.n_tbk_item && goodsInfo.results.n_tbk_item[0] && goodsInfo.results.n_tbk_item[0].zk_final_price) && <span className="part1-price">{goodsInfo && goodsInfo.results && goodsInfo.results.n_tbk_item && goodsInfo.results.n_tbk_item[0] && goodsInfo.results.n_tbk_item[0].now_price}</span>
                            }
                            <span>券后价</span>
                        </div>
                        <div className="part1-title-container">
                            <div className={this.showIcon()}/>
                            <span>{goodsInfo.goods_name || (goodsInfo.results && goodsInfo.results.n_tbk_item && goodsInfo.results.n_tbk_item[0] && goodsInfo.results.n_tbk_item[0].title)}</span>
                        </div>
                        <div className="part1-ticket">
                            <span>￥{goodsInfo.min_normal_price || goodsInfo.min_group_price || (goodsInfo.results && goodsInfo.results.n_tbk_item && goodsInfo.results.n_tbk_item[0] && goodsInfo.results.n_tbk_item[0].zk_final_price)}参考价</span>
                            <span>已领：{(goodsInfo.coupon_total_quantity && (goodsInfo.coupon_total_quantity * 1 - goodsInfo.coupon_remain_quantity * 1)) || (goodsInfoParams.coupon_total_count * 1 - goodsInfoParams.coupon_remain_count * 1)}</span>
                        </div>
                    </div>
                    <div className="goods-detail-bottom-part2 pdl-r-30">
                        <div className="part-container">
                            <div className="part2-left">
                                <div className="part2-left-price">
                                ￥<span className="price">{goodsInfo.coupon_discount || goodsInfoParams.coupon_discount}</span>
                                </div>
                                <div className="part2-left-margin">
                                    <p>优惠券</p>
                                    <p>{goodsInfo.coupon_start_time || goodsInfoParams.coupon_start_time}-{goodsInfo.coupon_end_time || goodsInfoParams.coupon_end_time}</p>
                                </div>
                            </div>
                            <div className="part2-right" onClick={() => this.showModal(true)}>立即兑换</div>
                        </div>
                    </div>
                </div>
                <div className="goods-detail-bottom-part3">
                    <div className="part3-detail-title">商品详情</div>
                    <div>
                        {
                            goodsInfo.goods_gallery_urls
                                ? goodsInfo.goods_gallery_urls && goodsInfo.goods_gallery_urls.map((item, index) => (
                                    <img key={item} src={item} alt="图片"/>
                                )) : goodsInfo.results && goodsInfo.results.n_tbk_item[0] && goodsInfo.results.n_tbk_item[0] && goodsInfo.results.n_tbk_item[0].small_images.string && goodsInfo.results.n_tbk_item[0].small_images.string.map(item => (
                                    <img key={item} src={item} alt="图片"/>
                                ))
                        }
                    </div>
                </div>
                {/* 兑换弹窗 */}
                {
                    isModal && (
                        <GoodsModal
                            showModal={this.showModal}
                            couponInfo={couponInfo}
                            showBindModal={this.showBindModal}
                            goodsInfoParams={goodsInfoParams}
                            goodsInfo={goodsInfo}
                        />
                    )
                }
                {/* <div className="goodsdetail-footer pd30">
                    <div className="footer-container">
                        <div className="footer-btn1" style={{border: '1px solid #C4C4C4'}} onClick={() => this.showShareModal(true)}>
                            <div className="share"/>
                        </div>
                        <Button className="footer-btn2" onClick={() => this.showModal(true)}>立即兑换</Button>
                    </div>
                </div> */}
                {/* 分享弹窗 */}
                <Modal
                    popup
                    visible={this.state.shareModal}
                    onClose={() => this.onClose()}
                    animationType="slide-up"
                    className="share-modal-container"
                    // afterClose={() => { alert('afterClose') }}
                >
                    <div className="share-modal-content pd30">
                        <div className="share-modal-top">
                            <span>分享给朋友</span>
                            <div className="close-btn" onClick={() => this.onClose()}/>
                        </div>
                        <div className="share-modal-mid">
                            <div>
                                <div onClick={() => this.shareFunc(0)} className="wx-icon share-icon"/>
                                <p>微信</p>
                            </div>
                            <div>
                                <div onClick={() => this.shareFunc(1)} className="pyq-icon share-icon"/>
                                <p>朋友圈</p>
                            </div>
                            <div>
                                <div onClick={() => this.shareFunc(2)} className="qqkj-icon share-icon"/>
                                <p>QQ空间</p>
                            </div>
                            <div>
                                <div onClick={() => this.shareFunc(3)} className="wb-icon share-icon"/>
                                <p>微博</p>
                            </div>
                        </div>
                        <div className="share-modal-bot">
                            <div className="pdl-r-30" onClick={this.copyLink}>
                                <span>复制链接</span>
                                <div className="copy-icon"/>
                            </div>
                        </div>
                    </div>
                </Modal>
                {
                    wxTip && <img className="wx-tip" src={require('../../../assets/images/wx.png')}/>
                }
            </div>
        );
    }
}
