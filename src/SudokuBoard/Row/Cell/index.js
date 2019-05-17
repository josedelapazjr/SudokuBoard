import React, {Component} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import styles from './styles';

class Cell extends Component {

  state = {
    value: this.props.value,
    hasError: false,  
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.value !== this.props.value) {
      this.setState({value:  this.props.value});
    }
  }

  handleChange = (event) => {
    const {value} = event.target;
    const {id, checkIsValid, handleUpdateSquare} = this.props;
    let hasError = false;
    if(checkIsValid(id, value)) {
      handleUpdateSquare(id, value);
    } else {
      hasError = true;    
    };
    this.setState({
        value: value,
        hasError: hasError,
    });
  }

  checkcheckIsValid = () => {
      const {id, value, checkIsValid} = this.props;
      return checkIsValid(id, value);
  }

  render() {
    const {id, possibleValues, isReadOnly, classes} = this.props;
    const {value, hasError} = this.state;
    return(
      // <Tooltip title={isReadOnly ? 'Fixed' : possibleValues}>
        <TableCell 
            margin="normal"
            padding="none"
            align="center"
        >
          <TextField 
              id={id} 
              value={parseInt(value) > 0 ? value : ''} 
              variant="outlined" 
              onChange={this.handleChange}
              error={hasError}
              onKeyPress={this.handleKeyPress}
              inputProps = {{
                className: classes.input,
              }}
              InputProps={{
                readOnly: isReadOnly,
              }}
              className={classes.root}
          />
        </TableCell>
      // </Tooltip> 
    );
  }
}

Cell.propTypes = {
  id: PropTypes.string,
  possibleValues: PropTypes.arrayOf(PropTypes.string),
  isReadOnly: PropTypes.bool,
  checkIsValid: PropTypes.func,
};

export default injectSheet(styles)(Cell);