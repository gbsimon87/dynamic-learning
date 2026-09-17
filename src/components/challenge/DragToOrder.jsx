import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./challenge-kit.css";

/**
 * Horizontal reorder strip. @hello-pangea/dnd gives keyboard operation for
 * free (tab to a card, space to lift, arrows to move, space to drop), which
 * matters here: drag alone excludes anyone not using a pointer.
 *
 * `items` is an array of { id, label }; `onReorder` receives the new array.
 */
function DragToOrder({ items, onReorder, disabled }) {
  const handleDragEnd = (result) => {
    // Dropped outside the strip - leave the order alone.
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const next = [...items];
    const [moved] = next.splice(result.source.index, 1);
    next.splice(result.destination.index, 0, moved);
    onReorder(next);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="order" direction="horizontal">
        {(droppable) => (
          <div
            className="drag-strip"
            ref={droppable.innerRef}
            {...droppable.droppableProps}
          >
            {items.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={String(item.id)}
                index={index}
                isDragDisabled={disabled}
              >
                {(draggable, snapshot) => (
                  <div
                    className={`drag-card ${snapshot.isDragging ? "dragging" : ""}`}
                    ref={draggable.innerRef}
                    {...draggable.draggableProps}
                    {...draggable.dragHandleProps}
                  >
                    {item.label}
                  </div>
                )}
              </Draggable>
            ))}
            {droppable.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragToOrder;
