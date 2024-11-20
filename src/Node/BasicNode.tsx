import { NodeData, NodeType } from '../utils/types.ts';
import styles from './Node.module.css';
import { FormEventHandler, KeyboardEventHandler, useContext, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { CommandPanel } from './CommandPanel.tsx';
import cx from 'classnames';
import { AppStateContext } from '../state/appContext.ts';

type BasicNodeProps = {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
};

export const BasicNode = ({ node, updateFocusedIndex, isFocused, index }: BasicNodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const showCommandPanel = isFocused && node?.value?.match(/^\//);

  const { changeNodeValue, changeNodeType, addNode, removeNodeByIndex } =
    useContext(AppStateContext);

  useEffect(() => {
    if (isFocused) {
      nodeRef.current?.focus();
    } else {
      nodeRef.current?.blur();
    }
  }, [isFocused]);

  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      nodeRef.current.textContent = node.value;
    }
  }, [node]);

  const parseCommand = (nodeType: NodeType) => {
    if (nodeRef.current) {
      changeNodeType(index, nodeType);
      nodeRef.current.textContent = '';
    }
  };

  const handleInput: FormEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    const { textContent } = currentTarget;
    changeNodeValue(index, textContent || '');
  };

  const handleClick = () => {
    updateFocusedIndex(index);
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement;
    if (event.key === 'Enter') {
      event.preventDefault();
      if (target.textContent?.[0] === '/') {
        return;
      }
      addNode({ type: node.type, value: '', id: nanoid() }, index + 1);
      updateFocusedIndex(index + 1);
    }
    if (event.key === 'Backspace') {
      if (target.textContent?.length === 0) {
        event.preventDefault();
        removeNodeByIndex(index);
        updateFocusedIndex(index - 1);
      } else if (window?.getSelection()?.anchorOffset === 0) {
        event.preventDefault();
        removeNodeByIndex(index - 1);
        updateFocusedIndex(index - 1);
      }
    }
  };

  return (
    <>
      {showCommandPanel && <CommandPanel nodeText={node.value} selectItem={parseCommand} />}
      <div
        className={cx(styles.node, styles[node.type])}
        onInput={handleInput}
        onClick={handleClick}
        onKeyDown={onKeyDown}
        ref={nodeRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
      />
    </>
  );
};
