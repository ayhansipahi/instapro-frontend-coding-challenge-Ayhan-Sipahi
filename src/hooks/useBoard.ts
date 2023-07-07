import { useEffect, useState } from "react";
import { List } from "../types";

type UseBoard = {
  lists: List[];
  createList: (title: string) => void;
  createCard: (listId: string, content: string) => void;
  editCard: (listId: string, cardId: string, content: string) => void;
  deleteCard: (listId: string, cardId: string) => void;
};

const useBoard = (): UseBoard => {
  const [lists, setLists] = useState<List[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists,loaded]);

  useEffect(() => {
    const storedLists = window.localStorage.getItem('lists');
    if (storedLists) {
      const storedListsJson = JSON.parse(storedLists) as List[];
      setLists(storedListsJson);
    } else {
      setLists([]);
    }
    setLoaded(true);
  }, []);

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