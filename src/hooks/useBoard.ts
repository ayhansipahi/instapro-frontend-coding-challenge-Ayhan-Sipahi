import { useState } from "react";
import { List } from "../types";

type UseBoard = {
  lists: List[];
  createList: (title: string) => void;
  createCard: (listId: string, content: string) => void;
  editCard: (listId: string, cardId: string, content: string) => void;
  deleteCard: (listId: string, cardId: string) => void;
};

const useBoard = (): UseBoard => {
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


  const editCard = (listId: string, cardId: string, content: string) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.map((card) => {
            if (card.id === cardId) {
              return {
                ...card,
                content,
              };
            }
            return card;
          }),
        };
      }
      return list;
    });
    setLists(updatedLists);
  };

  const deleteCard = (listId: string, cardId: string) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.filter((card) => card.id !== cardId),
        };
      }
      return list;
    });
    setLists(updatedLists);
  };

  return { lists, createList, createCard, editCard, deleteCard };
};


export default useBoard;