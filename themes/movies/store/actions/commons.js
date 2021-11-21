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

const treeView = (id) => {
    return {
        type: Types.TREE_VIEW,
        payload: Array.isArray(id) ? id : [id]
    }
}


let commons = {
    closeLoading,
    openLoading,
    treeView
}

export default commons