import { Todo } from "@/api/types.ts";
import WeekCard from "@/components/WeekSelector/WeekCard";

interface WeekSelectorProps {
  week: Record<string, Todo[]>;
  setSelectDay: (value: Todo[]) => void;
  selectDay: Todo[];
  setSelectedDay: (value: string) => void;
}

const WeekSelector = ({
  week,
  setSelectDay,
  selectDay,
  setSelectedDay,
}: WeekSelectorProps) => {
  function arraysEqual(a1: Todo[], a2: Todo[]) {
    return JSON.stringify(a1) == JSON.stringify(a2);
  }
  return (
    <div className={"todoListContainer weekSelectorContainer"}>
      {!week ? (
        <p>Todos not found</p>
      ) : (
        Object.keys(week).map((item: string, index) => (
          <WeekCard
            card={item}
            count={week[item].length}
            date={week[item][0].date}
            key={index}
            onClick={() => {
              setSelectDay(week[item]);
              setSelectedDay(item);
            }}
            isActive={arraysEqual(selectDay, week[item])}
          />
        ))
      )}
    </div>
  );
};

export default WeekSelector;
