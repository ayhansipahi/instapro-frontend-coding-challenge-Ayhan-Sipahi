import { useEffect, useState } from "react";
import { List } from "../types";

type UseBoard = {
  lists: List[];
  createList: (title: string) => void;
  createCard: (listId: string, content: string) => void;
  editCard: (listId: string, cardId: string, content: string) => void;
  deleteCard: (listId: string, cardId: string) => void;
  moveCard: (
    sourceListId: string,
    destinationListId: string,
    sourceIndex: number,
    destinationIndex: number
  ) => void;
  editListTitle: (listId: string, title: string) => void;
  deleteList: (listId: string) => void;
};

const useBoard = (): UseBoard => {
  const [lists, setLists] = useState<List[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists, loaded]);

  useEffect(() => {
    const storedLists = window.localStorage.getItem("lists");
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

  const moveCard = (
    sourceListId: string,
    destinationListId: string,
    sourceIndex: number,
    destinationIndex: number
  ) => {
    const sourceList = lists.find((list) => list.id === sourceListId);
    const destinationList = lists.find((list) => list.id === destinationListId);
    const [removedCard] = sourceList!.cards.splice(sourceIndex, 1);
    destinationList!.cards.splice(destinationIndex, 0, removedCard);
    setLists([...lists]);
  };

  const editListTitle = (listId: string, title: string) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          title,
        };
      }
      return list;
    });
    setLists(updatedLists);
  };

  const deleteList = (listId: string) => {
    const updatedLists = lists.filter((list) => list.id !== listId);
    setLists(updatedLists);
  };

  return {
    lists,
    createList,
    createCard,
    editCard,
    deleteCard,
    moveCard,
    deleteList,
    editListTitle,
  };
};

export default useBoard;
