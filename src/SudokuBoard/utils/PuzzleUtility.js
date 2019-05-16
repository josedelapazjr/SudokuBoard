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
};

export default PuzzleUtility;