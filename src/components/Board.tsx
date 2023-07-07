import { FC } from "react";
import CardDetail from "./Card";
import useBoard from "../hooks/useBoard";
const Board: FC = () => {
    const { lists, createList, createCard, editCard, deleteCard } = useBoard();

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

  return (
    <div>
      {lists.map((list) => (
        <div key={list.id}>
          <h2>{list.title}</h2>
          <ul>
            {list.cards.map((card) => (
              <li key={card.id}>
                <CardDetail
                  card={card}
                  onEdit={(content) =>
                    handleEditCard(list.id, card.id, content)
                  }
                  onDelete={() => handleDeleteCard(list.id, card.id)}
                />
              </li>
            ))}
          </ul>
          <button onClick={() => handleAddCard(list.id)}>Add Card</button>
        </div>
      ))}
      <button onClick={handleAddList}>Add List</button>
    </div>
  );
};

export default Board;
