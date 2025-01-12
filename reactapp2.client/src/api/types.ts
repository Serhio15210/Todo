export interface ITodoResponse {
  id: string;
  title: string;
  text?: string;
  date: string;
  checked: boolean;
}
export type CreateTodo = {
  title: string;
  text?: string;
  date: string;
};

export type Todo = ITodoResponse;
