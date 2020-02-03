import {Route} from 'react-router-dom';
import GoodsDetail from './GoodsDetail';

const GoodsDetailPage = () => (
    <Route path="/goods-detail" component={GoodsDetail}/>
);

export default GoodsDetailPage;