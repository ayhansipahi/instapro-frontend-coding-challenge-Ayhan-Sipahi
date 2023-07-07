import { FC } from "react";

type Props = {
    id: string;
    content: string;
};

const Card: FC<Props> = ({
    id,
    content,
}) => {
    return (
        <div key={id}> {content} </div>
     );
}

export default Card;