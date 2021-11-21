// action - state management
import actionTypes from '../types/index';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const INITIAL_STATE = {
    currentUser: null,
    isLoggingIn: false,
    message: []
};

const AuthReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.AUTH_LOGIN:
            return {
                ...state,

            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,

            };
        case actionTypes.AUTH_CHECK_LOGIN:
            return {
                ...state,
                isLoggingIn: true
            };
        default:
            return state;
    }
};

const persistConfig = {
    key: 'auth',
    storage: storage,
    blacklist: ['isLoggingIn']
};

export default persistReducer(persistConfig, AuthReducer);