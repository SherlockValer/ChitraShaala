import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import router from "./routes";

import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
