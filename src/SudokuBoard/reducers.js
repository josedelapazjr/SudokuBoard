const initialState = {
  squaresData: null,
}

export default function squareReducer(state=initialState,action) {
    console.log('action: ', action);
    switch(action.type) {
        case 'INIT_LIST': {
            return {
                ...state,
                squaresData: action.payload,
            }
        }
        case 'UPDATE_LIST': {

        }
        default:
            return state;
    }
}