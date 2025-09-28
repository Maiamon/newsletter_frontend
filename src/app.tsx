import { RouterProvider } from "react-router";
import { router } from "./routes";
import { DocumentHeadProvider } from "./lib/document-head";
import { Toaster } from 'sonner'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";

function App() {
  return (
    <DocumentHeadProvider titleTemplate="%s | Newsletter">
      <Toaster richColors />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </DocumentHeadProvider>
  );
}

export default App;
