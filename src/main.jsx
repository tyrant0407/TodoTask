import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import TasksContext from "./Context/TasksContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
<TasksContext>
    <App/>
</TasksContext>
);
