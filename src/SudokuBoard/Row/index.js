import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Cell from './Cell';

const getUnusedNumber = (peers, squareList) => {
    const result =  ['1','2','3','4','5','7','8','9'].filter(number => {
      var isValid = true;
      for(let index = 0; index < peers.length; index++) {
        const peer = peers[index];
        if(squareList[peer].value === number){
          isValid = false;
          break;
        }
      }
      return isValid; 
    });
    return result;
  }


const Row = ({data, index, squareList, isValid}) => (
    <TableRow key={index}>
        {data && data.map((id, index) => {
            const unusedNumbers = getUnusedNumber(squareList[id].peers, squareList);
            const square = squareList[id];
            return <Cell key={index} id={square.id} value={square.value} isValid={isValid}/>
        })}
    </TableRow>

);

export default Row;