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
                isComplete: false,
            }
        }
        case 'UPDATE_SQAURE': {
          const {squareCode, value} = action.payload;
          const squareData = {
            ...state.squaresData[squareCode],
            value: value,
          };
          const updatedData = {
            ...state.squaresData,
              [squareCode]: squareData,  
          };
          return {
            ...state,
            squaresData : updatedData,
            isComplete: Object.keys(updatedData).filter(key => updatedData[key].value === '0').length === 0,
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