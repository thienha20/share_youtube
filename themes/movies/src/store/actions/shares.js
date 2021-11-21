import Types from "../types"
import allActions from "./index"
import {ajaxGet, ajaxPost} from "../ajax"

const shareAdd = (params) => {
    return async dispatch =>{
        if(params.loading) dispatch(allActions.commons.openLoading());
        let data = await ajaxPost("share/add", params.shareObj)
        let rs = []
        if(data && data["data"]){
            rs = data["data"];
        }
        if(params.loading) dispatch(allActions.commons.closeLoading());
        return dispatch({
            type: Types.SHARE_ADD,
            payload: rs
        })
    }
}

const shareList = (params) => {
    return async dispatch =>{
        if(params.loading) dispatch(allActions.commons.openLoading());
        let data = await ajaxGet("shares", params)
        let rs = []
        if(data && data["data"]){
            rs = data["data"];
        }
        if(params.loading) dispatch(allActions.commons.closeLoading());
        return dispatch({
            type: Types.SHARE_VIDEO_LISTING,
            payload: rs
        })
    }
}

const setParams = (params, history = null) => {
    return {
        type: Types.SHARE_PARAMS,
        payload: params,
        history: history
    }
}

let actions = {
    shareAdd,
    shareList,
    setParams
}

export default actions