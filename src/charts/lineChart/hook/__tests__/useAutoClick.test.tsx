import { act, render } from '@testing-library/react';
import { type ForwardedRef, createRef, forwardRef } from 'react';

import { useAutoClick } from '../useAutoClick';

const TestComponent = forwardRef(
  (
    { onClick }: { onClick: (autoClick: boolean) => void },
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const [buttonRef, autoClick] = useAutoClick<HTMLButtonElement>(ref);

    const handleClick = () => {
      onClick(autoClick.current);
    };

    return (
      <button ref={buttonRef} onClick={handleClick}>
        Click me
      </button>
    );
  }
);
TestComponent.displayName = 'TestComponent';

describe('useAutoClick', () => {
  it('should set autoClick to true when autoClick event is triggered', () => {
    const onClick = vi.fn();
    const ref = createRef<HTMLButtonElement>();
    render(<TestComponent ref={ref} onClick={onClick} />);

    act(() => {
      const event = new MouseEvent('click', { bubbles: true }) as MouseEvent & {
        autoClick?: boolean;
      };
      event.autoClick = true;
      ref.current?.dispatchEvent(event);
    });

    expect(onClick).toHaveBeenCalledWith(true);
  });
  it('should set autoClick to false when autoClick event is not triggered', () => {
    const onClick = vi.fn();
    const ref = createRef<HTMLButtonElement>();
    render(<TestComponent ref={ref} onClick={onClick} />);

    act(() => {
      const event = new MouseEvent('click', { bubbles: true });
      ref.current?.dispatchEvent(event);
    });

    expect(onClick).toHaveBeenCalledWith(false);
  });
});
