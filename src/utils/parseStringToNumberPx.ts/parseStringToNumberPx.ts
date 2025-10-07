import { Unit } from '@/types/unit.enum';

const UNIT_VALUE_REGEX = /^(\d+(\.\d+)?)(px|rem|%)?$/;
const MATCH_VALUE_INDEX = 1;
const MATCH_UNIT_INDEX = 3;

/**
 * Parses a string or number to a pixel value.
 * If the input is a string, it can be in the format '2px', '2rem', or '2'.
 * If the input is a number, it returns the number as is.
 *
 * @param value - The value to parse (string or number).
 * @returns The parsed pixel value as a number.
 * @throws Will throw an error if the string format is invalid.
 */
export const parseStringToNumberPx = (value: string | number): number => {
  if (typeof value === 'number') {
    return value;
  }
  //detect if the value is '2px' or '2rem' or '2'
  const match = value.match(UNIT_VALUE_REGEX);

  if (!match) {
    throw new Error(`Invalid string format: "${value}"`);
  }
  const number = match[MATCH_VALUE_INDEX]; // match for group (\d+(\.\d+)?)
  const unit = match[MATCH_UNIT_INDEX]; // match for group (px|rem|%)

  if (unit === Unit.REM) {
    return parseFloat(number) * 16;
  }

  return parseFloat(number);
};
