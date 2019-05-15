import React, {Component} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import injectSheet from 'react-jss';
import styles from './styles';

class Cell extends Component {

    componentWillMount = () => {
        const {value} = this.props;
        this.setState({
            value: value,
            hasError: false,
        });
    }

    handleChange = (event) => {
        const {value} = event.target;

        const {id, isValid} = this.props;
        let hasError = false;
        if(!isValid(id, value)) {
            hasError = true;
        };
        this.setState({
            value: value,
            hasError: hasError,
        });
    }

    checkIsValid = () => {
        const {key, id, value, isValid} = this.props;
        return isValid(id, value);
    }

    render() {
        const {id, index, possibleValues, isReadOnly, classes} = this.props;
        const {value, hasError} = this.state;
        const columnNumber = index + 1;
        const hasBorder = columnNumber % 3 === 0 && columnNumber < 9;
        return(
          <Tooltip title={isReadOnly ? 'Fixed' : possibleValues}>
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
                    InputProps={{
                      readOnly: isReadOnly,
                    }}
                    inputProps={{ 
                      style: {
                        textAlign: 'center',
                        borderRight: hasBorder ? '2px solid black' : null,
                      } 
                    }}
                />
            </TableCell>   
          </Tooltip> 
        );
    }
}

export default injectSheet(styles)(Cell);