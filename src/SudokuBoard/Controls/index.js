import React from 'react';
import injectSheet from 'react-jss';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import styles from './styles';

const Controls = ({isComplete, handleSolveButton, handleResetButton, handleLoadButton, classes}) => (
    <div className={classes.root}>
        {!isComplete 
          ? <Button variant="contained" color="primary" onClick={handleSolveButton} className={classes.button}>
              Solve
           </Button>
          : null 
        }
        <Button variant="contained" color="primary" onClick={handleResetButton} className={classes.button}>
          Reset
        </Button>
        <Button variant="contained" color="primary" onClick={handleLoadButton} className={classes.button}>
          Load
        </Button>
    </div>
);

Controls.propTypes = {
  handleSolveButton: PropTypes.func,
  handleResetButton: PropTypes.func,
  handleLoadButton: PropTypes.func,
};

export default injectSheet(styles)(Controls);