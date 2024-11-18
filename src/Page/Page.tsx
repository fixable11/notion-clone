import { useFocusedNodeIndex } from './useFocusedNodeIndex.ts';
import { Cover } from './Cover.tsx';
import { Spacer } from './Spacer.tsx';
import { Title } from './Title.tsx';
import { nanoid } from 'nanoid';
import { useAppState } from '../state/AppStateContext.tsx';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { NodeContainer } from '../Node/NodeContainer.tsx';

export const Page = () => {
  const { title, nodes, addNode, cover, setCoverImage, setTitle, reorderNodes } = useAppState();

  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes
  });

  const handleDragEvent = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over?.id && active.id !== over?.id) {
      reorderNodes(`${active.id}`, `${over.id}`);
    }
  };

  return (
    <>
      <Cover filePath={cover} changePageCover={setCoverImage} />
      <div>
        <Title title={title} addNode={addNode} changePageTitle={setTitle} />
        <DndContext onDragEnd={handleDragEvent}>
          <SortableContext items={nodes} strategy={verticalListSortingStrategy}>
            {nodes.map((node, index) => (
              <NodeContainer
                key={node.id}
                node={node}
                isFocused={focusedNodeIndex === index}
                updateFocusedIndex={setFocusedNodeIndex}
                index={index}
              />
            ))}
          </SortableContext>
          <DragOverlay />
        </DndContext>
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
