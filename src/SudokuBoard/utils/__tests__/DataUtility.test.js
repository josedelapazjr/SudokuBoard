import DataUtility from '../DataUtility';
import {COL_INDEXES, ROW_INDEXES, COL_GROUP, ROW_GROUP} from '../../constants';

describe('DataUtility', () => {
  describe('generateSquareCode', () => {
    test('should generate square codes from A1 ~ I9', () => {
      const result = DataUtility.generateSquareCode(COL_INDEXES, ROW_INDEXES);
      expect(result.length).toBe(COL_INDEXES.length * ROW_INDEXES.length);
      expect(result[0]).toBe('A1');
      expect(result[result.length-1]).toBe('I9');
    });
  });

  describe('generateAllUnits', () => {
    test('should generate 27 units and 9 horizontal units', () => {
      const {horizontalUnits, allUnits} = DataUtility.generateAllUnits();
      expect(allUnits.length).toBe(27);
      expect(horizontalUnits.length).toBe(9);
    });
    test('should contain 3 units for each square', () => {
      const {horizontalUnits, allUnits} = DataUtility.generateAllUnits();
      expect(allUnits.length).toBe(27);
      const squareCodes = DataUtility.generateSquareCode(COL_INDEXES, ROW_INDEXES);
      squareCodes.forEach(squareCode => {
        expect(allUnits.filter(unit => unit.includes(squareCode)).length).toBe(3);
      });
    });
  });

  describe('generatePeers', () => {
    test('should generate 81 peers', () => {
      const squareCodes = DataUtility.generateSquareCode(COL_INDEXES, ROW_INDEXES);
      const {horizontalUnits, allUnits} = DataUtility.generateAllUnits();
      const peers = DataUtility.generatePeers(squareCodes, allUnits);
      expect(Object.keys(peers).length).toBe(81);
    });
    test('should contain 20 peers for each square', () => {
      const squareCodes = DataUtility.generateSquareCode(COL_INDEXES, ROW_INDEXES);
      const {horizontalUnits, allUnits} = DataUtility.generateAllUnits();
      const peers = DataUtility.generatePeers(squareCodes, allUnits);
      squareCodes.forEach(squareCode => {
        expect(peers[squareCode].length).toBe(20);
      });
    });
  });

  describe('generateData', () => {
    test('should generate 81 square data', () => {
      const data = '016002400320009000040103000005000069009050300630000800000306010000400072004900680';
      const squareCodes = DataUtility.generateSquareCode(COL_INDEXES, ROW_INDEXES);
      const {squaresData, squaresArrayPerRow} = DataUtility.generateData(data)
      expect(Object.keys(squaresData).length).toBe(81);
      squareCodes.forEach((squareCode, index) => {
        const expectedValue = data.charAt(index);
        const squareData = squaresData[squareCode];
        expect(squareData.value).toBe(expectedValue);
        expect(squareData.code).toBe(squareCode);
        expect(squareData.peers.length).toBe(20);
        expect(squareData.isFixedValue).toBe(expectedValue === '0' ? false : true);
      });
    });
  });
});
