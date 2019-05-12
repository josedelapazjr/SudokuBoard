import React, {Component} from 'react';
import injectSheet from 'react-jss';
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from './styles';

class Foobar extends Component {

  renderRow(data, index) {
    return(
      <TableRow key={index}>
        {data && data.map( (number, cellIndex) => {
          return <TableCell key={cellIndex}>{number > 0 ? number : null}</TableCell>
        })}
      </TableRow>
    );

  }

  render() {
    const {classes} = this.props;
    const data = '016002400320009000040103000005000069009050300630000800000306010000400072004900680';
    const dataLength = data.length;
    let dataArray = [];
    for(let index = 0; index < dataLength; index++) {
      dataArray.push(parseInt(data.charAt(index)));
    }
    console.log('dataArray: ', dataArray);    
    let foobar = [];
    for(let index = 0; index < 9; index++ ) {
      const startIndex = index * 9;
      const endIndex = startIndex + 9;
      foobar.push(dataArray.slice(startIndex, endIndex));
    }
    console.log('foobar: ', foobar);
    return(
      <div className={classes.root}>
        <Button variant="outlined" color="primary">Testing</Button>
        <div className={classes.tableContainer}>
          <Table>
            <TableBody>
              {foobar && foobar.map( (row, index) => 
                this.renderRow(row, index)
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
};

export default injectSheet(styles)(Foobar);