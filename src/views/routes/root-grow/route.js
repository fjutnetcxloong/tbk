import {Route} from 'react-router-dom';
import RootGrow from './RootGrow';
// import ApplyForPromotion from './ApplyForPromotion';

const RootGrowPage = () => (
    <React.Fragment>
        <Route path="/root-grow" component={RootGrow}/>
        {/* <Route path="/root-apply" component={ApplyForPromotion}/> */}
    </React.Fragment>
);

export default RootGrowPage;