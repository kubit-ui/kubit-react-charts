import { classNames } from '../classNames';

describe('classNames', () => {
  it('should concatenate string arguments', () => {
    const result = classNames('class1', 'class2', 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('should concatenate array arguments', () => {
    const result = classNames(['class1', 'class2'], ['class3', 'class4']);
    expect(result).toBe('class1 class2 class3 class4');
  });

  it('should include classes from object arguments where the value is true', () => {
    const result = classNames({ class1: true, class2: false }, { class3: true, class4: false });
    expect(result).toBe('class1 class3');
  });

  it('should handle a mix of argument types', () => {
    const result = classNames('class1', ['class2', 'class3'], { class4: true, class5: false });
    expect(result).toBe('class1 class2 class3 class4');
  });
});
