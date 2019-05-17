import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import injectSheet from 'react-jss';
import withWidth, { isWidthUp} from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import styles from './styles';

class LoadPuzzle extends Component {

  state = {
    value: '',
    hasError: false,
  }

  handleChange = (event) => {
    const {value} = event.target;
    const isNumber = /^\d+$/.test(value);
    this.setState({
      value,
      hasError: !isNumber || value.length !== 9,
    });
  }

  handleOkButton = () => {
    const {handleLoadPuzzle, handleClose} = this.props;
    const {value, hasError} = this.state;
    if(!hasError){
      if(value.length > 0) {
        handleLoadPuzzle(value);
        handleLoadPuzzle(value);
        handleClose();
        this.setState({
          value: '',
        });
      } else {
        this.setState({
          hasError: true,
        });  
      }
    }
  }

  handleCancelButton = () => {
    const {handleClose} = this.props;
    this.setState({
      value: '',
      hasError: false,
    });
    handleClose();
  }

  render() {
    const {isOpen, width, classes} = this.props;
    const isMobile = !isWidthUp('sm', width);
    const {value, hasError} = this.state;
    const label = 'Please provide a sudoku puzzle in series of numbers (0 for empty cell)';
    return(
      <Dialog 
        open={isOpen} 
        disableBackdropClick={false} 
        classes={{ root: classes.root}}
      > 
        <DialogTitle>Input Puzzle</DialogTitle>
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
                error={hasError}
              />
              </Tooltip>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleOkButton} color="primary">
              OK
            </Button>
            <Button onClick={this.handleCancelButton} color="primary">
              Cancel
            </Button>
          </DialogActions>
      </Dialog>   
    );
  }
}

LoadPuzzle.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  handleLoadPuzzle:  PropTypes.func,
  width: PropTypes.string,
};

export default withWidth()(injectSheet(styles)(LoadPuzzle));