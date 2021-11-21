// action - state management
import actionTypes from '../types/index';

export const initialState = {

};

// ===========================|| CUSTOMIZATION REDUCER ||=========================== //

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:

            return {
                ...state,
            };
        default:
            return state;
    }
};

export default usersReducer;
