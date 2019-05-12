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

  getUnusedNumbers = (row) => {
    return [1,2,3,4,5,7,8,9].filter(number => !row.includes(number.toString()))
  }

  renderRow(data, index) {
    return(
      <TableRow key={index}>
        {data && data.map( (number, cellIndex) => {
          return <TableCell key={cellIndex}>
            {/* <input value={number > 0 ? number : null}></input> */}
            {/* {number != '0' ? number : '-'} */}
            {number}
          </TableCell>
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
      // dataArray.push(parseInt(data.charAt(index)));
      // dataArray.push(data.charAt(index));
      let numberChar = data.charAt(index);
      dataArray.push(numberChar);
    }
    console.log('dataArray: ', dataArray);    
    let foobar = [];
    for(let index = 0; index < 9; index++ ) {
      const startIndex = index * 9;
      const endIndex = startIndex + 9;
      const rowArray = dataArray.slice(startIndex, endIndex)
      foobar.push(rowArray);
    }
    console.log('foobar: ', foobar);
    foobar = foobar.map(rowArray => {
      const unusedNumbers = this.getUnusedNumbers(rowArray);
      let newArray = rowArray.map(data => {
        return data === '0' ? unusedNumbers.toString() : data;
      });
      console.log('newArray: ', newArray);
      return newArray;
    })
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