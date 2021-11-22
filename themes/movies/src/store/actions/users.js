import Types from "../types"
import allActions from "./index"
import {ajaxPost} from "../ajax"

const userLogin = (params) => {
    return async dispatch =>{
        if(params.loading) dispatch(allActions.commons.openLoading());
        let data = await ajaxPost("login", params.user)
        if(params.loading) dispatch(allActions.commons.closeLoading());
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
        if(data && data["data"]){
            rs = data["data"];
        }
        return dispatch({
            type: Types.USER_LOGIN,
            payload: rs
        })
    }
}

const userLogout = (params = null) => {
    return async dispatch =>{
        if(params.loading) dispatch(allActions.commons.openLoading());
        let data = await ajaxPost("logout", {})
        if(params.loading) dispatch(allActions.commons.closeLoading());
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

const userRegister = (params, history = null) => {
    return async dispatch =>{
        if(params.loading) dispatch(allActions.commons.openLoading());
        let data = await ajaxPost("register", params.user)
        if(params.loading) dispatch(allActions.commons.closeLoading());
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
        if(data && data["data"]){
            rs = data["data"];
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
                history.push("/login")
            }
        }

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
            type: Types.USER_ME,
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