import { useTodosQuery } from "@/api/todos/queries.ts";
import { Todo } from "@/api/types.ts";
import { SelectChangeEvent } from "@mui/material";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

export const useTodoList = () => {
  const { data, isLoading, isError, error } = useTodosQuery();
  const [selectedWeek, setSelectedWeek] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectDay, setSelectDay] = useState<Todo[]>([]);
  const groupedTodos = useMemo(() => {
    const weeks: Record<string, Record<string, Todo[]>> = {};

    data?.forEach((todo) => {
      const weekStart = dayjs(todo.date).startOf("week");
      const weekEnd = dayjs(todo.date).endOf("week");
      const weekRange = `${weekStart.format("YYYY-MM-DD")} - ${weekEnd.format("YYYY-MM-DD")}`;
      const day = dayjs(todo.date).format("dddd");

      if (!weeks[weekRange]) {
        weeks[weekRange] = {};
      }
      if (!weeks[weekRange][day]) {
        weeks[weekRange][day] = [];
      }
      weeks[weekRange][day].push(todo);
    });
    if (!selectedWeek) {
      setSelectedWeek(Object.keys(weeks)[0]);
    }
    return weeks;
  }, [data]);
  const handleWeekChange = (event: SelectChangeEvent<string>) => {
    setSelectedWeek(event.target.value as string);
    setSelectedDay("");
    setSelectDay([]);
  };
  return {
    groupedTodos,
    selectedWeek,
    selectedDay,
    selectDay,
    isLoading,
    isError,
    error,
    setSelectedDay,
    setSelectedWeek,
    setSelectDay,
    handleWeekChange,
  };
};
