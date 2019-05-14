const initialState = {
    squareList: null,
}

export default function squareReducer(state=initialState,action) {
    console.log('action: ', action);
    switch(action.type) {
        case 'INIT_LIST': {
            return {
                ...state,
                squareList: action.payload,
            }
        }
        case 'UPDATE_LIST': {

        }
        default:
            return state;
    }
}