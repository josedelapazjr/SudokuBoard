export default {
  root: ({index, isReadOnly}) => {
    const columnNumber = index + 1;
    const hasBorder = columnNumber % 3 === 0 && columnNumber < 9;
    return {
      borderRight: hasBorder ? '2px solid black' : null,
      background: isReadOnly ? '#e0e0e0' : null,
    };
  },
  input: {
    textAlign: 'center',
  }
};
