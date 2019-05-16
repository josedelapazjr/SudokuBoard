class PuzzleUtility {
  static setSquarePossibleValues = (squaresData) => {
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
  }

  static isSafe(squaresData, squareCode, value) {
    let result = true;
    const squareData = squaresData[squareCode];
    const peers = squareData.peers;
    for(let index = 0; index < peers.length; index++) {
      const peerId = peers[index];
      const peerSquareData = squaresData[peerId];
      if(peerSquareData.value === value) {
        result = false;
        break;
      }
    } 
    return result;
  }

  static getUnassignedLocation(squaresData) {
    return Object.keys(squaresData).find(key => squaresData[key].value === '0');
  }

  static solve = (squaresData, handleUpdateSquareCallBack) => {
    const sqaureDataCode = this.getUnassignedLocation(squaresData);
    if(!sqaureDataCode) {
      return true;
    } 

    let squareData = squaresData[sqaureDataCode];

    for(let num = 1; num <= 9; num++) {
      const strNum = num.toString();
      if(this.isSafe(squaresData, sqaureDataCode, strNum)) {  
        squareData.value = strNum;
        squaresData[sqaureDataCode] = squareData;
        handleUpdateSquareCallBack(sqaureDataCode, strNum);
        if(this.solve(squaresData, handleUpdateSquareCallBack)) {
          return true;
        };
        squareData.value = '0';
        handleUpdateSquareCallBack(sqaureDataCode, strNum);
        squaresData[sqaureDataCode] = squareData;
      } 
    }
    return false;
  }

};

export default PuzzleUtility;