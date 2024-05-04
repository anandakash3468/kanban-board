import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import List from "./pages/tasks/List";
import LayoutComponent from "./Layout";
import CreateNewTask from "./pages/tasks/CreateNewTask";
import EditTask from "./pages/tasks/EditTask";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello</h1>} />
      <Route
        path="/tasks"
        element={
          <List>
            <Outlet />
          </List>
        }
      >
        <Route path="new" element={<CreateNewTask />} />
        <Route path="edit:id" element={<EditTask />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
