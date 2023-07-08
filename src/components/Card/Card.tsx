import { FC, useState } from "react";

import type { Card } from "../../types";
import style from "./Card.module.css";

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

  const handleCancelEdit = () => {
    setContent(card.content);
    setEditing(false);
  };
  
  return (
    <div className={style.card}>
      {editing ? (
        <div>
          <textarea
            title="Edit card"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className={style.actions}>
            <button onClick={handleEdit}>💾</button>
            <button onClick={handleCancelEdit}>❌</button>
          </div>
        </div>
      ) : (
        <div>
          <p className={style.cardContent}>{card.content}</p>
          <div className={style.actions}>
            <button onClick={() => setEditing(true)}>✍️</button>
            <button onClick={handleDelete}>🗑️</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetail;
