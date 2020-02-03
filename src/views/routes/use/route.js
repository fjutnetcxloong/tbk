import {Route} from 'react-router-dom';
import Use from './Use';

const UsePage = () => (
    <React.Fragment>
        <Route path="/use" component={Use}/>
    </React.Fragment>
);

export default UsePage;