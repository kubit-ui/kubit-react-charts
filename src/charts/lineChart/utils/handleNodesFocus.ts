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
  let currentNode: number | undefined = undefined;
  const g = ref.querySelector('[data-draw]');

  const handleKeyDown = (e: KeyboardEvent) => {
    let newCurrentNode: number | undefined = undefined;
    if (e.key === 'ArrowRight') {
      newCurrentNode =
        currentNode === undefined || currentNode === nodes.length - 1 ? 0 : currentNode + 1;
    } else if (e.key === 'ArrowLeft') {
      newCurrentNode =
        currentNode === undefined || currentNode === 0 ? nodes.length - 1 : currentNode - 1;
    }
    if (newCurrentNode !== undefined) {
      currentNode = newCurrentNode;
      if (nodes[currentNode]) {
        nodes[currentNode].focus();
        getNodeFocusInfo?.(data[currentNode]);
      }
    }
  };

  const handleFocus = () => {
    currentNode = undefined;
  };

  const mount = () => {
    g?.addEventListener('focus', handleFocus);
    ref.addEventListener('keydown', (e: Event) => handleKeyDown(e as KeyboardEvent));
  };
  const unmount = () => {
    g?.removeEventListener('focus', handleFocus);
    ref.removeEventListener('keydown', (e: Event) => handleKeyDown(e as KeyboardEvent));
  };

  return { mount, unmount };
};
