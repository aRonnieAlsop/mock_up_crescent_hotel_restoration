import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import PreviewLogin from "./PreviewLogin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PreviewLogin>
      <App />
    </PreviewLogin>
  </StrictMode>
);