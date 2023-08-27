export const activeLoading = () => {
    return {
        type: 'ACTVE',
        payload: true,
    }
}

export const removeLoading = () => {
    return {
        type: 'REMOVE',
        payload: false,
    }
}


export const getUserInfor = () => {
    return {
        type: 'GET_INFOR',
        payload: {},
    }
}

export const setUserInfor = (infor) => {
    return {
        type: 'SET_INFOR',
        payload: {
            ...infor
        }
    }
}