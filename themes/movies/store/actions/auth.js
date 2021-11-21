import Types from '../types';

const logIn = (userObj) => {
    return {
        type: Types.AUTH_LOGIN,
        payload: userObj
    }
}

const logOut = () => {
    return {
        type: Types.AUTH_LOGOUT
    }
}

const checkLogin = () => {
    return {
        type: Types.AUTH_CHECK_LOGIN
    }
}

let actions = {
    logIn,
    checkLogin,
    logOut
}

export default actions