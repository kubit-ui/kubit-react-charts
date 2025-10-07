import type { Mock } from 'vitest';

import { handleNodesFocus } from '../handleNodesFocus';

describe('handleNodesFocus', () => {
  let ref: SVGSVGElement;
  let nodes: SVGSVGElement[];
  let data: { x: string; y: string }[];
  let getNodeFocusInfo: Mock;

  beforeEach(() => {
    ref = document.createElement('svg') as unknown as SVGSVGElement;
    ref.setAttribute('tabindex', '0');

    nodes = Array.from({ length: 3 }, (_, i) => {
      const node = document.createElement('circle') as unknown as SVGSVGElement;
      node.setAttribute('tabindex', '0');
      node.setAttribute('data-node', `node-${i}`);
      ref.appendChild(node);
      return node;
    });
    data = [
      { x: 'Node x 1', y: 'Node y 1' },
      { x: 'Node x 2', y: 'Node y 2' },
      { x: 'Node x 3', y: 'Node y 3' },
    ];
    getNodeFocusInfo = vi.fn();
    document.body.appendChild(ref);
  });

  afterEach(() => {
    document.body.removeChild(ref);
  });

  it('should add the event listeners when the mount function is called', () => {
    const { mount } = handleNodesFocus({ data, getNodeFocusInfo, nodes, ref });
    const addEventListenerSpy = vi.spyOn(ref, 'addEventListener');
    const addWindowEventListenerSpy = vi.spyOn(window, 'addEventListener');

    mount();

    expect(addEventListenerSpy).toHaveBeenCalledWith('focusin', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('focusout', expect.any(Function));
    expect(addWindowEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('should remove all event listener when unmount function is called', () => {
    const { mount, unmount } = handleNodesFocus({ data, getNodeFocusInfo, nodes, ref });
    const removeEventListenerSpy = vi.spyOn(ref, 'removeEventListener');
    const removeWindowEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    mount();
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('focusin', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('focusout', expect.any(Function));
    expect(removeWindowEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('should focus the next node when ArrowRight is pressed', () => {
    const { mount } = handleNodesFocus({ data, getNodeFocusInfo, nodes, ref });
    mount();

    ref.focus();
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    window.dispatchEvent(event);

    expect(document.activeElement).toBe(nodes[0]);
    expect(getNodeFocusInfo).toHaveBeenCalledWith(data[0]);
  });

  it('should focus the previous node when ArrowLeft is pressed', () => {
    const { mount } = handleNodesFocus({ data, getNodeFocusInfo, nodes, ref });
    mount();

    ref.focus();
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    window.dispatchEvent(event);

    expect(document.activeElement).toBe(nodes[2]);
    expect(getNodeFocusInfo).toHaveBeenCalledWith(data[2]);
  });

  it('should focus the first node when ArrowRight us pressed and the last node is focused', () => {
    const { mount } = handleNodesFocus({ data, getNodeFocusInfo, nodes, ref });
    mount();

    nodes[2].focus();
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    window.dispatchEvent(event);

    expect(document.activeElement).toBe(nodes[0]);
    expect(getNodeFocusInfo).toHaveBeenCalledWith(data[0]);
  });

  it('should focus the last node when ArrowLeft is pressed and the first node is focused', () => {
    const { mount } = handleNodesFocus({ data, getNodeFocusInfo, nodes, ref });
    mount();

    nodes[0].focus();
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    window.dispatchEvent(event);

    expect(document.activeElement).toBe(nodes[2]);
    expect(getNodeFocusInfo).toHaveBeenCalledWith(data[2]);
  });

  it('should updated correctly the refFocused when focusin and focusout are triggered', () => {
    const { mount } = handleNodesFocus({ data, getNodeFocusInfo, nodes, ref });
    mount();

    const focusinEvent = new FocusEvent('focusin');
    ref.dispatchEvent(focusinEvent);

    const focusoutEvent = new FocusEvent('focusout');
    ref.dispatchEvent(focusoutEvent);

    expect(getNodeFocusInfo).not.toHaveBeenCalled();
  });
});
