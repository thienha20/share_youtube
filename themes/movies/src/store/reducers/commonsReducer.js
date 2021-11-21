// action - state management
import actionTypes from '../types/index'

const initialState = {
    loading: false
}

// ===========================|| CUSTOMIZATION REDUCER ||=========================== //

const commonsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_LOADING:
            return {
                ...state,
                loading: true
            }
        case actionTypes.CLOSE_LOADING:
            return {
                ...state,
                loading: false
            }

        default:
            return state
    }
}

export default commonsReducer
