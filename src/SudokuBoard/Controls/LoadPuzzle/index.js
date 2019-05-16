import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import injectSheet from 'react-jss';
import withWidth from '@material-ui/core/withWidth';
import styles from './styles';

class LoadPuzzle extends Component {

  state = {
    value: '',
  }

  handleChange = (event) => {
    const {value} = event.target;
    console.log('handleChange:value: ', value)
    this.setState({
      value,
    });
  }

  handleOkButton = () => {
    const {handleLoadPuzzle, handleClose} = this.props;
    const {value} = this.state;
    handleLoadPuzzle(value);
    handleClose();
    this.setState({
      value: '',
    });
  }

  render() {
    const {isOpen, handleClose, classes} = this.props;
    const {value} = this.state;
    return(
      <Dialog 
        open={isOpen} 
        disableBackdropClick={false} 
        classes={{ root: classes.root}}
      > 
        <DialogTitle id="alert-dialog-title">Input Puzzle</DialogTitle>
          <DialogContent>
            <TextField 
              value={value}
              label="Please provide a sudoku puzzle in series of numbers (0 for cell)"
              className={classes.text}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleOkButton} color="primary">
              OK
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
      </Dialog>   
    );
  }
}

export default withWidth()(injectSheet(styles)(LoadPuzzle));