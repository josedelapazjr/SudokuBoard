import React, {Component} from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Row from './Row';
import Controls from './Controls';
import styles from './styles';
import {initializeSquareList} from './actions';

class SudokuBoard extends Component {

  isValid = (square, number) => {
    const { dataFoobar } = this.state;
    const data = dataFoobar[square];
    const peers = data.peers;
    let result = true;
    for(let index = 0; index < peers.length; index++) {
      const peerSquare = peers[index];
      const perSquareValue = dataFoobar[peerSquare].value;
      if(perSquareValue === number) {
        result = false;
        break;
      }
    }
    return result;
  }

  getUnusedNumber = (peers) => {
    const {dataFoobar} = this.state;
    const result =  ['1','2','3','4','5','7','8','9'].filter(number => {
      var isValid = true;
      for(let index = 0; index < peers.length; index++) {
        const peer = peers[index];
        if(dataFoobar[peer].value === number){
          isValid = false;
          break;
        }
      }
      return isValid; 
    });
    return result;
  }

  cross = (data1, data2) => {
    let result = [];
      for(let rowIndex = 0; rowIndex < data1.length; rowIndex++) {
        for(let columnIndex = 0; columnIndex < data2.length; columnIndex++) {
            result.push(data1[rowIndex] + data2[columnIndex]);
          }
      }  
      return result;
  }
  generateFoobar = () => {
    const rows = "1,2,3,4,5,6,7,8,9".split(',');
    const columns = "A,B,C,D,E,F,G,H,I".split(',');

    // SQUARES
    const SQUARES = this.cross(columns, rows);
    // console.log('squares: ', squares);


    // VERTICAL UNIT
    let VERTICAL_UNITS = []
    for (var i=0; i<rows.length; i++) {
        VERTICAL_UNITS.push(this.cross(columns, [rows[i]])); 
    }

    // HORIZONTAL UNIT
    let HORIZONTAL_UNITS = []
    for (var i=0; i<columns.length; i++) {
      HORIZONTAL_UNITS.push(this.cross([columns[i]],rows)); 
    }
    //console.log('unitList: ', unitList);

    // SQUARE UNITS
    let SQUARE_UNITS = []
    var groupCols = ["A,B,C", "D,E,F", "G,H,I"];
    var groupRows = ["1,2,3", "4,5,6", "7,8,9"];
    for (var c=0;c<groupCols.length;c++) {
      for (var r=0;r<groupRows.length;r++) {
        SQUARE_UNITS.push(this.cross(groupCols[c].split(','), groupRows[r].split(',')))
      }
    }

    const UNITLIST = [...HORIZONTAL_UNITS, ...VERTICAL_UNITS, ...SQUARE_UNITS]
    let UNITS = {};
    let PEERS = {};
    for(let index = 0; index < SQUARES.length; index ++) {
      const square = SQUARES[index];
      const squareUnits = UNITLIST.filter(unit => unit.includes(square));
      let squarePeers = squareUnits
        .reduce((a,b) =>[
          ...a.filter(data => data !==square), 
          ...b.filter(data => data !==square)
        ], [])
      // Remove duplicates
      squarePeers = squarePeers.filter((v,i) => {
        return squarePeers.indexOf(v) === i
      })
      UNITS[square] = squareUnits;
      PEERS[square] = squarePeers;
    }

    console.log('squarePeers: ', PEERS['A1']);
    return {
      squares: SQUARES,
      peers: PEERS,
    }
  }

  componentWillMount = () => {
    console.log('rendering');
    const {classes} = this.props;
    const foobar = this.generateFoobar();
    const data = '016002400320009000040103000005000069009050300630000800000306010000400072004900680';
    const dataLength = data.length;
    let dataArray = [];
    let dataFoobar = {};
    const squares = foobar['squares'];
    const peers = foobar['peers'];
    for(let index = 0; index < dataLength; index++) {
      let numberChar = data.charAt(index);
      const square = squares[index];
      const squarePeers = peers[square];
      dataArray.push(numberChar);
      let availableNumbers = [];
      dataFoobar[square] = {
        value: numberChar,
        id: square,
        peers: squarePeers
      }
    }

    let squaresArray= [];
    for(let index = 0; index < 9; index++ ) {
      const startIndex = index * 9;
      const endIndex = startIndex + 9;
      const rowArray = squares.slice(startIndex, endIndex)
      squaresArray.push(rowArray);
    }

    this.setState({
      squares: squares,
      dataArray: dataArray,
      dataFoobar: dataFoobar,
      squaresArray: squaresArray,
    }); 
    this.props.handleInitList(dataFoobar)
  }

  render() {
    const {classes, squareList} = this.props;
    const {squaresArray} = this.state;
    return(
      <div className={classes.root}>
          <div>
            Welcome to Sudoku Board!
          </div>
          <Table>
            <TableBody>
              {squareList && squaresArray && squaresArray.map( (row, index) => 
                <Row key={index} data={row} index={index} squareList={squareList} isValid={this.isValid}/>
              )}
            </TableBody>
          </Table>
          {/* <Controls /> */}
        </div>
    );
  }
};

const mapStateToProps = state => ({
  squareList: state.squareReducers.squareList,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleInitList: (squareList) => dispatch(initializeSquareList(squareList)),
})


export default injectSheet(styles)(connect(mapStateToProps,mapDispatchToProps)(SudokuBoard));
