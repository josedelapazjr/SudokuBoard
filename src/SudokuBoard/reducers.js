const initialState = {
  squaresData: null,
  isComplete: false,
}

export default function squareReducer(state=initialState,action) {
    switch(action.type) {
        case 'INIT_LIST': {
            return {
                ...state,
                squaresData: action.payload,
            }
        }
        case 'UPDATE_SQAURE': {
          const {squareCode, value} = action.payload;
          const squareData = {
            ...state.squaresData[squareCode],
            value: value,
          };
          return {
            ...state,
            squaresData: {
              ...state.squaresData,
              [squareCode]: squareData,
            },
            isComplete: Object.keys(state.squaresData).
              filter(key => state.squaresData[key].value === '0').length === 0,
          }
        }
        case 'SET_IS_COMPLETE' :{
          return {
            ...state,
            isComplete: true,
          }
        }
        default:
            return state;
    }
}