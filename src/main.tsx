import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/css/index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import NotFoundRoutes from "./routes/NotFoundRoutes/NotFoundRoutes.tsx";
import TasksRoutes from "./routes/TasksRoutes";
import AddTaskRoutes from "./routes/AddTaskRoutes.tsx";
import EditTaskRoutes from "./routes/EditTaskRoutes.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundRoutes />,

    children: [
      {
        index: true,
        loader: async () => redirect("/dashboard"),
      },
      {
        path: "dashboard",
        element: <TasksRoutes />,
      },
      {
        path: "add-task",
        element: <AddTaskRoutes />,
      },
      {
        path: "edit-task/:taskId",
        element: <EditTaskRoutes />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
