import React from 'react';
import injectSheet from 'react-jss';
import withWidth from '@material-ui/core/withWidth';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import styles from './styles';
import Dialog from '../common/Dialog';


const InProgress = ({isOpen, classes}) => (
  <Dialog 
    isOpen={isOpen}
    title="In Progress"> 
    <MuiDialogContent className={classes.root}>
      <MuiDialogContentText>
        <CircularProgress />
      </MuiDialogContentText>
    </MuiDialogContent>
  </Dialog>  
);

InProgress.propTypes = {
  isOpen: PropTypes.bool,
};


export default withWidth()(injectSheet(styles)(InProgress));