import { FC, useState } from "react";

import style from "./ListTitle.module.css";

type Props = {
  title: string;
  onEdit: (title: string) => void;
  onDelete: () => void;
};

const ListTitle: FC<Props> = ({ title, onEdit, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleEdit = () => {
    onEdit(newTitle);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete();
  };
  const handleCancelEdit = () => {
    setNewTitle(title);
    setEditing(false);
  };

  return (
    <div className={style.list}>
      {editing ? (
        <>
          <input
            title="Edit list title"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <div className={style.actions}>
            <button onClick={handleEdit}>💾</button>
            <button onClick={handleCancelEdit}>❌</button>
          </div>
        </>
      ) : (
        <>
          <h2 className={style.title}>{title}</h2>
          <div className={style.actions}>
            <button onClick={() => setEditing(true)}>✍️</button>
            <button onClick={handleDelete}>🗑️</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ListTitle;
