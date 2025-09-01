import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Article } from "./Article";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Article />
    </QueryClientProvider>
  );
};

export default App;
