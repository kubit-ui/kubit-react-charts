import { Positions } from '@/types/position.enum';

import { getTickTextXCoordinate, getTickTextYCoordinate } from '../getTickTextCoordinates';

describe('getTickTextXCoordinate', () => {
  it('returns correct value for RIGHT position', () => {
    const position = Positions.RIGHT;
    const x = 100;
    const fontSize = 12;

    const result = getTickTextXCoordinate(position, x, fontSize);

    expect(result).toBe(x + fontSize);
  });

  it('returns correct value for non-RIGHT position', () => {
    const position = Positions.LEFT; // or any other non-RIGHT position
    const x = 100;
    const fontSize = 12;

    const result = getTickTextXCoordinate(position, x, fontSize);

    expect(result).toBe(x - fontSize);
  });
});

describe('getTickTextYCoordinate', () => {
  it('returns correct value for TOP position', () => {
    const position = Positions.TOP;
    const y = 100;
    const fontSize = 12;
    const securitySpace = 10;

    const result = getTickTextYCoordinate(position, y, fontSize, securitySpace);

    expect(result).toBe(fontSize);
  });

  it('returns correct value for non-TOP position', () => {
    const position = Positions.BOTTOM; // or any other non-TOP position
    const y = 100;
    const fontSize = 12;
    const securitySpace = 10;

    const result = getTickTextYCoordinate(position, y, fontSize, securitySpace);

    expect(result).toBe(y + fontSize + securitySpace);
  });
});
