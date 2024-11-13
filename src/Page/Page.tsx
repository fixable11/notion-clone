import { useFocusedNodeIndex } from './useFocusedNodeIndex.ts';
import { Cover } from './Cover.tsx';
import { Spacer } from './Spacer.tsx';
import { Title } from './Title.tsx';
import { nanoid } from 'nanoid';
import { useAppState } from '../state/AppStateContext.tsx';
import { NodeTypeSwitcher } from '../Node/NodeTypeSwitcher.tsx';

export const Page = () => {
  const { title, nodes, addNode, setTitle } = useAppState();

  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes
  });

  return (
    <>
      <Cover />
      <div>
        <Title title={title} addNode={addNode} changePageTitle={setTitle} />
        {nodes.map((node, index) => (
          <NodeTypeSwitcher
            key={node.id}
            node={node}
            isFocused={focusedNodeIndex === index}
            updateFocusedIndex={setFocusedNodeIndex}
            index={index}
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
