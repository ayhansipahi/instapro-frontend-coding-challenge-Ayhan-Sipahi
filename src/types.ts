export type Card = {
    id: string;
    content: string;
};
export type List = {
    id: string;
    title: string;
    cards: Card[];
};
