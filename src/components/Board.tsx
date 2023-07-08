import { FC } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
} from "react-beautiful-dnd";

import CardDetail from "./Card";
import useBoard from "../hooks/useBoard";

const Board: FC = () => {
  const { lists, createList, createCard, editCard, deleteCard, moveCard } =
    useBoard();

  const handleAddList = () => {
    const listName = window.prompt("Enter list title"); // TODO: Replace with modal or dialog
    createList(listName || "New List");
  };
  const handleAddCard = (listId: string) => {
    const cardName = window.prompt("Enter card content"); // TODO: Replace with modal or dialog
    createCard(listId, cardName || "New Card");
  };
  const handleEditCard = (listId: string, cardId: string, content: string) => {
    editCard(listId, cardId, content);
  };
  const handleDeleteCard = (listId: string, cardId: string) => {
    deleteCard(listId, cardId);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    moveCard(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div>
        {lists.map((list) => (
          <div key={list.id}>
            <h2>{list.title}</h2>
            <Droppable droppableId={list.id}>
              {(provided: DroppableProvided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {list.cards.map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={card.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <CardDetail
                            card={card}
                            onEdit={(content) =>
                              handleEditCard(list.id, card.id, content)
                            }
                            onDelete={() => handleDeleteCard(list.id, card.id)}
                          />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
            <button onClick={() => handleAddCard(list.id)}>Add Card</button>
          </div>
        ))}
        <button onClick={handleAddList}>Add List</button>
      </div>
    </DragDropContext>
  );
};

export default Board;
