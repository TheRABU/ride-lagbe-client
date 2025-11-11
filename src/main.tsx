import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import AllRoutes from "./routes/AllRoutes.tsx";
import { ThemeProvider } from "./providers/theme.provider.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AllRoutes />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);
