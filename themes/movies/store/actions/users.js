import Types from "../types"

const userManage = () => {
    return {
        type: Types.USER_MANAGE
    }
}

const userAdd = () => {
    return {
        type: Types.USER_ADD
    }
}

const userUpdate = () => {
    return {
        type: Types.USER_UPDATE
    }
}

let actions = {
    userManage,
    userAdd,
    userUpdate
}
export default actions