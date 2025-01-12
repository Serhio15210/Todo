import Button from "@mui/material/Button";
import { useTodosQuery } from "@/api/todos/queries.ts";
import TodoList from "../TodoList";
import CreateTodoModal from "../modals/CreateTodoModal";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { Todo } from "@/api/types.ts";
import WeekSelector from "@/components/WeekSelector";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { theme } from "@/components/modals/style.ts";
import { ThemeProvider } from "@mui/material/styles";

const Todos = () => {
  const { data, isLoading, isError, error } = useTodosQuery();
  const [modal, setModal] = useState(false);
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

  useEffect(() => {
    if (selectedWeek && groupedTodos[selectedWeek]) {
      const days = Object.keys(groupedTodos[selectedWeek]);
      if (days.length > 0) {
        const dayToSelect = selectedDay || days[0];
        setSelectedDay(dayToSelect);
        setSelectDay(groupedTodos[selectedWeek][dayToSelect]);
      }
    }
  }, [selectedWeek, groupedTodos, selectedDay]);

  useEffect(() => {
    if (selectedWeek && !groupedTodos[selectedWeek]) {
      const remainingWeeks = Object.keys(groupedTodos);
      if (remainingWeeks.length > 0) {
        setSelectedWeek(remainingWeeks[0]);
        setSelectedDay("");
        setSelectDay([]);
      }
    }
  }, [groupedTodos, selectedWeek]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <CreateTodoModal openModal={modal} closeModal={() => setModal(false)} />
      <h1 id="tableLabel">Todos</h1>
      <div className={"headerRow"}>
        <ThemeProvider theme={theme}>
          <Select
            fullWidth
            variant="standard"
            labelId="week-select-label"
            value={selectedWeek}
            onChange={handleWeekChange}
          >
            {Object.keys(groupedTodos).map((weekRange) => (
              <MenuItem key={weekRange} value={weekRange}>
                {weekRange}
              </MenuItem>
            ))}
          </Select>
        </ThemeProvider>

        <Button onClick={() => setModal(true)} variant="contained" fullWidth>
          Add
        </Button>
      </div>

      {isError ? (
        <p>{error.message}</p>
      ) : (
        <div className="container">
          {selectedWeek && (
            <WeekSelector
              week={groupedTodos[selectedWeek]}
              setSelectDay={setSelectDay}
              selectDay={selectDay}
              setSelectedDay={setSelectedDay}
            />
          )}
          <TodoList todos={selectDay} />
        </div>
      )}
    </>
  );
};

export default Todos;
