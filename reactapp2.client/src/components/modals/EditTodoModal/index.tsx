import { Todo } from "@/api/types";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../style.ts";
import { useUpdateTodoMutation } from "@/api/todos/queries";

interface EditTodoProps {
  openModal: boolean;
  closeModal: () => void;
  todo: Todo;
}

const EditTodoModal = ({ openModal, closeModal, todo }: EditTodoProps) => {
  const [value, setValue] = useState<Dayjs>(dayjs(todo.date));
  const [title, setTitle] = useState<string>(todo.title);
  const [text, setText] = useState<string>(todo.text || "");
  const [titleError, setTitleError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const {
    mutate: update,
    isPending: isUpdating,
    isSuccess,
  } = useUpdateTodoMutation();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let valid = true;

    if (title.length < 5) {
      setTitleError("Title must be at least 5 characters long");
      valid = false;
    } else {
      setTitleError(null);
    }

    if (valid) {
      update({
        ...todo,
        date: value.toISOString(),
        title: title,
        text: text,
      });
    }
  };
  useEffect(() => {
    setValue(dayjs(todo.date));
    setTitle(todo.title);
    setText(todo.text || "");
  }, [todo]);
  useEffect(() => {
    setTitleError(null);
  }, [title]);
  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess]);
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={openModal}
        onClose={closeModal}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Create Todo</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="search"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!titleError}
            helperText={titleError}
          />
          <TextField
            margin="dense"
            id="outlined-textarea"
            label="Text"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Text"
            multiline
          />
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={"en-gb"}
          >
            <DateTimePicker
              label="Controlled picker"
              value={value}
              onChange={(newValue) => setValue(newValue ?? dayjs())}
              sx={{ width: "100%", marginTop: "16px" }}
              disablePast
              onError={(newError) => setDateError(newError)}
              slotProps={{
                textField: {
                  helperText: dateError,
                },
              }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} variant="outlined" color={"error"}>
            Cancel
          </Button>
          <Button type="submit" variant="outlined" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default EditTodoModal;
