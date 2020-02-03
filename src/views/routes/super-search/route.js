import {Route} from 'react-router-dom';
import SuperSearch from './SuperSearch';
// import SuperSearchDetail from './SuperSearchDeatil';

const SuperSearchPage = () => (
    <React.Fragment>
        <Route path="/super-search" component={SuperSearch}/>
        {/* <Route path="/search-detail" component={SuperSearchDetail}/> */}
    </React.Fragment>
);

export default SuperSearchPage;