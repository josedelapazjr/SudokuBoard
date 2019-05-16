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
    for (var i=0; i<COL_INDEXES.length; i++) {
      horizontalUnits.push(this.generateSquareCode([COL_INDEXES[i]],ROW_INDEXES)); 
    }
  
    let boxUnits = []
    for (var c=0;c<COL_GROUP.length;c++) {
      for (var r=0;r<ROW_GROUP.length;r++) {
        boxUnits.push(this.generateSquareCode(COL_GROUP[c], ROW_GROUP[r]))
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
        id: squareCode,
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