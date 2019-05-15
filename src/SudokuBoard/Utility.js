class Utility {
  static generateSquareCode = (data1, data2) => {
    let result = [];
    for(let rowIndex = 0; rowIndex < data1.length; rowIndex++) {
      for(let columnIndex = 0; columnIndex < data2.length; columnIndex++) {
          result.push(data1[rowIndex] + data2[columnIndex]);
      }
    }  
    return result;
  }

  static generateFoobar = () => {
    const rows = "1,2,3,4,5,6,7,8,9".split(',');
    const columns = "A,B,C,D,E,F,G,H,I".split(',');

    // SQUARES
    const SQUARES = this.generateSquareCode(columns, rows);
    // console.log('squares: ', squares);


    // VERTICAL UNIT
    let VERTICAL_UNITS = []
    for (var i=0; i<rows.length; i++) {
        VERTICAL_UNITS.push(this.generateSquareCode(columns, [rows[i]])); 
    }

    // HORIZONTAL UNIT
    let HORIZONTAL_UNITS = []
    for (var i=0; i<columns.length; i++) {
      HORIZONTAL_UNITS.push(this.generateSquareCode([columns[i]],rows)); 
    }
    //console.log('unitList: ', unitList);

    // SQUARE UNITS
    let SQUARE_UNITS = []
    var groupCols = ["A,B,C", "D,E,F", "G,H,I"];
    var groupRows = ["1,2,3", "4,5,6", "7,8,9"];
    for (var c=0;c<groupCols.length;c++) {
      for (var r=0;r<groupRows.length;r++) {
        SQUARE_UNITS.push(this.generateSquareCode(groupCols[c].split(','), groupRows[r].split(',')))
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
      squaresArrayPerRow: HORIZONTAL_UNITS,
    }
  }
}

export default Utility;