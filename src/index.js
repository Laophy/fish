import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import SteamPlugin from "./framework/Steam.js";
import { ThemeProvider } from "./context/ThemeContext";
import { SoundProvider } from "./context/SoundContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <ThemeProvider>
      <SoundProvider>
        <input id="fileid" type="file" hidden accept=".json" />
        <SteamPlugin />
        <App />
      </SoundProvider>
    </ThemeProvider>
  </HashRouter>
);
