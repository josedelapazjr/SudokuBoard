import React from 'react';
import injectSheet from 'react-jss';
import withWidth from '@material-ui/core/withWidth';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import styles from './styles';


const Dialog = ({isOpen, classes, title, children}) => (
  <MuiDialog 
    open={isOpen} 
    disableBackdropClick={false} 
    classes={{ root: classes.root}}
  > 
    <MuiDialogTitle id="alert-dialog-title">{title}</MuiDialogTitle> 
          {children}
    </MuiDialog>  
);

Dialog.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
};


export default withWidth()(injectSheet(styles)(Dialog));