import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
// npx create-react-app todo-dashboard --template typescript
// cd todo-dashboard

// npm install @headlessui/react @heroicons/react tailwindcss postcss autoprefixer