import {Route} from 'react-router-dom';
import Receive from './index';
// import ApplyForPromotion from './ApplyForPromotion';

const ReceivePage = () => (
    <React.Fragment>
        <Route path="/receive" component={Receive}/>
    </React.Fragment>
);

export default ReceivePage;