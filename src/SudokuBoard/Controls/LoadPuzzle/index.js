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
import withWidth, { isWidthUp} from '@material-ui/core/withWidth';
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
    if(value.length > 0) {
      handleLoadPuzzle(value);
    }
    handleClose();
    this.setState({
      value: '',
    });
  }

  render() {
    const {isOpen, handleClose, width, classes} = this.props;
    const isMobile = !isWidthUp('sm', width);
    const {value} = this.state;
    const label = 'Please provide a sudoku puzzle in series of numbers (0 for empty cell)';
    return(
      <Dialog 
        open={isOpen} 
        disableBackdropClick={false} 
        classes={{ root: classes.root}}
      > 
        <DialogTitle id="alert-dialog-title">Input Puzzle</DialogTitle>
          <DialogContent>
            <Tooltip title={isMobile ? label : ''}>
              <TextField 
                value={value}
                label={isMobile ? '' : label}
                className={classes.text}
                onChange={this.handleChange}
                InputProps={{
                  classes: {
                    input: classes.input,
                  },
                }}
                multiline={isMobile}
              />
              </Tooltip>
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