import { FC, useState } from "react";
import type { Card } from "../types";

type Props = {
  card: Card;
  onEdit: (content: string) => void;
  onDelete: () => void;
};

const CardDetail: FC<Props> = ({ card, onEdit, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(card.content);

  const handleEdit = () => {
    onEdit(content);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete();
  };
  return (
    <div>
      {editing ? (
        <div>
          <textarea
            title="Edit card"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div>
          <p>{card.content}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default CardDetail;
