import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SecretApp from "./SecretApp";
import "./secret.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SecretApp />
  </StrictMode>,
);
