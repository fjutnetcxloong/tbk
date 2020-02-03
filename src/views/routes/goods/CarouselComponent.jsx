//商品详情轮播图组件，2019/11/5，楚小龙
import './CarouselComponent.less';
// import WxImageViewer from 'react-wx-images-viewer';
import {Carousel} from 'antd-mobile';

export default class CarouselComponent extends BaseComponent {
    render() {
        const {goodsPicture, showCarousel} = this.props;
        return (
            <div className="my-carousel-container">
                <Carousel className="my-carousel">
                    {
                        goodsPicture && goodsPicture.length > 0 && goodsPicture.map((item, index) => (
                            <div className="carousel-item" key={item}>
                                <img onClick={() => showCarousel(true)} src={item}/>
                            </div>
                        ))
                    }
                </Carousel>

            </div>
        );
    }
}