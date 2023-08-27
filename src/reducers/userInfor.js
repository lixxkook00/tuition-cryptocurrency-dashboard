const initialState = false;

const userInfor = (state = initialState , action) => {
    switch (action.type) {
        case 'SET_INFOR':
            return action.payload

        default:
            return state;
    }
}

export { userInfor };