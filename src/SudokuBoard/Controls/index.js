import React from 'react';
import Fab from '@material-ui/core/Fab';
import injectSheet from 'react-jss';
import Button from '@material-ui/core/Button';
import styles from './styles';

const Controls = ({handleSolve, handleResetButton, classes}) => (
    <div className={classes.root}>
        <Button variant="contained" color="primary" onClick={handleSolve} className={classes.button}>
          Solve
        </Button>
        <Button variant="contained" color="primary" onClick={handleResetButton} className={classes.button}>
          Reset
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          Load
        </Button>
    </div>
);

export default injectSheet(styles)(Controls);