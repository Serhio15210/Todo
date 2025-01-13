import { Todo } from "@/api/types.ts";
import "@/styles/App.scss";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { useUpdateTodoMutation } from "@/api/todos/queries.ts";
interface TodoCardProps {
  card: Todo;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const TodoCard = ({ card, onEditClick, onDeleteClick }: TodoCardProps) => {
  const formatDate = (date: string) => {
    return dayjs(date).format("HH:MM");
  };
  const { mutate: update } = useUpdateTodoMutation();

  return (
    <div className={`todoCard ${card.checked ? "active" : ""}`}>
      <div className="row header">
        <p>{card.title}</p>
        <p>{formatDate(card.date)}</p>
      </div>
      {card.text && <textarea value={card.text} disabled />}
      <div className="buttons">
        <Button
          variant="outlined"
          onClick={() => {
            update({ ...card, checked: !card.checked });
          }}
          color={card.checked ? "warning" : "success"}
        >
          {card.checked ? "Cancel" : "Done"}
        </Button>
        <Button variant="outlined" onClick={onEditClick}>
          Edit
        </Button>
        <Button variant="contained" onClick={onDeleteClick} color={"error"}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TodoCard;
