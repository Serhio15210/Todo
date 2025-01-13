import "@/styles/App.scss";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient.ts";
import Todos from "./components/Todos";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

dayjs.locale("en-gb");

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
}

export default App;
