import {COL_INDEXES, ROW_INDEXES, COL_GROUP, ROW_GROUP} from '../constants';

class DataUtility {
  
  static generateSquareCode = (rowData, columnData) => {
    let result = [];
    for(let rowIndex = 0; rowIndex < rowData.length; rowIndex++) {
      for(let columnIndex = 0; columnIndex < columnData.length; columnIndex++) {
          result.push(rowData[rowIndex] + columnData[columnIndex]);
      }
    }  
    return result;
  }

  static generateAllUnits = () => {
    let verticalUnits = []
    for (var i=0; i<ROW_INDEXES.length; i++) {
        verticalUnits.push(this.generateSquareCode(COL_INDEXES, [ROW_INDEXES[i]])); 
    }
  
    let horizontalUnits = []
    for (let index = 0; index<COL_INDEXES.length; index++) {
      horizontalUnits.push(this.generateSquareCode([COL_INDEXES[index]],ROW_INDEXES)); 
    }
  
    let boxUnits = []
    for (let colIndex = 0; colIndex < COL_GROUP.length; colIndex++) {
      for (let rowIndex = 0; rowIndex < ROW_GROUP.length; rowIndex ++) {
        boxUnits.push(this.generateSquareCode(COL_GROUP[colIndex], ROW_GROUP[rowIndex]))
      }
    }
  
    return {
      horizontalUnits,
      allUnits: [...horizontalUnits, ...verticalUnits, ...boxUnits],
    };
  }

  static generatePeers = (squares, allUnits) => {
    let peers = {};
    for(let index = 0; index < squares.length; index ++) {
      const square = squares[index];
      const squareUnits = allUnits.filter(unit => unit.includes(square));
      let squarePeers = squareUnits
        .reduce((a,b) =>[
          ...a.filter(data => data !==square), 
          ...b.filter(data => data !==square)
        ], [])
      // Remove duplicates
      squarePeers = squarePeers.filter((v,i) => {
        return squarePeers.indexOf(v) === i
      })
      peers[square] = squarePeers;
    }
    return peers;  
  }

  static generateData = (data) => {
    const squares = this.generateSquareCode(COL_INDEXES, ROW_INDEXES);
    const { allUnits, horizontalUnits } = this.generateAllUnits();
    const peers = this.generatePeers(squares, allUnits);

    const dataLength = data.length;
    let squaresData = {};
    for(let index = 0; index < dataLength; index++) {
      let numberChar = data.charAt(index);
      const squareCode = squares[index];
      const squarePeers = peers[squareCode];
      squaresData[squareCode] = {
        value: numberChar,
        code: squareCode,
        peers: squarePeers,
        isFixedValue: numberChar !== '0',
      }
    }  
    return {
      squaresData,
      squaresArrayPerRow: horizontalUnits,
    }
  }
}

export default DataUtility;