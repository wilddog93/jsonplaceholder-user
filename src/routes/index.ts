import { createBrowserRouter } from "react-router-dom";
import LayoutApps from "../components/layouts";
import UserPages from "../pages/UserPages";
import ErrorPage from "../components/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LayoutApps,
    children: [
      {
        index: true,
        Component: UserPages,
      },
      {
        path: "*",
        Component: ErrorPage
      }
    ],
  },
]);