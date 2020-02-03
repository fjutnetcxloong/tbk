/**
 * rootReducer
 */
import baseReducer from './baseReducer';
import routeReducer from './routerReducer';

export const rootReducer = {
    ...baseReducer,
    ...routeReducer
};
