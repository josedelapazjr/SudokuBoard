import React, {Component} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';

class Cell extends Component {

    componentWillMount = () => {
        const {value} = this.props;
        this.setState({
            value: value,
            hasError: false,
        });
    }

    handleChange = (event) => {
        console.log('handleChange:event ', event);
        const {value} = event.target;
        console.log('handleChange:value ', value);
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
        const {key, id} = this.props;
        const {value, hasError} = this.state;
        return(
            <TableCell 
                key={key}
                margin="normal"
                padding="none"
                align="center"
            >
                <TextField 
                    id={id} 
                    value={parseInt(value) > 0 ? value : null} 
                    variant="outlined" 
                    // disabled={value === '0' ? false : true}
                    onChange={this.handleChange}
                    error={hasError}
                />
            </TableCell>    
        );
    }
}

export default Cell;