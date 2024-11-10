import { NodeData } from '../utils/types.ts';
import { useState } from 'react';
import { useFocusedNodeIndex } from './useFocusedNodeIndex.ts';
import { Cover } from './Cover.tsx';
import { Spacer } from './Spacer.tsx';
import { BasicNode } from '../Node/BasicNode.tsx';
import { Title } from './Title.tsx';
import { nanoid } from 'nanoid';

export const Page = () => {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [title, setTitle] = useState<string>('Default Title');
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes
  });

  const addNode = (node: NodeData, index: number) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 0, node);
    setNodes(newNodes);
  };

  const removeNodeByIndex = (index: number) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 1);
    setNodes(newNodes);
  };

  const changeNodeValue = (index: number, value: string) => {
    const newNodes = [...nodes];
    newNodes[index].value = value;
    setNodes(newNodes);
  };

  return (
    <>
      <Cover />
      <div>
        <Title title={title} addNode={addNode} changePageTitle={setTitle} />
        {nodes.map((node, index) => (
          <BasicNode
            key={node.id}
            node={node}
            isFocused={focusedNodeIndex === index}
            updateFocusedIndex={setFocusedNodeIndex}
            index={index}
            addNode={addNode}
            removeNodeByIndex={removeNodeByIndex}
            changeNodeValue={changeNodeValue}
          />
        ))}
        <Spacer
          showHint={!nodes.length}
          handleClick={() => {
            addNode({ type: 'text', value: '', id: nanoid() }, nodes.length);
          }}
        />
      </div>
    </>
  );
};
