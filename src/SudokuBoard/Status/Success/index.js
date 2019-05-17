import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Dialog from '../common/Dialog';


const Success = ({isOpen, handleClose}) => (
  <Dialog 
    isOpen={isOpen}
    title="Congratulations!"> 
    <MuiDialogContent>
      <MuiDialogContentText>
        You have successfully completed the Sudoku puzzle! 
      </MuiDialogContentText>
    </MuiDialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        OK
      </Button>
    </DialogActions>
  </Dialog>  
);

Success.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default Success;