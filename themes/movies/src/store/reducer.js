import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './reducers/index';

// ===========================|| COMBINE REDUCER ||=========================== //

const reducer = combineReducers({
    ...customizationReducer
});

export default reducer;
