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
import DataUtility from './utils/DataUtility';
import PuzzleUtility from './utils/PuzzleUtility';
import Alert from './Alert';
import LoadPuzzle from './Controls/LoadPuzzle';

class SudokuBoard extends Component {

  state = {
    squaresArrayPerRow: [],
    showAlertModal: false,
    showLoadPuzzle: false,
  };

  componentDidUpdate = (prevProps) => {
    const {isComplete} = this.props
    if( prevProps.isComplete !== isComplete && isComplete) {
      this.setState({
        showAlertModal: true,
      });
    }
  }

  handleSolveButton = () => {
    const { squaresData, handleUpdateSquare } = this.props;
    console.log('BEFORE:PuzzleUtility.solve:squaresData ', squaresData);
    if(PuzzleUtility.solve(
      squaresData, 
      (squareCode, value) => handleUpdateSquare(squareCode, value))) {
      console.log('Finally solved the puzzle!!!: ', squaresData);
      // this.props.handleInitList(squaresData);
    } else {
      console.log('FAILED!!!!');
    }
  }

  handleResetButton = () => {
    const {squaresData, handleInitList} = this.props;
    Object.keys(squaresData).forEach(key => {
      const squareData = squaresData[key];
      if(!squareData.isFixedValue) {
        squareData.value = '0';
      }
    })
    handleInitList(squaresData);
  }

  handleLoadButton = () => {
    this.setState({
      showLoadPuzzle: true, 
    });
  }

  handleLoadPuzzleClose = () => {
    this.setState({
      showLoadPuzzle : false
    });  
  }

  handleAlertClose = () => {
    this.setState({
      showAlertModal : false
    });
  }

  // handlePuzzleChange = () => {

  // }
  
  handleLoadPuzzle = (puzzle) => {
    const sampleData = '016002400320009000040103000005000069009050300630000800000306010000400072004900680';
    // const sampleData = '400000805 030000000 000700000 020000060 000080400 000010000 000603070 500200000 104000000';
    // const sampleData = '003020600900305001001806400008102900700000008006708200002609500800203009005010300';
    // const sampleData = '483921657967345821251876493548132976729564138136798245372689514814253769005417382';
    const data = puzzle || sampleData;
    const {squaresArrayPerRow, squaresData} = DataUtility.generateData(data);

    // console.log('BEFORE:componentDidMount:squaresData ', squaresData);
    // PuzzleUtility.setSquarePossibleValues(squaresData); 
    // console.log('AFTER:componentDidMount:squaresData ', squaresData);

    this.setState({
      squaresArrayPerRow,
    }); 
    this.props.handleInitList(squaresData);
  }

 

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

  // getUnusedNumber = (peers) => {
  //   const {dataFoobar} = this.state;
  //   const result =  ['1','2','3','4','5','7','8','9'].filter(number => {
  //     var isValid = true;
  //     for(let index = 0; index < peers.length; index++) {
  //       const peer = peers[index];
  //       if(dataFoobar[peer].value === number){
  //         isValid = false;
  //         break;
  //       }
  //     }
  //     return isValid; 
  //   });
  //   return result;
  // }

  componentDidMount = () => {
    this.handleLoadPuzzle();
  }

  render() {
    console.log('rendering:isComplete: ', this.props.isComplete);
    const {classes, squaresData, handleUpdateSquare} = this.props;
    const {squaresArrayPerRow, showAlertModal, showLoadPuzzle} = this.state;
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
          <Controls 
            handleSolveButton={this.handleSolveButton} 
            handleResetButton={this.handleResetButton}
            handleLoadButton={this.handleLoadButton}/>
          <LoadPuzzle isOpen={showLoadPuzzle} handleLoadPuzzle={this.handleLoadPuzzle} handleClose={this.handleLoadPuzzleClose}/>
          <Alert isOpen={showAlertModal} handleClose={this.handleAlertClose}/>
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
