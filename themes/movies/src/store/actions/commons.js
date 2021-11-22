import Types from "../types"

const closeLoading = () => {
    return {
        type: Types.CLOSE_LOADING
    }
}

const openLoading = () => {
    return {
        type: Types.OPEN_LOADING
    }
}

const showMessage = (params) => {
    return {
        type: Types.SHOW_MESSAGE,
        payload: params
    }
}


const closeMessage = (key) => {
    return {
        type: Types.REMOVE_MESSAGE,
        payload: key
    }
}

let commons = {
    closeLoading,
    openLoading,
    showMessage,
    closeMessage
}

export default commons