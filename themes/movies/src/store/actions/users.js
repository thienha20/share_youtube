import Types from "../types"
import allActions from "./index"
import {ajaxPost} from "../ajax"

const userLogin = (params) => {
    return async dispatch =>{
        if(params.loading) dispatch(allActions.commons.openLoading());
        let data = await ajaxPost("login", params.user)
        let rs = []
        if(data && data["data"]){
            rs = data["data"];
        }
        if(params.loading) dispatch(allActions.commons.closeLoading());
        return dispatch({
            type: Types.USER_LOGIN,
            payload: rs
        })
    }
}

const userLogout = (params) => {
    return async dispatch =>{
        if(params.loading) dispatch(allActions.commons.openLoading());
        let data = await ajaxPost("logout")
        let rs = []
        if(data && data["data"]){
            rs = data["data"];
        }
        if(params.loading) dispatch(allActions.commons.closeLoading());
        return dispatch({
            type: Types.USER_LOGOUT,
            payload: rs
        })
    }
}

const userRegister = (params) => {
    return async dispatch =>{
        if(params.loading) dispatch(allActions.commons.openLoading());
        let data = await ajaxPost("register", params.user)
        let rs = []
        if(data && data["data"]){
            rs = data["data"];
        }
        if(params.loading) dispatch(allActions.commons.closeLoading());
        return dispatch({
            type: Types.USER_REGISTER,
            payload: rs
        })
    }
}

const userMe = () => {
    return async dispatch =>{
        let data = await ajaxPost("me")
        let rs = []
        if(data && data["data"]){
            rs = data["data"];
        }
        return dispatch({
            type: Types.USER_LOGOUT,
            payload: rs
        })
    }
}


let actions = {
    userLogin,
    userLogout,
    userRegister,
    userMe
}
export default actions