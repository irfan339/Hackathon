import { createStore, applyMiddleware } from 'redux'
import MarketplaceMerchantGL from './MMGL/mmglReducer';
//import compose from 'helper/redux-dev-tools';
// import thunk from 'redux-thunk';

// const middleware = applyMiddleware(thunk);
const initialState = {};
const store = createStore(MarketplaceMerchantGL);

export default store;