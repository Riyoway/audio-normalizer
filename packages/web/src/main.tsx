import React from "react";
import ReactDOM from "react-dom/client";
// Self-hosted variable fonts (precached by the service worker for offline use).
import "@fontsource-variable/bricolage-grotesque/wght.css";
import "@fontsource-variable/archivo/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
import { App } from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
