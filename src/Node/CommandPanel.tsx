import { NodeType } from '../utils/types.ts';
import { useEffect, useState } from 'react';
import { useOverflowScreenBottom } from './useOverflowScreenBottom.ts';
import styles from './CommandPanel.module.css';
import cx from 'classnames';

type CommandPanelProps = {
  nodeText: string;
  selectItem: (nodeType: NodeType) => void;
};

type SupportedNodeType = {
  value: NodeType;
  name: string;
};

const supportedNodeTypes: SupportedNodeType[] = [
  { value: 'text', name: 'Text' },
  { value: 'list', name: 'List' },
  { value: 'heading1', name: 'Heading 1' },
  { value: 'heading2', name: 'Heading 2' },
  { value: 'heading3', name: 'Heading 3' }
];

export const CommandPanel = ({ selectItem, nodeText }: CommandPanelProps) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { overflows, ref } = useOverflowScreenBottom();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        selectItem(supportedNodeTypes[selectedItemIndex].value);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItemIndex, selectItem]);

  useEffect(() => {
    const normalizedValue = nodeText.toLowerCase().replace(/\//, '');
    setSelectedItemIndex(supportedNodeTypes.findIndex((item) => item.value.match(normalizedValue)));
  }, [nodeText]);

  return (
    <div
      ref={ref}
      className={cx(styles.panel, {
        [styles.reverse]: overflows
      })}>
      <div className={styles.title}>Blocks</div>
      <ul>
        {supportedNodeTypes.map((type, index) => {
          const selected = selectedItemIndex === index;

          return (
            <li
              key={type.value}
              onClick={() => selectItem(type.value)}
              className={cx({ [styles.selected]: selected })}>
              {type.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
