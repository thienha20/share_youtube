// action - state management
import actionTypes from '../types/index'

const initialState = {
    loading: false,
    tree_view: {
        expanded: [],
        selected: []
    }
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
        case actionTypes.TREE_VIEW:
            let tree_view = state.tree_view
            for(let id of action.payload){
                if (tree_view.expanded.includes(id)) {
                    tree_view.expanded = tree_view.expanded.filter(item => item !== id)
                } else {
                    tree_view.expanded.push(id)
                }
            }
            tree_view.selected = [action.payload.pop()]
            return {
                ...state,
                tree_view: tree_view
            }
        default:
            return state
    }
}

export default commonsReducer
