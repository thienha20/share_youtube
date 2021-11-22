// action - state management
import actionTypes from "../types/index"
import {convertParams} from "../../utils/url"

const INITIAL_STATE = {
    data: null,
    params: {
        page: 1,
        sort: {
            timestamp: 1
        }
    },
    startParams: true
}

const ShareReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.SHARE_ADD:
            return {
                ...state,
            }
        case actionTypes.SHARE_START:
            return {
                ...state,
                startParams: true
            }
        case actionTypes.SHARE_VIDEO_LISTING:
            return {
                ...state,
                data: action.payload[0] ?? [],
                params: action.payload[1] ?? state.params,
                startParams: false
            };

        case actionTypes.SHARE_PARAMS:
            let params = {
                ...state,
                params: action.payload,
                startParams: true
            }
            if(action.history && typeof action.history === "object"){
                let par = {...params.params}
                delete par.total
                delete par.loading
                action.history.push({
                    search: convertParams(par)
                })
            }
            return params
        default:
            return state
    }
}

export default ShareReducer