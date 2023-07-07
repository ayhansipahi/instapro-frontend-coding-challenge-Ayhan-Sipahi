import { FC, useState } from "react";
import Card from "./Card";
type Card = {
  id: string;
  content: string;
};

type List = {
  id: string;
  title: string;
  cards: Card[];
};

const Board: FC = () => {
  const [lists, setLists] = useState<List[]>([
    {
      id: "1",
      title: "List 1",
      cards: [
        {
          id: "1",
          content: "Card 1",
        },
        {
          id: "2",
          content: "Card 2",
        },
        {
          id: "3",
          content: "Card 3",
        },
      ],
    },
    {
      id: "2",
      title: "List 2",
      cards: [
        {
          id: "4",
          content: "Card 4",
        },
        {
          id: "5",
          content: "Card 5",
        },
        {
          id: "6",
          content: "Card 6",
        },
      ],
    },
  ]);

  const createList = (title: string) => {
    const list = {
      id: `list-${Date.now()}`,
      title,
      cards: [],
    };
    setLists([...lists, list]);
  };

  const createCard = (listId: string, content: string) => {
    const card = {
      id: `card-${Date.now()}`,
      content,
    };
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          cards: [...list.cards, card],
        };
      }
      return list;
    });
    setLists(updatedLists);
  };

  const handleAddList = () => {
    const listName = window.prompt("Enter list title"); // TODO: Replace with modal or dialog
    createList(listName || "New List");
  };
  const handleAddCard = (listId: string) => {
    const cardName = window.prompt("Enter card content"); // TODO: Replace with modal or dialog
    createCard(listId, cardName || "New Card");
  };

  return (
    <div>
      {lists.map((list) => (
        <div key={list.id}>
          <h2>{list.title}</h2>
          <ul>
            {list.cards.map((card) => (
              <li key={card.id}>
                <Card id={card.id} content={card.content} />
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
