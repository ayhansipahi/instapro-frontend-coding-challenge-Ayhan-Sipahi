import { FC, useState } from "react";
type Card = {
    id: string;
    content: string;
}

type List = {
    id: string;
    title: string;
    cards: Card[];
}


const Board: FC = () => {
    const [lists, setLists] = useState<List[]>([
        {
            id: "1",
            title: "List 1",
            cards: [
                {
                    id: "1",
                    content: "Card 1"
                },
                {
                    id: "2",
                    content: "Card 2"
                },
                {
                    id: "3",
                    content: "Card 3"
                }
            ]
        },
        {
            id: "2",
            title: "List 2",
            cards: [
                {
                    id: "4",
                    content: "Card 4"
                },
                {
                    id: "5",
                    content: "Card 5"
                },
                {
                    id: "6",
                    content: "Card 6"
                }
            ]
        }
    ])
    const createList = (title: string) => {
        const list = {
          id: `list-${Date.now()}`,
          title,
          cards: [],
        };
        setLists([...lists, list]);
    };



    const handleAddList = () => {
        const listName = window.prompt('Enter list title'); // TODO: Replace with modal or dialog
        createList(listName || 'New List');
    }

    return (
        <div>
            {lists.map((list) => (
                <div key={list.id}>
                    <h2>{list.title}</h2>
                    {list.cards.map((card) => (
                        <div key={card.id}>
                            {card.content}
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={handleAddList}>Add List</button>
        </div>
    )
}


export default Board