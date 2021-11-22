import Types from "../types"
import allActions from "./index"
import {ajaxGet, ajaxPost} from "../ajax"

const shareAdd = (params, history = null) => {
    return async dispatch => {
        if (params.loading) dispatch(allActions.commons.openLoading())
        let data = await ajaxPost("share/add", params.share)
        if (params.loading) dispatch(allActions.commons.closeLoading())
        let rs = []
        if(data && data["status"] !== 200){
            dispatch(allActions.commons.showMessage({
                key: new Date().getTime() + Math.random(),
                options: {
                    variant: "error",
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
                },
                message: data["message"]
            }))
        }
        if (data && data["data"]) {
            rs = data["data"]
            dispatch(allActions.commons.showMessage({
                key: new Date().getTime() + Math.random(),
                options: {
                    variant: "success",
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
                },
                message: data["message"]
            }))
            if(history){
                history.push("/")
            }
        }

        return dispatch({
            type: Types.SHARE_ADD,
            payload: rs
        })
    }
}

const shareList = (params) => {
    return async dispatch => {
        if (params.loading) dispatch(allActions.commons.openLoading())
        let data = await ajaxGet("shares", params)
        let rs = []
        if (data && data["data"]) {
            rs = data["data"]
        }
        if (params.loading) dispatch(allActions.commons.closeLoading())
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

const setStart = () => {
    return {
        type: Types.SHARE_START
    }
}

let actions = {
    shareAdd,
    shareList,
    setParams,
    setStart
}

export default actions