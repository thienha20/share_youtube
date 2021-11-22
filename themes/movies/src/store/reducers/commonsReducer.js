// action - state management
import actionTypes from '../types/index'

const initialState = {
    loading: false,
    notifications:[]
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
        case actionTypes.SHOW_MESSAGE:
            let ms = []
            return {
                ...state,
                notifications: ms.concat(state.notifications, action.payload)
            }
        case actionTypes.REMOVE_MESSAGE:
            return {
                ...state,
                notifications: state.notifications.filter(i=> i.key !== action.payload)
            }
        default:
            return state
    }
}

export default commonsReducer
