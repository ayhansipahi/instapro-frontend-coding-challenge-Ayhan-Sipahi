import { FC } from "react";

const Board: FC = () => {
    const lists = [
        {
            id: 1,
            title: "List 1",
            cards: [
                {
                    id: 1,
                    content: "Card 1"
                },
                {
                    id: 2,
                    content: "Card 2"
                },
                {
                    id: 3,
                    content: "Card 3"
                }
            ]
        },
        {
            id: 2,
            title: "List 2",
            cards: [
                {
                    id: 4,
                    content: "Card 4"
                },
                {
                    id: 5,
                    content: "Card 5"
                },
                {
                    id: 6,
                    content: "Card 6"
                }
            ]
        }
    ]
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
        </div>
    )
}


export default Board