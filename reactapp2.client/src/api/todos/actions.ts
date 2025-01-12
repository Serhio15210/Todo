import { api } from "../api.ts";
import { CreateTodo, ITodoResponse, Todo } from "../types.ts";

export const getTodos = async () => {
  const response = await api.get<ITodoResponse[]>("/todos");
  return response.data;
};
export const getTodosById = async (id: string) => {
  const response = await api.get<ITodoResponse>(`/todos/${id}`);
  return response.data;
};

export const createTodo = async (todo: CreateTodo) => {
  const response = await api.post<string>(`/todos/create`, todo);
  return response.data;
};
export const updateTodo = async (todo: Todo) => {
  const response = await api.put(`/todos/${todo.id}`, todo);
  return response.data;
};
export const deleteTodo = async (id: string) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};
