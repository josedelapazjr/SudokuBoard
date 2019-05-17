import React from 'react';
import injectSheet from 'react-jss';
import withWidth from '@material-ui/core/withWidth';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import styles from './styles';

const Alert = ({isOpen, classes, handleClose}) => (
  <Dialog 
    open={isOpen} 
    disableBackdropClick={false} 
    classes={{ root: classes.root}}
  > 
    <DialogTitle id="alert-dialog-title">Congratulations!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You have successfully completed the Sudoku puzzle!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
  </Dialog>  
);

Alert.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};


export default withWidth()(injectSheet(styles)(Alert));