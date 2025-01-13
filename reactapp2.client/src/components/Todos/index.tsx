import TodoList from "../TodoList";
import { useEffect } from "react";
import WeekSelector from "@/components/WeekSelector";
import { useTodoList } from "@/hooks/useTodoList.ts";
import Header from "@/components/Todos/Header.tsx";

const Todos = () => {
  const {
    selectedWeek,
    groupedTodos,
    selectedDay,
    selectDay,
    setSelectedDay,
    setSelectedWeek,
    setSelectDay,
    isError,
    isLoading,
    error,
    handleWeekChange,
  } = useTodoList();

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
      } else {
        setSelectedWeek("");
        setSelectedDay("");
        setSelectDay([]);
      }
    }
  }, [groupedTodos, selectedWeek]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <Header
        groupedTodos={groupedTodos}
        handleWeekChange={handleWeekChange}
        selectedWeek={selectedWeek}
      />

      {isError ? (
        <p>{error?.message}</p>
      ) : (
        <div className="container">
          <WeekSelector
            week={groupedTodos[selectedWeek]}
            setSelectDay={setSelectDay}
            selectDay={selectDay}
            setSelectedDay={setSelectedDay}
          />

          <TodoList todos={selectDay} />
        </div>
      )}
    </>
  );
};

export default Todos;
