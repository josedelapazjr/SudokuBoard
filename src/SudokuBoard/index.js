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
import Alert from './Status';
import LoadPuzzle from './Controls/LoadPuzzle';
import {DEFAULT_DATA} from './constants';
import InProgress from './Status/InProgress';
import Success from './Status/Success';
import Status from './Status';

class SudokuBoard extends Component {

  state = {
    squaresArrayPerRow: [],
    showStatusModal: false,
    showLoadPuzzle: false,
  };

  // componentDidUpdate = (prevProps) => {
  //   const {isComplete} = this.props
  //   if( prevProps.isComplete !== isComplete && isComplete) {
  //     this.setState({
  //       showStatusModal: true,
  //     });
  //   }
  // }

  handleSolveButton = () => {
    console.log('handleSolveButton:setting showStatusModal to TRUE');
    this.setState({
      showStatusModal: true,
    });

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
    this.setState({
      showStatusModal: false,
    });
  }

  handleLoadButton = () => {
    this.setState({
      showLoadPuzzle: true, 
      showStatusModal: false,
    });
  }

  handleLoadPuzzleClose = () => {
    this.setState({
      showLoadPuzzle : false
    });  
  }

  handleAlertClose = () => {
    console.log('handleAlertClose:setting showStatusModal to FALSE');
    this.setState({
      showStatusModal : false
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

  checkIsValid = (squareCode, number) => {
    const { squaresData } = this.props;
    const data = squaresData[squareCode];
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
    const {classes, squaresData, handleUpdateSquare, isComplete} = this.props;
    const {squaresArrayPerRow, showStatusModal, showLoadPuzzle} = this.state;
    console.log('showStatusModal, isComplete => ', showStatusModal, isComplete);
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
            isComplete={isComplete}
            handleSolveButton={this.handleSolveButton} 
            handleResetButton={this.handleResetButton}
            handleLoadButton={this.handleLoadButton}/>
          <LoadPuzzle isOpen={showLoadPuzzle} handleLoadPuzzle={this.handleLoadPuzzle} handleClose={this.handleLoadPuzzleClose}/>
          {/* <Alert isOpen={showStatusModal} handleClose={this.handleAlertClose}/> */}
          {/* <Alert isOpen={true} handleClose={this.handleAlertClose}/> */}
          {/* <InProgress isOpen /> */}
          <Status isOpen={showStatusModal} isComplete={isComplete} handleClose={this.handleAlertClose}/>      
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
