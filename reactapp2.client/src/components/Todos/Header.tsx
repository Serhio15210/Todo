import CreateTodoModal from "@/components/modals/CreateTodoModal";
import { theme } from "@/components/modals/style.ts";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Todo } from "@/api/types.ts";
import Button from "@mui/material/Button";
import { useState } from "react";
interface HeaderProps {
  selectedWeek: string;
  handleWeekChange: (event: SelectChangeEvent<string>) => void;
  groupedTodos: Record<string, Record<string, Todo[]>>;
}
const Header = ({
  selectedWeek,
  handleWeekChange,
  groupedTodos,
}: HeaderProps) => {
  const [modal, setModal] = useState(false);
  return (
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
    </>
  );
};

export default Header;
