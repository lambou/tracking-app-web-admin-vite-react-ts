import { Outlet } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <AppLayout>
        <Outlet />
      </AppLayout>
    </QueryClientProvider>
  );
}

export default App;
