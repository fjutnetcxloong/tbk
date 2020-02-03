//使用说明页面，2019-12-14，楚小龙

import './Use.less';

export default class GoodsDetail extends BaseComponent {
    render() {
        return (
            <div className="use-detail-container">
                <div className="use-detail-content pdl-r-30">
                    <div className="item">
                        <p>
                            <span>一.</span>
                            <span>选择油站，根据自己的定位信息选择最近的加油站（切记到站加油后再付款）</span>
                        </p>
                        <div>
                            <img src={require('../../../assets/images/img_1.png')} alt=""/>
                        </div>
                    </div>
                    <div className="item">
                        <p>
                            <span>二.</span>
                            <span>选择油号以及枪号点击去付款</span>
                        </p>
                        <div>
                            <img src={require('../../../assets/images/img3.png')} alt=""/>
                        </div>
                        <div>
                            <img src={require('../../../assets/images/img2.png')} alt=""/>
                        </div>
                        <div>
                            <img src={require('../../../assets/images/img4.png')} alt=""/>
                        </div>
                    </div>
                    <div className="item">
                        <p>
                            <span>三.</span>
                            <span>进入确认订单页输入机显金额，确认金额并支付给油站人员查看即可</span>
                        </p>
                        <div>
                            <img src={require('../../../assets/images/img5.png')} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}