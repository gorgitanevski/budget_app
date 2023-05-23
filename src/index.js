import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BudgetProvider } from "./context/BudgetsContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BudgetProvider>
    <App />
  </BudgetProvider>
);
