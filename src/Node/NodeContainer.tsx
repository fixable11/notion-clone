import { NodeData } from '../utils/types.ts';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { NodeTypeSwitcher } from './NodeTypeSwitcher.tsx';
import styles from './NodeContainer.module.css';

type NodeContainerProps = {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
};

export const NodeContainer = ({
  node,
  index,
  isFocused,
  updateFocusedIndex
}: NodeContainerProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: node.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className={styles.container}>
      <div {...listeners} className={styles.dragHandle}></div>
      <NodeTypeSwitcher
        node={node}
        index={index}
        isFocused={isFocused}
        updateFocusedIndex={updateFocusedIndex}></NodeTypeSwitcher>
    </div>
  );
};
