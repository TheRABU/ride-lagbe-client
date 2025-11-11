import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import AllRoutes from "./routes/AllRoutes.tsx";
import { ThemeProvider } from "./providers/theme.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AllRoutes />
    </ThemeProvider>
  </StrictMode>
);
