export const initializeSquareList = (squareList) => ({
    type: 'INIT_LIST',
    payload: squareList,
});

export const updateSquare = (squareCode, value) => ({
    type: 'UPDATE_SQAURE',
    payload: {
      squareCode,
      value,
    },
});

export const setIsComplete = () => ({
  type: 'SET_IS_COMPLETE',
});
