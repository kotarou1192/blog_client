import React from "react";
import "./App.css";
import { Router } from "./components/Router";

export const App: React.FC<{}> = () => {
  return (
    <div className="base">
      <Router />
    </div>
  );
};
