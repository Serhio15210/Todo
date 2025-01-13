import { Todo } from "@/api/types";
import "@/styles/App.scss";
import TodoCard from "@/components/TodoList/TodoCard";
import { useState } from "react";
import EditTodoModal from "@/components/modals/EditTodoModal";
import { useDeleteTodoMutation } from "@/api/todos/queries.ts";

interface TodoListProps {
  todos: Todo[];
}
const TodoList = ({ todos }: TodoListProps) => {
  const [selectTodo, setSelectTodo] = useState<Todo | null>();
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const { mutate: remove } = useDeleteTodoMutation();
  return (
    <>
      {selectTodo && (
        <EditTodoModal
          openModal={openEdit}
          closeModal={() => {
            setSelectTodo(null);
            setOpenEdit(false);
          }}
          todo={selectTodo}
        />
      )}
      <div className={"todoListContainer"}>
        {todos.length === 0 ? (
          <p>List is empty</p>
        ) : (
          todos.map((item) => (
            <TodoCard
              key={item.id}
              card={item}
              onEditClick={() => {
                setSelectTodo(item);
                setOpenEdit(true);
              }}
              onDeleteClick={() => {
                if (confirm("Do you really want delete this todo?")) {
                  remove(item.id);
                }
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default TodoList;
