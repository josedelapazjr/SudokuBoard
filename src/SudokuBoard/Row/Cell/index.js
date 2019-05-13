import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';

const Cell = ({key, id, value}) => (
    <TableCell 
        key={key}
        margin="normal"
        padding="none"
        align="center"
    >
        <TextField 
            id={id} 
            value={value} 
            variant="outlined" 
            disabled={value === '0' ? false : true}
        />
    </TableCell>
);

export default Cell;