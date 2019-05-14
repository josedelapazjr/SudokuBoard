import React from 'react';
import Fab from '@material-ui/core/Fab';
import injectSheet from 'react-jss';
import styles from './styles';

const Controls = ({classes}) => (
    <div className={classes.root}>
        {['1','2','3','4','5','6','7','8','9'].map(number => 
            <Fab id={number} color="primary" aria-label="Add">
                    {number}
                </Fab>
            )}
    </div>
);

export default injectSheet(styles)(Controls);