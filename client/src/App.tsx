import { Router } from "./routes/Router";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router />
      </div>
    </QueryClientProvider>
  );
}

export default App;
