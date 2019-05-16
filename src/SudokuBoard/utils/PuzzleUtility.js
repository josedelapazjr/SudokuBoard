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
    // return Object.keys(squaresData).find(key => squaresData[key].value === '0');
    // let result = null;
    // for( squareData in squaresData) {
    //   if(squareData.value === '0'){
    //     result = squaresData.id;
    //     break;
    //   }
    // }
    // return result;
    // Object.entries(squaresData).find(squareData => {
    //   console.log(squareData);
    // });
    // console.log('result: ', Object.entries(squaresData));
    console.log('result: ', Object.keys(squaresData).find(key => squaresData[key].value === '0'));
    // return Object.entries(squaresData).find(squareData => squareData.value === '0').id;
    return Object.keys(squaresData).find(key => squaresData[key].value === '0');
  }

  static solve = (squaresData, handleUpdateSquareCallBack) => {
    console.log('BEGIN:solve:squaresData ', squaresData);
    console.log();
    const sqaureDataCode = this.getUnassignedLocation(squaresData);
    if(!sqaureDataCode) {
      console.log('solved! ', squaresData);
      return true;
    } 

    console.log('solve:sqaureDataCode ', sqaureDataCode);

    let squareData = squaresData[sqaureDataCode];
    console.log('solve:squareData ', sqaureDataCode);

    for(let num = 1; num <= 9; num++) {
      const strNum = num.toString();
      console.log('solve:strNum ', strNum);
      const possibleValues = squareData.possibleValues;
      console.log('solve:possibleValues ', possibleValues);
      // if(possibleValues.includes(strNum)) {
      if(this.isSafe(squaresData, sqaureDataCode, strNum)) {  
        console.log('solve:isSafe ', sqaureDataCode, strNum);
        squareData.value = strNum;
        // const previousPossibleValues = squareData.possibleValues;
        // squareData.possibleValues = [];
        squaresData[sqaureDataCode] = squareData;
        handleUpdateSquareCallBack(sqaureDataCode, strNum);
        if(this.solve(squaresData, handleUpdateSquareCallBack)) {
          return true;
        };
        console.log('solve:isSafe:reverting ', sqaureDataCode, strNum);
        squareData.value = '0';
        handleUpdateSquareCallBack(sqaureDataCode, strNum);
        // squareData.possibleValues = previousPossibleValues;
        squaresData[sqaureDataCode] = squareData;
      } 
    }
    return false;
  }

};

export default PuzzleUtility;