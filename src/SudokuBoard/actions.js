export const initializeSquareList = (squareList) => ({
    type: 'INIT_LIST',
    payload: squareList,
});

export const updateSquare = (square) => ({
    type: 'UPDATE_SQAURE',
    payload: square,
})