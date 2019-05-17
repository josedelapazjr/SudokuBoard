import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import styles from './styles';
import Cell from './Cell';

const Row = ({data, rowIndex, squaresData, checkIsValid, classes, handleUpdateSquare}) => (
  <TableRow key={rowIndex} className={classes.root}>
      {data ? data.map((id, index) => {
          const square = squaresData[id];
          return <Cell 
            key={index} 
            index={index} 
            id={square.id} 
            value={square.value} 
            checkIsValid={checkIsValid}
            possibleValues={square.possibleValues}
            isReadOnly={square.isFixedValue}
            handleUpdateSquare={handleUpdateSquare}
          />
      }) : null}
  </TableRow>
);

Row.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  rowIndex: PropTypes.number,
  squaresData: PropTypes.shape({
    value: PropTypes.string,
    id: PropTypes.string,
    peers: PropTypes.arrayOf(PropTypes.string),
  }),
  checkIsValid: PropTypes.func,
  handleUpdateSquare: PropTypes.func,
};

export default injectSheet(styles)(Row);