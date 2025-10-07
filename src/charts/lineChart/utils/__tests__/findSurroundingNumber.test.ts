import { findClosestNumber, findSurroundingNumber } from '../findSurroundingNumber';

describe('findSurroundingNumber', () => {
  it('should return match true and correct index when xPosition is in points', () => {
    const points = [1, 2, 3, 4, 5];
    const xPosition = 3;
    const result = findSurroundingNumber(points, xPosition);
    expect(result).toEqual({ idx: 2, match: true });
  });

  it('should return match false and index 0 when xPosition is not in points', () => {
    const points = [1, 2, 3, 4, 5];
    const xPosition = 6;
    const result = findSurroundingNumber(points, xPosition);
    expect(result).toEqual({ idx: 0, match: false });
  });

  it('should return match true and correct index when xPosition is a floating point number close to an integer in points', () => {
    const points = [1, 2, 3, 4, 5];
    const xPosition = 2.9;
    const result = findSurroundingNumber(points, xPosition);
    expect(result).toEqual({ idx: 2, match: true });
  });
});

describe('findClosestNumber', () => {
  it('should return the closest number for a given number', () => {
    const points = [1, 5, 9, 13];
    const number = 4;
    const result = findClosestNumber(points, number);
    expect(result).toBe(1); // The index of 5 in the array
  });

  it('should return the closest number for a given number when the number is exactly in the array', () => {
    const points = [1, 5, 9, 13];
    const number = 5;
    const result = findClosestNumber(points, number);
    expect(result).toBe(1); // The index of 5 in the array
  });

  it('should return the closest number for a given number when the number is greater than all elements in the array', () => {
    const points = [1, 5, 9, 13];
    const number = 15;
    const result = findClosestNumber(points, number);
    expect(result).toBe(3); // The index of 13 in the array
  });

  it('should return the closest number for a given number when the number is less than all elements in the array', () => {
    const points = [1, 5, 9, 13];
    const number = 0;
    const result = findClosestNumber(points, number);
    expect(result).toBe(0); // The index of 1 in the array
  });

  it('should return the first closest number when there are multiple closest numbers', () => {
    const points = [1, 5, 5, 9, 13];
    const number = 6;
    const result = findClosestNumber(points, number);
    expect(result).toBe(1); // The index of the first 5 in the array
  });
});
