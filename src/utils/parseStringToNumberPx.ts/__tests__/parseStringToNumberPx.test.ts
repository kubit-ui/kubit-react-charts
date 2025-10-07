import { parseStringToNumberPx } from '../parseStringToNumberPx';

describe('parseStringToNumberPx', () => {
  it('Sending number should return 1', () => {
    const value = 1;
    const result = parseStringToNumberPx(value);
    const expectedResult = 1;

    expect(result).toEqual(expectedResult);
  });

  it('Sending string should return 1', () => {
    const value = '1';
    const result = parseStringToNumberPx(value);
    const expectedResult = 1;

    expect(result).toEqual(expectedResult);
  });

  it('Sending string with px should return 1', () => {
    const value = '1px';
    const result = parseStringToNumberPx(value);
    const expectedResult = 1;

    expect(result).toEqual(expectedResult);
  });

  it('Sending string with rem should return 16', () => {
    const value = '1rem';
    const result = parseStringToNumberPx(value);
    const expectedResult = 16;

    expect(result).toEqual(expectedResult);
  });

  it('Sending invalid string should throw an error', () => {
    const value = '1pxssf';

    expect(() => {
      parseStringToNumberPx(value);
    }).toThrow('Invalid string format');
  });
});
