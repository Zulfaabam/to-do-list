import { TbTrash } from "react-icons/tb";
import { GrFormEdit, GrCheckmark } from "react-icons/gr";
import { TodoItems } from "../pages/Activity";
import { useState } from "react";

interface ListItemProps {
  idx: number;
  item: TodoItems;
  updateListItem: (itemId: number, isActive: boolean, title: string) => void;
  handleClickDelete: (itemId: number, title: string) => void;
}

const ListItem = ({
  idx,
  item,
  updateListItem,
  handleClickDelete,
}: ListItemProps) => {
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <div
      key={idx}
      className="bg-white shadow-custom rounded-xl px-7 py-6 flex justify-between"
      data-cy={`todo-item-${idx}`}
    >
      <div className="flex gap-4 items-center">
        <input
          type="checkbox"
          id={item.title}
          name={item.title}
          value={item.title}
          data-cy="todo-item-checkbox"
          checked={!item.is_active}
          onChange={() => {
            if (item.is_active) {
              updateListItem(item.id, false, item.title);
            } else if (!item.is_active) {
              updateListItem(item.id, true, item.title);
            } else return;
          }}
          className="cursor-pointer"
        />
        <div
          data-cy="todo-item-priority-indicator"
          className={`${
            item.priority === "very-high"
              ? "bg-red"
              : item.priority === "high"
              ? "bg-yellow"
              : item.priority === "medium"
              ? "bg-green"
              : item.priority === "low"
              ? "bg-light-blue"
              : item.priority === "very-low"
              ? "bg-purple"
              : ""
          } w-2 h-2 rounded-full`}
        ></div>
        {editTitle ? (
          <>
            <input
              className="border border-gray rounded-md py-1 px-3 w-[200px]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="text-[#A4A4A4]"
              data-cy="todo-title-edit-button"
              onClick={() => {
                if (title && item.is_active) {
                  updateListItem(item.id, true, title);
                } else if (title && !item.is_active) {
                  updateListItem(item.id, false, title);
                }
                setEditTitle(false);
              }}
            >
              <GrCheckmark size="16px" />
            </button>
          </>
        ) : (
          <>
            <label
              htmlFor={item.title}
              data-cy="todo-item-title"
              className={`${
                !item.is_active ? "line-through text-gray-text" : ""
              }`}
            >
              {item.title}
            </label>
            <button
              data-cy="todo-item-edit-button"
              onClick={() => {
                setTitle(item.title);
                setEditTitle(true);
              }}
            >
              <GrFormEdit size="16px" color="#888888" />
            </button>
          </>
        )}
      </div>
      <button
        data-cy="todo-item-delete-button"
        onClick={() => handleClickDelete(item.id, item.title)}
      >
        <TbTrash size="18px" color="#888888" />
      </button>
    </div>
  );
};

export default ListItem;
