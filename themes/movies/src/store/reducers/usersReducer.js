// action - state management
import actionTypes from "../types/index"
import {persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"

export const initialState = {
    currentUser: null,
    isLoggingIn: false
}

// ===========================|| CUSTOMIZATION REDUCER ||=========================== //

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            return {
                ...state,
            }
        case actionTypes.USER_REGISTER:
            return {
                ...state,
            }
        case actionTypes.USER_LOGOUT:
            return {
                ...state,
            }
        case actionTypes.USER_ME:
            return {
                ...state,
                currentUser: action.payload ?? null,
                isLoggingIn: !!action.payload
            }
        default:
            return state
    }
}
const persistConfig = {
    key: "user",
    storage: storage,
    blacklist: ["isLoggingIn"]
}

export default persistReducer(persistConfig, usersReducer)
