import {
  DragOverlay,
  UseDraggableArguments,
  useDraggable,
} from "@dnd-kit/core";
import React from "react";

interface Props {
  id: string;
  data?: UseDraggableArguments["data"];
}

export const KanbanItem = ({
  children,
  id,
  data,
}: React.PropsWithChildren<Props>) => {
  const { attributes, active, listeners, setNodeRef } = useDraggable({
    id,
    data,
  });


  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          opacity: active ? (active.id === id ? 1 : 0.5) : 1,
          borderRadius: "8px",
          position: "relative",
          cursor: "grab",
        }}
      >
        {children}
      </div>
      {active?.id === id && (
        <DragOverlay zIndex={1000}>
          <div
            style={{
              borderRadius: "8px",
              boxShadow:
                "0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08)",
              cursor: "grabbing",
            }}
          >
            {children}
          </div>
        </DragOverlay>
      )}
    </div>
  );
};

export default KanbanItem;

/*
attributes: it is the object ontaining everything that we should use to spread  on item to make it draggable.

object containing event  handlers to apply on an element
reference of an node 
active active holds the info of the item currently being dragged


*/
