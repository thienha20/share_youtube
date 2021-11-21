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

let commons = {
    closeLoading,
    openLoading
}

export default commons