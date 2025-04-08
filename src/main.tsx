import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import MusicContextProvider from "./lib/store/Store.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MusicContextProvider>
      <App />
    </MusicContextProvider>
  </StrictMode>
);
