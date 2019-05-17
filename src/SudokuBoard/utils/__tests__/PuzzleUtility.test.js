import PuzzleUtility from '../PuzzleUtility';
import DataUtility from '../DataUtility';
import {COL_INDEXES, ROW_INDEXES, COL_GROUP, ROW_GROUP} from '../../constants';

describe('PuzzleUtility', () => {
  describe('isSafe', () => {
    test('should return TRUE when SAFE to assign value', () => {
      const data = '016002400320009000040103000005000069009050300630000800000306010000400072004900680';
      const {squaresData, squaresArrayPerRow} = DataUtility.generateData(data);
      squaresData['A2'].value = '2';
      expect(PuzzleUtility.isSafe(squaresData, 'A1', '1')).toBe(true);
    });
    test('should return FALSE when NOT SAFE to assign value', () => {
      const data = '016002400320009000040103000005000069009050300630000800000306010000400072004900680';
      const {squaresData, squaresArrayPerRow} = DataUtility.generateData(data);
      squaresData['A2'].value = '2';
      expect(PuzzleUtility.isSafe(squaresData, 'A1', '2')).toBe(false);
    });
  });

  describe('getUnassignedLocation', () => {
    test('should return unassigned location', () => {
      const data = '016002400320009000040103000005000069009050300630000800000306010000400072004900680';
      const {squaresData, squaresArrayPerRow} = DataUtility.generateData(data);
      expect(PuzzleUtility.getUnassignedLocation(squaresData)).toBe('A1');
    });
    test('should NOT return unassigned location', () => {
      const data = '116112411321119111141113111115111169119151311631111811111316111111411172114911681';
      const {squaresData, squaresArrayPerRow} = DataUtility.generateData(data);
      expect(PuzzleUtility.getUnassignedLocation(squaresData)).toBe(undefined);
    });
  });
});