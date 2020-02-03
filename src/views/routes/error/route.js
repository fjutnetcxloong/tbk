import {Route} from 'react-router-dom';
import NetErrorPage from './NetError';
import ServerErrorPage from './ServerError';


const ErrorRoute = () => (
    <React.Fragment>
        <Route path="/network-error" component={NetErrorPage}/>
        <Route path="/server-error" component={ServerErrorPage}/>
    </React.Fragment>
);

export default ErrorRoute;
