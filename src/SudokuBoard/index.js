import React, {Component} from 'react';
import injectSheet from 'react-jss';
import withWidth from '@material-ui/core/withWidth';
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
import {initializeSquareList, updateSquare, setIsComplete} from './actions';
import Utility from './Utility';

class SudokuBoard extends Component {

  state = {
    squaresArrayPerRow: [],
  };

  isValid = (square, number) => {
    console.log('square: ', number);
    const { squaresData, handleSetIsComplete } = this.props;
    const data = squaresData[square];
    const peers = data.peers;
    let result = true;
    for(let index = 0; index < peers.length; index++) {
      const peerSquare = peers[index];
      const perSquareValue = squaresData[peerSquare].value;
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

  componentWillMount = () => {
    console.log('rendering');
    const {classes} = this.props;
    const foobar = Utility.generateFoobar();
    // const data = '016002400320009000040103000005000069009050300630000800000306010000400072004900680';
    // const data = '400000805030000000000700000020000060000080400000010000000603070500200000104000000';
    // const data = '003020600900305001001806400008102900700000008006708200002609500800203009005010300';
    const data = '483921657967345821251876493548132976729564138136798245372689514814253769005417382';
    const dataLength = data.length;
    let dataArray = [];
    let squaresData = {};
    const squares = foobar['squares'];
    const peers = foobar['peers'];
    for(let index = 0; index < dataLength; index++) {
      let numberChar = data.charAt(index);
      const squareCode = squares[index];
      const squarePeers = peers[squareCode];
      dataArray.push(numberChar);
      squaresData[squareCode] = {
        value: numberChar,
        id: squareCode,
        peers: squarePeers,
        isFixedValue: numberChar !== '0',
      }
    }

    this.setState({
      squaresArrayPerRow: foobar['squaresArrayPerRow'],
    }); 
    console.log('squaresData: ', squaresData);

    // SET POSSIBLE VALUES
    Object.keys(squaresData).forEach( key => {
      const squareData = squaresData[key];
      const peers = squareData.peers;
      let possibleValues = [];
      if(squareData.value === '0'){
        possibleValues = ['1','2','3','4','5','6','7','8','9'].filter(number => {
          var isValid = true;
          for(let index = 0; index < peers.length; index++) {
            const peer = peers[index];
            if(squaresData[peer].value === number){
              isValid = false;
              break;
            }
          }
          return isValid; 
        });
      }
      squareData.possibleValues = possibleValues
      squaresData[key] = squareData;
    }); 
    this.props.handleInitList(squaresData)
  }

  render() {
    const {classes, squaresData, handleUpdateSquare, isComplete} = this.props;
    const {squaresArrayPerRow} = this.state;
    return(
      <div className={classes.root}>
          <div className={classes.header}>
            <h1>Sudoku Board</h1>
          </div>
          <div className={classes.tableContainer}>
          <Table>
            <TableBody>
              {squaresData && squaresArrayPerRow && squaresArrayPerRow.map( (row, rowIndex) => 
                <Row 
                  key={rowIndex} 
                  data={row} rowIndex=
                  {rowIndex} 
                  squareList={squaresData} 
                  isValid={this.isValid}
                  handleUpdateSquare={handleUpdateSquare}/>
              )}
            </TableBody>
          </Table>
          </div>
        </div>
    );
  }
};

const mapStateToProps = state => ({
  squaresData: state.squareReducers.squaresData,
  isComplete: state.squareReducers.isComplete,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleInitList: (squaresData) => dispatch(initializeSquareList(squaresData)),
  handleUpdateSquare: (squareCode, value) => dispatch(updateSquare(squareCode, value)),
  handleSetIsComplete: () => dispatch(setIsComplete()),
})


export default withWidth()(injectSheet(styles)(connect(mapStateToProps,mapDispatchToProps)(SudokuBoard)));
