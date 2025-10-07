interface HandlerCoord {
  x: string;
  y: string;
}

interface HandleNodesFocusReturn {
  mount: () => void;
  unmount: () => void;
}

interface HandleNodesFocusProps {
  ref: ParentNode;
  nodes: SVGSVGElement[];
  data: HandlerCoord[];
  getNodeFocusInfo?: (info: HandlerCoord) => void;
}

export const handleNodesFocus = ({
  data,
  getNodeFocusInfo,
  nodes,
  ref,
}: HandleNodesFocusProps): HandleNodesFocusReturn => {
  let refFocused = false;
  let currentNode: number | undefined = undefined;
  const g = ref.querySelector('[data-draw]');

  //* callbacks
  const handleKeyDown = (e: KeyboardEvent) => {
    if (refFocused) {
      if (e.key === 'ArrowRight') {
        currentNode =
          currentNode === undefined || currentNode === nodes.length - 1 ? 0 : currentNode + 1;
        nodes[currentNode].focus();
        getNodeFocusInfo?.(data[currentNode]);
      } else if (e.key === 'ArrowLeft') {
        currentNode =
          currentNode === undefined || currentNode === 0 ? nodes.length - 1 : currentNode - 1;
        nodes[currentNode].focus();
        getNodeFocusInfo?.(data[currentNode]);
      }
    }
  };
  const handleFocusin = () => {
    refFocused = true;
  };
  const handleFocusout = () => {
    refFocused = false;
  };
  const handleFocus = () => {
    currentNode = undefined;
  };

  //* listeners
  const mount = () => {
    ref.addEventListener('focusin', handleFocusin);
    ref.addEventListener('focusout', handleFocusout);
    g?.addEventListener('focus', handleFocus);
    window.addEventListener('keydown', (e: Event) => handleKeyDown(e as KeyboardEvent));
  };
  const unmount = () => {
    ref.removeEventListener('focusin', handleFocusin);
    ref.removeEventListener('focusout', handleFocusout);
    g?.removeEventListener('focus', handleFocus);
    window.removeEventListener('keydown', (e: Event) => handleKeyDown(e as KeyboardEvent));
  };

  return { mount, unmount };
};
