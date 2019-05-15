export default {
  root: ({ rowIndex }) => {
    const rowNumber = rowIndex + 1
    const hasBorderBottom = rowNumber % 3 === 0 && rowNumber < 9;
    return {
      borderBottom: hasBorderBottom ? '2px solid black' : null,
    };
  },
};
