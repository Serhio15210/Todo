import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ITodoResponse } from "../types";
import { queryIds } from "./constants";
import {
  createTodo,
  deleteTodo,
  getTodos,
  getTodosById,
  updateTodo,
} from "./actions";
import { queryClient } from "../queryClient";

export const useTodosQuery = (): UseQueryResult<ITodoResponse[]> => {
  return useQuery({
    queryKey: [queryIds.TODOS_ALL],
    queryFn: getTodos,
  });
};
export const useTodosIdQuery = (id: string): UseQueryResult<ITodoResponse> => {
  return useQuery({
    queryKey: [queryIds.TODOS_ID],
    queryFn: () => getTodosById(id),
  });
};
export const useCreateTodoMutation = () => {
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [queryIds.TODOS_ALL],
        exact: true,
        refetchType: "active",
      }),
  });
};
export const useUpdateTodoMutation = () => {
  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [queryIds.TODOS_ALL],
        exact: true,
        refetchType: "active",
      }),
  });
};
export const useDeleteTodoMutation = () => {
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [queryIds.TODOS_ALL],
        exact: true,
        refetchType: "active",
      }),
  });
};
