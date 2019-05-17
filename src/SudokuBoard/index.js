import React, {Component} from 'react';
import injectSheet from 'react-jss';
import withWidth from '@material-ui/core/withWidth';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import PropTypes from 'prop-types';
import Row from './Row';
import Controls from './Controls';
import styles from './styles';
import {initializeSquareList, updateSquare, setIsComplete} from './actions';
import DataUtility from './utils/DataUtility';
import PuzzleUtility from './utils/PuzzleUtility';
import Alert from './Alert';
import LoadPuzzle from './Controls/LoadPuzzle';
import {DEFAULT_DATA} from './constants';

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
    if(PuzzleUtility.solve(
      squaresData, 
      (squareCode, value) => handleUpdateSquare(squareCode, value))) {
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
  
  handleLoadPuzzle = (puzzle) => {
    const data = puzzle || DEFAULT_DATA;
    const {squaresArrayPerRow, squaresData} = DataUtility.generateData(data);

    this.setState({
      squaresArrayPerRow,
    }); 
    this.props.handleInitList(squaresData);
  }

  checkIsValid = (square, number) => {
    const { squaresData } = this.props;
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

  componentDidMount = () => {
    this.handleLoadPuzzle();
  }

  render() {
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
              {squaresData && squaresArrayPerRow ? squaresArrayPerRow.map( (row, rowIndex) => 
                <Row 
                  key={rowIndex} 
                  data={row} 
                  rowIndex={rowIndex} 
                  squaresData={squaresData} 
                  checkIsValid={this.checkIsValid}
                  handleUpdateSquare={handleUpdateSquare}/>
              ) : null}
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

SudokuBoard.propTypes = {
  squaresData: PropTypes.shape({
    value: PropTypes.string,
    code: PropTypes.string,
    peers: PropTypes.arrayOf(PropTypes.string),
  }),
  handleUpdateSquare: PropTypes.func.isRequired,
  handleInitList: PropTypes.func.isRequired,
  isComplete: PropTypes.bool.isRequired,
};


export default withWidth()(injectSheet(styles)(connect(mapStateToProps,mapDispatchToProps)(SudokuBoard)));
